export const CREATE_TABLE = `
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS habits (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    color TEXT NOT NULL,
    type TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    archived INTEGER DEFAULT 0,
    archived_at TEXT
);


CREATE TABLE IF NOT EXISTS habit_targets (
    habit_id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    frequency TEXT NOT NULL,
    count INTEGER,
    start_date TEXT,
    initial_start_date TEXT,
    unit TEXT,
    FOREIGN KEY (habit_id) REFERENCES habits(id)
);


CREATE TABLE IF NOT EXISTS habit_logs (
    id TEXT PRIMARY KEY,
    habit_id TEXT NOT NULL,
    date TEXT NOT NULL,
    value INTEGER NOT NULL,
    FOREIGN KEY (habit_id) REFERENCES habits(id)
);


CREATE TABLE IF NOT EXISTS habit_milestones (
    id TEXT PRIMARY KEY,
    habit_id TEXT NOT NULL,
    label TEXT NOT NULL,
    value INTEGER NOT NULL,
    count TEXT NOT NULL,
    reached_at TEXT,
    FOREIGN KEY (habit_id) REFERENCES habits(id)
);


CREATE INDEX IF NOT EXISTS idx_logs_habit_date
ON habit_logs (habit_id, date)
`;

// for extracting data

export const GET_HABITS_TARGETS = `
    SELECT h.*, t.type, t.frequency, t.count, t.unit, t.start_date
    FROM habits h
    LEFT JOIN habit_targets t ON h.id = t.habit_id
    WHERE h.archived != 1
`;
export const GET_LOGS = `SELECT * from habit_logs`;

// for updating the data

// for deleting records

export const DELETE_HABITS = `DELETE from habits`;
export const DELETE_TARGETS = `DELETE from habit_targets`;
export const DELETE_LOGS = `DELETE from habit_logs`;
export const DELETE_MILESTONES = `DELETE from habit_logs`;
