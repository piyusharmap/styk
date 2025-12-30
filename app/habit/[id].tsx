import { StyleSheet } from "react-native";
import UIView from "../../components/ui/UIView";
import UIText from "../../components/ui/UIText";
import { Stack, useLocalSearchParams } from "expo-router";

const HabitDetailsPage = () => {
	const { id, color } = useLocalSearchParams<{
		id: string;
		color?: string;
	}>();

	return (
		<>
			<Stack.Screen
				options={{ headerStyle: { backgroundColor: color } }}
			/>
			<UIView style={styles.container} isBottomSafe>
				<UIText>{id}</UIText>
			</UIView>
		</>
	);
};

export default HabitDetailsPage;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
