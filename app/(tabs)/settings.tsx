import { StyleSheet, View } from "react-native";
import UIView from "../../components/ui/UIView";
import { useHabitStore } from "../../store/habitStore";
import UIButton from "../../components/ui/UIButton";
import {
	PageHeader,
	PageHeading,
	PageSubHeading,
} from "../../components/layout/PageHeader";
import { SETTINGS_PAGE_SUBHEADING } from "../../constants/messages";

const SettingsTab = () => {
	const reset = useHabitStore((s) => s.reset);
	return (
		<UIView style={styles.container} isTopSafe>
			<PageHeader>
				<PageHeading>Settings</PageHeading>
				<PageSubHeading>{SETTINGS_PAGE_SUBHEADING}</PageSubHeading>
			</PageHeader>

			<View style={styles.actionContainer}>
				<UIButton
					variant="danger"
					size="sm"
					title="Reset All Data"
					onPress={reset}
				/>
			</View>
		</UIView>
	);
};

export default SettingsTab;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
		justifyContent: "space-between",
	},
	actionContainer: {
		paddingHorizontal: 16,
		paddingVertical: 10,
	},
});
