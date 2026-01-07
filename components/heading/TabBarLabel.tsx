import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import UIText from '../ui/UIText';

const TabBarLabel = ({ label, style }: { label: string; style?: StyleProp<TextStyle> }) => {
	return <UIText style={[styles.label, style]}>{label}</UIText>;
};

export default TabBarLabel;

const styles = StyleSheet.create({
	// text styles
	label: {
		padding: 2,
		fontSize: 10,
	},
});
