import {
	StyleProp,
	StyleSheet,
	Text,
	TextProps,
	TextStyle,
} from "react-native";
import useTheme from "../../theme/useTheme";
import { DM_SANS } from "../../theme/fonts";

const UIText = ({
	children,
	isSecondary,
	style,
	...props
}: TextProps & {
	children: React.ReactNode;
	isSecondary?: boolean;
	style?: StyleProp<TextStyle>;
}) => {
	const { colors } = useTheme();

	const flat = StyleSheet.flatten(style) || {};
	const weight = flat.fontWeight?.toString() || "400";
	const italic = flat.fontStyle === "italic";

	const fontFamily =
		DM_SANS[italic ? "italic" : "normal"][weight] ?? DM_SANS.normal["400"];

	const textColor = isSecondary ? colors.textSecondary : colors.text;

	const cleanedStyle = {
		...flat,
		fontFamily,
		fontWeight: undefined,
		fontStyle: undefined,
		color: flat.color || textColor,
	};

	return (
		<Text style={cleanedStyle} {...props}>
			{children}
		</Text>
	);
};

export default UIText;
