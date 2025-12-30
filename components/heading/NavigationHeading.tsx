import { StyleProp, StyleSheet, TextStyle } from "react-native";
import UIText from "../ui/UIText";
import useThemeColor from "../../theme/useThemeColor";

const NavigationHeading = ({
	title,
	style,
}: {
	title: string;
	style?: StyleProp<TextStyle>;
}) => {
	const colors = useThemeColor();

	return (
		<UIText style={[{ color: colors.navText }, styles.title, style]}>
			{title}
		</UIText>
	);
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
