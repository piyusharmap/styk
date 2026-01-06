import { ScrollView, StyleSheet, View } from "react-native";
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
import TypeCard from "../../screens/habit/TypeCard";
import HabitReport from "../../screens/habit/HabitReport";
import NavigationButton from "../../components/layout/NavigationButton";

const HabitDetailsPage = () => {
	const { id, color } = useLocalSearchParams<{
		id: string;
		color?: string;
	}>();

	const { colors } = useTheme();
	const habitDetails = useHabitStore((s) => s.getHabitDetails(id));
	const countValue = useHabitStore((s) => s.getCountValue(id));

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
					headerStyle: { backgroundColor: color + "30" },
					headerRight(props) {
						return (
							<NavigationButton
								icon="Archive"
								tint={props.tintColor}
								onPress={() => {}}
							/>
						);
					},
				}}
			/>

			<UIView style={styles.container} isBottomSafe>
				<ScrollView contentContainerStyle={styles.content}>
					<TypeCard
						label={typeDetails.label}
						description={typeDetails.description}
						icon={typeDetails.icon}
						color={color || colors.foreground}
					/>

					<HabitInfoCard heading="Name">
						<UIText style={styles.name}>
							{habitDetails?.name}
						</UIText>
					</HabitInfoCard>

					{habitDetails.target.type === "count" ? (
						<HabitInfoCard heading="Progress • Today">
							<View style={styles.progressContainer}>
								<UIText style={styles.count} isSecondary>
									<UIText
										style={[
											{ color: colors.text },
											styles.countHighlight,
										]}
									>
										{countValue}
									</UIText>
									{" / "}
									{habitDetails.target.count}
									{` ${habitDetails.target.unit}${
										habitDetails.target.count > 1 ? "s" : ""
									}`}
								</UIText>

								<ProgressBar
									habitId={habitDetails.id}
									target={habitDetails.target}
									color={habitDetails.color}
								/>
							</View>

							<View style={styles.infoContainer}>
								<View style={styles.infoCard}>
									<UIText style={styles.info}>
										{habitDetails.target.frequency}
									</UIText>

									<UIText
										style={styles.infoHeading}
										isSecondary
									>
										Frequency
									</UIText>
								</View>
							</View>
						</HabitInfoCard>
					) : (
						<HabitInfoCard heading="Progress So Far">
							<View style={styles.infoContainer}>
								<View style={styles.infoCard}>
									<UIText style={styles.info}>
										{habitDetails.target.startDate}
									</UIText>

									<UIText
										style={styles.infoHeading}
										isSecondary
									>
										Clean since
									</UIText>
								</View>

								<View style={styles.infoCard}>
									<UIText style={styles.info}>
										{habitDetails.target.initialStartDate}
									</UIText>

									<UIText
										style={styles.infoHeading}
										isSecondary
									>
										Started on
									</UIText>
								</View>
							</View>
						</HabitInfoCard>
					)}

					<HabitReport habitId={id} />
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
	progressContainer: {
		paddingVertical: 4,
		gap: 4,
	},
	infoContainer: {
		flexDirection: "row",
		gap: 10,
	},
	infoCard: {
		paddingVertical: 4,
		flex: 1,
		gap: 2,
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
		lineHeight: 24,
	},
	count: {
		fontSize: 16,
	},
	countHighlight: {
		fontSize: 20,
		fontWeight: "500",
	},
	infoHeading: {
		fontSize: 12,
	},
	info: {
		fontSize: 18,
		fontWeight: "500",
		textTransform: "capitalize",
	},
});
