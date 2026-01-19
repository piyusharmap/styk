import { Habit, HabitActivity } from '../types/habitTypes';
import { mapDailyActivity, mapHabit } from './mapper';
import { executeSQL, querySQL, transactionSQL } from '../db/utils';

export const HabitService = {
	loadHabits: async (): Promise<Habit[]> => {
		const query = `
			SELECT h.*, t.type, t.frequency, t.count, t.unit, t.start_date, t.initial_start_date, t.current_streak, t.longest_streak
			FROM habits h
			LEFT JOIN habit_targets t ON h.id = t.habit_id;
		`;

		const rows = await querySQL<any>(query, []);

		return rows.map(mapHabit);
	},

	createHabit: async (habit: Habit) => {
		return transactionSQL(async (db) => {
			await db.runAsync(
				`
					INSERT INTO habits (id, name, color, type, created_at, updated_at)
					VALUES (?, ?, ?, ?, ?, ?);
				`,
				[
					habit.id,
					habit.name,
					habit.color,
					habit.target.type,
					habit.createdAt,
					habit.updatedAt,
				],
			);

			if (habit.target.type === 'count') {
				await db.runAsync(
					`
						INSERT INTO habit_targets (habit_id, type, frequency, count, unit, current_streak, longest_streak)
						VALUES (?, ?, ?, ?, ?, ?, ?);
					`,
					[
						habit.id,
						habit.target.type,
						habit.target.frequency,
						habit.target.count,
						habit.target.unit,
						habit.target.currentStreak,
						habit.target.longestStreak,
					],
				);
			} else if (habit.target.type === 'quit') {
				await db.runAsync(
					`
						INSERT INTO habit_targets (habit_id, type, frequency, start_date, initial_start_date)
						VALUES (?, ?, ?, ?, ?);
					`,
					[
						habit.id,
						habit.target.type,
						'daily',
						habit.target.startDate,
						habit.target.initialStartDate,
					],
				);
			}
		});
	},

	updateHabit: async (updatedHabit: Habit) => {
		return transactionSQL(async (db) => {
			await db.runAsync(
				`
					UPDATE habits SET name = ?, color = ?, updated_at = ?
					WHERE id = ?;
				`,
				[updatedHabit.name, updatedHabit.color, updatedHabit.updatedAt, updatedHabit.id],
			);

			if (updatedHabit.target.type === 'count') {
				await db.runAsync(
					`
						UPDATE habit_targets 
						SET frequency = ?, count = ?, unit = ? 
						WHERE habit_id = ?;
					`,
					[
						updatedHabit.target.frequency,
						updatedHabit.target.count,
						updatedHabit.target.unit,
						updatedHabit.id,
					],
				);
			} else if (updatedHabit.target.type === 'quit') {
				await db.runAsync(
					`
						UPDATE habit_targets 
						SET start_date = ?, initial_start_date = ? 
						WHERE habit_id = ?;
					`,
					[
						updatedHabit.target.startDate,
						updatedHabit.target.initialStartDate,
						updatedHabit.id,
					],
				);
			}
		});
	},

	updateQuitStartDate: async (habitId: string, newStartDate: string) => {
		const query = `
			UPDATE habit_targets SET start_date = ? WHERE habit_id = ?;
		`;

		return executeSQL(query, [newStartDate, habitId]);
	},

	updateHabitStreak: async (habitId: string, currentStreak: number, longestStreak: number) => {
		const query = `
			UPDATE habit_targets SET current_streak = ?, longest_streak = ? WHERE habit_id = ? AND type = 'count';
		`;

		return executeSQL(query, [currentStreak, longestStreak, habitId]);
	},

	archiveHabit: async (id: string, date: string) => {
		const query = `
			UPDATE habits SET archived = 1, archived_at = ? WHERE id = ?;
		`;

		return executeSQL(query, [date, id]);
	},

	restoreHabit: async (id: string) => {
		const query = `
			UPDATE habits SET archived = 0, archived_at = NULL WHERE id = ?;
		`;

		return executeSQL(query, [id]);
	},

	deleteHabit: async (id: string) => {
		const query = `
			DELETE FROM habits WHERE id = ?;
		`;

		return executeSQL(query, [id]);
	},

	deleteAllHabits: async () => {
		const query = `
			DELETE from habits;
		`;

		return executeSQL(query, []);
	},

	getActivity: async (date: string): Promise<HabitActivity[]> => {
		const query = `
			SELECT 
				h.id, 
				h.name, 
				h.color, 
				t.type, 
				t.count,
				t.frequency,
				t.unit,
				COALESCE(l.value, 0) as current_value
			FROM habits h
			INNER JOIN habit_targets t ON h.id = t.habit_id
			LEFT JOIN habit_logs l ON h.id = l.habit_id AND l.date = ?
			WHERE h.archived = 0
			AND h.created_at <= ?;
		`;

		const rows = await querySQL<any>(query, [date, date]);

		return rows.map(mapDailyActivity);
	},
};
