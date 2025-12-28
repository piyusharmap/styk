import { useFonts } from "expo-font";

export const useAppFonts = () =>
	useFonts({
		"DMSans-Regular": require("../assets/fonts/DMSans-Regular.ttf"),
		"DMSans-Italic": require("../assets/fonts/DMSans-Italic.ttf"),

		"DMSans-Light": require("../assets/fonts/DMSans-Light.ttf"),
		"DMSans-LightItalic": require("../assets/fonts/DMSans-LightItalic.ttf"),

		"DMSans-Medium": require("../assets/fonts/DMSans-Medium.ttf"),
		"DMSans-MediumItalic": require("../assets/fonts/DMSans-MediumItalic.ttf"),

		"DMSans-SemiBold": require("../assets/fonts/DMSans-SemiBold.ttf"),
		"DMSans-SemiBoldItalic": require("../assets/fonts/DMSans-SemiBoldItalic.ttf"),

		"DMSans-Bold": require("../assets/fonts/DMSans-Bold.ttf"),
		"DMSans-BoldItalic": require("../assets/fonts/DMSans-BoldItalic.ttf"),

		"DMSans-ExtraBold": require("../assets/fonts/DMSans-ExtraBold.ttf"),
		"DMSans-ExtraBoldItalic": require("../assets/fonts/DMSans-ExtraBoldItalic.ttf"),
	});
