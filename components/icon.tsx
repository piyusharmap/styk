import * as icons from "lucide-react-native";

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

	if (!LucideIcon) return null;

	return (
		<>
			{isFilled ? (
				<LucideIcon color={color} size={size} fill={color} />
			) : (
				<LucideIcon color={color} size={size} />
			)}
		</>
	);
};

export default Icon;
