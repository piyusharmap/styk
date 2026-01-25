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

export const hexToRgba = (hex: string, alpha: number) => {
	const sanitized = hex.replace('#', '');

	const bigint = parseInt(sanitized, 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;

	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
