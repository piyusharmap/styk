import { StyleSheet, View } from "react-native";
import UIView from "../../components/ui/UIView";
import { PageHeader, PageHeading } from "../../components/layout/PageHeader";
import AddHabitButton from "../../screens/habits/components/AddHabitButton";
import { useRouter } from "expo-router";

const HabitsTab = () => {
	const router = useRouter();

	return (
		<UIView style={styles.container} isTopSafe>
			<PageHeader>
				<PageHeading>Your Habits</PageHeading>
			</PageHeader>

			<View style={styles.actionContainer}>
				<AddHabitButton
					onPress={() => router.navigate("create/page")}
				/>
			</View>
		</UIView>
	);
};

export default HabitsTab;

const styles = StyleSheet.create({
	// container styles
	container: {
		position: "relative",
		flex: 1,
	},
	habitsContainer: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		gap: 8,
	},
	actionContainer: {
		position: "absolute",
		padding: 12,
		bottom: 0,
		right: 0,
	},
});
