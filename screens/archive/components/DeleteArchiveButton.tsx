import { StyleProp, ViewStyle } from 'react-native';
import UIButton from '../../../components/ui/UIButton';
import { useState } from 'react';
import DeleteHabitModal from '../../../components/modal/DeleteHabitModal';

const DeleteArchiveButton = ({
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
				variant='danger'
				title=''
				iconName='Trash2'
				isIconButton
				style={style}
				onPress={() => setShowModal(true)}
			/>

			{showModal && (
				<DeleteHabitModal
					habitId={habitId}
					isVisible={showModal}
					isArchive
					onClose={() => setShowModal(false)}
				/>
			)}
		</>
	);
};

export default DeleteArchiveButton;
