import {
	AFTERNOON_GREET_MSG,
	EVENING_GREET_MSG,
	MORNING_GREET_MSG,
	NIGHT_GREET_MSG,
} from '../constants/messages';

export const getGreeting = (): string => {
	const hour = new Date().getHours();

	if (hour < 12) return MORNING_GREET_MSG;

	if (hour < 18) return AFTERNOON_GREET_MSG;

	if (hour < 22) return EVENING_GREET_MSG;

	return NIGHT_GREET_MSG;
};
