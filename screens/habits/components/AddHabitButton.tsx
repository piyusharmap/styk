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
				{ backgroundColor: colors.primary },
				styles.button,
				pressed && styles.buttonPressed,
			]}
			onPress={onPress}
		>
			<Ionicons name="add-sharp" size={32} color={colors.background} />
		</Pressable>
	);
};

export default AddHabitButton;

const styles = StyleSheet.create({
	// container styles
	button: {
		height: 60,
		width: 60,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 30,
	},
	buttonPressed: {
		opacity: 0.8,
	},
	buttonDisabled: {
		opacity: 0.5,
	},
});
