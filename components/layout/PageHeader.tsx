import { View, StyleSheet, StyleProp, TextStyle } from "react-native";
import React from "react";
import UIText from "../ui/UIText";

export const PageHeading = ({
	children,
	style,
}: {
	children: React.ReactNode;
	style?: StyleProp<TextStyle>;
}) => {
	return <UIText style={[styles.heading, style]}>{children}</UIText>;
};

export const PageHeader = ({ children }: { children: React.ReactNode }) => {
	return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
	// container styles
	container: {
		paddingHorizontal: 20,
		paddingVertical: 16,
		gap: 2,
	},

	// text styles
	heading: {
		fontSize: 24,
		fontWeight: "600",
	},
});
