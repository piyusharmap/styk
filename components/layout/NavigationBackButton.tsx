import { StyleSheet, Pressable } from 'react-native';
import { useNavigation } from 'expo-router';
import useTheme from '../../theme/useTheme';
import Icon from '../icon';

const NavigationBackButton = ({ tint }: { tint?: string }) => {
	const { colors } = useTheme();

	const navigation = useNavigation();

	if (!navigation.canGoBack()) {
		return null;
	}

	return (
		<Pressable
			style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
			onPress={() => navigation.goBack()}>
			<Icon name='ArrowLeft' size={20} color={tint || colors.navText} />
		</Pressable>
	);
};

export default NavigationBackButton;

const styles = StyleSheet.create({
	// container styles
	button: {
		paddingVertical: 10,
		paddingRight: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonPressed: {
		opacity: 0.8,
	},
});
