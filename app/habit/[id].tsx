import { StyleSheet } from "react-native";
import UIView from "../../components/ui/UIView";
import UIText from "../../components/ui/UIText";
import { Stack, useLocalSearchParams } from "expo-router";
import { useHabitStore } from "../../store/habitStore";

const HabitDetailsPage = () => {
	const { id, color } = useLocalSearchParams<{
		id: string;
		color?: string;
	}>();

	const habitDetails = useHabitStore((s) => s.getHabitDetails(id));

	return (
		<>
			<Stack.Screen
				options={{ headerStyle: { backgroundColor: color } }}
			/>
			<UIView style={styles.container} isBottomSafe>
				<UIText>{habitDetails?.name}</UIText>
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
