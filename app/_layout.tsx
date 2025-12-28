import React from "react";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import UIView from "../components/ui/UIView";
import useThemeColor from "../theme/useThemeColor";
import { StyleSheet } from "react-native";
import { useAppFonts } from "../fonts/useFonts";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
	const colors = useThemeColor();

	const [loaded] = useAppFonts();

	if (!loaded) return null;

	SplashScreen.hideAsync();

	return (
		<>
			<UIView style={styles.container}>
				<StatusBar style="auto" />

				<Stack
					screenOptions={{
						headerStyle: { backgroundColor: colors.navBackground },
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
							animation: "default",
						}}
					/>

					<Stack.Screen
						name="create/page"
						options={{
							title: "Create Habit",
							headerShown: true,
							animation: "default",
						}}
					/>

					<Stack.Screen
						name="habit/[id]"
						options={{
							title: "Habit Details",
							headerShown: true,
							animation: "slide_from_right",
						}}
					/>
				</Stack>
			</UIView>
		</>
	);
};

export default RootLayout;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
	},
});
