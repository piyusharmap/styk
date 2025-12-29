import { PressableProps, Pressable, StyleSheet } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { Ionicons } from "@expo/vector-icons";
import useThemeColor from "../../../theme/useThemeColor";

const AddHabitButton = ({
	onPress,
}: PressableProps & { onPress: Dispatch<SetStateAction<boolean>> }) => {
	const colors = useThemeColor();

	return (
		<Pressable
			style={({ pressed }) => [
				{
					backgroundColor: colors.secondary,
					borderColor: colors.primary,
				},
				styles.button,
				pressed && styles.buttonPressed,
			]}
			onPress={onPress}
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
		borderRadius: "100%",
		borderWidth: 1,
	},
	buttonPressed: {
		transform: [{ scale: 0.95 }],
	},
	buttonDisabled: {
		opacity: 0.5,
	},
});
