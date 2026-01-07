import { StyleProp, ViewStyle } from 'react-native';
import UIButton from '../../components/ui/UIButton';
import { useRouter } from 'expo-router';

const UpdateHabitButton = ({
	habitId,
	style,
}: {
	habitId: string;
	style?: StyleProp<ViewStyle>;
}) => {
	const router = useRouter();

	return (
		<UIButton
			variant='primary'
			title='Update'
			iconName='SquarePen'
			style={style}
			onPress={() => router.navigate(`edit/${habitId}`)}
		/>
	);
};

export default UpdateHabitButton;
