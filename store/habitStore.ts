import { create } from "zustand";
import { Habit, HabitLog, HabitTarget } from "../types/habitTypes";
import {
	getCurrentTimeWindow,
	isHabitLockedForWindow,
	isHabitSuccessfulInWindow,
} from "./utils";
import { getTodayString } from "../utils/time";
import { HabitService } from "../services/habitService";
import { HabitLogService } from "../services/habitLogService";

type HabitStore = {
	habits: Habit[];
	logs: HabitLog[];

	addHabit: (
		name: string,
		color: string,
		target: HabitTarget
	) => Promise<void>;

	// habit log actions
	performHabitAction: (
		habitId: string,
		date: string,
		actionType?: "mark" | "unmark"
	) => Promise<void>;

	// count habit log actions
	incrementCountHabit: (habitId: string) => Promise<void>;
	decrementCountHabit: (habitId: string) => Promise<void>;

	// quit habit log actions
	recordQuitRelapse: (habitId: string, relapseDate: string) => Promise<void>;

	// habit status actions
	isHabitSuccessful: (habitId: string) => boolean;
	isHabitLocked: (habitId: string) => boolean;
	getStreak: (habitId: string) => number;

	// habit info actions
	getHabitDetails: (habitId: string) => Habit | undefined;
	getCountValue: (habitId: string) => number;

	getAllHabits: () => Habit[];
	getTodayHabits: () => Habit[];

	// habit reset actions
	resetData: () => void;
	deleteHabit: (habitId: string) => Promise<void>;

	// db sync
	loadFromDB: () => Promise<void>;
};

export const useHabitStore = create<HabitStore>()((set, get) => ({
	habits: [],
	logs: [],

	// to add a new habit
	addHabit: async (name, color, target) => {
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
	},

	// to perform habit log actions
	performHabitAction: async (habitId, date, actionType) => {
		const habit = get().habits.find((habit) => habit.id === habitId);
		if (!habit) return;

		const type = habit.target.type;

		switch (type) {
			case "count":
				if (actionType === "mark") {
					await get().incrementCountHabit(habit.id);
				} else {
					await get().decrementCountHabit(habit.id);
				}
				break;
			case "quit":
				if (actionType === "mark") {
					await get().recordQuitRelapse(habit.id, date);
				}
				break;
		}
	},

	// to perform count habit log actions
	incrementCountHabit: async (habitId) => {
		const habit = get().habits.find((habit) => habit.id === habitId);
		if (!habit) return;

		if (habit.target.type !== "count") return;

		const today = getTodayString();

		const window = getCurrentTimeWindow(habit.target.frequency);

		const logs = get().logs;
		const locked = isHabitLockedForWindow(habit, logs, window);

		if (locked) return;

		const existingLog = logs.find(
			(log) => log.habitId === habit.id && log.date === today
		);

		if (existingLog) {
			const updatedLog = {
				...existingLog,
				value: existingLog.value + 1,
			};

			await HabitLogService.upsertLog(updatedLog);

			set({
				logs: logs.map((log) =>
					log.id === updatedLog.id ? updatedLog : log
				),
			});
		} else {
			const newLog = {
				id: `${habit.id}_${today}`,
				habitId: habit.id,
				date: today,
				value: 1,
			};

			await HabitLogService.upsertLog(newLog);

			set((state) => ({
				logs: [...state.logs, newLog],
			}));
		}
	},

	decrementCountHabit: async (habitId) => {
		const habit = get().habits.find((habit) => habit.id === habitId);
		if (!habit) return;

		if (habit.target.type !== "count") return;

		const today = getTodayString();

		const window = getCurrentTimeWindow(habit.target.frequency);

		const logs = get().logs;
		const locked = isHabitLockedForWindow(habit, logs, window);

		if (locked) return;

		const existingLog = logs.find(
			(log) => log.habitId === habit.id && log.date === today
		);

		if (!existingLog) return;

		if (existingLog.value > 1) {
			const updatedLog = {
				...existingLog,
				value: existingLog.value - 1,
			};

			await HabitLogService.upsertLog(updatedLog);

			set({
				logs: logs.map((log) =>
					log.id === updatedLog.id ? updatedLog : log
				),
			});
		} else {
			await HabitLogService.deleteLog(existingLog.id);

			set({
				logs: logs.filter((log) => log.id !== existingLog.id),
			});
		}
	},

	// to perform quit habit log actions
	recordQuitRelapse: async (habitId, date) => {
		const habit = get().habits.find((habit) => habit.id === habitId);
		if (!habit) return;

		if (habit.target.type !== "quit") return;

		const today = getTodayString();

		const logs = get().logs;

		const existingLog = logs.find(
			(log) => log.habitId === habit.id && log.date === today
		);

		if (existingLog) return;

		const newLog = {
			id: `${habit.id}_${today}`,
			habitId: habit.id,
			date: today,
			value: 1,
		};

		const updatedHabit: Habit = {
			...habit,
			target: {
				...habit.target,
				startDate: date,
			},
			updatedAt: today,
		};

		await HabitLogService.upsertLog(newLog);
		await HabitService.updateQuitStartDate(habit.id, date);

		set((state) => ({
			logs: [...state.logs, newLog],
			habits: state.habits.map((habitItem) =>
				habitItem.id === habit.id ? updatedHabit : habitItem
			),
		}));
	},

	// to perform habit status actions
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

	getStreak: (habitId) => {
		return 0;
	},

	// to perform habit info actions
	getHabitDetails: (habitId) => {
		const habit = get().habits.find((habit) => habit.id === habitId);

		if (!habit) return undefined;
		else return habit;
	},

	getCountValue: (habitId) => {
		const habit = get().habits.find((habit) => habit.id === habitId);

		if (!habit) return 0;

		if (habit.target.type !== "count") return 0;

		const window = getCurrentTimeWindow(habit.target.frequency);
		const logs = get().logs;

		const logsInWindow = logs.filter(
			(log) =>
				log.habitId === habit.id &&
				log.date >= window.start &&
				log.date <= window.end
		);

		return logsInWindow.reduce((sum, log) => sum + log.value, 0);
	},

	getAllHabits: () => {
		return get().habits;
	},

	getTodayHabits: () => {
		return get().habits;
	},

	// to perform habit reset actions
	resetData: async () => {
		try {
			await HabitService.deleteAllHabits();

			set({ habits: [], logs: [] });
		} catch (error) {
			console.error("Failed to reset all data:", error);
		}
	},

	deleteHabit: async (habitId) => {
		try {
			await HabitService.deleteHabit(habitId);

			set((state) => ({
				habits: state.habits.filter((h) => h.id !== habitId),
				logs: state.logs.filter((l) => l.habitId !== habitId),
			}));
		} catch (error) {
			console.error("Failed to reset all data:", error);
		}
	},

	// db sync
	loadFromDB: async () => {
		const [habits, logs] = await Promise.all([
			HabitService.loadHabits(),
			HabitLogService.loadLogs(),
		]);

		set({
			habits,
			logs,
		});
	},
}));
