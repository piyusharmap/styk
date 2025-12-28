import { FlatList, StyleSheet, View } from "react-native";
import UIView from "../../components/ui/UIView";
import AddHabitButton from "../../screens/habits/components/AddHabitButton";
import { useRouter } from "expo-router";
import { useHabitStore } from "../../store/habitStore";
import HabitListCard from "../../screens/habits/components/HabitListCard";
import UIText from "../../components/ui/UIText";

const HabitsTab = () => {
	const router = useRouter();

	const habits = useHabitStore((s) => s.getAllHabits());

	return (
		<UIView style={styles.container} isTopSafe>
			<FlatList
				data={habits}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.habitsContainer}
				ListHeaderComponent={() => {
					return (
						<View style={styles.listHeader}>
							<UIText style={styles.listHeading}>
								Your Habits
							</UIText>
						</View>
					);
				}}
				renderItem={({ item }) => {
					return <HabitListCard key={item.id} habit={item} />;
				}}
				ListEmptyComponent={
					<View style={styles.messageContainer}>
						<UIText style={styles.message} isSecondary>
							Create your first habit to begin
						</UIText>
					</View>
				}
			/>

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
		paddingHorizontal: 16,
		paddingVertical: 20,
		gap: 8,
	},
	listHeader: {
		paddingHorizontal: 2,
		paddingBottom: 2,
	},
	messageContainer: {
		padding: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	actionContainer: {
		position: "absolute",
		padding: 12,
		bottom: 0,
		right: 0,
	},

	// text styles
	listHeading: {
		fontSize: 16,
	},
	message: {
		fontSize: 12,
	},
});
