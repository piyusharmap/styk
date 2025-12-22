import UIView from "../../components/ui/UIView";
import UIText from "../../components/ui/UIText";
import { StyleSheet } from "react-native";

const RegisterPage = () => {
	return (
		<UIView style={styles.container} isBottomSafe>
			<UIText isSecondary>Register Page</UIText>
		</UIView>
	);
};

export default RegisterPage;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
