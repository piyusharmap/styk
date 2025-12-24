import { StyleProp, Text, TextProps, TextStyle } from "react-native";
import useThemeColor from "../../theme/useThemeColor";

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
	const colors = useThemeColor();

	const textColor = isSecondary ? colors.textSecondary : colors.text;

	return (
		<Text style={[{ color: textColor }, style]} {...props}>
			{children}
		</Text>
	);
};

export default UIText;
