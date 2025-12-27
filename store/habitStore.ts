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
	markHabitForToday: (habitId: string) => void;
	unmarkHabitForToday: (habitID: string) => void;

	isHabitSuccessful: (habitId: string) => boolean;
	isHabitLocked: (habitId: string) => boolean;
	getStreak: (habitId: string) => number;

	getCountValue: (habitId: string) => number;

	getAllHabits: () => Habit[];
	getTodayHabits: () => Habit[];
	reset: () => void;
};

export const useHabitStore = create<HabitStore>()(
	persist(
		(set, get) => ({
			habits: [],
			logs: [],

			addHabit: (name, color, target) => {
				const today = getTodayString();

				set((state) => ({
					habits: [
						...state.habits,
						{
							id: `${state.habits.length + 1}`,
							name: name,
							color: color,
							target: target,
							createdAt: today,
							updatedAt: today,
						},
					],
				}));
			},

			markHabitForToday: (habitId) => {
				const habit = get().habits.find(
					(habit) => habit.id === habitId
				);

				if (!habit) return;

				const today = getTodayString();
				const logs = get().logs;

				if (habit.target.type === "count") {
					const window = getCurrentTimeWindow(habit.target.frequency);

					const locked = isHabitLockedForWindow(
						habit,
						getHabitLogs(habitId, logs),
						window
					);

					if (locked) return;
				}

				const existingLog = logs.find(
					(log) => log.habitId === habitId && log.date === today
				);

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
								id: `${state.logs.length + 1}`,
								habitId: habitId,
								date: today,
								value: 1,
							},
						],
					}));
				}
			},

			unmarkHabitForToday: (habitId) => {
				const habit = get().habits.find(
					(habit) => habit.id === habitId
				);

				if (!habit) return;

				const window = getCurrentTimeWindow(habit.target.frequency);

				if (isHabitLockedForWindow(habit, get().logs, window)) return;

				const today = getTodayString();
				const logs = get().logs;

				const existingLog = logs.find(
					(log) => log.habitId === habitId && log.date === today
				);

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

			reset: () => set({ habits: [], logs: [] }),
		}),
		{
			name: "habit-store",
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);
