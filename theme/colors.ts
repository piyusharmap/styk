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

	navBackground?: string;
	navText?: string;

	tabBackground?: string;
	tabIconActive?: string;
	tabIconInactive?: string;

	neutral?: string;
	neutralInverted?: string;

	neutralWhite?: string;
	neutralBlack?: string;
};

export const Colors: Record<string, Theme> = {
	light: {
		primary: '#03929C',
		secondary: '#01AFBA',
		accent: '#BE6A1B',

		danger: '#CE4343',
		success: '#10B13B',
		info: '#C5A205',

		background: '#F9F9F9',
		foreground: '#EEEEEE',
		border: '#D9D9D9',

		text: '#0E0E0E',
		textSecondary: '#4D4D4D',

		navBackground: '#FEFEFE',
		navText: '#0E0E0E',

		tabBackground: '#FEFEFE',
		tabIconActive: '#000000',
		tabIconInactive: '#333333',

		neutral: '#1E1E1E',
		neutralInverted: '#F2F2F2',

		neutralWhite: '#FFFFFF',
		neutralBlack: '#000000',
	},

	dark: {
		primary: '#00B7B5',
		secondary: '#056F77',
		accent: '#E69040',

		danger: '#D83030',
		success: '#05CA3A',
		info: '#E9BA00',

		background: '#101010',
		foreground: '#222222',
		border: '#3D3D3D',

		text: '#F2F2F2',
		textSecondary: '#D4D4D4',

		navBackground: '#0A0A0A',
		navText: '#F2F2F2',

		tabBackground: '#0A0A0A',
		tabIconActive: '#FFFFFF',
		tabIconInactive: '#D4D4D4',

		neutral: '#F2F2F2',
		neutralInverted: '#1E1E1E',

		neutralWhite: '#FFFFFF',
		neutralBlack: '#000000',
	},
};
