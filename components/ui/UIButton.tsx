import {
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
	const colors = useThemeColor();

	const variantColors = {
		default: colors.button,
		primary: colors.primary,
		secondary: colors.secondary,
		danger: colors.danger,
		success: colors.success,
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
					backgroundColor: variantColor,
				},
				styles.button,
				pressed && !isDisabled && styles.buttonPressed,
				isDisabled && styles.buttonDisabled,
				style,
			]}
			{...props}
		>
			{isLoading ? (
				<UILoader size={variantSize.icon} color={colors.text} />
			) : (
				<>
					{iconName && (
						<Ionicons
							name={iconName}
							size={variantSize.icon}
							color={colors.text}
						/>
					)}
					<UIText
						style={[{ fontSize: variantSize.font }, styles.title]}
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

	// text styles
	title: {
		fontWeight: "600",
	},
});
