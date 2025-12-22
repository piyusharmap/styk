import UIView from "../../components/ui/UIView";
import UIText from "../../components/ui/UIText";
import { StyleSheet } from "react-native";

const LoginPage = () => {
	return (
		<UIView style={styles.container} isBottomSafe>
			<UIText isSecondary>Login Page</UIText>
		</UIView>
	);
};

export default LoginPage;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
