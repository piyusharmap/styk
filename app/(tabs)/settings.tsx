import { StyleSheet } from "react-native";
import UIView from "../../components/ui/UIView";
import { Link } from "expo-router";

const SettingsTab = () => {
	return (
		<UIView style={styles.container} isTopSafe>
			<Link href="/login">Login</Link>
			<Link href="/register">Register</Link>
		</UIView>
	);
};

export default SettingsTab;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
