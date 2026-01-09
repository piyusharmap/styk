import { TypeOption } from '../components/habit/TypeSelector';
import { IconType } from '../components/icon';
import { CountUnit, HabitFrequency, HabitType } from '../types/habitTypes';
import { BUILD_TYPE_DESCRIPTION, QUIT_TYPE_DESCRIPTION } from './messages';

export const HabitTypeDetails: Record<
	HabitType,
	{ label: string; description: string; icon: IconType }
> = {
	count: {
		label: 'Build',
		description: BUILD_TYPE_DESCRIPTION,
		icon: 'TrendingUp',
	},
	quit: {
		label: 'Quit',
		description: QUIT_TYPE_DESCRIPTION,
		icon: 'Ban',
	},
};

export const MAX_NAME_LENGTH = 50;
export const MIN_NAME_LENGTH = 3;

export const ColorOptions = [
	'#EF4444',
	'#F97316',
	'#F59E0B',
	'#EAB308',
	'#84CC16',
	'#22C55E',
	'#10B981',
	'#14B8A6',
	'#06B6D4',
	'#0EA5E9',
	'#3B82F6',
	'#6366F1',
	'#8B5CF6',
	'#A855F7',
	'#D946EF',
	'#EC4899',
];

export const InitialTarget = {
	type: 'count' as HabitType,
	unit: 'time' as CountUnit,
	count: 1,
	frequency: 'daily' as HabitFrequency,
	startDate: new Date(),
	initialStartDate: new Date(),
	currentStreak: 0,
	longestStreak: 0,
};

export const FrequencyOptions: { label: string; value: HabitFrequency }[] = [
	{
		label: 'Daily',
		value: 'daily',
	},
	{
		label: 'Weekly',
		value: 'weekly',
	},
	{
		label: 'Monthly',
		value: 'monthly',
	},
	{
		label: 'Annually',
		value: 'yearly',
	},
];

export const TypeOptions: TypeOption[] = [
	{
		label: 'Build',
		description: BUILD_TYPE_DESCRIPTION,
		value: 'count',
		icon: 'TrendingUp',
	},
	{
		label: 'Quit',
		description: QUIT_TYPE_DESCRIPTION,
		value: 'quit',
		icon: 'Ban',
	},
];

export const UnitOptions: { label: string; value: CountUnit }[] = [
	{
		label: 'Time',
		value: 'time',
	},
	{
		label: 'Hour',
		value: 'hour',
	},
	{
		label: 'Minute',
		value: 'minute',
	},
	{
		label: 'Kilometer',
		value: 'kilometer',
	},
	{
		label: 'Meter',
		value: 'meter',
	},
];
