import { Habit } from "../types/habitTypes";
import { mapHabit } from "./mapper";
import { executeSQL, querySQL, transactionSQL } from "../db/utils";

export const HabitService = {
	loadHabits: async (): Promise<Habit[]> => {
		const query = `SELECT h.*, t.type, t.frequency, t.count, t.unit, t.start_date
		FROM habits h
		LEFT JOIN habit_targets t ON h.id = t.habit_id
		WHERE h.archived != 1;`;

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
					`INSERT INTO habit_targets (habit_id, type, frequency, start_date) VALUES (?, ?, ?, ?);`,
					[
						habit.id,
						habit.target.type,
						"daily",
						habit.target.startDate,
					]
				);
			}
		});
	},

	updateHabit: async (updatedHabit: Habit) => {},

	updateQuitStartDate: async (habitId: string, newStartDate: string) => {
		const query = `UPDATE habit_targets SET start_date = ? WHERE habit_id = ?;`;

		return executeSQL(query, [newStartDate, habitId]);
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
