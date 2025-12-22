import { StyleSheet } from "react-native";
import UIView from "../../components/ui/UIView";
import UIText from "../../components/ui/UIText";

const HabitsTab = () => {
	return (
		<UIView style={styles.container} isTopSafe>
			<UIText>Habits Page</UIText>
		</UIView>
	);
};

export default HabitsTab;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
