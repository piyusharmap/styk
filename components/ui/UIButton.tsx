import { PressableProps, StyleProp, ViewStyle, Pressable, StyleSheet } from 'react-native';
import UIText from './UIText';
import useTheme from '../../theme/useTheme';
import UILoader from './UILoader';
import Icon, { IconType } from '../icon';

type ButtonVariant = 'default' | 'primary' | 'secondary' | 'danger' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg';

const UIButton = ({
	title,
	variant = 'default',
	size = 'md',
	iconName,
	iconSize,
	isIconButton = false,
	isLoading = false,
	isDisabled = false,
	style,
	...props
}: PressableProps & {
	title: string;
	variant?: ButtonVariant;
	size?: ButtonSize;
	iconName?: IconType;
	iconSize?: number;
	isIconButton?: boolean;
	isLoading?: boolean;
	isDisabled?: boolean;
	style?: StyleProp<ViewStyle>;
}) => {
	const { colors } = useTheme();

	const variantColors = {
		default: {
			background: colors.neutral,
			text: colors.neutralInverted,
		},
		primary: {
			background: colors.primary,
			text: colors.neutralWhite,
		},
		secondary: {
			background: colors.secondary,
			text: colors.neutralWhite,
		},
		danger: {
			background: colors.danger,
			text: colors.neutralWhite,
		},
		success: {
			background: colors.success,
			text: colors.neutralWhite,
		},
	};

	const variantSizes = {
		sm: { size: 38, paddingH: 10, font: 12, icon: 14 },
		md: { size: 42, paddingH: 12, font: 14, icon: 18 },
		lg: { size: 50, paddingH: 18, font: 16, icon: 24 },
	};

	const variantColor = variantColors[variant];
	const variantSize = variantSizes[size];

	return (
		<Pressable
			style={({ pressed }) => [
				{
					height: variantSize.size,
					paddingHorizontal: variantSize.paddingH,
					backgroundColor: variantColor.background,
				},
				isIconButton && { width: variantSize.size },
				styles.button,
				pressed && !isDisabled && styles.buttonPressed,
				isDisabled && styles.buttonDisabled,
				style,
			]}
			disabled={isDisabled}
			{...props}>
			{iconName && !isLoading && (
				<Icon
					name={iconName}
					size={iconSize || variantSize.icon}
					color={variantColor.text}
				/>
			)}

			{isLoading && <UILoader size={variantSize.icon} color={variantColor.text} />}

			{title && (
				<UIText
					style={[
						{
							fontSize: variantSize.font,
							color: variantColor.text,
						},
						styles.label,
					]}>
					{title}
				</UIText>
			)}
		</Pressable>
	);
};

export default UIButton;

const styles = StyleSheet.create({
	// container styles
	button: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 6,
		borderRadius: 8,
	},
	buttonPressed: {
		opacity: 0.8,
	},
	buttonDisabled: {
		opacity: 0.5,
	},

	// text styles
	label: {
		fontWeight: '500',
	},
});
