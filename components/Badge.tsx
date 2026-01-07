import { Pressable, PressableProps, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import UIText from './ui/UIText';
import useTheme from '../theme/useTheme';
import Icon, { IconType } from './icon';

const Badge = ({
	title,
	isPressable = false,
	style,
	icon,
	...props
}: PressableProps & {
	title: string;
	isPressable?: boolean;
	icon?: IconType;
	style?: StyleProp<ViewStyle>;
}) => {
	const { colors } = useTheme();

	return (
		<Pressable
			style={({ pressed }) => [
				{
					backgroundColor: colors.secondary + '50',
					borderColor: colors.secondary,
				},
				pressed && isPressable && styles.badgePressed,
				styles.badge,
				style,
			]}
			{...props}>
			{icon && <Icon name={icon} size={14} color={colors.text} />}

			{title !== '' && <UIText style={styles.title}>{title}</UIText>}
		</Pressable>
	);
};

export default Badge;

const styles = StyleSheet.create({
	// container styles
	badge: {
		paddingHorizontal: 8,
		paddingVertical: 3,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 4,
		borderWidth: 0.5,
		borderRadius: 6,
	},
	badgePressed: {
		opacity: 0.8,
	},

	// text styles
	title: {
		fontSize: 12,
	},
});
