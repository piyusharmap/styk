import { SQLiteDatabase, SQLiteRunResult } from 'expo-sqlite';
import { getDb } from '.';
import { logger } from '../utils/logger';

export const querySQL = async <T>(query: string, params: any[] = []): Promise<T[]> => {
	const db = getDb();

	try {
		return await db.getAllAsync(query, params);
	} catch (error) {
		logger.error('[SQL QUERY ERROR]:', error);
		throw error;
	}
};

export const transactionSQL = async <T>(action: (db: SQLiteDatabase) => Promise<T>): Promise<T> => {
	const db = getDb();

	let result: T;

	try {
		await db.withTransactionAsync(async () => {
			result = await action(db);
		});

		return result!;
	} catch (error) {
		logger.error('[SQL TRANSACTION ERROR]:', error);
		throw error;
	}
};

export const executeSQL = async <T>(query: string, params: any[]): Promise<SQLiteRunResult> => {
	const db = getDb();

	try {
		return await db.runAsync(query, params);
	} catch (error) {
		logger.error('[SQL ERROR]:', error);
		throw error;
	}
};
