import { Habit } from "../types/habitTypes";
import {
	DELETE_HABITS,
	DELETE_MILESTONES,
	DELETE_TARGETS,
	GET_HABITS_TARGETS,
} from "../db/schema";
import { getDb } from "../db";
import { mapHabit } from "./mapper";

export const HabitService = {
	loadHabits: async (): Promise<Habit[]> => {
		const db = getDb();

		// Join habits and targets so you get one row per habit with all data
		const rows = await db.getAllAsync<any>(GET_HABITS_TARGETS);

		return rows.map(mapHabit);
	},

	createHabit: async (habit: Habit) => {
		const db = getDb();

		try {
			await db.withTransactionAsync(async () => {
				await db.runAsync(
					`INSERT INTO habits 
           (id, name, color, type, created_at, updated_at)
           VALUES (?, ?, ?, ?, ?, ?)`,
					[
						habit.id,
						habit.name,
						habit.color,
						habit.target.type,
						habit.createdAt,
						habit.updatedAt,
					]
				);

				if (habit.target.type === "count") {
					await db.runAsync(
						`INSERT INTO habit_targets
             (habit_id, type, frequency, count, unit)
             VALUES (?, ?, ?, ?, ?)`,
						[
							habit.id,
							habit.target.type,
							habit.target.frequency,
							habit.target.count,
							habit.target.unit,
						]
					);
				}

				if (habit.target.type === "quit") {
					await db.runAsync(
						`INSERT INTO habit_targets
             (habit_id, type, frequency, start_date)
             VALUES (?, ?, ?, ?)`,
						[
							habit.id,
							habit.target.type,
							"daily",
							habit.target.startDate,
						]
					);
				}
			});
		} catch (error) {
			console.error("Failed to create habit:", error);
			throw error;
		}
	},

	updateHabit: async (updatedHabit: Habit) => {},

	updateQuitStartDate: async (habitId: string, newStartDate: string) => {
		const db = getDb();

		try {
			await db.runAsync(
				`UPDATE habit_targets SET start_date = ? WHERE habit_id = ?`,
				[newStartDate, habitId]
			);
		} catch (error) {
			console.error("Failed to update quit start date:", error);
			throw error;
		}
	},

	deleteAllHabits: async () => {
		const db = getDb();
		await db.withTransactionAsync(async () => {
			await db.runAsync(DELETE_TARGETS);
			await db.runAsync(DELETE_MILESTONES);
			await db.runAsync(DELETE_HABITS);
		});
	},
};
