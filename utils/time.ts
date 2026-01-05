export const toDateString = (date: Date) => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
};

export const fromDateString = (dateString: string): Date => {
	if (!dateString) return new Date();

	const cleanDate = dateString.split("T")[0];
	const [year, month, day] = cleanDate.split("-").map(Number);

	return new Date(year, month - 1, day, 12, 0, 0);
};

export const getMaxDate = (a: string, b: string) => (a > b ? a : b);

export const getTodayString = (): string => {
	const today = new Date();
	return toDateString(today);
};
