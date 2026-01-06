import { Alert, StyleProp, ViewStyle } from "react-native";
import UIButton from "../../components/ui/UIButton";
import { useState } from "react";
import { useHabitStore } from "../../store/habitStore";
import { useRouter } from "expo-router";

const ArchiveHabitButton = ({
	habitId,
	style,
}: {
	habitId: string;
	style?: StyleProp<ViewStyle>;
}) => {
	const [isDeleting, setIsDeleting] = useState<boolean>(false);

	const router = useRouter();
	const archiveHabit = useHabitStore((s) => s.archiveHabit);

	const handleHabitDelete = async () => {
		setIsDeleting(true);

		try {
			await archiveHabit(habitId);

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
			variant="secondary"
			title="Archive"
			iconName="Archive"
			style={style}
			onPress={handleHabitDelete}
			disabled={isDeleting}
			isLoading={isDeleting}
		/>
	);
};

export default ArchiveHabitButton;
