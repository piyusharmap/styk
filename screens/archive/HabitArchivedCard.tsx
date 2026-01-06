import { View, StyleSheet } from "react-native";
import useTheme from "../../theme/useTheme";
import { Habit } from "../../types/habitTypes";
import { HabitTypeDetails } from "../../constants/habit";
import UIText from "../../components/ui/UIText";
import TypeIconContainer from "../../components/habit/TypeIconContainer";
import DeleteArchiveButton from "./DeleteArchiveButton";
import RestoreArchiveButton from "./RestoreArchiveButton";

const HabitArchivedCard = ({ habit }: { habit: Habit }) => {
	const { colors } = useTheme();

	const typeDetails = HabitTypeDetails[habit.target.type];

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
					<UIText style={styles.habitName} numberOfLines={1}>
						{habit.name}
					</UIText>

					<View style={styles.habitDetails}>
						<UIText style={styles.habitDetail} isSecondary>
							Archived on:{" "}
							<UIText style={{ color: colors.text }}>
								{habit.archivedAt}
							</UIText>
						</UIText>
					</View>
				</View>

				<TypeIconContainer
					icon={typeDetails.icon}
					color={habit.color}
				/>
			</View>

			<View
				style={[{ borderColor: colors.border }, styles.actionContainer]}
			>
				<DeleteArchiveButton habitId={habit.id} />

				<RestoreArchiveButton habitId={habit.id} />
			</View>
		</View>
	);
};

export default HabitArchivedCard;

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
	actionContainer: {
		paddingTop: 10,
		flexDirection: "row",
		justifyContent: "center",
		gap: 10,
		borderTopWidth: 1,
		borderStyle: "dashed",
	},
	actionButton: {
		flex: 1,
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
