import { SQLiteDatabase } from "expo-sqlite";
import { CREATE_TABLE } from "./schema";

let _db: SQLiteDatabase | null = null;

export const setDb = (db: SQLiteDatabase) => {
	_db = db;
};

export const getDb = (): SQLiteDatabase => {
	if (!_db) {
		throw new Error("Database not initialized");
	}
	return _db;
};

export const initializeDb = async (db: SQLiteDatabase) => {
	setDb(db);

	await db.execAsync("PRAGMA foreign_keys = ON;");
	await db.execAsync(CREATE_TABLE);
};
