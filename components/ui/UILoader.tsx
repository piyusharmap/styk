import {
	ActivityIndicator,
	ActivityIndicatorProps,
	StyleProp,
	ViewStyle,
} from "react-native";
import useThemeColor from "../../theme/useThemeColor";

const UILoader = ({
	size = 18,
	style,
	...props
}: ActivityIndicatorProps & {
	size?: number;
	style?: StyleProp<ViewStyle>;
}) => {
	const colors = useThemeColor();

	return (
		<ActivityIndicator
			size={size}
			style={style}
			color={colors.neutral}
			{...props}
		/>
	);
};

export default UILoader;
