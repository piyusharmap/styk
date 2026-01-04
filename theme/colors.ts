export type Theme = {
	primary?: string;
	secondary?: string;
	accent?: string;
	danger?: string;
	success?: string;
	info?: string;

	background?: string;
	foreground?: string;
	border?: string;

	text?: string;
	textSecondary?: string;

	button?: string;

	navBackground?: string;
	navText?: string;

	tabBackground?: string;
	tabIconActive?: string;
	tabIconInactive?: string;

	neutral?: string;

	neutralWhite?: string;
	neutralBlack?: string;
};

export const Colors: Record<string, Theme> = {
	light: {
		primary: "#03929C",
		secondary: "#01AFBA",
		accent: "#EF9343",

		danger: "#CE4343",
		success: "#10B13B",
		info: "#C5A205",

		background: "#F9F9F9",
		foreground: "#E8E8E8",
		border: "#D9D9D9",

		text: "#0E0E0E",
		textSecondary: "#4D4D4D",

		button: "#CACACA",

		navBackground: "#F9F9F9",
		navText: "#0E0E0E",

		tabBackground: "#FEFEFE",
		tabIconActive: "#000000",
		tabIconInactive: "#4D4D4D",

		neutral: "#070707",

		neutralWhite: "#FFFFFF",
		neutralBlack: "#000000",
	},

	dark: {
		primary: "#00B7B5",
		secondary: "#056F77",
		accent: "#D76D11",

		danger: "#D83030",
		success: "#05CA3A",
		info: "#E9BA00",

		background: "#101010",
		foreground: "#222222",
		border: "#3D3D3D",

		text: "#F2F2F2",
		textSecondary: "#D4D4D4",

		button: "#444343",

		navBackground: "#0E0E0E",
		navText: "#F2F2F2",

		tabBackground: "#0A0A0A",
		tabIconActive: "#FFFFFF",
		tabIconInactive: "#AAAAAA",

		neutral: "#F3F3F3",

		neutralWhite: "#FFFFFF",
		neutralBlack: "#000000",
	},
};
