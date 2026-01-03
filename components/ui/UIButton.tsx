import {
	PressableProps,
	StyleProp,
	ViewStyle,
	Pressable,
	StyleSheet,
} from "react-native";
import UIText from "./UIText";
import { Ionicons } from "@expo/vector-icons";
import useTheme from "../../theme/useTheme";
import UILoader from "./UILoader";
import { IonIconType } from "../../types/iconTypes";

type ButtonVariant = "default" | "primary" | "secondary" | "danger" | "success";
type ButtonSize = "sm" | "md" | "lg";

const UIButton = ({
	title,
	variant = "default",
	size = "md",
	iconName,
	isLoading = false,
	isDisabled = false,
	style,
	...props
}: PressableProps & {
	title: string;
	variant?: ButtonVariant;
	size?: ButtonSize;
	iconName?: IonIconType;
	isLoading?: boolean;
	isDisabled?: boolean;
	style?: StyleProp<ViewStyle>;
}) => {
	const { colors } = useTheme();

	const variantColors = {
		default: {
			background: colors.button,
			text: colors.text,
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
		sm: { height: 42, paddingH: 12, font: 14, icon: 16 },
		md: { height: 46, paddingH: 16, font: 16, icon: 20 },
		lg: { height: 50, paddingH: 18, font: 18, icon: 24 },
	};

	const variantColor = variantColors[variant];
	const variantSize = variantSizes[size];

	return (
		<Pressable
			style={({ pressed }) => [
				{
					height: variantSize.height,
					paddingHorizontal: variantSize.paddingH,
					backgroundColor: variantColor.background,
				},
				styles.button,
				pressed && !isDisabled && styles.buttonPressed,
				isDisabled && styles.buttonDisabled,
				style,
			]}
			disabled={isDisabled}
			{...props}
		>
			{iconName && !isLoading && (
				<Ionicons
					name={iconName}
					size={variantSize.icon}
					color={variantColor.text}
				/>
			)}

			{isLoading && (
				<UILoader size={variantSize.icon} color={variantColor.text} />
			)}

			{title && (
				<UIText
					style={[
						{
							fontSize: variantSize.font,
							color: variantColor.text,
						},
					]}
				>
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
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 8,
		borderRadius: 10,
	},
	buttonPressed: {
		opacity: 0.8,
	},
	buttonDisabled: {
		opacity: 0.5,
	},
});
