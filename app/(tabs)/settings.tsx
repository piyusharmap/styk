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
import UISwitch from "../../components/ui/UISwitch";
import SettingOption from "../../screens/settings/components/SettingOption";
import SettingsSection from "../../screens/settings/components/SettingsSection";
import { useUserStore } from "../../store/userStore";
import { ThemeMode } from "../../types/userTypes";

const SettingsTab = () => {
	const setPreferences = useUserStore((s) => s.setPreferences);
	const mode = useUserStore((s) => s.preferences.themeMode);

	const setMode = (newMode: ThemeMode) => {
		setPreferences({ themeMode: newMode });
	};

	const resetPreferences = useUserStore((s) => s.resetPreferences);
	const resetData = useHabitStore((s) => s.resetData);

	return (
		<UIView style={styles.container} isTopSafe>
			<PageHeader>
				<PageHeading>Settings</PageHeading>
				<PageSubHeading>{SETTINGS_PAGE_SUBHEADING}</PageSubHeading>
			</PageHeader>

			<ScrollView contentContainerStyle={styles.settingsContainer}>
				<SettingsSection title="Preferences">
					<SettingOption title="Dark Mode">
						<UISwitch
							value={mode === "dark"}
							onChange={(value) =>
								setMode(value ? "dark" : "light")
							}
						/>
					</SettingOption>

					<SettingOption title="Reset Preferences">
						<UIButton
							variant="secondary"
							size="sm"
							title="Reset"
							iconName="refresh"
							onPress={resetPreferences}
						/>
					</SettingOption>
				</SettingsSection>

				<SettingsSection title="Account">
					<SettingOption title="Delete All Data">
						<UIButton
							variant="danger"
							size="sm"
							title="Delete"
							iconName="trash"
							onPress={resetData}
						/>
					</SettingOption>
				</SettingsSection>

				<SettingsSection title="App Info">
					<SettingOption title="Version">
						<></>
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
		gap: 4,
	},
	settingsContainer: {
		gap: 4,
		paddingBottom: 40,
	},
});
