import { Alert, StyleProp, ViewStyle } from "react-native";
import UIButton from "../../components/ui/UIButton";
import { useState } from "react";
import { useHabitStore } from "../../store/habitStore";

const DeleteArchiveButton = ({
	habitId,
	style,
}: {
	habitId: string;
	style?: StyleProp<ViewStyle>;
}) => {
	const [isDeleting, setIsDeleting] = useState<boolean>(false);

	const deleteHabit = useHabitStore((s) => s.deleteHabit);

	const handleHabitDelete = async () => {
		setIsDeleting(true);

		try {
			await deleteHabit(habitId);
		} catch (error) {
			Alert.alert(
				"Operation Failed",
				"Failed to delete habit. Please try again."
			);
		} finally {
			setIsDeleting(false);
		}
	};
	return (
		<UIButton
			variant="danger"
			size="sm"
			title="Delete"
			iconName="Trash2"
			style={style}
			onPress={handleHabitDelete}
			disabled={isDeleting}
			isLoading={isDeleting}
		/>
	);
};

export default DeleteArchiveButton;
