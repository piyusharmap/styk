import { StyleSheet, View } from "react-native";
import UIText from "../../../components/ui/UIText";
import { getGreeting } from "../../../utils/getGreeting";
import useThemeColor from "../../../theme/useThemeColor";

const GreetingCard = () => {
	const colors = useThemeColor();
	const greeting = getGreeting();

	return (
		<View
			style={[
				{
					backgroundColor: colors.primary + "20",
				},
				styles.card,
			]}
		>
			<UIText style={styles.heading}>{greeting.greet}</UIText>
			<UIText style={styles.subHeading} isSecondary>
				{greeting.message}
			</UIText>
		</View>
	);
};

export default GreetingCard;

const styles = StyleSheet.create({
	// container styles
	card: {
		padding: 16,
		gap: 2,
		borderRadius: 10,
	},

	// text styles
	heading: {
		fontSize: 20,
		fontWeight: "600",
	},
	subHeading: {
		fontSize: 12,
	},
});
