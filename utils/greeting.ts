import {
	AFTERNOON_GREET_MSG,
	EVENING_GREET_MSG,
	MORNING_GREET_MSG,
	NIGHT_GREET_MSG,
} from '../constants/messages';

export const getGreeting = (): { message: string; emoji: string } => {
	const hour = new Date().getHours();

	if (hour < 5) return { message: NIGHT_GREET_MSG, emoji: '🌙' };

	if (hour < 12) return { message: MORNING_GREET_MSG, emoji: '👋' };

	if (hour < 17) return { message: AFTERNOON_GREET_MSG, emoji: '🌞' };

	if (hour < 21) return { message: EVENING_GREET_MSG, emoji: '🍵' };

	return { message: NIGHT_GREET_MSG, emoji: '🥱' };
};
