import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Habit } from "../../../types/habitTypes";
import { IonIconType } from "../../../types/iconTypes";
import { useHabitStore } from "../../../store/habitStore";

const HabitToggleButton = ({
	habit,
	isCompleted,
}: {
	habit: Habit;
	isCompleted: boolean;
}) => {
	const markHabitForToday = useHabitStore((s) => s.markHabitForToday);

	const icon: IonIconType = habit.target.type === "count" ? "add" : "refresh";

	const handleMarkHabit = () => {
		markHabitForToday(habit.id);
	};

	return (
		<Pressable
			style={({ pressed }) => [
				{
					backgroundColor: habit.color + "50",
					borderColor: habit.color,
					borderStyle: isCompleted ? "solid" : "dashed",
				},
				styles.button,
				pressed && styles.buttonPressed,
				isCompleted && styles.buttonDisabled,
			]}
			// onPress={handleMarkHabit}
			disabled={isCompleted}
		>
			{isCompleted ? (
				<Ionicons name="checkmark" size={20} color={habit.color} />
			) : (
				<Ionicons name={icon} size={20} color={habit.color} />
			)}
		</Pressable>
	);
};

export default HabitToggleButton;

const styles = StyleSheet.create({
	// container styles
	button: {
		height: 40,
		width: 40,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 10,
		borderWidth: 1,
	},
	buttonPressed: {
		transform: [{ scale: 0.95 }],
	},
	buttonDisabled: {
		opacity: 0.5,
	},
});
