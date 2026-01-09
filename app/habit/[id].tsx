import { ScrollView, StyleSheet, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useHabitStore } from '../../store/habitStore';
import UIView from '../../components/ui/UIView';
import useTheme from '../../theme/useTheme';
import DeleteHabitButton from '../../screens/habit/DeleteHabitButton';
import UIText from '../../components/ui/UIText';
import HabitInfoCard from '../../screens/habit/HabitInfoCard';
import { HabitTypeDetails } from '../../constants/habit';
import TypeCard from '../../screens/habit/TypeCard';
import HabitReport from '../../screens/habit/HabitReport';
import NavigationButton from '../../components/layout/NavigationButton';
import ArchiveHabitButton from '../../screens/habit/ArchiveHabitButton';
import PageLoader from '../../components/PageLoader';
import NavigationHeading from '../../components/heading/NavigationHeading';
import ProgressBar from '../../components/habit/ProgressBar';

const HabitDetailsPage = () => {
	const { id, color } = useLocalSearchParams<{
		id: string;
		color?: string;
	}>();

	const router = useRouter();
	const { colors } = useTheme();
	const habitDetails = useHabitStore((s) => s.getHabitDetails(id));
	const countValue = useHabitStore((s) => s.getCountValue(id));

	if (!habitDetails) return <PageLoader isBottomSafe />;

	const typeDetails = HabitTypeDetails[habitDetails.target.type];

	return (
		<>
			<Stack.Screen
				options={{
					headerStyle: { backgroundColor: color + '30' },
					headerRight(props) {
						return (
							<NavigationButton
								icon='Edit'
								tint={props.tintColor}
								onPress={() => router.navigate(`edit/${id}`)}
							/>
						);
					},
					headerTitle: (props) => {
						return (
							<NavigationHeading title={habitDetails.name} tint={props.tintColor} />
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

					<HabitInfoCard heading='Name'>
						<UIText style={styles.name}>{habitDetails?.name}</UIText>
					</HabitInfoCard>

					{habitDetails.target.type === 'count' ? (
						<HabitInfoCard heading='Progress • Today'>
							<View style={styles.progressContainer}>
								<View style={styles.progressDetails}>
									<UIText style={styles.progress} isSecondary>
										<UIText
											style={[
												{ color: colors.text },
												styles.progressHighlight,
											]}>
											{countValue}
										</UIText>
										{'/'}
										{habitDetails.target.count}
										{` ${habitDetails.target.unit}${
											habitDetails.target.count > 1 ? 's' : ''
										}`}
									</UIText>

									<UIText style={styles.progress}>
										{habitDetails.target.frequency}
									</UIText>
								</View>

								<ProgressBar
									habitId={habitDetails.id}
									target={habitDetails.target}
									color={habitDetails.color}
									height={28}
								/>
							</View>
						</HabitInfoCard>
					) : (
						<HabitInfoCard heading='Progress So Far'>
							<View style={styles.infoContainer}>
								<View style={styles.infoCard}>
									<UIText style={styles.info}>
										{habitDetails.target.startDate}
									</UIText>

									<UIText style={styles.infoHeading} isSecondary>
										Clean since
									</UIText>
								</View>

								<View style={styles.infoCard}>
									<UIText style={styles.info}>
										{habitDetails.target.initialStartDate}
									</UIText>

									<UIText style={styles.infoHeading} isSecondary>
										Started on
									</UIText>
								</View>
							</View>
						</HabitInfoCard>
					)}

					<HabitReport habitId={id} accent={habitDetails.color} />
				</ScrollView>

				<View
					style={[
						{ backgroundColor: colors.tabBackground, borderColor: colors.border },
						styles.actionContainer,
					]}>
					<DeleteHabitButton habitId={id} style={styles.actionButton} />

					<ArchiveHabitButton habitId={id} style={styles.actionButton} />
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
	content: {
		paddingHorizontal: 12,
		paddingVertical: 10,
		gap: 6,
	},
	progressContainer: {
		gap: 6,
	},
	progressDetails: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 20,
	},
	infoContainer: {
		paddingTop: 4,
		flexDirection: 'row',
		gap: 10,
	},
	infoCard: {
		flex: 1,
		gap: 2,
	},
	actionContainer: {
		paddingHorizontal: 12,
		paddingVertical: 10,
		flexDirection: 'row',
		gap: 8,
		borderTopWidth: 1,
	},
	actionButton: {
		flex: 1,
	},

	// text styles
	name: {
		fontSize: 20,
		fontWeight: '500',
		lineHeight: 24,
	},
	progress: {
		fontSize: 14,
	},
	progressHighlight: {
		fontSize: 18,
		fontWeight: '500',
	},
	infoHeading: {
		fontSize: 12,
	},
	info: {
		fontSize: 18,
		fontWeight: '500',
		textTransform: 'capitalize',
	},
});
