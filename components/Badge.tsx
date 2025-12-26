import {
	Pressable,
	PressableProps,
	StyleProp,
	StyleSheet,
	ViewStyle,
} from "react-native";
import UIText from "./ui/UIText";
import useThemeColor from "../theme/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { IonIconType } from "../types/iconTypes";

const Badge = ({
	title,
	isPressable = false,
	style,
	icon,
	...props
}: PressableProps & {
	title: string;
	isPressable?: boolean;
	icon?: IonIconType;
	style?: StyleProp<ViewStyle>;
}) => {
	const colors = useThemeColor();

	return (
		<Pressable
			style={({ pressed }) => [
				{
					backgroundColor: colors.secondary + "50",
					borderColor: colors.secondary,
				},
				pressed && isPressable && styles.badgePressed,
				styles.badge,
				style,
			]}
			{...props}
		>
			{icon && <Ionicons name={icon} size={14} color={colors.neutral} />}
			<UIText style={styles.title}>{title}</UIText>
		</Pressable>
	);
};

export default Badge;

const styles = StyleSheet.create({
	// container styles
	badge: {
		paddingHorizontal: 8,
		paddingVertical: 2,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 4,
		borderWidth: 0.5,
		borderRadius: 8,
	},
	badgePressed: {
		opacity: 0.8,
	},

	// text styles
	title: {
		fontSize: 12,
	},
});
