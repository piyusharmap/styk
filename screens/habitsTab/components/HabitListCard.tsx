import { View, StyleSheet, Pressable, Text } from "react-native";
import UIText from "../../../components/ui/UIText";
import { Habit } from "../../../types/habitTypes";
import useTheme from "../../../theme/useTheme";
import Badge from "../../../components/Badge";
import { HabitTypeDetails } from "../../../constants/habit";
import { useRouter } from "expo-router";
import TypeIconContainer from "../../../components/habit/TypeIconContainer";

const HabitListCard = ({ habit }: { habit: Habit }) => {
	const { colors } = useTheme();
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
				router.navigate({
					pathname: `habit/${habit.id}`,
					params: {
						color: habit.color,
					},
				});
			}}
		>
			<View style={styles.habitSection}>
				<View style={styles.habitInfo}>
					<UIText style={styles.habitName} numberOfLines={1}>
						{habit.name}
					</UIText>

					<View style={styles.habitDetails}>
						{habit.target.type === "count" ? (
							<>
								<UIText style={styles.habitDetail} isSecondary>
									Target:{" "}
									<UIText style={{ color: colors.text }}>
										{habit.target.count}{" "}
										{`${habit.target.unit}${
											habit.target.count > 1 ? "s" : ""
										}`}
									</UIText>
								</UIText>

								<UIText style={styles.habitDetail} isSecondary>
									Frequency:{" "}
									<UIText style={{ color: colors.text }}>
										{habit.target.frequency}
									</UIText>
								</UIText>
							</>
						) : (
							<>
								<UIText style={styles.habitDetail} isSecondary>
									Clean since:{" "}
									<UIText style={{ color: colors.text }}>
										{habit.target.startDate}
									</UIText>
								</UIText>

								<UIText style={styles.habitDetail} isSecondary>
									Started on:{" "}
									<UIText style={{ color: colors.text }}>
										{habit.target.initialStartDate}
									</UIText>
								</UIText>
							</>
						)}
					</View>
				</View>

				<TypeIconContainer
					icon={typeDetails.icon}
					color={habit.color}
				/>
			</View>

			<View style={styles.badgesContainer}>
				<Badge
					title={`${0}`}
					style={{
						backgroundColor: habit.color + "50",
						borderColor: habit.color,
					}}
					icon="Flame"
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
	badgesContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},

	// text styles
	habitName: {
		flexShrink: 1,
		fontSize: 18,
		fontWeight: "500",
	},
	habitDetail: {
		fontSize: 12,
	},
});
