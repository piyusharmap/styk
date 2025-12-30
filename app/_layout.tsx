import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import UIView from "../components/ui/UIView";
import useThemeColor from "../theme/useThemeColor";
import { StyleSheet } from "react-native";
import { useAppFonts } from "../fonts/useFonts";
import NavigationHeading from "../components/heading/NavigationHeading";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";
import NavigationBackButton from "../components/layout/NavigationBackButton";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
	const colors = useThemeColor();
	const theme = useTheme();

	const [loaded] = useAppFonts();

	SplashScreen.hideAsync();

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
