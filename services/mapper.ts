import { Habit, HabitLog, HabitTarget } from "../types/habitTypes";

export function mapHabit(rows: any): Habit {
	const target: HabitTarget =
		rows.type === "count"
			? {
					type: "count",
					count: rows.count,
					frequency: rows.frequency,
					unit: rows.unit,
			  }
			: {
					type: "quit",
					startDate: rows.start_date,
					initialStartDate: rows.initial_start_date,
					frequency: "daily",
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
}

export function mapHabitLog(row: any): HabitLog {
	return {
		id: row.id,
		habitId: row.habit_id,
		date: row.date,
		value: row.value,
	};
}
