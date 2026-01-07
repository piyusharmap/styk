import { useState } from "react";
import UIButton from "../ui/UIButton";
import { ModalActions, ModalHeading, ModalView, UIModal } from "../ui/UIModal";
import { useHabitStore } from "../../store/habitStore";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import UIText from "../ui/UIText";

const DeleteHabitModal = ({
	habitId,
	isVisible,
	isArchive = false,
	onClose,
}: {
	habitId: string;
	isVisible: boolean;
	isArchive?: boolean;
	onClose: () => void;
}) => {
	const [isDeleting, setIsDeleting] = useState<boolean>(false);

	const router = useRouter();
	const deleteHabit = useHabitStore((s) => s.deleteHabit);

	const handleHabitDelete = async () => {
		setIsDeleting(true);

		try {
			await deleteHabit(habitId);

			{
				!isArchive && router.replace("(tabs)/habits");
			}

			onClose();
		} catch (error) {
			Alert.alert(
				"Operation Failed",
				"Failed to delete habit. Please try again."
			);
			setIsDeleting(false);
		}
	};

	return (
		<UIModal isVisible={isVisible} onClose={onClose}>
			<ModalView>
				<ModalHeading heading="Delete Habit?" />

				<UIText isSecondary>
					This will permanently remove all progress and history. This
					action cannot be undone.
				</UIText>

				<ModalActions>
					<UIButton
						size="sm"
						title="Cancel"
						onPress={onClose}
						isDisabled={isDeleting}
					/>

					<UIButton
						variant="danger"
						size="sm"
						title="Yes, Delete"
						iconName="Trash2"
						onPress={handleHabitDelete}
						isDisabled={isDeleting}
						isLoading={isDeleting}
					/>
				</ModalActions>
			</ModalView>
		</UIModal>
	);
};

export default DeleteHabitModal;
