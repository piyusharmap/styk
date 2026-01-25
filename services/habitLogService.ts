import { executeSQL, querySQL } from '../db/utils';
import { HabitLog } from '../types/habitTypes';
import { mapHabitLog } from './mapper';

export const HabitLogService = {
	loadLogs: async (): Promise<HabitLog[]> => {
		const query = `
			SELECT * FROM habit_logs;
		`;

		const rows = await querySQL<any>(query, []);
		return rows.map(mapHabitLog);
	},

	upsertLog: async (log: HabitLog) => {
		const query = `
			INSERT OR REPLACE INTO habit_logs (id, habit_id, date, value, skipped, updated_at)
			VALUES (?, ?, ?, ?, ?, ?);
		`;

		return executeSQL(query, [
			log.id,
			log.habitId,
			log.date,
			log.value,
			log.skipped,
			log.updatedAt,
		]);
	},

	deleteLog: async (id: string) => {
		const query = `
			DELETE FROM habit_logs WHERE id = ?;
		`;

		return executeSQL(query, [id]);
	},

	deleteLogsForHabit: async (habitId: string) => {
		const query = `
			DELETE FROM habit_logs WHERE habit_id = ?;
		`;

		return executeSQL(query, [habitId]);
	},

	deleteAllLogs: async () => {
		const query = `
			DELETE FROM habit_logs;
		`;

		return executeSQL(query, []);
	},
};
