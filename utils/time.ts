export const toDateString = (date: Date) => {
	return date.toISOString().split("T")[0];
};

export const getMaxDate = (a: string, b: string) => (a > b ? a : b);

export const getTodayString = (): string => {
	const today = new Date();
	return toDateString(today);
};
