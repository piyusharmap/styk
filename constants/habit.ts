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
	// blue
	'#3B82F6',
	'#3B67E0',
	'#A5B4FC',

	// green
	'#22C55E',
	'#2D9756',
	'#65A30D',

	// red
	'#E64545',
	'#C94949',
	'#BD2525',

	// yellow/orange
	'#EEBE3A',
	'#F59E0B',
	'#F19021',
	'#D97706',

	// purple/pink
	'#A855F7',
	'#8843D6',
	'#F9A8D4',
];

export const InitialTarget = {
	type: 'count' as HabitType,
	unit: 'time' as CountUnit,
	count: 1,
	frequency: 'daily' as HabitFrequency,
	startDate: new Date(),
	initialStartDate: new Date(),
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
