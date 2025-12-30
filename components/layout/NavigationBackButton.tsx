import { StyleSheet, Pressable } from "react-native";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useThemeColor from "../../theme/useThemeColor";

const NavigationBackButton = () => {
	const colors = useThemeColor();

	const navigation = useNavigation();

	if (!navigation.canGoBack()) {
		return null;
	}

	return (
		<Pressable style={styles.button} onPress={() => navigation.goBack()}>
			<Ionicons name="arrow-back" size={20} color={colors.navText} />
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
});
