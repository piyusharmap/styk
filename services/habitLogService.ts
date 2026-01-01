import { getDb } from "../db";
import { DELETE_LOGS, GET_LOGS } from "../db/schema";
import { HabitLog } from "../types/habitTypes";
import { mapHabitLog } from "./mapper";

export const HabitLogService = {
	loadLogs: async (): Promise<HabitLog[]> => {
		const db = getDb();
		const rows = await db.getAllAsync<any>(GET_LOGS);

		return rows.map(mapHabitLog);
	},

	upsertLog: async (log: HabitLog) => {
		const db = getDb();

		await db.runAsync(
			`INSERT OR REPLACE INTO habit_logs (id, habit_id, date, value)
       VALUES (?, ?, ?, ?)`,
			[log.id, log.habitId, log.date, log.value]
		);
	},

	deleteLog: async (id: string) => {
		const db = getDb();

		await db.runAsync(`DELETE FROM habit_logs WHERE id = ?`, [id]);
	},

	deleteAllLogs: async () => {
		const db = getDb();

		await db.runAsync(DELETE_LOGS);
	},
};
