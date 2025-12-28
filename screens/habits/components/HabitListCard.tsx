import { View, StyleSheet, Pressable, Text } from "react-native";
import UIText from "../../../components/ui/UIText";
import { Habit } from "../../../types/habitTypes";
import useThemeColor from "../../../theme/useThemeColor";
import Badge from "../../../components/Badge";
import { HabitTypeDetails } from "../../../constants/habit";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const HabitListCard = ({ habit }: { habit: Habit }) => {
	const colors = useThemeColor();
	const router = useRouter();

	const typeDetails = HabitTypeDetails[habit.target.type];

	return (
		<Pressable
			style={({ pressed }) => [
				{
					backgroundColor: colors.foreground + "80",
					borderColor: colors.border,
				},
				styles.habitCard,
				pressed && styles.habitCardPressed,
			]}
			onPress={() => {
				router.navigate(`/habit/${habit.id}`);
			}}
		>
			<View style={styles.habitInfo}>
				<View style={styles.nameContainer}>
					<Ionicons name="ellipse" size={10} color={habit.color} />

					<UIText style={styles.habitName} numberOfLines={1}>
						{habit.name}
					</UIText>
				</View>

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
		borderWidth: 1,
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
	nameContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		overflow: "hidden",
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
		flexShrink: 1,
		fontSize: 18,
		fontWeight: "600",
	},
	habitDetail: {
		fontSize: 12,
	},
});
