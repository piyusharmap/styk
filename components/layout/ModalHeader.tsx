import { View, StyleSheet, StyleProp, TextStyle } from "react-native";
import React from "react";
import UIText from "../ui/UIText";

export const ModalHeading = ({
	children,
	style,
}: {
	children: React.ReactNode;
	style?: StyleProp<TextStyle>;
}) => {
	return <UIText style={[styles.heading, style]}>{children}</UIText>;
};

export const ModalHeader = ({ children }: { children: React.ReactNode }) => {
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
		fontSize: 20,
		fontWeight: "600",
		textAlign: "center",
	},
});
