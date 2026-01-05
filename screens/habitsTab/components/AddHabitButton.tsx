import { PressableProps, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useTheme from "../../../theme/useTheme";

const AddHabitButton = ({ ...props }: PressableProps) => {
	const { colors } = useTheme();

	return (
		<Pressable
			style={({ pressed }) => [
				{
					backgroundColor: colors.secondary,
				},
				styles.button,
				pressed && styles.buttonPressed,
			]}
			{...props}
		>
			<Ionicons name="add" size={32} color={colors.neutralWhite} />
		</Pressable>
	);
};

export default AddHabitButton;

const styles = StyleSheet.create({
	// container styles
	button: {
		height: 64,
		width: 64,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 32,

		// android shadow
		elevation: 2,

		// ios shadow
		shadowColor: "#000000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.4,
		shadowRadius: 1,
	},
	buttonPressed: {
		transform: [{ scale: 0.95 }],
	},
	buttonDisabled: {
		opacity: 0.5,
	},
});
