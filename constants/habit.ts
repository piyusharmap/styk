import { TypeOption } from "../screens/create/components/TypeSelector";
import { CountUnit, HabitFrequency, HabitType } from "../types/habitTypes";

export const ColorOptions = [
	"#2556A5",
	"#3B82F6",
	"#6366F1",
	"#8B5CF6",
	"#A855F7",
	"#EE2D36",
	"#EC4899",
	"#EC75B1",
	"#F59E0B",
	"#EEBE3A",
	"#22C55E",
	"#16A34A",
	"#75B318",
	"#84CC16",
];

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
		label: "Yearly",
		value: "yearly",
	},
];

export const TypeOptions: TypeOption[] = [
	{
		label: "Build",
		description: "Create a positive habit over time.",
		value: "count",
		icon: "trending-up-sharp",
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
		label: "Times",
		value: "times",
	},
	{
		label: "Hours",
		value: "hours",
	},
	{
		label: "Minutes",
		value: "minutes",
	},
];
