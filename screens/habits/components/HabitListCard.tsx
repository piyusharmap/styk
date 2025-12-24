import { View, StyleSheet } from "react-native";
import UIText from "../../../components/ui/UIText";
import { Habit } from "../../../types/habitTypes";

const HabitListCard = ({ habit }: { habit: Habit }) => {
	return (
		<View
			style={[
				{
					backgroundColor: habit.color + "55",
					borderColor: habit.color,
				},
				styles.habitCard,
			]}
		>
			<UIText style={styles.habitName}>{habit.name}</UIText>
			<UIText style={styles.habitFreq} isSecondary>
				Occurs {habit.frequency}
			</UIText>
		</View>
	);
};

export default HabitListCard;

const styles = StyleSheet.create({
	// container styles
	habitCard: {
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderWidth: 1,
		borderRadius: 8,
		gap: 2,
	},

	// text styles
	habitName: {
		fontSize: 16,
		fontWeight: "600",
	},
	habitFreq: {
		fontSize: 12,
	},
});
