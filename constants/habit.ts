import { TypeOption } from "../screens/create/components/TypeSelector";
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

export const ColorOptions = [
	"#3363AF",
	"#3B82F6",
	"#6366F1",
	"#8B5CF6",
	"#A855F7",
	"#D4323A",
	"#E64545",
	"#EC69AB",
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
