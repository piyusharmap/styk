import { ScrollView, StyleSheet, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useHabitStore } from '../../store/habitStore';
import UIView from '../../components/ui/UIView';
import useTheme from '../../theme/useTheme';
import DeleteHabitButton from '../../screens/habit/component/DeleteHabitButton';
import UIText from '../../components/ui/UIText';
import HabitInfoCard from '../../components/habit/HabitInfoCard';
import { HabitTypeDetails } from '../../constants/habit';
import NavigationButton from '../../components/layout/NavigationButton';
import ArchiveHabitButton from '../../screens/habit/component/ArchiveHabitButton';
import PageLoader from '../../components/PageLoader';
import NavigationHeading from '../../components/heading/NavigationHeading';
import { formatDisplayDate } from '../../utils/time';
import TypeCard from '../../components/habit/TypeCard';
import BuildHabitActions from '../../screens/habit/component/BuildHabitActions';
import StreakCard from '../../screens/habit/component/StreakCard';
import QuitHabitActions from '../../screens/habit/component/QuitHabitActions';
import HabitReport from '../../screens/habit/component/HabitReport';

const HabitDetailsPage = () => {
	const { id, color } = useLocalSearchParams<{
		id: string;
		color?: string;
	}>();

	const router = useRouter();
	const { colors } = useTheme();
	const habitDetails = useHabitStore((s) => s.getHabitDetails(id));

	if (!habitDetails) return <PageLoader isBottomSafe />;

	const habitType = habitDetails.target.type;
	const typeDetails = HabitTypeDetails[habitType];

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
					<View style={styles.dateContainer}>
						<UIText style={styles.date}>
							<UIText isSecondary>Created:</UIText>{' '}
							<UIText style={styles.dateHighlight}>
								{formatDisplayDate(habitDetails.createdAt)}
							</UIText>
						</UIText>

						<UIText style={[{ color: habitDetails.color }, styles.date]}>/</UIText>

						<UIText style={styles.date}>
							<UIText isSecondary>Updated:</UIText>{' '}
							<UIText style={styles.dateHighlight}>
								{formatDisplayDate(habitDetails.updatedAt)}
							</UIText>
						</UIText>
					</View>

					<TypeCard
						label={typeDetails.label}
						description={typeDetails.description}
						icon={typeDetails.icon}
						color={color || colors.foreground}
					/>

					<HabitInfoCard heading='Habit Name'>
						<UIText style={styles.name}>{habitDetails?.name}</UIText>
					</HabitInfoCard>

					<StreakCard habit={habitDetails} />

					{habitType === 'count' ? (
						<HabitInfoCard heading={`Progress • ${habitDetails.target.frequency}`}>
							<BuildHabitActions habit={habitDetails} />
						</HabitInfoCard>
					) : (
						<HabitInfoCard heading={`Progress • ${habitDetails.target.frequency}`}>
							<QuitHabitActions habit={habitDetails} />
						</HabitInfoCard>
					)}

					<HabitReport habitId={id} accentColor={habitDetails.color} />
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
	dateContainer: {
		paddingTop: 4,
		paddingHorizontal: 2,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		gap: 4,
	},
	actionContainer: {
		paddingHorizontal: 12,
		paddingTop: 6,
		paddingBottom: 10,
		flexDirection: 'row',
		gap: 6,
		borderTopWidth: 1,
	},
	actionButton: {
		flex: 1,
	},

	// text styles
	date: {
		fontSize: 12,
	},
	dateHighlight: {
		fontWeight: '500',
	},
	name: {
		fontSize: 20,
		fontWeight: '600',
		lineHeight: 24,
	},
});
