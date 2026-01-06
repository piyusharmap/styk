import { ScrollView, StyleSheet } from "react-native";
import UIView from "../../components/ui/UIView";
import {
	PageHeader,
	PageHeading,
	PageSubHeading,
} from "../../components/layout/PageHeader";
import { SETTINGS_PAGE_SUBHEADING } from "../../constants/messages";
import UISwitch from "../../components/ui/UISwitch";
import SettingOption from "../../screens/settingsTab/components/SettingOption";
import SettingsSection from "../../screens/settingsTab/components/SettingsSection";
import ResetDataButton from "../../screens/settingsTab/components/ResetDataButton";
import ResetPrefsButton from "../../screens/settingsTab/components/ResetPrefsButton";
import useTheme from "../../theme/useTheme";
import UIButton from "../../components/ui/UIButton";
import { useRouter } from "expo-router";

const SettingsTab = () => {
	const { mode, setMode } = useTheme();
	const router = useRouter();

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
						<ResetPrefsButton />
					</SettingOption>
				</SettingsSection>

				<SettingsSection title="Account">
					<SettingOption title="Delete All Data">
						<ResetDataButton />
					</SettingOption>

					<SettingOption title="Archived Habits">
						<UIButton
							title=""
							size="sm"
							iconName="ArrowRight"
							onPress={() => router.navigate("archive")}
						/>
					</SettingOption>
				</SettingsSection>

				<SettingsSection title="App Info">
					<SettingOption title="About Us">
						<UIButton title="" size="sm" iconName="ArrowRight" />
					</SettingOption>

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
