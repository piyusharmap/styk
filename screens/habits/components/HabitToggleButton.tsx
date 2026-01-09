import { Pressable, StyleSheet } from 'react-native';
import { HabitTarget } from '../../../types/habitTypes';
import { useHabitStore } from '../../../store/habitStore';
import { getTodayString } from '../../../utils/time';
import Icon, { IconType } from '../../../components/icon';

const HabitToggleButton = ({
	habitId,
	target,
	color,
	isDisabled,
}: {
	habitId: string;
	target: HabitTarget;
	color: string;
	isDisabled?: boolean;
}) => {
	const icon: IconType = target.type === 'count' ? 'Plus' : 'CalendarSync';

	const performHabitAction = useHabitStore((s) => s.performHabitAction);

	const handleMarkHabit = () => {
		performHabitAction(habitId, getTodayString(), 'mark');
	};

	return (
		<Pressable
			style={({ pressed }) => [
				{
					backgroundColor: color + '30',
					borderColor: color,
				},
				styles.button,
				pressed && styles.buttonPressed,
				isDisabled && styles.buttonDisabled,
			]}
			onPress={handleMarkHabit}
			disabled={isDisabled}>
			<Icon name={icon} size={20} />
		</Pressable>
	);
};

export default HabitToggleButton;

const styles = StyleSheet.create({
	// container styles
	button: {
		height: 40,
		width: 40,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 6,
		borderWidth: 2,
		borderStyle: 'dashed',
	},
	buttonPressed: {
		transform: [{ scale: 0.95 }],
	},
	buttonDisabled: {
		opacity: 0.5,
	},
});
