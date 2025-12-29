import { Theme } from "./colors";
import { useTheme } from "../contexts/ThemeContext";

const useThemeColor = (): Theme => {
	const { theme } = useTheme();

	return theme;
};

export default useThemeColor;
