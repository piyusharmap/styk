export const getGreeting = () => {
	const hour = new Date().getHours();

	if (hour < 12) return "Let's start the day";
	if (hour < 17) return "Halfway through the day";
	if (hour < 21) return "Winding down";
	return "Before the day ends";
};
