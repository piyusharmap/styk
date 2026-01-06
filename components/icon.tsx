import * as icons from "lucide-react-native";
import useTheme from "../theme/useTheme";

export type IconType = keyof typeof icons;

const Icon = ({
	name,
	color,
	size,
	isFilled = false,
}: {
	name: IconType;
	color?: string;
	size?: number;
	isFilled?: boolean;
}) => {
	const LucideIcon = icons[name] as React.ElementType;

	const { colors } = useTheme();

	if (!LucideIcon) return null;

	return (
		<>
			{isFilled ? (
				<LucideIcon
					color={color || colors.text}
					size={size}
					fill={color}
				/>
			) : (
				<LucideIcon color={color || colors.text} size={size} />
			)}
		</>
	);
};

export default Icon;
