import { Alert, StyleProp, ViewStyle } from 'react-native';
import UIButton from '../../components/ui/UIButton';
import { useState } from 'react';
import { useHabitStore } from '../../store/habitStore';
import { useRouter } from 'expo-router';

const RestoreArchiveButton = ({
	habitId,
	style,
}: {
	habitId: string;
	style?: StyleProp<ViewStyle>;
}) => {
	const [isRestoring, setIsRestoring] = useState<boolean>(false);

	const router = useRouter();
	const restoreHabit = useHabitStore((s) => s.restoreHabit);

	const handleHabitRestore = async () => {
		setIsRestoring(true);

		try {
			await restoreHabit(habitId);

			router.navigate('(tabs)/habits');
		} catch (error) {
			Alert.alert('Failed to restore archive.', `Error: ${error}`);
			setIsRestoring(false);
		}
	};
	return (
		<UIButton
			variant='secondary'
			size='sm'
			title='Restore'
			iconName='ArchiveRestore'
			style={style}
			onPress={handleHabitRestore}
			disabled={isRestoring}
			isLoading={isRestoring}
		/>
	);
};

export default RestoreArchiveButton;
