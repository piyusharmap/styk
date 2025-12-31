import { create } from "zustand";
import { Habit, HabitLog, HabitTarget } from "../types/habitTypes";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	getCurrentTimeWindow,
	getHabitLogs,
	isHabitLockedForWindow,
	isHabitSuccessfulInWindow,
} from "./utils/helper";
import { getTodayString } from "../utils/time";

type HabitStore = {
	habits: Habit[];
	logs: HabitLog[];

	addHabit: (name: string, color: string, target: HabitTarget) => void;

	// habit log actions
	performHabitAction: (
		habitId: string,
		actionType?: "mark" | "unmark"
	) => void;

	// count habit log actions
	incrementCountHabit: (habit: Habit) => void;
	decrementCountHabit: (habit: Habit) => void;

	// quit habit log actions
	recordQuitRelapse: (habit: Habit) => void;

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
	reset: () => void;
};

export const useHabitStore = create<HabitStore>()(
	persist(
		(set, get) => ({
			habits: [],
			logs: [],

			// to add a new habit
			addHabit: (name, color, target) => {
				const today = getTodayString();

				set((state) => ({
					habits: [
						...state.habits,
						{
							id: `${Date.now()}`,
							name: name,
							color: color,
							target: target,
							createdAt: today,
							updatedAt: today,
						},
					],
				}));
			},

			// to perform habit log actions
			performHabitAction: (habitId, actionType) => {
				const habit = get().habits.find(
					(habit) => habit.id === habitId
				);

				if (!habit) return;

				const type = habit.target.type;

				switch (type) {
					case "count":
						if (actionType === "mark") {
							get().incrementCountHabit(habit);
						} else {
							get().decrementCountHabit(habit);
						}

						break;
					case "quit":
						if (actionType === "mark") {
							get().recordQuitRelapse(habit);
						}
						break;
				}
			},

			// to perform count habit log actions
			incrementCountHabit: (habit) => {
				if (habit.target.type !== "count") return;

				const today = getTodayString();

				const window = getCurrentTimeWindow(habit.target.frequency);

				const logs = get().logs;
				const habitLogs = getHabitLogs(habit.id, logs);
				const locked = isHabitLockedForWindow(habit, habitLogs, window);

				if (locked) return;

				const existingLog = habitLogs.find((log) => log.date === today);

				if (existingLog) {
					set({
						logs: logs.map((log) =>
							log.id === existingLog.id
								? { ...log, value: log.value + 1 }
								: log
						),
					});
				} else {
					set((state) => ({
						logs: [
							...state.logs,
							{
								id: `${habit.id}_${today}`,
								habitId: habit.id,
								date: today,
								value: 1,
							},
						],
					}));
				}
			},

			decrementCountHabit: (habit) => {
				if (habit.target.type !== "count") return;

				const today = getTodayString();

				const window = getCurrentTimeWindow(habit.target.frequency);

				const logs = get().logs;
				const habitLogs = getHabitLogs(habit.id, logs);
				const locked = isHabitLockedForWindow(habit, habitLogs, window);

				if (locked) return;

				const existingLog = habitLogs.find((log) => log.date === today);

				if (!existingLog) return;

				if (existingLog.value > 1) {
					set({
						logs: logs.map((log) =>
							log.id === existingLog.id
								? { ...log, value: log.value - 1 }
								: log
						),
					});
				} else {
					set({
						logs: logs.filter((log) => log.id !== existingLog.id),
					});
				}
			},

			// to perform quit habit log actions
			recordQuitRelapse: (habit) => {
				if (habit.target.type !== "quit") return;

				const today = getTodayString();

				const logs = get().logs;
				const habitLogs = getHabitLogs(habit.id, logs);

				const existingLog = habitLogs.find((log) => log.date === today);

				if (existingLog) return;

				set((state) => ({
					logs: [
						...state.logs,
						{
							id: `${habit.id}_${today}`,
							habitId: habit.id,
							date: today,
							value: 1,
						},
					],
				}));

				set((state) => ({
					habits: state.habits.map((habitItem) =>
						habitItem.id === habit.id
							? {
									...habitItem,
									target: {
										...habitItem.target,
										startDate: today,
									},
									updatedAt: today,
							  }
							: habitItem
					),
				}));
			},

			// to perform habit status actions
			isHabitSuccessful: (habitId) => {
				const habit = get().habits.find(
					(habit) => habit.id === habitId
				);

				if (!habit) return false;

				const window = getCurrentTimeWindow(habit.target.frequency);

				const logs = get().logs;

				return isHabitSuccessfulInWindow(
					habit,
					getHabitLogs(habitId, logs),
					window
				);
			},

			isHabitLocked: (habitId) => {
				const habit = get().habits.find(
					(habit) => habit.id === habitId
				);

				if (!habit) return false;

				const window = getCurrentTimeWindow(habit.target.frequency);

				const logs = get().logs;

				return isHabitLockedForWindow(
					habit,
					getHabitLogs(habitId, logs),
					window
				);
			},

			getStreak: (habitId) => {
				return 0;
			},

			// to perform habit info actions
			getHabitDetails: (habitId) => {
				const habit = get().habits.find(
					(habit) => habit.id === habitId
				);

				if (!habit) return undefined;
				else return habit;
			},

			getCountValue: (habitId) => {
				const habit = get().habits.find(
					(habit) => habit.id === habitId
				);

				if (!habit) return 0;

				if (habit.target.type !== "count") return 0;

				const window = getCurrentTimeWindow(habit.target.frequency);
				const logs = getHabitLogs(habitId, get().logs);

				const logsInWindow = logs.filter(
					(log) => log.date >= window.start && log.date <= window.end
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
			reset: () => set({ habits: [], logs: [] }),
		}),
		{
			name: "habit-store",
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);
