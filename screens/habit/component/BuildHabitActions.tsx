import { View, StyleSheet } from 'react-native';
import CircularProgressBar from '../../../components/habit/CircularProgressBar';
import { useHabitStore } from '../../../store/habitStore';
import UIText from '../../../components/ui/UIText';
import { Habit } from '../../../types/habitTypes';
import ToggleButton from '../../../components/habit/ToggleButton';
import { getProgressStep } from '../../../utils/habit';

const BuildHabitActions = ({ habit }: { habit: Habit }) => {
	const countValue = useHabitStore((s) => s.getCountValue(habit.id));
	const isHabitLocked = useHabitStore((s) => s.isHabitLocked(habit.id));
	const isHabitSkipped = useHabitStore((s) => s.isHabitSkipped(habit.id));

	const performBuildHabitAction = useHabitStore((s) => s.performBuildHabitAction);
	const skipHabit = useHabitStore((s) => s.skipBuildHabit);
	const undoSkipHabit = useHabitStore((s) => s.undoSkipBuildHabit);

	const handleMarkHabit = () => {
		//@ts-ignore
		const availableCount = habit.target.count - countValue;
		const incrementStep = getProgressStep(availableCount);

		performBuildHabitAction(habit.id, incrementStep, 'mark');
	};

	const handleUnmarkHabit = () => {
		const decrementStep = getProgressStep(countValue);
		performBuildHabitAction(habit.id, decrementStep, 'unmark');
	};

	if (habit.target.type !== 'count') return null;

	const score = (countValue / habit.target.count) * 100;

	return (
		<View style={styles.progressContainer}>
			<View style={styles.actionButtons}>
				<ToggleButton
					size={44}
					color={habit.color}
					iconName='Rewind'
					isDisabled={!isHabitSkipped}
					onPress={() => undoSkipHabit(habit.id)}
				/>

				<ToggleButton
					size={44}
					color={habit.color}
					iconName='Minus'
					isDisabled={countValue === 0 || isHabitSkipped}
					onPress={handleUnmarkHabit}
				/>
			</View>

			<CircularProgressBar
				progress={score}
				size={100}
				strokeWidth={8}
				activeColor={habit.color}
				backgroundColor={habit.color + '50'}>
				<View style={styles.progressDetails}>
					<UIText style={styles.count}>
						{countValue}
						<UIText style={styles.countTarget} isSecondary>
							{'/'}
							{habit.target.count}
						</UIText>
					</UIText>

					{isHabitSkipped ? (
						<UIText style={styles.unit} isSecondary>
							Skipped
						</UIText>
					) : (
						<UIText style={styles.unit} isSecondary>
							{habit.target.unit}
							{habit.target.count > 1 ? 's' : ''}
						</UIText>
					)}
				</View>
			</CircularProgressBar>

			<View style={styles.actionButtons}>
				<ToggleButton
					size={44}
					color={habit.color}
					iconName='Plus'
					isDisabled={isHabitLocked || isHabitSkipped}
					onPress={handleMarkHabit}
				/>

				<ToggleButton
					size={44}
					color={habit.color}
					iconName='FastForward'
					isDisabled={isHabitSkipped}
					onPress={() => skipHabit(habit.id)}
				/>
			</View>
		</View>
	);
};

export default BuildHabitActions;

const styles = StyleSheet.create({
	// container styles
	progressContainer: {
		paddingTop: 4,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 16,
	},
	progressDetails: {
		alignItems: 'center',
	},
	actionButtons: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},

	// text styles
	count: {
		fontSize: 24,
		fontWeight: '600',
	},
	countTarget: {
		fontSize: 14,
	},
	unit: {
		fontSize: 12,
	},
});
