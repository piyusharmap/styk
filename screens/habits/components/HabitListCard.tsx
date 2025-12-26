import { View, StyleSheet, Pressable, Text } from "react-native";
import UIText from "../../../components/ui/UIText";
import { Habit } from "../../../types/habitTypes";
import useThemeColor from "../../../theme/useThemeColor";
import Badge from "../../../components/Badge";
import { HabitTypeDetails } from "../../../constants/habit";
import { Ionicons } from "@expo/vector-icons";

const HabitListCard = ({ habit }: { habit: Habit }) => {
	const colors = useThemeColor();

	const typeDetails = HabitTypeDetails[habit.target.type];

	return (
		<Pressable
			style={({ pressed }) => [
				{
					backgroundColor: habit.color + "20",
					borderColor: habit.color,
				},
				styles.habitCard,
				pressed && styles.habitCardPressed,
			]}
		>
			<View style={styles.habitInfo}>
				<UIText style={styles.habitName}>{habit.name}</UIText>

				<View style={styles.habitDetails}>
					{habit.target.type === "count" ? (
						<>
							<UIText style={styles.habitDetail} isSecondary>
								Count:{" "}
								<Text style={{ color: colors.text }}>
									{habit.target.count} {habit.target.unit}
								</Text>
							</UIText>

							<UIText style={styles.habitDetail} isSecondary>
								Frequency:{" "}
								<Text style={{ color: colors.text }}>
									{habit.target.frequency}
								</Text>
							</UIText>
						</>
					) : (
						<>
							<UIText style={styles.habitDetail} isSecondary>
								Started:{" "}
								<Text style={{ color: colors.text }}>
									{habit.target.startDate}
								</Text>
							</UIText>
						</>
					)}
				</View>
			</View>

			<View style={styles.badgesContainer}>
				<Ionicons name="ellipse" size={12} color={habit.color} />

				<Badge
					title={typeDetails.label}
					style={{
						backgroundColor: habit.color + "50",
						borderColor: habit.color,
					}}
					icon={typeDetails.icon}
				/>

				<Badge
					title={`${0}`}
					style={{
						backgroundColor: habit.color + "50",
						borderColor: habit.color,
					}}
					icon="flame"
				/>
			</View>
		</Pressable>
	);
};

export default HabitListCard;

const styles = StyleSheet.create({
	// container styles
	habitCard: {
		padding: 12,
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
	badgesContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		gap: 6,
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
