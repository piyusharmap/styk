import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import UIText from '../ui/UIText';
import useTheme from '../../theme/useTheme';

const NavigationHeading = ({
	title,
	tint,
	style,
}: {
	title: string;
	tint?: string;
	style?: StyleProp<TextStyle>;
}) => {
	const { colors } = useTheme();

	return (
		<UIText style={[{ color: tint || colors.navText }, styles.title, style]}>{title}</UIText>
	);
};

export default NavigationHeading;

const styles = StyleSheet.create({
	// text styles
	title: {
		padding: 10,
		fontSize: 18,
		fontWeight: '500',
	},
});
