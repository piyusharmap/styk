import { Habit, HabitActivity, HabitLog, HabitTarget } from '../types/habitTypes';

export const mapHabit = (rows: any): Habit => {
	const target: HabitTarget =
		rows.type === 'count'
			? {
					type: 'count',
					frequency: rows.frequency,
					count: rows.count,
					unit: rows.unit,
					currentStreak: rows.current_streak,
					longestStreak: rows.longest_streak,
				}
			: {
					type: 'quit',
					frequency: 'daily',
					startDate: rows.start_date,
					initialStartDate: rows.initial_start_date,
				};

	return {
		id: rows.id,
		name: rows.name,
		color: rows.color,
		target,
		createdAt: rows.created_at,
		updatedAt: rows.updated_at,
		archived: !!rows.archived,
		archivedAt: rows.archived_at,
	};
};

export const mapHabitLog = (row: any): HabitLog => {
	return {
		id: row.id,
		habitId: row.habit_id,
		date: row.date,
		value: row.value,
		skipped: row.skipped,
		history: row.history,
		updatedAt: row.update_at,
	};
};

export const mapDailyActivity = (row: any): HabitActivity => {
	const currentValue = row.current_value || 0;
	const goal = row.count || 0;

	let progress = 0;

	if (row.type === 'count') {
		progress = goal > 0 ? Math.min(currentValue / goal, 1) : 0;
	} else if (row.type === 'quit') {
		progress = currentValue > 0 ? 0 : 1;
	}

	return {
		id: row.id,
		name: row.name,
		color: row.color,
		type: row.type,
		frequency: row.frequency,
		count: row.count,
		unit: row.unit || '',
		currentValue: currentValue,
		progress: progress,
	};
};
