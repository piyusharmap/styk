import { useState } from "react";
import UIButton from "../../../components/ui/UIButton";
import { useHabitStore } from "../../../store/habitStore";
import { Alert } from "react-native";

const ResetDataButton = () => {
	const [isResettingData, setIsResettingData] = useState<boolean>(false);

	const resetData = useHabitStore((s) => s.resetData);

	const handleResetData = async () => {
		setIsResettingData(true);

		try {
			await resetData();
		} catch (error) {
			Alert.alert(
				"Operation Failed",
				"Failed to reset data. Please try again."
			);
		} finally {
			setIsResettingData(false);
		}
	};

	return (
		<UIButton
			variant="danger"
			size="sm"
			title="Delete"
			iconName="Trash"
			onPress={handleResetData}
			isDisabled={isResettingData}
			isLoading={isResettingData}
		/>
	);
};

export default ResetDataButton;
