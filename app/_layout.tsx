import React from "react";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import UIView from "../components/ui/UIView";
import useThemeColor from "../theme/useThemeColor";
import { StyleSheet } from "react-native";
import { useAppFonts } from "../fonts/useFonts";
import NavigationHeading from "../components/heading/NavigationHeading";
import { ThemeProvider } from "../contexts/ThemeContext";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
	const colors = useThemeColor();

	const [loaded] = useAppFonts();

	SplashScreen.hideAsync();

	if (!loaded) return null;

	return (
		<UIView style={styles.container}>
			<StatusBar style="auto" />

			<Stack
				screenOptions={{
					headerStyle: {
						backgroundColor: colors.navBackground,
					},
					headerShadowVisible: false,
					headerTintColor: colors.navText,
				}}
			>
				<Stack.Screen
					name="(tabs)"
					options={{ title: "", headerShown: false }}
				/>

				<Stack.Screen
					name="(auth)"
					options={{
						title: "",
						headerShown: true,
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
					}}
				/>
			</Stack>
		</UIView>
	);
};

const App = () => {
	return (
		<ThemeProvider>
			<RootLayout />
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
