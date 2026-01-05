import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useHabitStore } from "../../store/habitStore";
import UIView from "../../components/ui/UIView";
import useTheme from "../../theme/useTheme";
import DeleteHabitButton from "../../screens/habit/DeleteHabitButton";
import UIText from "../../components/ui/UIText";
import UpdateHabitButton from "../../screens/habit/UpdateHabitButton";
import HabitInfoCard from "../../screens/habit/HabitInfoCard";
import ProgressBar from "../../screens/habit/ProgressBar";
import { HabitTypeDetails } from "../../constants/habit";
import UILoader from "../../components/ui/UILoader";
import { Ionicons } from "@expo/vector-icons";

const HabitDetailsPage = () => {
	const { id, color } = useLocalSearchParams<{
		id: string;
		color?: string;
	}>();

	const { colors } = useTheme();
	const habitDetails = useHabitStore((s) => s.getHabitDetails(id));
	const countValue = useHabitStore((s) => s.getCountValue(id));
	const isHabitLocked = useHabitStore((s) => s.isHabitLocked(id));

	if (!habitDetails)
		return (
			<UIView style={styles.loaderContainer}>
				<UILoader size={32} color={color} />
			</UIView>
		);

	const typeDetails = HabitTypeDetails[habitDetails.target.type];

	return (
		<>
			<Stack.Screen
				options={{
					headerStyle: { backgroundColor: color + "20" },
					headerTintColor: color,
				}}
			/>

			<UIView style={styles.container} isBottomSafe>
				<ScrollView contentContainerStyle={styles.content}>
					<HabitInfoCard heading="Name">
						<UIText style={styles.name}>
							{habitDetails?.name}
						</UIText>
					</HabitInfoCard>

					<HabitInfoCard
						style={{
							backgroundColor: color + "20",
							borderColor: color,
						}}
					>
						<View style={styles.typeCard}>
							<View style={styles.typeInfoContainer}>
								<UIText style={styles.info}>
									{typeDetails.label}
								</UIText>

								<UIText isSecondary>
									{typeDetails.description}
								</UIText>
							</View>

							<View style={styles.iconContainer}>
								<Ionicons
									name={typeDetails.icon}
									size={32}
									color={color}
								/>
							</View>
						</View>
					</HabitInfoCard>

					{habitDetails.target.type === "count" ? (
						<>
							<View style={styles.dualCardSection}>
								<HabitInfoCard
									heading="Target"
									style={styles.cardFlex}
								>
									<UIText style={styles.info}>
										{habitDetails.target.count}{" "}
										{`${habitDetails.target.unit}${
											habitDetails.target.count > 1
												? "s"
												: ""
										}`}
									</UIText>
								</HabitInfoCard>

								<HabitInfoCard
									heading="Frequency"
									style={styles.cardFlex}
								>
									<UIText style={styles.info}>
										{habitDetails.target.frequency}
									</UIText>
								</HabitInfoCard>
							</View>

							<HabitInfoCard
								heading={
									isHabitLocked
										? "Completed • Today"
										: "In Progress • Today"
								}
								style={styles.progressSection}
							>
								<UIText style={styles.count}>
									{countValue}/{habitDetails.target.count}
								</UIText>

								<ProgressBar
									habitId={habitDetails.id}
									target={habitDetails.target}
									color={habitDetails.color}
								/>
							</HabitInfoCard>
						</>
					) : (
						<View style={styles.dualCardSection}>
							<HabitInfoCard
								heading="Clean since"
								style={styles.cardFlex}
							>
								<UIText style={styles.info}>
									{habitDetails.target.startDate}
								</UIText>
							</HabitInfoCard>

							<HabitInfoCard
								heading="Started on"
								style={styles.cardFlex}
							>
								<UIText style={styles.info}>
									{habitDetails.target.initialStartDate}
								</UIText>
							</HabitInfoCard>
						</View>
					)}
				</ScrollView>

				<View
					style={[
						{ borderColor: colors.border },
						styles.actionContainer,
					]}
				>
					<DeleteHabitButton
						habitId={id}
						style={styles.actionButton}
					/>

					<UpdateHabitButton
						habitId={id}
						style={styles.actionButton}
					/>
				</View>
			</UIView>
		</>
	);
};

export default HabitDetailsPage;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
	},
	loaderContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	content: {
		paddingHorizontal: 12,
		paddingVertical: 12,
		gap: 8,
	},
	progressSection: {
		gap: 4,
	},
	dualCardSection: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: 8,
	},
	cardFlex: {
		flex: 1,
	},
	typeCard: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	typeInfoContainer: {
		flex: 1,
		gap: 2,
	},
	iconContainer: {
		padding: 8,
	},
	actionContainer: {
		paddingHorizontal: 12,
		paddingVertical: 12,
		flexDirection: "row",
		gap: 10,
		borderTopWidth: 1,
	},
	actionButton: {
		flex: 1,
	},

	// text styles
	name: {
		fontSize: 20,
		fontWeight: "500",
	},
	count: {
		fontSize: 16,
		textAlign: "right",
	},
	info: {
		fontSize: 18,
		fontWeight: "500",
		textTransform: "capitalize",
	},
});
