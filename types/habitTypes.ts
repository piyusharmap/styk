export type HabitFrequency = "daily" | "weekly" | "monthly";

export type Habit = {
	id: string;
	name: string;
	color: string;
	frequency: HabitFrequency;
	createdAt: string;
};

export type HabitLog = {
	habitId: string;
	date: string;
	completed: boolean;
};
