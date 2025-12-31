import { createContext, useContext, useState, ReactNode } from "react";
import { Colors, Theme } from "../theme/colors";
import { ThemeMode } from "../types/userTypes";
import { useUserStore } from "../store/userStore";

interface ThemeContextType {
	theme: Theme;
	mode: ThemeMode;
	setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const mode = useUserStore((s) => s.preferences.themeMode);
	const setPreferences = useUserStore((s) => s.setPreferences);

	const theme = Colors[mode];

	const setMode = (mode: ThemeMode) => {
		setPreferences({ themeMode: mode });
	};

	return (
		<ThemeContext.Provider value={{ theme, mode, setMode }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = (): ThemeContextType => {
	const context = useContext(ThemeContext);
	if (!context) throw new Error("useTheme must be used within ThemeProvider");
	return context;
};
