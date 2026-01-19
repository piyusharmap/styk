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

type HabitStore = {
	habits: Record<string, Habit>;
	logs: Record<string, HabitLog>;

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

	// reset/delete/archive actions
	resetData: () => Promise<void>;
	deleteHabit: (habitId: string) => Promise<void>;
	archiveHabit: (habitId: string) => Promise<void>;
	restoreHabit: (habitId: string) => Promise<void>;

	// db actions
	loadFromDB: () => Promise<void>;
};

export const useHabitStore = create<HabitStore>()((set, get) => {
	const getLogKey = (habitId: string, date: string) => `${habitId}_${date}`;

	const executeAsync = async (errorMessage: string, fn: () => Promise<void>) => {
		try {
			await fn();
		} catch (error) {
			logger.error(`[Store Error] ${errorMessage}:`, error);
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

	const syncHabitStreak = async (habitId: string) => {
		await executeAsync('failed to sync streak', async () => {
			const habit = get().habits[habitId];
			if (!habit || habit.target.type !== 'count') return;

			const allLogs = Object.values(get().logs);
			const newCurrentStreak = calculateCountStreak(habit, allLogs);
			const newBestStreak = Math.max(newCurrentStreak, habit.target.longestStreak || 0);

			await HabitService.updateHabitStreak(habitId, newCurrentStreak, newBestStreak);

			set((state) => ({
				habits: {
					...state.habits,
					[habitId]: {
						...habit,
						target: {
							...habit.target,
							currentStreak: newCurrentStreak,
							bestStreak: newBestStreak,
						},
					},
				},
			}));
		});
	};

	return {
		habits: {},
		logs: {},

		getAllHabits: () => Object.values(get().habits),

		getTodayHabits: () => Object.values(get().habits).filter((h) => !h.archived),

		getHabitDetails: (habitId) => get().habits[habitId] || null,

		// general actions
		addHabit: async (name, color, target) => {
			await executeAsync('failed to add habit', async () => {
				const today = getTodayString();
				const id = `${Date.now()}`;
				const habit: Habit = {
					id,
					name,
					color,
					target,
					createdAt: today,
					updatedAt: today,
				};

				await HabitService.createHabit(habit);
				set((state) => ({
					habits: { ...state.habits, [id]: habit },
				}));
			});
		},

		updateHabit: async (habitId, name, color, target) => {
			await executeAsync('failed to update habit', async () => {
				const habit = get().habits[habitId];
				if (!habit) return;

				const updatedHabit: Habit = {
					...habit,
					name,
					color,
					target: { ...habit.target, ...target },
					updatedAt: getTodayString(),
				};

				await HabitService.updateHabit(updatedHabit);
				set((state) => ({
					habits: { ...state.habits, [habitId]: updatedHabit },
				}));

				if (habit.target.type === 'count') {
					await syncHabitStreak(habitId);
				}
			});
		},

		performHabitAction: async (habitId, date, actionType) => {
			const habit = get().habits[habitId];
			if (!habit) return;

			if (habit.target.type === 'count') {
				if (actionType === 'mark') {
					await get().incrementCountHabit(habitId);
				} else {
					await get().decrementCountHabit(habitId);
				}
			} else {
				if (actionType === 'mark') {
					await get().recordQuitRelapse(habitId, date);
				} else {
					await get().revertQuitRelapse(habitId);
				}
			}
		},

		// count habit actions
		incrementCountHabit: async (habitId) => {
			await executeAsync('Failed to increment habit count', async () => {
				const habit = get().habits[habitId];
				if (!habit || habit.target.type !== 'count') return;

				const today = getTodayString();
				const logKey = getLogKey(habitId, today);
				const now = getTodayTimestamp();

				const window = getCurrentTimeWindow(habit.target.frequency);
				if (isHabitLockedForWindow(habit, Object.values(get().logs), window)) return;

				const existingLog = get().logs[logKey];
				let updatedLog: HabitLog;

				if (existingLog) {
					const history = JSON.parse(existingLog.history || '[]');
					history.push(now);
					updatedLog = {
						...existingLog,
						value: existingLog.value + 1,
						history: JSON.stringify(history),
						updatedAt: now,
					};
				} else {
					updatedLog = {
						id: logKey,
						habitId,
						date: today,
						value: 1,
						history: JSON.stringify([now]),
						updatedAt: now,
					};
				}

				await HabitLogService.upsertLog(updatedLog);
				set((state) => ({
					logs: { ...state.logs, [logKey]: updatedLog },
				}));
				await syncHabitStreak(habitId);
			});
		},

		decrementCountHabit: async (habitId) => {
			await executeAsync('Failed to decrement habit count', async () => {
				const today = getTodayString();
				const logKey = getLogKey(habitId, today);
				const existingLog = get().logs[logKey];

				if (!existingLog) return;

				if (existingLog.value > 1) {
					const history = JSON.parse(existingLog.history || '[]');
					history.pop();
					const updatedLog = {
						...existingLog,
						value: existingLog.value - 1,
						history: JSON.stringify(history),
						updatedAt: getTodayTimestamp(),
					};
					await HabitLogService.upsertLog(updatedLog);
					set((state) => ({ logs: { ...state.logs, [logKey]: updatedLog } }));
				} else {
					await HabitLogService.deleteLog(existingLog.id);
					set((state) => {
						const nextLogs = { ...state.logs };
						delete nextLogs[logKey];
						return { logs: nextLogs };
					});
				}
				await syncHabitStreak(habitId);
			});
		},

		// quit habit actions
		recordQuitRelapse: async (habitId, relapseDate) => {
			await executeAsync('Failed to record habit relapse', async () => {
				const habit = get().habits[habitId];
				if (!habit || habit.target.type !== 'quit') return;

				const today = getTodayString();
				const logKey = getLogKey(habitId, today);
				if (get().logs[logKey]) return;

				const now = getTodayTimestamp();
				const newLog: HabitLog = {
					id: logKey,
					habitId,
					date: today,
					value: 1,
					history: JSON.stringify([now]),
					updatedAt: now,
				};

				const updatedHabit = {
					...habit,
					target: { ...habit.target, startDate: relapseDate },
				};

				await HabitLogService.upsertLog(newLog);
				await HabitService.updateQuitStartDate(habitId, relapseDate);

				set((state) => ({
					logs: { ...state.logs, [logKey]: newLog },
					habits: { ...state.habits, [habitId]: updatedHabit },
				}));
			});
		},

		revertQuitRelapse: async (habitId) => {
			await executeAsync('Failed to revert habit relapse', async () => {
				const habit = get().habits[habitId];
				if (!habit || habit.target.type !== 'quit') return;

				const today = getTodayString();
				const logKey = getLogKey(habitId, today);
				const existingLog = get().logs[logKey];
				if (!existingLog) return;

				const currentStart = new Date(habit.target.startDate);
				currentStart.setDate(currentStart.getDate() - 1);
				const revertDate = toDateString(currentStart);

				const updatedHabit = {
					...habit,
					target: { ...habit.target, startDate: revertDate },
				};

				await HabitLogService.deleteLog(existingLog.id);
				await HabitService.updateQuitStartDate(habitId, revertDate);

				set((state) => {
					const nextLogs = { ...state.logs };
					delete nextLogs[logKey];
					return {
						logs: nextLogs,
						habits: { ...state.habits, [habitId]: updatedHabit },
					};
				});
			});
		},

		// habit details action
		isHabitSuccessful: (habitId) => {
			const habit = get().habits[habitId];
			if (!habit) return false;
			return isHabitSuccessfulInWindow(
				habit,
				Object.values(get().logs),
				getCurrentTimeWindow(habit.target.frequency),
			);
		},

		isHabitLocked: (habitId) => {
			const habit = get().habits[habitId];
			if (!habit) return false;
			return isHabitLockedForWindow(
				habit,
				Object.values(get().logs),
				getCurrentTimeWindow(habit.target.frequency),
			);
		},

		getCountValue: (habitId) => {
			const habit = get().habits[habitId];
			if (!habit) return 0;

			const window = getCurrentTimeWindow(habit.target.frequency);
			// We only filter the values relevant to the habit to keep it fast
			return Object.values(get().logs)
				.filter(
					(log) =>
						log.habitId === habitId &&
						log.date >= window.start &&
						log.date <= window.end,
				)
				.reduce((sum, log) => sum + log.value, 0);
		},

		// report actions
		getLastXDaysReport: (habitId, x) => {
			const habit = get().habits[habitId];
			if (!habit) return [];

			const today = getTodayString();
			const dates = getLastXDays(x);
			const createdAt = habit.createdAt.split('T')[0];

			return dates.map((date) => {
				const logKey = getLogKey(habitId, date);
				const log = get().logs[logKey];
				const value = log ? log.value : 0;

				if (date < createdAt) {
					const isQuitSuccess =
						habit.target.type === 'quit' && date >= habit.target.initialStartDate;
					return {
						date,
						status: isQuitSuccess ? 'success' : 'none',
						value: 0,
						percentage: isQuitSuccess ? 1 : 0,
					};
				}

				let status: HabitLogStatus = 'none';
				let percentage = 0;

				if (habit.target.type === 'count') {
					percentage = Math.min(value / habit.target.count, 1);
					status =
						value >= habit.target.count
							? 'success'
							: date === today || value > 0
								? 'incomplete'
								: 'fail';
				} else {
					percentage = value > 0 ? 0 : 1;
					status = value > 0 ? 'fail' : date === today ? 'incomplete' : 'success';
				}

				return { date, status, value, percentage };
			});
		},

		getDailyActivity: async (date) => {
			return await evaluateAsync('Failed to fetch activity data', () =>
				HabitService.getActivity(date),
			);
		},

		// reset/delete/archive actions
		resetData: async () => {
			await executeAsync('Failed to reset data', async () => {
				await HabitService.deleteAllHabits();

				set({ habits: {}, logs: {} });
			});
		},

		deleteHabit: async (habitId) => {
			await executeAsync('Failed to delete habit', async () => {
				await HabitService.deleteHabit(habitId);

				set((state) => {
					const nextHabits = { ...state.habits };
					delete nextHabits[habitId];

					const nextLogs = Object.fromEntries(
						Object.entries(state.logs).filter(([_, log]) => log.habitId !== habitId),
					);

					return { habits: nextHabits, logs: nextLogs };
				});
			});
		},

		archiveHabit: async (habitId) => {
			await executeAsync('Failed to archive', async () => {
				const today = getTodayString();

				await HabitService.archiveHabit(habitId, today);

				set((state) => ({
					habits: {
						...state.habits,
						[habitId]: { ...state.habits[habitId], archived: true, archivedAt: today },
					},
				}));
			});
		},

		restoreHabit: async (habitId) => {
			await executeAsync('Failed to restore', async () => {
				await HabitService.restoreHabit(habitId);

				set((state) => ({
					habits: {
						...state.habits,
						[habitId]: { ...state.habits[habitId], archived: false, archivedAt: '' },
					},
				}));
			});
		},

		// db actions
		loadFromDB: async () => {
			await executeAsync('Failed to load data', async () => {
				const [habitsArr, logsArr] = await Promise.all([
					HabitService.loadHabits(),
					HabitLogService.loadLogs(),
				]);

				const habitsRecord = habitsArr.reduce((acc, h) => ({ ...acc, [h.id]: h }), {});
				const logsRecord = logsArr.reduce(
					(acc, l) => ({ ...acc, [getLogKey(l.habitId, l.date)]: l }),
					{},
				);

				set({ habits: habitsRecord, logs: logsRecord });
			});
		},
	};
});
