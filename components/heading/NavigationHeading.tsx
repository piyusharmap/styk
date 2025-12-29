import { StyleProp, StyleSheet, TextStyle } from "react-native";
import UIText from "../ui/UIText";

const NavigationHeading = ({
	title,
	style,
}: {
	title: string;
	style?: StyleProp<TextStyle>;
}) => {
	return <UIText style={[styles.title, style]}>{title}</UIText>;
};

export default NavigationHeading;

const styles = StyleSheet.create({
	// text styles
	title: {
		padding: 10,
		fontSize: 18,
		fontWeight: "500",
	},
});
