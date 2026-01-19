import { View, StyleSheet } from 'react-native';
import { Habit } from '../../../types/habitTypes';
import { HabitTypeDetails } from '../../../constants/habit';
import UIText from '../../../components/ui/UIText';
import TypeIconContainer from '../../../components/habit/TypeIconContainer';
import DeleteArchiveButton from './DeleteArchiveButton';
import RestoreArchiveButton from './RestoreArchiveButton';
import { formatDisplayDate } from '../../../utils/time';

const HabitArchivedCard = ({ habit }: { habit: Habit }) => {
	const typeDetails = HabitTypeDetails[habit.target.type];

	return (
		<View
			style={[
				{
					backgroundColor: habit.color + '20',
				},
				styles.habitCard,
			]}>
			<TypeIconContainer icon={typeDetails.icon} color={habit.color} />

			<View style={styles.habitInfo}>
				<UIText style={styles.habitName} numberOfLines={1}>
					{habit.name}
				</UIText>

				<View style={styles.habitDetails}>
					<UIText style={styles.habitDetail}>
						<UIText isSecondary>Archived on:</UIText>{' '}
						<UIText style={styles.habitDetailHighlight}>
							{formatDisplayDate(habit.archivedAt!)}
						</UIText>
					</UIText>
				</View>
			</View>

			<View style={styles.actionContainer}>
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
		padding: 10,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		borderRadius: 10,
		overflow: 'hidden',
	},
	habitInfo: {
		flex: 1,
		gap: 2,
	},
	habitDetails: {
		alignItems: 'flex-start',
	},
	actionContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 6,
	},
	actionButton: {
		flex: 1,
	},

	// text styles
	habitName: {
		flexShrink: 1,
		fontSize: 18,
		fontWeight: '500',
	},
	habitDetail: {
		fontSize: 12,
	},
	habitDetailHighlight: {
		fontWeight: '500',
	},
});
