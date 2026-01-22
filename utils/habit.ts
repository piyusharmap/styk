export const parseToInteger = (value: string) => {
	return parseInt(value, 10);
};

export const getProgressStep = (count: number) => {
	if (count >= 1000) return 50;
	if (count >= 800) return 20;
	if (count >= 100) return 10;
	if (count >= 50) return 5;
	return 1;
};
