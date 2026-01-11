import { StyleProp, ViewStyle } from 'react-native';
import UIButton from '../../../components/ui/UIButton';
import { useState } from 'react';
import ArchiveHabitModal from '../../../components/modal/ArchiveHabitModal';

const ArchiveHabitButton = ({
	habitId,
	style,
}: {
	habitId: string;
	style?: StyleProp<ViewStyle>;
}) => {
	const [showModal, setShowModal] = useState<boolean>(false);

	return (
		<>
			<UIButton
				variant='secondary'
				title='Archive'
				iconName='Archive'
				style={style}
				onPress={() => setShowModal(true)}
			/>

			{showModal && (
				<ArchiveHabitModal
					habitId={habitId}
					isVisible={showModal}
					onClose={() => setShowModal(false)}
				/>
			)}
		</>
	);
};

export default ArchiveHabitButton;
