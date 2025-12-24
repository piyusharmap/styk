import { View, StyleSheet, Pressable } from "react-native";
import UIText from "../../../components/ui/UIText";
import { Habit } from "../../../types/habitTypes";
import { useHabitStore } from "../../../store/habitStore";
import { Ionicons } from "@expo/vector-icons";

const TodayListCard = ({ habit }: { habit: Habit }) => {
	const toggleHabit = useHabitStore((s) => s.toggleHabitForToday);
	const streak = useHabitStore((s) => s.getStreak(habit.id));
	const isDone = useHabitStore((s) => s.isHabitDoneToday(habit.id));

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
			<View style={styles.detailsContainer}>
				<UIText style={styles.habitName}>{habit.name}</UIText>
				<UIText style={styles.habitStreak}>
					<Ionicons name="flame" size={14} /> {streak}
				</UIText>
			</View>

			<View style={styles.actionContainer}>
				<Pressable onPress={() => toggleHabit(habit.id)}>
					<Ionicons
						name={isDone ? "checkbox" : "checkbox-outline"}
						size={32}
						color={habit.color}
					/>
				</Pressable>
			</View>
		</View>
	);
};

export default TodayListCard;

const styles = StyleSheet.create({
	// container styles
	habitCard: {
		paddingHorizontal: 16,
		paddingVertical: 12,
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderRadius: 8,
		gap: 2,
	},
	detailsContainer: {
		flexGrow: 1,
		gap: 2,
	},
	actionContainer: {
		justifyContent: "center",
		alignItems: "center",
	},

	// text styles
	habitName: {
		fontSize: 16,
		fontWeight: "600",
	},
	habitStreak: {
		fontSize: 12,
	},
});
