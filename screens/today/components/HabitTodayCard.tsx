import { View, StyleSheet, Text } from "react-native";
import UIText from "../../../components/ui/UIText";
import { Habit } from "../../../types/habitTypes";
import useThemeColor from "../../../theme/useThemeColor";
import HabitToggleButton from "./HabitToggleButton";

const HabitTodayCard = ({ habit }: { habit: Habit }) => {
	const colors = useThemeColor();

	return (
		<View
			style={[
				{
					backgroundColor: habit.color + "20",
					borderColor: habit.color,
				},
				styles.habitCard,
			]}
		>
			<View style={styles.habitInfo}>
				<UIText style={styles.habitName}>{habit.name}</UIText>

				<View style={styles.habitDetails}>
					{habit.target.type === "count" ? (
						<>
							<UIText style={styles.habitDetail} isSecondary>
								Pending:{" "}
								<Text style={{ color: colors.text }}>
									0/{habit.target.count} {habit.target.unit}
								</Text>
							</UIText>
						</>
					) : (
						<>
							<UIText style={styles.habitDetail} isSecondary>
								Clean Today
							</UIText>
						</>
					)}
				</View>
			</View>

			<View style={styles.actionContainer}>
				<HabitToggleButton habit={habit} isCompleted={false} />
			</View>
		</View>
	);
};

export default HabitTodayCard;

const styles = StyleSheet.create({
	// container styles
	habitCard: {
		padding: 12,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: 10,
		borderRadius: 10,
		borderWidth: 0.5,
		borderStyle: "dashed",
		overflow: "hidden",
	},
	habitCardPressed: {
		opacity: 0.8,
	},
	habitInfo: {
		flexShrink: 1,
		gap: 4,
	},
	habitDetails: {
		alignItems: "flex-start",
	},
	actionContainer: {
		justifyContent: "center",
		alignItems: "center",
	},

	// text styles
	habitName: {
		fontSize: 18,
		fontWeight: "600",
	},
	habitDetail: {
		fontSize: 12,
	},
});
