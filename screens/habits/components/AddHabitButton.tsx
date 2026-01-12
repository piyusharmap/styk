import { PressableProps, Pressable, StyleSheet } from 'react-native';
import useTheme from '../../../theme/useTheme';
import Icon from '../../../components/icon';

const AddHabitButton = ({ ...props }: PressableProps) => {
	const { colors } = useTheme();

	return (
		<Pressable
			style={({ pressed }) => [
				{
					backgroundColor: colors.primary,
				},
				styles.button,
				pressed && styles.buttonPressed,
			]}
			{...props}>
			<Icon name='Plus' size={32} color={colors.neutralInverted} />
		</Pressable>
	);
};

export default AddHabitButton;

const styles = StyleSheet.create({
	// container styles
	button: {
		height: 64,
		width: 64,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 32,

		// android shadow
		elevation: 2,

		// ios shadow
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.4,
		shadowRadius: 1,
	},
	buttonPressed: {
		transform: [{ scale: 0.95 }],
		opacity: 0.8,
	},
	buttonDisabled: {
		opacity: 0.5,
	},
});
