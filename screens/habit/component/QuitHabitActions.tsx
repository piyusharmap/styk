import { View, StyleSheet } from 'react-native';
import { useHabitStore } from '../../../store/habitStore';
import { Habit } from '../../../types/habitTypes';
import { formatDisplayDate, getTodayString } from '../../../utils/time';
import UIText from '../../../components/ui/UIText';
import ToggleButton from '../../../components/habit/ToggleButton';

const QuitHabitActions = ({ habit }: { habit: Habit }) => {
	const performQuitHabitAction = useHabitStore((s) => s.performQuitHabitAction);

	const handleRelapseHabit = () => {
		performQuitHabitAction(habit.id, getTodayString(), 'relapse');
	};

	const handleRevertHabit = () => {
		performQuitHabitAction(habit.id, getTodayString(), 'revert');
	};

	if (habit.target.type !== 'quit') return null;

	return (
		<View style={styles.progressContainer}>
			<ToggleButton
				size={44}
				color={habit.color}
				iconName='History'
				onPress={handleRevertHabit}
			/>

			<View style={styles.progressInfo}>
				<View>
					<UIText style={styles.date}>{formatDisplayDate(habit.target.startDate)}</UIText>

					<UIText style={styles.dateInfo} isSecondary>
						Clean since
					</UIText>
				</View>

				<View>
					<UIText style={styles.date}>
						{formatDisplayDate(habit.target.initialStartDate)}
					</UIText>

					<UIText style={styles.dateInfo} isSecondary>
						Started on
					</UIText>
				</View>
			</View>

			<ToggleButton
				size={44}
				color={habit.color}
				iconName='RefreshCcw'
				onPress={handleRelapseHabit}
			/>
		</View>
	);
};

export default QuitHabitActions;

const styles = StyleSheet.create({
	// container styles
	progressContainer: {
		paddingTop: 4,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 28,
	},
	progressInfo: {
		alignItems: 'center',
		gap: 10,
	},

	// text styles
	date: {
		fontSize: 18,
		fontWeight: '500',
		textAlign: 'center',
	},
	dateInfo: {
		fontSize: 12,
		textAlign: 'center',
	},
});
