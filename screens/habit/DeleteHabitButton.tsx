import { Alert, StyleProp, ViewStyle } from "react-native";
import UIButton from "../../components/ui/UIButton";
import { useState } from "react";
import { useHabitStore } from "../../store/habitStore";
import { useRouter } from "expo-router";

const DeleteHabitButton = ({
	habitId,
	style,
}: {
	habitId: string;
	style?: StyleProp<ViewStyle>;
}) => {
	const [isDeleting, setIsDeleting] = useState<boolean>(false);

	const router = useRouter();
	const deleteHabit = useHabitStore((s) => s.deleteHabit);

	const handleHabitDelete = async () => {
		setIsDeleting(true);

		try {
			await deleteHabit(habitId);

			router.navigate("(tabs)/habits");
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
			title="Delete"
			iconName="trash"
			style={style}
			onPress={handleHabitDelete}
			disabled={isDeleting}
			isLoading={isDeleting}
		/>
	);
};

export default DeleteHabitButton;
