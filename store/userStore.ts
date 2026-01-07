import { create } from 'zustand';
import { UserPreferences } from '../types/userTypes';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserStore = {
	preferences: UserPreferences;

	setPreferences: (preferences: Partial<UserPreferences>) => void;
	resetPreferences: () => void;
};

const defaultPreferences: UserPreferences = {
	themeMode: 'light',
	weekStartDeafult: 'monday',
	timerDefault: 'stopwatch',
	notifications: true,
};

export const useUserStore = create<UserStore>()(
	persist(
		(set) => ({
			preferences: defaultPreferences,

			setPreferences: (prefs) =>
				set((state) => ({
					preferences: {
						...state.preferences,
						...prefs,
					},
				})),

			resetPreferences: () =>
				set({
					preferences: defaultPreferences,
				}),
		}),
		{
			name: 'user-store',
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
