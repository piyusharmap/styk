import { create } from "zustand";
import { Habit, HabitFrequency, HabitLog } from "../types/habitTypes";
import { getTodayString } from "../utils/date";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type HabitStore = {
	habits: Habit[];
	logs: HabitLog[];

	addHabit: (name: string, frequency: HabitFrequency, color: string) => void;
	toggleHabitForToday: (habitId: string) => void;

	isHabitDoneToday: (habitId: string) => boolean;
	getTodayHabits: () => Habit[];
	getStreak: (habitId: string) => number;

	reset: () => void;
};

export const useHabitStore = create<HabitStore>()(
	persist(
		(set, get) => ({
			habits: [],
			logs: [],

			addHabit: (name, frequency, color) => {
				const today = getTodayString();

				set((state) => ({
					habits: [
						...state.habits,
						{
							id: `${state.habits.length + 1}`,
							name: name,
							color: color,
							frequency: frequency,
							createdAt: today,
						},
					],
				}));
			},

			toggleHabitForToday: (habitId) => {
				const today = getTodayString();
				const logs = get().logs;

				const existingLog = logs.find(
					(log) => log.habitId === habitId && log.date === today
				);

				if (existingLog) {
					set({
						logs: logs.map((log) =>
							log === existingLog
								? { ...log, completed: true }
								: log
						),
					});
				} else {
					set((state) => ({
						logs: [
							...state.logs,
							{
								habitId: habitId,
								date: today,
								completed: true,
							},
						],
					}));
				}
			},

			isHabitDoneToday: (habitId) => {
				const today = getTodayString();

				const isDone = !!get().logs.find(
					(log) =>
						log.habitId === habitId &&
						log.date === today &&
						log.completed
				);

				return isDone;
			},

			getTodayHabits: () => {
				return get().habits;
			},

			getStreak: (habitId) => {
				const logs = get()
					.logs.filter(
						(log) => log.habitId === habitId && log.completed
					)
					.sort((a, b) => (a.date < b.date ? 1 : -1));

				let streak = 0;
				let currentDate = getTodayString();

				for (const log of logs) {
					if (log.date === currentDate) {
						streak++;
						const date = new Date(currentDate);
						date.setDate(date.getDate() - 1);
						currentDate = date.toISOString().split("T")[0];
					} else {
						break;
					}
				}

				return streak;
			},

			reset: () => set({ habits: [], logs: [] }),
		}),
		{
			name: "habit-store",
			storage: createJSONStorage(() => AsyncStorage),
		}
	)
);
