export type ThemeMode = "light" | "dark";
export type TimerType = "stopwatch" | "countdown";
export type WeekStart = "sunday" | "monday";

export type UserPreferences = {
	themeMode: ThemeMode;
	weekStartDeafult: WeekStart;
	timerDefault: TimerType;
	notifications: boolean;
};
