import { Pressable, StyleSheet, View } from 'react-native';
import UIText from '../../../components/ui/UIText';
import { useState } from 'react';
import useTheme from '../../../theme/useTheme';
import Icon from '../../../components/icon';

const SettingsSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
	const [showOptions, setShowOptions] = useState<boolean>(true);

	const { colors } = useTheme();

	return (
		<View style={styles.section}>
			<Pressable
				style={styles.headingContainer}
				onPress={() => setShowOptions((prev) => !prev)}>
				<UIText style={styles.heading}>{title}</UIText>

				<Icon
					name={showOptions ? 'ChevronDown' : 'ChevronRight'}
					size={14}
					color={colors.accent}
				/>
			</Pressable>

			{showOptions && <View style={styles.settingsContainer}>{children}</View>}
		</View>
	);
};

export default SettingsSection;

const styles = StyleSheet.create({
	// container styles
	section: {
		paddingHorizontal: 12,
		paddingVertical: 4,
	},
	headingContainer: {
		paddingHorizontal: 2,
		paddingVertical: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 10,
	},
	settingsContainer: {
		gap: 4,
	},

	// text styles
	heading: {
		fontSize: 14,
	},
});
