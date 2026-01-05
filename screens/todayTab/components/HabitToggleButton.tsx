import { Pressable, StyleSheet } from "react-native";
import { HabitTarget } from "../../../types/habitTypes";
import { useHabitStore } from "../../../store/habitStore";
import { getTodayString } from "../../../utils/time";
import Icon, { IconType } from "../../../components/icon";

const HabitToggleButton = ({
	habitId,
	target,
	color,
	isDisabled,
}: {
	habitId: string;
	target: HabitTarget;
	color: string;
	isDisabled?: boolean;
}) => {
	const icon: IconType = target.type === "count" ? "Plus" : "RotateCcw";

	const performHabitAction = useHabitStore((s) => s.performHabitAction);

	const handleMarkHabit = () => {
		performHabitAction(habitId, getTodayString(), "mark");
	};

	return (
		<Pressable
			style={({ pressed }) => [
				{
					backgroundColor: color + "50",
					borderColor: color,
				},
				styles.button,
				pressed && styles.buttonPressed,
				isDisabled && styles.buttonDisabled,
			]}
			onPress={handleMarkHabit}
		>
			<Icon name={icon} size={24} color={color} />
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
