import { useColorScheme } from "react-native";
import { Colors, Theme } from "./colors";

const useThemeColor = (): Theme => {
	const colorScheme = useColorScheme();
	const themeColors = Colors[colorScheme as string] ?? Colors.light;

	return themeColors;
};

export default useThemeColor;
