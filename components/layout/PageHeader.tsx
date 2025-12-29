import {
	View,
	StyleSheet,
	StyleProp,
	TextStyle,
	ViewStyle,
} from "react-native";
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

export const PageSubHeading = ({
	children,
	style,
}: {
	children: React.ReactNode;
	style?: StyleProp<TextStyle>;
}) => {
	return (
		<UIText style={[styles.subHeading, style]} isSecondary>
			{children}
		</UIText>
	);
};

export const PageHeader = ({
	children,
	style,
}: {
	children: React.ReactNode;
	style?: StyleProp<ViewStyle>;
}) => {
	return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
	// container styles
	container: {
		paddingHorizontal: 16,
		paddingTop: 10,
		paddingBottom: 16,
	},

	// text styles
	heading: {
		fontSize: 36,
		fontWeight: "500",
	},
	subHeading: {
		fontSize: 14,
		fontWeight: "500",
	},
});
