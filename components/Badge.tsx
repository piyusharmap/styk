import {
	Pressable,
	PressableProps,
	StyleProp,
	StyleSheet,
	TextStyle,
	ViewStyle,
} from 'react-native';
import UIText from './ui/UIText';
import useTheme from '../theme/useTheme';
import Icon, { IconType } from './icon';

const Badge = ({
	children,
	isPressable = false,
	icon,
	color,
	badgeStyle,
	textStyle,
	...props
}: PressableProps & {
	children?: React.ReactNode;
	isPressable?: boolean;
	icon?: IconType;
	color?: string;
	textColor?: string;
	badgeStyle?: StyleProp<ViewStyle>;
	textStyle?: StyleProp<TextStyle>;
}) => {
	const { colors } = useTheme();

	return (
		<Pressable
			style={({ pressed }) => [
				{
					backgroundColor: colors.foreground,
				},
				pressed && isPressable && styles.badgePressed,
				styles.badge,
				badgeStyle,
			]}
			{...props}>
			{icon && <Icon name={icon} size={12} color={color || colors.text} />}

			{children && <UIText style={[textStyle, styles.title]}>{children}</UIText>}
		</Pressable>
	);
};

export default Badge;

const styles = StyleSheet.create({
	// container styles
	badge: {
		height: 20,
		paddingHorizontal: 8,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 4,
		borderRadius: 10,
	},
	badgePressed: {
		opacity: 0.8,
	},

	// text styles
	title: {
		fontSize: 10,
		fontWeight: '600',
	},
});
