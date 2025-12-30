import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Habit } from "../../../types/habitTypes";
import { IonIconType } from "../../../types/iconTypes";
import { useHabitStore } from "../../../store/habitStore";

const HabitToggleButton = ({
	habit,
	isDisabled,
}: {
	habit: Habit;
	isDisabled: boolean;
}) => {
	const icon: IonIconType = habit.target.type === "count" ? "add" : "refresh";

	const markHabitForToday = useHabitStore((s) => s.markHabitForToday);
	const handleMarkHabit = () => {
		markHabitForToday(habit.id);
	};

	return (
		<Pressable
			style={({ pressed }) => [
				{
					backgroundColor: habit.color + "20",
					borderColor: habit.color,
				},
				styles.button,
				pressed && styles.buttonPressed,
				isDisabled && styles.buttonDisabled,
			]}
			onPress={handleMarkHabit}
			disabled={isDisabled}
		>
			<Ionicons name={icon} size={24} color={habit.color} />
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
		borderRadius: 6,
		borderWidth: 1,
		borderStyle: "dashed",
	},
	buttonPressed: {
		transform: [{ scale: 0.95 }],
	},
	buttonDisabled: {
		opacity: 0.5,
	},
});
