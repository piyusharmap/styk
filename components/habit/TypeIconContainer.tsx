import { View, StyleSheet } from 'react-native';
import Icon, { IconType } from '../icon';

const TypeIconContainer = ({ icon, color }: { icon: IconType; color?: string }) => {
	return (
		<View style={[{ backgroundColor: color + '50' }, styles.iconContainer]}>
			<Icon name={icon} size={24} color={color} />
		</View>
	);
};

export default TypeIconContainer;

const styles = StyleSheet.create({
	// container styles
	iconContainer: {
		height: 40,
		width: 40,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
	},
});
