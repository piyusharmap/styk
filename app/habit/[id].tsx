import { StyleSheet, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useHabitStore } from "../../store/habitStore";
import UIView from "../../components/ui/UIView";
import useTheme from "../../theme/useTheme";
import DeleteHabitButton from "../../screens/habit/DeleteHabitButton";
import UIText from "../../components/ui/UIText";
import UpdateHabitButton from "../../screens/habit/UpdateHabitButton";

const HabitDetailsPage = () => {
	const { id, color } = useLocalSearchParams<{
		id: string;
		color?: string;
	}>();

	const { colors } = useTheme();
	const habitDetails = useHabitStore((s) => s.getHabitDetails(id));

	return (
		<>
			<Stack.Screen
				options={{ headerStyle: { backgroundColor: color } }}
			/>

			<UIView style={styles.container} isBottomSafe>
				<View style={styles.content}>
					<UIText>{habitDetails?.name}</UIText>
				</View>

				<View
					style={[
						{ borderColor: colors.border },
						styles.actionContainer,
					]}
				>
					<DeleteHabitButton
						habitId={id}
						style={styles.actionButton}
					/>

					<UpdateHabitButton
						habitId={id}
						style={styles.actionButton}
					/>
				</View>
			</UIView>
		</>
	);
};

export default HabitDetailsPage;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		paddingHorizontal: 12,
		paddingVertical: 10,
	},
	actionContainer: {
		paddingHorizontal: 12,
		paddingVertical: 12,
		flexDirection: "row",
		gap: 10,
		borderTopWidth: 1,
	},
	actionButton: {
		flex: 1,
	},
});
