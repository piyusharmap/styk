import { Colors, Theme } from "./colors";
import { useUserStore } from "../store/userStore";

const useThemeColor = (): Theme => {
	const mode = useUserStore((s) => s.preferences.themeMode);

	const theme = Colors[mode];

	return theme;
};

export default useThemeColor;
