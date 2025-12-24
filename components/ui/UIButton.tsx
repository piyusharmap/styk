import {
	View,
	Text,
	PressableProps,
	StyleProp,
	ViewStyle,
	Pressable,
	StyleSheet,
} from "react-native";
import React from "react";
import UIText from "./UIText";
import { Ionicons } from "@expo/vector-icons";
import useThemeColor from "../../theme/useThemeColor";
import UILoader from "./UILoader";

type ButtonVariant = "default" | "secondary" | "danger" | "success" | "info";
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
	iconName?: keyof typeof Ionicons.glyphMap;
	isLoading?: boolean;
	isDisabled?: boolean;
	style?: StyleProp<ViewStyle>;
}) => {
	const colors = useThemeColor();

	const variantColors = {
		default: colors.primary,
		secondary: colors.secondary,
		danger: colors.danger,
		success: colors.success,
		info: colors.info,
	};

	const variantSizes = {
		sm: { paddingH: 12, paddingV: 8, font: 14, icon: 16 },
		md: { paddingH: 16, paddingV: 12, font: 16, icon: 20 },
		lg: { paddingH: 18, paddingV: 16, font: 18, icon: 24 },
	};

	const variantColor = variantColors[variant];
	const variantSize = variantSizes[size];

	return (
		<Pressable
			style={({ pressed }) => [
				{
					backgroundColor: variantColor + "55",
					paddingHorizontal: variantSize.paddingH,
					paddingVertical: variantSize.paddingV,
					borderColor: variantColor,
				},
				styles.button,
				pressed && !isDisabled && styles.buttonPressed,
				isDisabled && styles.buttonDisabled,
				style,
			]}
			{...props}
		>
			{isLoading ? (
				<UILoader size={variantSize.icon} color={variantColor} />
			) : (
				<>
					{iconName && (
						<Ionicons
							name={iconName}
							size={variantSize.icon}
							color={variantColor}
						/>
					)}
					<UIText
						style={[
							{ fontSize: variantSize.font, color: variantColor },
							styles.title,
						]}
					>
						{title}
					</UIText>
				</>
			)}
		</Pressable>
	);
};

export default UIButton;

const styles = StyleSheet.create({
	// container styles
	button: {
		flexDirection: "row",
		gap: 8,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 4,
		borderWidth: 1,
	},
	buttonPressed: {
		opacity: 0.8,
	},
	buttonDisabled: {
		opacity: 0.5,
	},

	// text styles
	title: {
		fontWeight: "600",
	},
});
