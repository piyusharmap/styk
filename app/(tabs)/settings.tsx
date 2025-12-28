import { StyleSheet } from "react-native";
import UIView from "../../components/ui/UIView";
import { useHabitStore } from "../../store/habitStore";
import UIButton from "../../components/ui/UIButton";

const SettingsTab = () => {
	const reset = useHabitStore((s) => s.reset);
	return (
		<UIView style={styles.container} isTopSafe>
			<UIButton
				variant="danger"
				size="sm"
				title="Reset All Data"
				onPress={reset}
			/>
		</UIView>
	);
};

export default SettingsTab;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
