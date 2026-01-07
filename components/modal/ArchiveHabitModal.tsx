import { useState } from "react";
import UIButton from "../ui/UIButton";
import { ModalActions, ModalHeading, ModalView, UIModal } from "../ui/UIModal";
import { useHabitStore } from "../../store/habitStore";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import UIText from "../ui/UIText";

const ArchiveHabitModal = ({
	habitId,
	isVisible,
	onClose,
}: {
	habitId: string;
	isVisible: boolean;
	onClose: () => void;
}) => {
	const [isArchiving, setIsArchiving] = useState<boolean>(false);

	const router = useRouter();
	const archiveHabit = useHabitStore((s) => s.archiveHabit);

	const handleHabitArchive = async () => {
		setIsArchiving(true);

		try {
			await archiveHabit(habitId);

			router.replace("(tabs)/habits");
			onClose();
		} catch (error) {
			Alert.alert(
				"Operation Failed",
				"Failed to archive habit. Please try again."
			);
			setIsArchiving(false);
		}
	};

	return (
		<UIModal isVisible={isVisible} onClose={onClose}>
			<ModalView>
				<ModalHeading heading="Archive Habit?" />

				<UIText isSecondary>
					Safely store your progress and logs. Archiving removes the
					habit from view but preserves your data.
				</UIText>

				<ModalActions>
					<UIButton
						size="sm"
						title="Cancel"
						onPress={onClose}
						isDisabled={isArchiving}
					/>

					<UIButton
						variant="secondary"
						size="sm"
						title="Yes, Archive"
						iconName="Archive"
						onPress={handleHabitArchive}
						isDisabled={isArchiving}
						isLoading={isArchiving}
					/>
				</ModalActions>
			</ModalView>
		</UIModal>
	);
};

export default ArchiveHabitModal;
