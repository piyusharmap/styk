export type HabitFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

export type HabitType = 'count' | 'quit';

export type CountUnit = 'time' | 'minute' | 'hour' | 'page' | 'kilometer' | 'meter';

export type HabitWindow = { start: string; end: string };

export type HabitLogStatus = 'success' | 'fail' | 'incomplete' | 'none';

export type MilestoneUnit = 'day' | 'month' | 'year';

export type HabitMilestone = {
	id: string;
	label: string;
	value: number;
	unit: MilestoneUnit;
	createdAt: string;
	endingAt: string;
	reachedAt: string;
};

export type HabitTarget =
	| {
			type: 'count';
			count: number;
			frequency: HabitFrequency;
			unit: CountUnit;
			currentStreak: number;
			longestStreak: number;
			milestones?: HabitMilestone[];
	  }
	| {
			type: 'quit';
			startDate: string;
			initialStartDate: string;
			frequency: 'daily';
			milestones?: HabitMilestone[];
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
	history: string; // e.g. "[<timestamp>, <timestamp>]"
	updatedAt: string;
};

export type HabitActivity = {
	id: string;
	name: string;
	color: string;
	type: HabitType;
	frequency: HabitFrequency;
	count: number;
	unit: string;
	currentValue: number;
	progress: number;
};

export type DailyMomentum = {
	score: number;
	completed: number;
	total: number;
	partiallyDone: number;
};
