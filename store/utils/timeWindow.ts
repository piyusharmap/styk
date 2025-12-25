import { HabitFrequency } from "../../types/habitTypes";

export const getTodayString = (): string => {
	const today = new Date();
	return today.toISOString().split("T")[0];
};

export const getCurrentTimeWindow = (
	frequency: HabitFrequency
): { start: string; end: string } => {
	const today = new Date();
	const end = getTodayString();

	const start = new Date(today);

	switch (frequency) {
		case "daily":
			break;

		case "weekly":
			start.setDate(today.getDate() - today.getDay());
			break;

		case "monthly":
			start.setDate(1);
			break;

		case "yearly":
			start.setMonth(0, 1);
			break;
	}

	return { start: start.toISOString().split("T")[0], end };
};
