import { StyleSheet, View } from 'react-native';
import UIText from '../../../components/ui/UIText';
import useTheme from '../../../theme/useTheme';

const SettingOption = ({ title, children }: { title: string; children: React.ReactNode }) => {
	const { colors } = useTheme();

	return (
		<View
			style={[
				{
					backgroundColor: colors.foreground,
					borderColor: colors.border,
				},
				styles.settingOption,
			]}>
			<UIText style={styles.title}>{title}</UIText>

			<View style={styles.actionContainer}>{children}</View>
		</View>
	);
};

export default SettingOption;

const styles = StyleSheet.create({
	// container styles
	settingOption: {
		height: 60,
		paddingHorizontal: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 10,
		borderRadius: 10,
	},
	actionContainer: {
		flexShrink: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 8,
	},

	// text styles
	title: {
		fontSize: 16,
	},
});
