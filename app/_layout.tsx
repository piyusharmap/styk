import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import UIView from "../components/ui/UIView";
import useThemeColor from "../theme/useThemeColor";
import { StyleSheet } from "react-native";
import { useAppFonts } from "../fonts/useFonts";
import NavigationHeading from "../components/heading/NavigationHeading";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import NavigationBackButton from "../components/layout/NavigationBackButton";
import { SQLiteProvider } from "expo-sqlite";
import { initializeDb } from "../db";
import { useHabitStore } from "../store/habitStore";
import { useEffect } from "react";
import { DB_NAME } from "../constants/db";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
	const colors = useThemeColor();
	const theme = useTheme();

	const [loaded] = useAppFonts();

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) return null;

	return (
		<UIView style={styles.container}>
			<StatusBar style={theme.mode === "dark" ? "light" : "dark"} />

			<Stack
				screenOptions={{
					headerLeft: ({ canGoBack }) => {
						if (!canGoBack) return;

						return <NavigationBackButton />;
					},
					headerBackVisible: false,
					headerStyle: {
						backgroundColor: colors.navBackground,
					},
					headerTitleAlign: "center",
					headerShadowVisible: false,
				}}
			>
				<Stack.Screen
					name="(tabs)"
					options={{
						title: "",
						headerShown: false,
						animation: "fade",
					}}
				/>

				<Stack.Screen
					name="(auth)"
					options={{
						title: "",
						headerShown: true,
						animation: "fade",
					}}
				/>

				<Stack.Screen
					name="create/page"
					options={{
						title: "",
						headerTitle: (props) => {
							return <NavigationHeading title="Create Habit" />;
						},
						headerShown: true,
						animation: "fade",
					}}
				/>

				<Stack.Screen
					name="habit/[id]"
					options={{
						title: "",
						headerTitle: (props) => {
							return <NavigationHeading title="Habit Details" />;
						},
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
		<ThemeProvider>
			<SQLiteProvider
				databaseName={DB_NAME}
				onInit={initializeDb}
				useSuspense
			>
				<DBBootstrap>
					<RootLayout />
				</DBBootstrap>
			</SQLiteProvider>
		</ThemeProvider>
	);
};

export default App;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
	},
});
