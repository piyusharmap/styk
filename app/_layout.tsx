import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import UIView from "../components/ui/UIView";
import useThemeColor from "../theme/useThemeColor";
import { StyleSheet } from "react-native";

const RootLayout = () => {
	const colors = useThemeColor();

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
						options={{ title: "", headerShown: true }}
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
