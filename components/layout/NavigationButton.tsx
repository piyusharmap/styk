import { StyleSheet, Pressable } from "react-native";
import useTheme from "../../theme/useTheme";
import Icon, { IconType } from "../icon";

const NavigationButton = ({
	icon,
	tint,
	onPress,
}: {
	icon: IconType;
	tint?: string;
	onPress: () => void;
}) => {
	const { colors } = useTheme();

	return (
		<Pressable
			style={({ pressed }) => [
				styles.button,
				pressed && styles.buttonPressed,
			]}
			onPress={onPress}
		>
			<Icon name={icon} size={20} color={tint || colors.navText} />
		</Pressable>
	);
};

export default NavigationButton;

const styles = StyleSheet.create({
	// container styles
	button: {
		paddingVertical: 10,
		paddingLeft: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonPressed: {
		opacity: 0.8,
	},
});
