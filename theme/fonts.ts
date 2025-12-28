export type FontType = "normal" | "italic";

export const DM_SANS: Record<FontType, Record<string, string>> = {
	normal: {
		"300": "DMSans-Light",
		"400": "DMSans-Regular",
		"500": "DMSans-Medium",
		"600": "DMSans-SemiBold",
		"700": "DMSans-Bold",
		"800": "DMSans-ExtraBold",
	},
	italic: {
		"300": "DMSans-LightItalic",
		"400": "DMSans-Italic",
		"500": "DMSans-MediumItalic",
		"600": "DMSans-SemiBoldItalic",
		"700": "DMSans-BoldItalic",
		"800": "DMSans-ExtraBoldItalic",
	},
};
