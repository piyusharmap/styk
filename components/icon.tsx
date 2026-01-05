import * as icons from "lucide-react-native";

export type IconType = keyof typeof icons;

const Icon = ({
	name,
	color,
	size,
}: {
	name: IconType;
	color?: string;
	size?: number;
}) => {
	const LucideIcon = icons[name] as React.ElementType;

	if (!LucideIcon) return null; // Safety check

	return <LucideIcon color={color} size={size} />;
};

export default Icon;
