import { View, StyleSheet } from 'react-native';
import useTheme from '../../../theme/useTheme';
import { Habit } from '../../../types/habitTypes';
import { HabitTypeDetails } from '../../../constants/habit';
import UIText from '../../../components/ui/UIText';
import TypeIconContainer from '../../../components/habit/TypeIconContainer';
import DeleteArchiveButton from './DeleteArchiveButton';
import RestoreArchiveButton from './RestoreArchiveButton';
import UISeparator from '../../../components/ui/UISeparator';
import { formatDisplayDate } from '../../../utils/time';

const HabitArchivedCard = ({ habit }: { habit: Habit }) => {
	const { colors } = useTheme();

	const typeDetails = HabitTypeDetails[habit.target.type];

	return (
		<View
			style={[
				{
					backgroundColor: colors.foreground + '80',
					borderColor: colors.border + '80',
				},
				styles.habitCard,
			]}>
			<View style={styles.habitSection}>
				<TypeIconContainer icon={typeDetails.icon} color={habit.color} />

				<View style={styles.habitInfo}>
					<UIText style={styles.habitName} numberOfLines={1}>
						{habit.name}
					</UIText>

					<View style={styles.habitDetails}>
						<UIText style={styles.habitDetail} isSecondary>
							Archived on:{' '}
							<UIText style={{ color: colors.text }}>
								{formatDisplayDate(habit.archivedAt!)}
							</UIText>
						</UIText>
					</View>
				</View>
			</View>

			<UISeparator length={'100%'} width={2} />

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
		gap: 10,
		borderRadius: 10,
		borderWidth: 2,
		overflow: 'hidden',
	},
	habitCardPressed: {
		opacity: 0.8,
	},
	habitSection: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
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
});
