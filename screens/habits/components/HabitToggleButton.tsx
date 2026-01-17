import { PressableProps } from 'react-native';
import { HabitTarget } from '../../../types/habitTypes';
import { useHabitStore } from '../../../store/habitStore';
import { getTodayString } from '../../../utils/time';
import { IconType } from '../../../components/icon';
import ToggleButton from '../../../components/habit/ToggleButton';

const HabitToggleButton = ({
	habitId,
	target,
	color,
	isDisabled,
}: PressableProps & {
	habitId: string;
	target: HabitTarget;
	color: string;
	isDisabled?: boolean;
}) => {
	const icon: IconType = target.type === 'count' ? 'Plus' : 'RefreshCcw';

	const performHabitAction = useHabitStore((s) => s.performHabitAction);

	const handleMarkHabit = () => {
		performHabitAction(habitId, getTodayString(), 'mark');
	};

	return (
		<ToggleButton
			color={color}
			iconName={icon}
			isDisabled={isDisabled}
			onPress={handleMarkHabit}
		/>
	);
};

export default HabitToggleButton;
