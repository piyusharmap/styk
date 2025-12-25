import { create } from "zustand";
import { Habit, HabitLog, HabitTarget } from "../types/habitTypes";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTodayString } from "./utils/timeWindow";

type HabitStore = {
	habits: Habit[];
	logs: HabitLog[];

	addHabit: (name: string, target: HabitTarget, color: string) => void;
	markHabitForToday: (habitId: string) => void;
	unmarkHabitForToday: (habitID: string) => void;

	isHabitSuccessful: (habitId: string) => boolean;
	getStreak: (habitId: string) => number;

	getAllHabits: () => Habit[];
	getTodayHabits: () => Habit[];
	reset: () => void;
};

export const useHabitStore = create<HabitStore>()(
	persist(
		(set, get) => ({
			habits: [],
			logs: [],

			addHabit: (name, target, color) => {
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
				const today = getTodayString();
				const logs = get().logs;

				const existingLog = logs.find(
					(log) => log.habitId === habitId && log.date === today
				);
				if (!existingLog) return;

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
				return false;
			},

			getStreak: (habitId) => {
				return 0;
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
