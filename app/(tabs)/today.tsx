import { FlatList, StyleSheet, View } from "react-native";
import UIView from "../../components/ui/UIView";
import { useHabitStore } from "../../store/habitStore";
import HabitTodayCard from "../../screens/today/components/HabitTodayCard";
import UIText from "../../components/ui/UIText";
import GreetingCard from "../../screens/today/components/GreetingCard";

const TodayTab = () => {
	const habits = useHabitStore((s) => s.getTodayHabits());

	return (
		<UIView style={styles.container} isTopSafe>
			<View style={styles.greetingContainer}>
				<GreetingCard />
			</View>

			<FlatList
				data={habits}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.habitsContainer}
				ListHeaderComponent={() => {
					return (
						<View style={styles.listHeader}>
							<UIText style={styles.listHeading}>
								Today's Tasks
							</UIText>
						</View>
					);
				}}
				renderItem={({ item }) => {
					return <HabitTodayCard key={item.id} habit={item} />;
				}}
				ListEmptyComponent={
					<View style={styles.messageContainer}>
						<UIText style={styles.message} isSecondary>
							No habits for today.
						</UIText>
					</View>
				}
			/>
		</UIView>
	);
};

export default TodayTab;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
		gap: 12,
	},
	greetingContainer: {
		paddingHorizontal: 12,
		paddingTop: 20,
		paddingBottom: 10,
	},
	habitsContainer: {
		paddingHorizontal: 16,
		paddingBottom: 20,
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
