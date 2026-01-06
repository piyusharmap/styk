import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import UIView from "../components/ui/UIView";
import useTheme from "../theme/useTheme";
import { StyleSheet } from "react-native";
import { useAppFonts } from "../fonts/useFonts";
import NavigationHeading from "../components/heading/NavigationHeading";
import NavigationBackButton from "../components/layout/NavigationBackButton";
import { SQLiteProvider } from "expo-sqlite";
import { initializeDb } from "../db";
import { useHabitStore } from "../store/habitStore";
import { useEffect } from "react";
import { DB_NAME } from "../constants/db";
import { useUserStore } from "../store/userStore";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
	initialRouteName: "index",
};

const RootLayout = () => {
	const { colors } = useTheme();
	const mode = useUserStore((s) => s.preferences.themeMode);

	const [loaded] = useAppFonts();

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) return null;

	return (
		<UIView style={styles.container}>
			<StatusBar style={mode === "dark" ? "light" : "dark"} />

			<Stack
				screenOptions={{
					headerLeft: ({ tintColor, canGoBack }) => {
						if (!canGoBack) return;

						return <NavigationBackButton tint={tintColor} />;
					},
					headerBackVisible: false,
					headerStyle: {
						backgroundColor: colors.navBackground,
					},
					headerTintColor: colors.navText,
					headerTitleAlign: "center",
					headerShadowVisible: false,
				}}
			>
				{/* <Stack.Screen
					name="index"
					options={{
						title: "",
						headerShown: false,
						animation: "fade",
					}}
				/> */}

				<Stack.Screen
					name="(tabs)"
					options={{
						title: "",
						headerShown: false,
						animation: "fade",
					}}
				/>

				<Stack.Screen
					name="habit/[id]"
					options={{
						title: "",
						headerTitle: (props) => {
							return (
								<NavigationHeading
									title="Habit Details"
									tint={props.tintColor}
								/>
							);
						},
						headerShown: true,
						animation: "fade",
					}}
				/>

				<Stack.Screen
					name="edit/[id]"
					options={{
						title: "",
						headerTitle: (props) => {
							return (
								<NavigationHeading
									title="Update Habit"
									tint={props.tintColor}
								/>
							);
						},
						headerShown: true,
						animation: "fade",
					}}
				/>

				<Stack.Screen
					name="create/index"
					options={{
						title: "",
						headerTitle: (props) => {
							return (
								<NavigationHeading
									title="Create Habit"
									tint={props.tintColor}
								/>
							);
						},
						headerShown: true,
						animation: "fade",
					}}
				/>

				<Stack.Screen
					name="archive/index"
					options={{
						title: "",
						headerTitle: (props) => {
							return (
								<NavigationHeading
									title="Archived Habits"
									tint={props.tintColor}
								/>
							);
						},
						headerShown: true,
						animation: "fade",
					}}
				/>

				<Stack.Screen
					name="+not-found"
					options={{
						title: "",
						headerShown: true,
						animation: "fade",
					}}
				/>
			</Stack>
		</UIView>
	);
};

const DBBootstrap = ({ children }: { children: React.ReactNode }) => {
	const loadFromDB = useHabitStore((s) => s.loadFromDB);

	useEffect(() => {
		loadFromDB();
	}, []);

	return <>{children}</>;
};

const App = () => {
	return (
		<SQLiteProvider
			databaseName={DB_NAME}
			onInit={initializeDb}
			useSuspense
		>
			<DBBootstrap>
				<RootLayout />
			</DBBootstrap>
		</SQLiteProvider>
	);
};

export default App;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
	},
});
