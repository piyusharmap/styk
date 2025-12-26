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
		paddingHorizontal: 16,
		paddingVertical: 16,
	},

	// text styles
	heading: {
		fontSize: 20,
		fontWeight: "600",
	},
});
