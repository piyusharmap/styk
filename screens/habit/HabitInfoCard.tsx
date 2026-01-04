import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import useTheme from "../../theme/useTheme";
import UIText from "../../components/ui/UIText";

const HabitInfoCard = ({
	heading,
	children,
	style,
}: {
	heading?: string;
	children: React.ReactNode;
	style?: StyleProp<ViewStyle>;
}) => {
	const { colors } = useTheme();

	return (
		<View
			style={[
				{
					backgroundColor: colors.foreground + "80",
				},
				styles.card,
				style,
			]}
		>
			{heading && (
				<UIText style={styles.heading} isSecondary>
					{heading}
				</UIText>
			)}

			{children}
		</View>
	);
};

export default HabitInfoCard;

const styles = StyleSheet.create({
	// container styles
	card: {
		padding: 12,
		gap: 4,
		borderRadius: 10,
	},

	// text styles
	heading: {
		fontSize: 12,
	},
});
