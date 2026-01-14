import { ScrollView, StyleSheet, View } from 'react-native';
import UIView from '../../components/ui/UIView';
import UISwitch from '../../components/ui/UISwitch';
import SettingOption from '../../screens/settings/components/SettingOption';
import SettingsSection from '../../screens/settings/components/SettingsSection';
import ResetDataButton from '../../screens/settings/components/ResetDataButton';
import ResetPrefsButton from '../../screens/settings/components/ResetPrefsButton';
import useTheme from '../../theme/useTheme';
import UIButton from '../../components/ui/UIButton';
import { useRouter } from 'expo-router';
import UIText from '../../components/ui/UIText';
import { PageHeader, PageHeading, PageSubHeading } from '../../components/layout/PageHeader';
import { SETTINGS_PAGE_SUBHEADING } from '../../constants/messages';
import { version } from '../../package.json';

const SettingsPage = () => {
	const { mode, setMode } = useTheme();

	const router = useRouter();

	return (
		<UIView style={styles.container}>
			<PageHeader isTopSafe>
				<PageHeading>Settings</PageHeading>
				<PageSubHeading>{SETTINGS_PAGE_SUBHEADING}</PageSubHeading>
			</PageHeader>

			<ScrollView contentContainerStyle={styles.settingsContainer}>
				<SettingsSection title='Preferences'>
					<SettingOption title='Dark Mode'>
						<UISwitch
							value={mode === 'dark'}
							onChange={(value) => setMode(value ? 'dark' : 'light')}
						/>
					</SettingOption>

					<SettingOption title='Reset Preferences'>
						<ResetPrefsButton />
					</SettingOption>
				</SettingsSection>

				<SettingsSection title='Data and Storage'>
					<SettingOption title='Archived Habits'>
						<UIButton
							variant='secondary'
							title=''
							size='sm'
							iconName='ArrowRight'
							onPress={() => router.navigate('archive')}
							isIconButton
						/>
					</SettingOption>

					<SettingOption title='Delete All Data'>
						<ResetDataButton />
					</SettingOption>
				</SettingsSection>

				<SettingsSection title='About'>
					<SettingOption title='About Us'>
						<UIButton
							variant='secondary'
							title=''
							size='sm'
							iconName='ArrowRight'
							onPress={() => router.navigate('about')}
							isIconButton
						/>
					</SettingOption>
				</SettingsSection>
			</ScrollView>

			<View style={styles.versionInfo}>
				<UIText style={styles.version} isSecondary>
					Styk, 2026 • Version {version}
				</UIText>
			</View>
		</UIView>
	);
};

export default SettingsPage;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
	},
	logoContainer: {
		marginVertical: 10,
		height: 60,
		width: 60,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 6,
		borderWidth: 2,
		overflow: 'hidden',
	},
	settingsContainer: {
		gap: 10,
		paddingTop: 20,
		paddingBottom: 60,
	},
	versionInfo: {
		paddingVertical: 6,
		justifyContent: 'center',
	},

	// text styles
	version: {
		fontSize: 12,
		textAlign: 'center',
	},
});
