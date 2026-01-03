import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useTheme from "../../theme/useTheme";
import UIText from "../ui/UIText";

const HabitCounter = ({
	count,
	onPress,
}: {
	count: number;
	onPress: (count: number) => void;
}) => {
	const { colors } = useTheme();

	const handleCountIncrement = () => {
		onPress(count + 1);
	};

	const handleCountDecrement = () => {
		if (count === 1) return;
		onPress(count - 1);
	};

	return (
		<View
			style={[
				{
					borderColor: colors.border,
				},
				styles.habitCounter,
			]}
		>
			<Pressable
				style={({ pressed }) => [
					{
						backgroundColor: colors.foreground + "80",
						borderColor: colors.border,
					},
					styles.countButton,
					pressed && { borderColor: colors.neutral },
				]}
				onPress={handleCountDecrement}
			>
				<Ionicons name="chevron-down" size={16} color={colors.accent} />
			</Pressable>

			<UIText style={styles.count}>{count}</UIText>

			<Pressable
				style={({ pressed }) => [
					{
						backgroundColor: colors.foreground + "80",
						borderColor: colors.border,
					},
					styles.countButton,
					pressed && { borderColor: colors.neutral },
				]}
				onPress={handleCountIncrement}
			>
				<Ionicons name="chevron-up" size={16} color={colors.accent} />
			</Pressable>
		</View>
	);
};

export default HabitCounter;

const styles = StyleSheet.create({
	// container styles
	habitCounter: {
		paddingHorizontal: 20,
		paddingVertical: 20,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 20,
		borderWidth: 1.5,
		borderStyle: "dashed",
		borderRadius: 10,
	},
	countButton: {
		height: 40,
		width: 40,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 20,
		borderWidth: 1,
	},

	// text styles
	count: {
		fontSize: 44,
		fontWeight: "600",
	},
});
