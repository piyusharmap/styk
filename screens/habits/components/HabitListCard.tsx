import { View, StyleSheet, Pressable } from 'react-native';
import UIText from '../../../components/ui/UIText';
import { Habit } from '../../../types/habitTypes';
import useTheme from '../../../theme/useTheme';
import HabitToggleButton from './HabitToggleButton';
import { useHabitStore } from '../../../store/habitStore';
import Icon from '../../../components/icon';
import { HabitTypeDetails } from '../../../constants/habit';
import TypeIconContainer from '../../../components/habit/TypeIconContainer';
import { useRouter } from 'expo-router';
import ProgressBar from '../../../components/habit/ProgressBar';
import { getDayDifference } from '../../../utils/time';
import QuitTimeline from '../../../components/habit/QuitTimeline';

const HabitListCard = ({ habit }: { habit: Habit }) => {
	const { colors } = useTheme();

	const router = useRouter();
	const isHabitLocked = useHabitStore((s) => s.isHabitLocked(habit.id));
	const countValue = useHabitStore((s) => s.getCountValue(habit.id));
	const habitType = habit.target.type;

	const typeDetails = HabitTypeDetails[habitType];

	return (
		<Pressable
			style={({ pressed }) => [
				{
					backgroundColor: habit.color + '20',
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
			}}>
			<View style={styles.habitSection}>
				<TypeIconContainer icon={typeDetails.icon} color={habit.color} />

				<View style={styles.habitInfo}>
					<UIText style={styles.habitName} numberOfLines={1}>
						{habit.name}
					</UIText>

					<View style={styles.habitDetails}>
						{habitType === 'count' ? (
							<UIText style={styles.habitDetail}>
								<UIText style={styles.habitDetail}>
									<UIText isSecondary>
										{isHabitLocked ? 'Completed' : 'In Progress'}:
									</UIText>{' '}
									<UIText style={styles.habitDetailHighlight}>
										{countValue}/{habit.target.count}{' '}
										{`${habit.target.unit}${habit.target.count > 1 ? 's' : ''}`}{' '}
										{`(${habit.target.frequency})`}
									</UIText>
								</UIText>
							</UIText>
						) : (
							<UIText style={styles.habitDetail}>
								<UIText isSecondary>Going strong for:</UIText>{' '}
								<UIText style={styles.habitDetailHighlight}>
									{getDayDifference(habit.target.startDate)} days
								</UIText>
							</UIText>
						)}
					</View>
				</View>

				<View style={styles.actionContainer}>
					{isHabitLocked && habitType === 'count' ? (
						<View
							style={[
								{ backgroundColor: habit.color + '30', borderColor: habit.color },
								styles.iconContainer,
							]}>
							<Icon
								name='Flame'
								size={20}
								color={habit.color}
								fillColor={habit.color + '50'}
								isFilled
							/>
						</View>
					) : (
						<HabitToggleButton
							habitId={habit.id}
							target={habit.target}
							color={habit.color}
						/>
					)}
				</View>
			</View>

			{habitType === 'count' ? (
				<ProgressBar habitId={habit.id} target={habit.target} color={habit.color} />
			) : (
				<QuitTimeline
					initialDate={habit.target.initialStartDate}
					currentDate={habit.target.startDate}
					color={habit.color}
				/>
			)}
		</Pressable>
	);
};

export default HabitListCard;

const styles = StyleSheet.create({
	// container styles
	habitCard: {
		padding: 10,
		gap: 10,
		borderRadius: 10,
		overflow: 'hidden',
	},
	habitCardPressed: {
		opacity: 0.8,
		transform: [{ scale: 0.98 }],
	},
	habitSection: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	habitInfo: {
		flex: 1,
	},
	habitDetails: {
		alignItems: 'flex-start',
	},
	actionContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	iconContainer: {
		height: 40,
		width: 40,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		borderRadius: 20,
	},

	// text styles
	habitName: {
		fontSize: 18,
		fontWeight: '600',
	},
	habitDetail: {
		fontSize: 12,
	},
	habitDetailHighlight: {
		fontWeight: '500',
	},
});
