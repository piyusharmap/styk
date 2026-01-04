import { TypeOption } from "../components/habit/TypeSelector";
import { CountUnit, HabitFrequency, HabitType } from "../types/habitTypes";
import { IonIconType } from "../types/iconTypes";

export const HabitTypeDetails: Record<
	HabitType,
	{ label: string; icon: IonIconType }
> = {
	count: {
		label: "Build",
		icon: "trending-up",
	},
	quit: {
		label: "Quit",
		icon: "ban",
	},
};

export const MAX_NAME_LENGTH = 50;
export const MIN_NAME_LENGTH = 3;

export const ColorOptions = [
	// blue
	"#3B82F6",
	"#1E3A8A",
	"#A5B4FC",

	// green
	"#22C55E",
	"#166534",
	"#65A30D",

	// red
	"#E64545",
	"#BD2525",
	"#991B1B",

	// yellow/orange
	"#F59E0B",
	"#D97706",
	"#FEF08A",
	"#EEBE3A",

	// purple/pink
	"#A855F7",
	"#7E32D4",
	"#F9A8D4",
];

export const InitialTarget = {
	type: "count" as HabitType,
	unit: "time" as CountUnit,
	count: 1,
	frequency: "daily" as HabitFrequency,
	startDate: new Date(),
	initialStartDate: new Date(),
};

export const FrequencyOptions: { label: string; value: HabitFrequency }[] = [
	{
		label: "Daily",
		value: "daily",
	},
	{
		label: "Weekly",
		value: "weekly",
	},
	{
		label: "Monthly",
		value: "monthly",
	},
	{
		label: "Annually",
		value: "yearly",
	},
];

export const TypeOptions: TypeOption[] = [
	{
		label: "Build",
		description: "Create a positive habit over time.",
		value: "count",
		icon: "trending-up",
	},
	{
		label: "Quit",
		description: "Reduce or eliminate an unwanted habit.",
		value: "quit",
		icon: "ban",
	},
];

export const UnitOptions: { label: string; value: CountUnit }[] = [
	{
		label: "Time",
		value: "time",
	},
	{
		label: "Hour",
		value: "hour",
	},
	{
		label: "Minute",
		value: "minute",
	},
	{
		label: "Kilometer",
		value: "kilometer",
	},
	{
		label: "Meter",
		value: "meter",
	},
];
