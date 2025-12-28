export type HabitFrequency = "daily" | "weekly" | "monthly" | "yearly";

export type HabitType = "count" | "quit";

export type CountUnit = "times" | "minutes" | "hours";

export type HabitWindow = { start: string; end: string };

export type HabitTarget =
	| {
			type: "count";
			count: number;
			frequency: HabitFrequency;
			unit: CountUnit;
			milestones?: HabitMilestone[];
	  }
	| {
			type: "quit";
			startDate: string;
			frequency: "daily";
			milestones?: HabitMilestone[];
	  };

export type HabitMilestone = {
	id: string;
	label: string;
	value: number;
	unit: CountUnit;
	reachedAt: string;
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
