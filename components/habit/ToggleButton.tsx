import { Pressable, StyleSheet, PressableProps } from 'react-native';
import React from 'react';
import Icon, { IconType } from '../icon';

const ToggleButton = ({
	size = 40,
	color,
	iconName,
	isDisabled = false,
	onPress,
}: PressableProps & {
	size?: number;
	color: string;
	iconName: IconType;
	isDisabled?: boolean;
	onPress: () => void;
}) => {
	return (
		<Pressable
			style={({ pressed }) => [
				{
					height: size,
					width: size,
					backgroundColor: color + '30',
					borderColor: color,
				},
				styles.button,
				pressed && styles.buttonPressed,
				isDisabled && styles.buttonDisabled,
			]}
			onPress={onPress}
			disabled={isDisabled}>
			<Icon name={iconName} size={20} />
		</Pressable>
	);
};

export default ToggleButton;

const styles = StyleSheet.create({
	// container styles
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 6,
		borderWidth: 2,
		borderStyle: 'dashed',
	},
	buttonPressed: {
		transform: [{ scale: 0.95 }],
	},
	buttonDisabled: {
		opacity: 0.6,
	},
});
