import { Text, Pressable, StyleSheet } from "react-native";
import useThemeColor from "../../../theme/useThemeColor";
import UIText from "../../../components/ui/UIText";

const FrequencyBadge = ({
	title,
	value,
	selectedValue,
	onPress,
}: {
	title: string;
	value: string;
	selectedValue: string;
	onPress: () => void;
}) => {
	const colors = useThemeColor();

	return (
		<Pressable
			style={({ pressed }) => [
				{
					backgroundColor: colors.foreground,
					borderColor: colors.border,
				},
				styles.badge,
				pressed && styles.badgePresseed,
				value === selectedValue && { borderColor: colors.secondary },
			]}
			onPress={onPress}
		>
			<UIText style={styles.badgeTitle}>{title}</UIText>
		</Pressable>
	);
};

export default FrequencyBadge;

const styles = StyleSheet.create({
	// container styles
	badge: {
		paddingVertical: 8,
		paddingHorizontal: 10,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "transparent",
	},
	badgePresseed: {
		opacity: 0.8,
	},

	// text styles
	badgeTitle: {
		fontSize: 14,
	},
});
