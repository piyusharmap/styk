import { useState } from 'react';
import UIButton from '../ui/UIButton';
import { ModalActions, ModalHeading, ModalView, UIModal } from '../ui/UIModal';
import { useHabitStore } from '../../store/habitStore';
import { Alert } from 'react-native';
import UIText from '../ui/UIText';

const DeleteDataModal = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => {
	const [isResettingData, setIsResettingData] = useState<boolean>(false);

	const resetData = useHabitStore((s) => s.resetData);

	const handleDataDelete = async () => {
		setIsResettingData(true);

		try {
			await resetData();

			onClose();
		} catch (error) {
			Alert.alert('Operation Failed', 'Failed to reset data. Please try again.');
		} finally {
			setIsResettingData(false);
		}
	};

	return (
		<UIModal isVisible={isVisible} onClose={onClose}>
			<ModalView>
				<ModalHeading heading='Delete All Data?' />

				<UIText isSecondary>
					This will permanently erase all habits, logs, and settings. You cannot undo this
					action or recover your progress later.
				</UIText>

				<ModalActions>
					<UIButton
						size='sm'
						title='Cancel'
						onPress={onClose}
						isDisabled={isResettingData}
					/>

					<UIButton
						variant='danger'
						size='sm'
						title='Yes, Delete'
						iconName='Trash2'
						onPress={handleDataDelete}
						isDisabled={isResettingData}
						isLoading={isResettingData}
					/>
				</ModalActions>
			</ModalView>
		</UIModal>
	);
};

export default DeleteDataModal;
