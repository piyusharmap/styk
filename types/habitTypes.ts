export type HabitFrequency = "daily" | "weekly" | "monthly" | "yearly";

export type HabitType = "count" | "quit";

export type CountUnit = "times" | "minutes" | "hours";

export type HabitTarget =
	| {
			type: "count";
			count: number;
			frequency: HabitFrequency;
			unit: CountUnit;
	  }
	| {
			type: "quit";
			frequency: "daily";
	  };

export type Habit = {
	id: string;
	name: string;
	color: string;

	target: HabitTarget;

	createdAt: string;
	updatedAt: string;

	archived?: boolean;
	archivedAt?: string;
};

export type HabitLog = {
	id: string;
	habitId: string;
	date: string;
	value: number;
};
