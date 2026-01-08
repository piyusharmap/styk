import UIButton from '../../../components/ui/UIButton';
import { useUserStore } from '../../../store/userStore';

const ResetPrefsButton = () => {
	const resetPreferences = useUserStore((s) => s.resetPreferences);

	return (
		<UIButton
			variant='secondary'
			size='sm'
			title='Reset'
			iconName='RotateCcw'
			onPress={resetPreferences}
		/>
	);
};

export default ResetPrefsButton;
