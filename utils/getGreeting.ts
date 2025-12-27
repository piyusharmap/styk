export const getGreeting = (): { greet: string; message: string } => {
	const hour = new Date().getHours();

	if (hour < 12) {
		return {
			greet: "Good Morning",
			message: "Let's start the day strong.",
		};
	}

	if (hour < 17) {
		return {
			greet: "Good Afternoon",
			message: "You're halfway there — keep going.",
		};
	}

	if (hour < 21) {
		return {
			greet: "Good Evening",
			message: "Great time to finish what you started.",
		};
	}

	return {
		greet: "Good Night",
		message: "One small win before the day ends.",
	};
};
