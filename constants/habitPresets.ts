type HabitPreset = {
	name: string;

	target: {
		type: "count" | "quit";
		frequency: "daily" | "weekly";
		count?: number;
		unit?: number;
	};

	color: string;
};

export const PresetOptions = [
	{
		type: "count",
		label: "Build",
		description: "Habits you want to do more of",
		habits: [
			{
				name: "Go for a walk",
				target: {
					type: "count",
					frequency: "daily",
					count: 1,
				},
				color: "#4CAF50",
			},
			{
				name: "Drink water",
				target: {
					type: "count",
					frequency: "daily",
					count: 8,
				},
				color: "#2196F3",
			},
			{
				name: "Read",
				target: {
					type: "count",
					frequency: "daily",
					count: 10,
				},
				color: "#9C27B0",
			},
			{
				name: "Exercise",
				target: {
					type: "count",
					frequency: "weekly",
					count: 3,
				},
				color: "#FF9800",
			},
			{
				name: "Practice coding",
				target: {
					type: "count",
					frequency: "daily",
					count: 1,
				},
				color: "#3F51B5",
			},
		],
	},
	{
		type: "quit",
		label: "Quit",
		description: "Habits you want to avoid",
		habits: [
			{
				name: "Smoking",
				target: {
					type: "quit",
					frequency: "daily",
				},
				color: "#F44336",
			},
			{
				name: "Junk food",
				target: {
					type: "quit",
					frequency: "daily",
				},
				color: "#E91E63",
			},
			{
				name: "Social media overuse",
				target: {
					type: "quit",
					frequency: "daily",
				},
				color: "#607D8B",
			},
			{
				name: "Late-night snacking",
				target: {
					type: "quit",
					frequency: "daily",
				},
				color: "#795548",
			},
		],
	},
];
