import { View, StyleSheet } from 'react-native';
import React from 'react';
import HabitInfoCard from '../../../components/habit/HabitInfoCard';
import UIText from '../../../components/ui/UIText';
import { Habit } from '../../../types/habitTypes';
import UISeparator from '../../../components/ui/UISeparator';
import Icon from '../../../components/icon';
import { getDayDifference } from '../../../utils/time';

const StreakCard = ({ habit }: { habit: Habit }) => {
	const currentStreak =
		habit.target.type === 'count'
			? habit.target.currentStreak
			: getDayDifference(habit.target.startDate);
	const bestStreak =
		habit.target.type === 'count'
			? habit.target.longestStreak
			: getDayDifference(habit.target.initialStartDate);

	return (
		<HabitInfoCard heading='Streak'>
			<View style={styles.infoContainer}>
				<View style={styles.infoCard}>
					<View style={styles.streakInfo}>
						<Icon
							name='Flame'
							size={22}
							color={habit.color}
							isFilled
							fillColor={habit.color + '50'}
						/>

						<UIText style={styles.streakCount}>
							{currentStreak}{' '}
							<UIText style={styles.streakUnit}>
								day{currentStreak > 1 ? 's' : ''}
							</UIText>
						</UIText>
					</View>

					<UIText style={styles.infoSubHeading} isSecondary>
						Current Streak
					</UIText>
				</View>

				<UISeparator orientation='vertical' length={40} width={1} />

				<View style={styles.infoCard}>
					<View style={styles.streakInfo}>
						<Icon
							name='Crown'
							size={22}
							color={habit.color}
							isFilled
							fillColor={habit.color + '50'}
						/>

						<UIText style={styles.streakCount}>
							{bestStreak}{' '}
							<UIText style={styles.streakUnit}>
								day{currentStreak > 1 ? 's' : ''}
							</UIText>
						</UIText>
					</View>

					<UIText style={styles.infoSubHeading} isSecondary>
						Best Streak
					</UIText>
				</View>
			</View>
		</HabitInfoCard>
	);
};

export default StreakCard;

const styles = StyleSheet.create({
	// container styles
	infoContainer: {
		flex: 1,
		paddingTop: 4,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		overflow: 'hidden',
	},
	infoCard: {
		flex: 1,
		gap: 2,
	},
	streakInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},

	// text styles
	infoSubHeading: {
		fontSize: 12,
	},
	info: {
		fontSize: 18,
		fontWeight: '500',
		textTransform: 'capitalize',
	},
	streakCount: {
		fontSize: 24,
		fontWeight: '600',
	},
	streakUnit: {
		fontSize: 14,
	},
});
