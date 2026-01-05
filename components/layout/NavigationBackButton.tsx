import { StyleSheet, Pressable } from "react-native";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useTheme from "../../theme/useTheme";

const NavigationBackButton = ({ tint }: { tint?: string }) => {
	const { colors } = useTheme();

	const navigation = useNavigation();

	if (!navigation.canGoBack()) {
		return null;
	}

	return (
		<Pressable
			style={({ pressed }) => [
				styles.button,
				pressed && styles.buttonPressed,
			]}
			onPress={() => navigation.goBack()}
		>
			<Ionicons
				name="arrow-back"
				size={20}
				color={tint || colors.navText}
			/>
		</Pressable>
	);
};

export default NavigationBackButton;

const styles = StyleSheet.create({
	// container styles
	button: {
		padding: 0,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonPressed: {
		opacity: 0.8,
	},
});
