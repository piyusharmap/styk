import { Pressable, StyleSheet, View } from "react-native";
import useTheme from "../../theme/useTheme";
import UIText from "../ui/UIText";
import Icon from "../icon";

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
				<Icon name="Minus" size={16} color={colors.accent} />
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
				<Icon name="Plus" size={16} color={colors.accent} />
			</Pressable>
		</View>
	);
};

export default HabitCounter;

const styles = StyleSheet.create({
	// container styles
	habitCounter: {
		paddingHorizontal: 10,
		paddingVertical: 10,
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
		fontSize: 52,
		fontWeight: "500",
	},
});
