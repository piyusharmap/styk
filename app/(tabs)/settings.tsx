import { ScrollView, StyleSheet } from "react-native";
import UIView from "../../components/ui/UIView";
import { useHabitStore } from "../../store/habitStore";
import UIButton from "../../components/ui/UIButton";
import {
	PageHeader,
	PageHeading,
	PageSubHeading,
} from "../../components/layout/PageHeader";
import { SETTINGS_PAGE_SUBHEADING } from "../../constants/messages";
import { useTheme } from "../../contexts/ThemeContext";
import UISwitch from "../../components/ui/UISwitch";
import SettingOption from "../../screens/settings/components/SettingOption";
import SettingsSection from "../../screens/settings/components/SettingsSection";

const SettingsTab = () => {
	const { mode, setMode } = useTheme();
	const reset = useHabitStore((s) => s.reset);

	return (
		<UIView style={styles.container} isTopSafe>
			<PageHeader>
				<PageHeading>Settings</PageHeading>
				<PageSubHeading>{SETTINGS_PAGE_SUBHEADING}</PageSubHeading>
			</PageHeader>

			<ScrollView style={styles.settingsContainer}>
				<SettingsSection title="Application">
					<SettingOption title="Dark Mode">
						<UISwitch
							value={mode === "dark"}
							onChange={(value) =>
								setMode(value ? "dark" : "light")
							}
						/>
					</SettingOption>

					<SettingOption title="Week Start">
						<></>
					</SettingOption>

					<SettingOption title="Timer Default">
						<></>
					</SettingOption>
				</SettingsSection>

				<SettingsSection title="Account">
					<SettingOption title="Reset All Data">
						<UIButton
							variant="danger"
							size="sm"
							title="Reset Data"
							onPress={reset}
							isDisabled
						/>
					</SettingOption>
				</SettingsSection>
			</ScrollView>
		</UIView>
	);
};

export default SettingsTab;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
	},
	settingsContainer: {
		gap: 2,
	},
});
