import { View, StyleSheet, Text } from "react-native";
import UIText from "../../../components/ui/UIText";
import { Habit } from "../../../types/habitTypes";
import useTheme from "../../../theme/useTheme";
import HabitToggleButton from "./HabitToggleButton";
import { useHabitStore } from "../../../store/habitStore";
import { Ionicons } from "@expo/vector-icons";
import ProgressBar from "./ProgressBar";

const HabitTodayCard = ({ habit }: { habit: Habit }) => {
	const { colors } = useTheme();

	const isHabitLocked = useHabitStore((s) => s.isHabitLocked(habit.id));
	const countValue = useHabitStore((s) => s.getCountValue(habit.id));

	return (
		<View
			style={[
				{
					backgroundColor: colors.foreground + "80",
					borderColor: colors.border,
				},
				styles.habitCard,
			]}
		>
			<View style={styles.habitSection}>
				<View style={styles.habitInfo}>
					<UIText style={styles.habitName}>{habit.name}</UIText>

					<View style={styles.habitDetails}>
						{habit.target.type === "count" ? (
							<UIText style={styles.habitDetail} isSecondary>
								{isHabitLocked ? "Completed" : "In Progress"}:{" "}
								<Text style={{ color: colors.text }}>
									{countValue}/{habit.target.count}{" "}
									{`${habit.target.unit}${
										habit.target.count > 1 ? "s" : ""
									}`}{" "}
									{`(${habit.target.frequency})`}
								</Text>
							</UIText>
						) : (
							<>
								<UIText style={styles.habitDetail} isSecondary>
									Clean since:{" "}
									<Text style={{ color: colors.text }}>
										{habit.target.startDate}
									</Text>
								</UIText>

								<UIText style={styles.habitDetail} isSecondary>
									Started on:{" "}
									<Text style={{ color: colors.text }}>
										{habit.target.initialStartDate}
									</Text>
								</UIText>
							</>
						)}
					</View>
				</View>

				<View style={styles.actionContainer}>
					{isHabitLocked && habit.target.type === "count" ? (
						<View style={styles.iconContainer}>
							<Ionicons
								name="checkmark-circle"
								size={32}
								color={habit.color}
							/>
						</View>
					) : (
						<HabitToggleButton
							habit={habit}
							isDisabled={isHabitLocked}
						/>
					)}
				</View>
			</View>

			<ProgressBar habit={habit} />
		</View>
	);
};

export default HabitTodayCard;

const styles = StyleSheet.create({
	// container styles
	habitCard: {
		padding: 12,
		gap: 12,
		borderRadius: 10,
		borderWidth: 1,
		borderStyle: "dashed",
		overflow: "hidden",
	},
	habitSection: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: 10,
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
	iconContainer: {
		height: 40,
		width: 40,
		justifyContent: "center",
		alignItems: "center",
	},

	// text styles
	habitName: {
		fontSize: 18,
		fontWeight: "500",
	},
	habitDetail: {
		fontSize: 12,
	},
});
