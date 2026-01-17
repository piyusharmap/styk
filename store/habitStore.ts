import { create } from 'zustand';
import { Habit, HabitActivity, HabitLog, HabitLogStatus, HabitTarget } from '../types/habitTypes';
import {
	calculateCountStreak,
	getCurrentTimeWindow,
	getLastXDays,
	isHabitLockedForWindow,
	isHabitSuccessfulInWindow,
} from './utils';
import { getTodayString, getTodayTimestamp, toDateString } from '../utils/time';
import { HabitService } from '../services/habitService';
import { HabitLogService } from '../services/habitLogService';
import { logger } from '../utils/logger';
import { MomentumScore } from '../constants/habit';

type HabitStore = {
	habits: Habit[];
	logs: HabitLog[];

	// general actions
	addHabit: (name: string, color: string, target: HabitTarget) => Promise<void>;
	updateHabit: (
		habitId: string,
		name: string,
		color: string,
		target: HabitTarget,
	) => Promise<void>;
	performHabitAction: (
		habitId: string,
		date: string,
		actionType?: 'mark' | 'unmark',
	) => Promise<void>;

	// count habit actions
	incrementCountHabit: (habitId: string) => Promise<void>;
	decrementCountHabit: (habitId: string) => Promise<void>;

	// quit habit actions
	recordQuitRelapse: (habitId: string, relapseDate: string) => Promise<void>;
	revertQuitRelapse: (habitId: string) => Promise<void>;

	// habit details action
	isHabitSuccessful: (habitId: string) => boolean;
	isHabitLocked: (habitId: string) => boolean;

	getCountValue: (habitId: string) => number;

	getAllHabits: () => Habit[];
	getTodayHabits: () => Habit[];
	getHabitDetails: (habitId: string) => Habit | null;

	// report actions
	getLastXDaysReport: (
		habitId: string,
		x: number,
	) => {
		date: string;
		status: HabitLogStatus;
		value: number;
		percentage: number;
	}[];
	getDailyActivity: (date: string) => Promise<HabitActivity[]>;
	getGlobalMomentum: () => number;

	// reset/delete/archive actions
	resetData: () => Promise<void>;
	deleteHabit: (habitId: string) => Promise<void>;
	archiveHabit: (habitId: string) => Promise<void>;
	restoreHabit: (habitId: string) => Promise<void>;

	// db actions
	loadFromDB: () => Promise<void>;
};

