import { View, StyleProp, ViewStyle, ViewProps } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useThemeColor from "../../theme/useThemeColor";

const UIView = ({
	children,
	isTopSafe = false,
	isBottomSafe = false,
	style,
	...props
}: ViewProps & {
	children: React.ReactNode;
	isTopSafe?: boolean;
	isBottomSafe?: boolean;
	style?: StyleProp<ViewStyle>;
}) => {
	const colors = useThemeColor();

	const insets = useSafeAreaInsets();

	return (
		<View
			style={[
				style,
				{
					backgroundColor: colors.background,
				},
				isTopSafe && { paddingTop: insets.top },
				isBottomSafe && { paddingBottom: insets.bottom },
			]}
			{...props}
		>
			{children}
		</View>
	);
};

export default UIView;
