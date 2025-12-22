import { StyleSheet } from "react-native";
import UIView from "../../components/ui/UIView";
import UIText from "../../components/ui/UIText";

const TodayTab = () => {
	return (
		<UIView style={styles.container} isTopSafe>
			<UIText>Today Page</UIText>
		</UIView>
	);
};

export default TodayTab;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
