import { Habit } from "../types/habitTypes";
import { mapHabit } from "./mapper";
import { executeSQL, querySQL, transactionSQL } from "../db/utils";
import { getTodayString } from "../utils/time";

export const HabitService = {
	loadHabits: async (): Promise<Habit[]> => {
		const query = `SELECT h.*, t.type, t.frequency, t.count, t.unit, t.start_date, t.initial_start_date
		FROM habits h
		LEFT JOIN habit_targets t ON h.id = t.habit_id;`;

		const rows = await querySQL<any>(query, []);

		return rows.map(mapHabit);
	},

	createHabit: async (habit: Habit) => {
		return transactionSQL(async (db) => {
			await db.runAsync(
				`INSERT INTO habits (id, name, color, type, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?);`,
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
					`INSERT INTO habit_targets (habit_id, type, frequency, count, unit) VALUES (?, ?, ?, ?, ?);`,
					[
						habit.id,
						habit.target.type,
						habit.target.frequency,
						habit.target.count,
						habit.target.unit,
					]
				);
			} else if (habit.target.type === "quit") {
				await db.runAsync(
					`INSERT INTO habit_targets (habit_id, type, frequency, start_date, initial_start_date) VALUES (?, ?, ?, ?, ?);`,
					[
						habit.id,
						habit.target.type,
						"daily",
						habit.target.startDate,
						habit.target.initialStartDate,
					]
				);
			}
		});
	},

	updateHabit: async (updatedHabit: Habit) => {
		return transactionSQL(async (db) => {
			await db.runAsync(
				`UPDATE habits SET name = ?, color = ?, updated_at = ? WHERE id = ?;`,
				[
					updatedHabit.name,
					updatedHabit.color,
					updatedHabit.updatedAt,
					updatedHabit.id,
				]
			);

			if (updatedHabit.target.type === "count") {
				await db.runAsync(
					`UPDATE habit_targets 
					 SET frequency = ?, count = ?, unit = ? 
					 WHERE habit_id = ?;`,
					[
						updatedHabit.target.frequency,
						updatedHabit.target.count,
						updatedHabit.target.unit,
						updatedHabit.id,
					]
				);
			} else if (updatedHabit.target.type === "quit") {
				await db.runAsync(
					`UPDATE habit_targets 
					 SET start_date = ?, initial_start_date = ? 
					 WHERE habit_id = ?;`,
					[
						updatedHabit.target.startDate,
						updatedHabit.target.initialStartDate,
						updatedHabit.id,
					]
				);
			}
		});
	},

	updateQuitStartDate: async (habitId: string, newStartDate: string) => {
		const query = `UPDATE habit_targets SET start_date = ? WHERE habit_id = ?;`;

		return executeSQL(query, [newStartDate, habitId]);
	},

	archiveHabit: async (id: string, date: string) => {
		const query = `UPDATE habits SET archived = 1, archived_at = ? WHERE id = ?;`;

		return executeSQL(query, [date, id]);
	},

	restoreHabit: async (id: string) => {
		const query = `UPDATE habits SET archived = 0, archived_at = NULL WHERE id = ?;`;
		const today = getTodayString();

		return executeSQL(query, [today, id]);
	},

	deleteHabit: async (id: string) => {
		const query = `DELETE FROM habits WHERE id = ?;`;

		return executeSQL(query, [id]);
	},

	deleteAllHabits: async () => {
		const query = `DELETE from habits;`;

		return executeSQL(query, []);
	},
};