export const useHabitStore = create<HabitStore>()((set, get) => {
	const executeAsync = async (errorMessage: string, fn: () => Promise<void>) => {
		try {
			await fn();
		} catch (error) {
			logger.error(`[Store Error] ${errorMessage}:`, error);
			// set a global error state later here for UI alerts
			throw error;
		}
	};

	const evaluateAsync = async <T>(errorMessage: string, fn: () => Promise<T>): Promise<T> => {
		try {
			return await fn();
		} catch (error) {
			logger.error(`[Store Async Query Error] ${errorMessage}:`, error);
			throw error;
		}
	};

	// to sync the count habit streak
	const syncHabitStreak = async (habitId: string) => {
		await executeAsync('failed to sync streak', async () => {
			const habit = get().habits.find((h) => h.id === habitId);
			if (!habit || habit.target.type !== 'count') return;

			const logs = get().logs;

			const newCurrentStreak = calculateCountStreak(habit, logs);
			const newBestStreak = Math.max(newCurrentStreak, habit.target.longestStreak || 0);

			await HabitService.updateHabitStreak(habitId, newCurrentStreak, newBestStreak);

			set((state) => ({
				habits: state.habits.map((h) =>
					h.id === habitId
						? {
								...h,
								target: {
									...h.target,
									currentStreak: newCurrentStreak,
									bestStreak: newBestStreak,
								},
							}
						: h,
				),
			}));
		});
	};

	return {
		habits: [],
		logs: [],

		// general actions
		addHabit: async (name, color, target) => {
			await executeAsync('failed to add habit', async () => {
				const today = getTodayString();

				const habit: Habit = {
					id: `${Date.now()}`,
					name: name,
					color: color,
					target: target,
					createdAt: today,
					updatedAt: today,
				};

				await HabitService.createHabit(habit);

				set((state) => ({
					habits: [...state.habits, habit],
				}));
			});
		},

		updateHabit: async (habitId, name, color, target) => {
			await executeAsync('failed to update habit', async () => {
				const habit = get().habits.find((habit) => habit.id === habitId);
				if (!habit) return;

				const today = getTodayString();

				const updatedHabit: Habit = {
					id: habit.id,
					name: name,
					color: color,
					target: {
						...habit.target,
						...target,
					},
					createdAt: habit.createdAt,
					updatedAt: today,
				};

				await HabitService.updateHabit(updatedHabit);

				set((state) => ({
					habits: state.habits.map((habitItem) =>
						habitItem.id === habit.id ? updatedHabit : habitItem,
					),
				}));

				if (habit.target.type === 'count') {
					await syncHabitStreak(habitId);
				}
			});
		},

		performHabitAction: async (habitId, date, actionType) => {
			const habit = get().habits.find((habit) => habit.id === habitId);
			if (!habit) return;

			const type = habit.target.type;

			switch (type) {
				case 'count':
					if (actionType === 'mark') {
						await get().incrementCountHabit(habit.id);
					} else {
						await get().decrementCountHabit(habit.id);
					}
					break;
				case 'quit':
					if (actionType === 'mark') {
						await get().recordQuitRelapse(habit.id, date);
					} else {
						await get().revertQuitRelapse(habit.id);
					}
					break;
			}
		},

		// count habit actions
		incrementCountHabit: async (habitId) => {
			await executeAsync('Failed to increment habit count', async () => {
				const habit = get().habits.find((habit) => habit.id === habitId);
				if (!habit || habit.target.type !== 'count') return;

				const today = getTodayString();
				const now = getTodayTimestamp();

				const window = getCurrentTimeWindow(habit.target.frequency);

				const logs = get().logs;
				const locked = isHabitLockedForWindow(habit, logs, window);

				if (locked) return;

				const existingLog = logs.find(
					(log) => log.habitId === habit.id && log.date === today,
				);

				if (existingLog) {
					const historyArray = JSON.parse(existingLog.history || '[]');
					historyArray.push(now);

					const updatedLog = {
						...existingLog,
						value: existingLog.value + 1,
						history: JSON.stringify(historyArray),
						updateAt: now,
					};

					await HabitLogService.upsertLog(updatedLog);

					set({
						logs: logs.map((log) => (log.id === updatedLog.id ? updatedLog : log)),
					});
				} else {
					const newLog: HabitLog = {
						id: `${habit.id}_${today}`,
						habitId: habit.id,
						date: today,
						value: 1,
						history: JSON.stringify([now]),
						updatedAt: now,
					};

					await HabitLogService.upsertLog(newLog);

					set((state) => ({
						logs: [...state.logs, newLog],
					}));
				}

				await syncHabitStreak(habitId);
			});
		},

		decrementCountHabit: async (habitId) => {
			await executeAsync('Failed to decrement habit count', async () => {
				const habit = get().habits.find((habit) => habit.id === habitId);
				if (!habit || habit.target.type !== 'count') return;

				const today = getTodayString();
				const now = getTodayTimestamp();

				const logs = get().logs;

				const existingLog = logs.find(
					(log) => log.habitId === habit.id && log.date === today,
				);

				if (!existingLog) return;

				if (existingLog.value > 1) {
					const historyArray = JSON.parse(existingLog.history || '[]');
					historyArray.pop();

					const updatedLog: HabitLog = {
						...existingLog,
						value: existingLog.value - 1,
						history: JSON.stringify(historyArray),
						updatedAt: now,
					};

					await HabitLogService.upsertLog(updatedLog);

					set({
						logs: logs.map((log) => (log.id === updatedLog.id ? updatedLog : log)),
					});
				} else {
					await HabitLogService.deleteLog(existingLog.id);

					set({
						logs: logs.filter((log) => log.id !== existingLog.id),
					});
				}

				await syncHabitStreak(habitId);
			});
		},

		// quit habit actions
		recordQuitRelapse: async (habitId, relapseDate) => {
			await executeAsync('Failed to record habit relapse', async () => {
				const habit = get().habits.find((habit) => habit.id === habitId);
				if (!habit || habit.target.type !== 'quit') return;

				const today = getTodayString();
				const now = getTodayTimestamp();

				const logs = get().logs;

				const existingLog = logs.find(
					(log) => log.habitId === habit.id && log.date === today,
				);

				if (existingLog) return;

				const newLog: HabitLog = {
					id: `${habit.id}_${today}`,
					habitId: habit.id,
					date: today,
					value: 1,
					history: JSON.stringify([now]),
					updatedAt: now,
				};

				const updatedHabit: Habit = {
					...habit,
					target: {
						...habit.target,
						startDate: relapseDate,
					},
				};

				await HabitLogService.upsertLog(newLog);
				await HabitService.updateQuitStartDate(habit.id, relapseDate);

				set((state) => ({
					logs: [...state.logs, newLog],
					habits: state.habits.map((habitItem) =>
						habitItem.id === habit.id ? updatedHabit : habitItem,
					),
				}));
			});
		},

		revertQuitRelapse: async (habitId) => {
			await executeAsync('Failed to revert habit relapse', async () => {
				const habit = get().habits.find((h) => h.id === habitId);
				if (!habit || habit.target.type !== 'quit') return;

				const today = getTodayString();
				const logs = get().logs;

				const existingLog = logs.find(
					(log) => log.habitId === habit.id && log.date === today,
				);

				if (!existingLog) return;

				const currentStart = new Date(habit.target.startDate);
				currentStart.setDate(currentStart.getDate() - 1);
				const revertDate = toDateString(currentStart);

				const updatedHabit: Habit = {
					...habit,
					target: {
						...habit.target,
						startDate: revertDate,
					},
				};

				await HabitLogService.deleteLog(existingLog.id);
				await HabitService.updateQuitStartDate(habit.id, revertDate);

				set((state) => ({
					logs: state.logs.filter((log) => log.id !== existingLog.id),
					habits: state.habits.map((habitItem) =>
						habitItem.id === habit.id ? updatedHabit : habitItem,
					),
				}));
			});
		},

		// habit details actions
		isHabitSuccessful: (habitId) => {
			const habit = get().habits.find((habit) => habit.id === habitId);

			if (!habit) return false;

			const window = getCurrentTimeWindow(habit.target.frequency);

			const logs = get().logs;

			return isHabitSuccessfulInWindow(habit, logs, window);
		},

		isHabitLocked: (habitId) => {
			const habit = get().habits.find((habit) => habit.id === habitId);

			if (!habit) return false;

			const window = getCurrentTimeWindow(habit.target.frequency);

			const logs = get().logs;

			return isHabitLockedForWindow(habit, logs, window);
		},

		getCountValue: (habitId) => {
			const habit = get().habits.find((habit) => habit.id === habitId);
			if (!habit) return 0;

			// if (habit.target.type !== 'count') return 0;

			const window = getCurrentTimeWindow(habit.target.frequency);
			const logs = get().logs;

			const logsInWindow = logs.filter(
				(log) =>
					log.habitId === habit.id && log.date >= window.start && log.date <= window.end,
			);

			return logsInWindow.reduce((sum, log) => sum + log.value, 0);
		},

		getAllHabits: () => {
			return get().habits;
		},

		getTodayHabits: () => {
			return get().habits;
		},

		getHabitDetails: (habitId) => {
			const habit = get().habits.find((habit) => habit.id === habitId);
			if (!habit) return null;
			else return habit;
		},

		// habit report actions
		getLastXDaysReport: (habitId: string, x: number) => {
			const habit = get().habits.find((habit) => habit.id === habitId);
			if (!habit) return [];

			const today = getTodayString();
			const last30Days = getLastXDays(x);

			const logs = get().logs.filter((log) => log.habitId === habitId);
			const logMap = new Map(logs.map((log) => [log.date, log.value]));

			const createdAt = habit.createdAt.split('T')[0];
			const habitType = habit.target.type;

			return last30Days.map((date) => {
				if (date < createdAt) {
					if (habitType === 'count') {
						return { date, status: 'none', value: 0, percentage: 0 };
					} else {
						if (date < habit.target.initialStartDate) {
							return { date, status: 'none', value: 0, percentage: 0 };
						} else {
							return { date, status: 'success', value: 0, percentage: 1 };
						}
					}
				}

				const value = logMap.get(date) || 0;
				let status: HabitLogStatus = 'none';
				let percentage = 0;

				if (habitType === 'count') {
					const goal = habit.target.count;
					percentage = Math.min(value / goal, 1);

					if (value >= goal) {
						status = 'success';
					} else {
						status = date === today ? 'incomplete' : value > 0 ? 'incomplete' : 'fail';
					}
				} else if (habitType === 'quit') {
					percentage = value > 0 ? 0 : 1;

					if (value > 0) {
						status = 'fail';
					} else {
						status = date === today ? 'incomplete' : 'success';
					}
				}

				return {
					date,
					status,
					value,
					percentage: percentage,
				};
			});
		},

		getDailyActivity: async (date: string) => {
			return await evaluateAsync('Failed to fetch activity data', async () => {
				return HabitService.getActivity(date);
			});
		},

		getGlobalMomentum: () => {
			const habits = get().habits.filter((h) => !h.archived && h.target.type === 'count');
			if (habits.length === 0) return 0;

			let totalWeight = 0;
			let earnedWeight = 0;

			habits.forEach((habit) => {
				if (habit.target.type !== 'count') return;

				const weight = MomentumScore[habit.target.frequency].score || 1;

				totalWeight += weight;

				if (get().isHabitSuccessful(habit.id)) {
					earnedWeight += weight;
				}
			});

			return Math.round((earnedWeight / totalWeight) * 100);
		},

		// habit reset/delete actions
		resetData: async () => {
			await executeAsync('Failed to reset data', async () => {
				await HabitService.deleteAllHabits();

				set({ habits: [], logs: [] });
			});
		},

		deleteHabit: async (habitId) => {
			await executeAsync('Failed to delete habit', async () => {
				await HabitService.deleteHabit(habitId);

				set((state) => ({
					habits: state.habits.filter((habit) => habit.id !== habitId),
					logs: state.logs.filter((log) => log.habitId !== habitId),
				}));
			});
		},

		archiveHabit: async (habitId) => {
			await executeAsync('Failed to archive habit', async () => {
				const today = getTodayString();

				await HabitService.archiveHabit(habitId, today);

				set((state) => ({
					habits: state.habits.map((habit) =>
						habit.id === habitId
							? { ...habit, archived: true, archivedAt: today }
							: habit,
					),
				}));
			});
		},

		restoreHabit: async (habitId) => {
			await executeAsync('Failed to restore habit', async () => {
				await HabitService.restoreHabit(habitId);

				set((state) => ({
					habits: state.habits.map((habit) =>
						habit.id === habitId
							? { ...habit, archived: false, archivedAt: '' }
							: habit,
					),
				}));
			});
		},

		// db actions
		loadFromDB: async () => {
			await executeAsync('Failed to load data from db', async () => {
				const [habits, logs] = await Promise.all([
					HabitService.loadHabits(),
					HabitLogService.loadLogs(),
				]);

				set({
					habits,
					logs,
				});
			});
		},
	};
});
