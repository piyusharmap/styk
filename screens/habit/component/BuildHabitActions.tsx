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

	const performBuildHabitAction = useHabitStore((s) => s.performBuildHabitAction);

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
			<ToggleButton
				size={44}
				color={habit.color}
				iconName='Minus'
				isDisabled={countValue === 0}
				onPress={handleUnmarkHabit}
			/>

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
					<UIText style={styles.unit} isSecondary>
						{habit.target.unit}
						{habit.target.count > 1 ? 's' : ''}
					</UIText>
				</View>
			</CircularProgressBar>

			<ToggleButton
				size={44}
				color={habit.color}
				iconName='Plus'
				isDisabled={isHabitLocked}
				onPress={handleMarkHabit}
			/>
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
		gap: 20,
	},
	progressDetails: {
		alignItems: 'center',
	},

	// text styles
	count: {
		fontSize: 22,
		fontWeight: '600',
	},
	countTarget: {
		fontSize: 14,
	},
	unit: {
		fontSize: 12,
	},
});
