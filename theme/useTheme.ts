import { Colors, Theme } from './colors';
import { useUserStore } from '../store/userStore';
import { ThemeMode } from '../types/userTypes';

const useTheme = (): {
	colors: Theme;
	mode: ThemeMode;
	setMode: (mode: ThemeMode) => void;
} => {
	const mode = useUserStore((s) => s.preferences.themeMode);
	const setPreferences = useUserStore((s) => s.setPreferences);

	const setMode = (mode: ThemeMode) => {
		setPreferences({ themeMode: mode });
	};

	const colors = Colors[mode];

	return { colors, mode, setMode };
};

export default useTheme;
