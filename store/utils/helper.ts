import {
	Habit,
	HabitFrequency,
	HabitLog,
	HabitWindow,
} from "../../types/habitTypes";
import { getMaxDate, toDateString } from "../../utils/time";

// get current time window based on frequency
export const getCurrentTimeWindow = (
	frequency: HabitFrequency
): HabitWindow => {
	const today = new Date();
	let start = new Date(today);
	let end = new Date(today);

	switch (frequency) {
		case "daily":
			break;

		case "weekly":
			const day = today.getDay();
			const diff = day === 0 ? -6 : 1 - day;

			start.setDate(today.getDate() + diff);
			end = new Date(start);
			end.setDate(start.getDate() + 6);
			break;

		case "monthly":
			start = new Date(today.getFullYear(), today.getMonth(), 1);
			end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
			break;

		case "yearly":
			start = new Date(today.getFullYear(), 0, 1);
			end = new Date(today.getFullYear(), 11, 31);
			break;
	}

	return {
		start: toDateString(start),
		end: toDateString(end),
	};
};

// to get the time previous time window based on current window
export const getPreviousTimeWindow = (
	frequency: HabitFrequency,
	currentWindow: HabitWindow
): HabitWindow => {
	const start = new Date(currentWindow.start);
	const end = new Date(currentWindow.end);

	switch (frequency) {
		case "daily":
			start.setDate(start.getDate() - 1);
			end.setDate(end.getDate() - 1);
			break;

		case "weekly":
			start.setDate(start.getDate() - 7);
			end.setDate(end.getDate() - 7);
			break;

		case "monthly":
			start.setMonth(start.getMonth() - 1);
			end.setMonth(end.getMonth() - 1);
			break;

		case "yearly":
			start.setFullYear(start.getFullYear() - 1);
			end.setFullYear(end.getFullYear() - 1);
			break;
	}

	return {
		start: toDateString(start),
		end: toDateString(end),
	};
};

// to check if the habit is completed successfully in the given time window
export const isHabitSuccessfulInWindow = (
	habit: Habit,
	logs: HabitLog[],
	window: HabitWindow
): boolean => {
	if (habit.target.type === "count") {
		const logsInWindow = logs.filter(
			(log) => log.date >= window.start && log.date <= window.end
		);

		const totalValue = logsInWindow.reduce(
			(sum, log) => sum + log.value,
			0
		);

		return totalValue >= habit.target.count;
	}

	const { start, end } = getEffectiveWindow(
		window.start,
		window.end,
		habit.target.startDate
	);

	const relapseExists = logs.some(
		(log) => log.date >= start && log.date <= end
	);

	// if there is any log present in-between the time window we consider the habit as failed
	return !relapseExists;
};

// to check if we should lock the habit for current time window
export const isHabitLockedForWindow = (
	habit: Habit,
	logs: HabitLog[],
	window: { start: string; end: string }
): boolean => {
	return isHabitSuccessfulInWindow(habit, logs, window);
};

// to get effective time window for quit habits
const getEffectiveWindow = (start: string, end: string, startDate?: string) => {
	if (!startDate) return { start, end };

	return {
		start: getMaxDate(start, startDate),
		end,
	};
};

// to get the logs based on habit id
export const getHabitLogs = (habitId: string, logs: HabitLog[]) => {
	return logs.filter((log) => log.habitId === habitId);
};
