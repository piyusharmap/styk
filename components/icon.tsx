/*eslint-disable import/namespace*/
import * as icons from 'lucide-react-native';
import useTheme from '../theme/useTheme';

export type IconType = keyof typeof icons;

const Icon = ({
	name,
	color,
	size,
	fillColor,
	isFilled = false,
}: {
	name: IconType;
	color?: string;
	size?: number;
	fillColor?: string;
	isFilled?: boolean;
}) => {
	const LucideIcon = icons[name] as React.ElementType;

	const { colors } = useTheme();

	if (!LucideIcon) return null;

	const iconColor = color || colors.text;

	return (
		<LucideIcon
			color={iconColor}
			size={size}
			fill={isFilled ? fillColor || iconColor : 'none'}
		/>
	);
};

export default Icon;
