import { StyleSheet, View } from "react-native";
import UIView from "../../components/ui/UIView";
import { PageHeader, PageHeading } from "../../components/layout/PageHeader";
import { useHabitStore } from "../../store/habitStore";
import TodayListCard from "../../screens/today/components/TodayListCard";

const TodayTab = () => {
	const habits = useHabitStore((s) => s.getTodayHabits());

	return (
		<UIView style={styles.container} isTopSafe>
			<PageHeader>
				<PageHeading>Today</PageHeading>
			</PageHeader>

			<View style={styles.habitsContainer}>
				{habits.map((habit) => {
					return <TodayListCard key={habit.id} habit={habit} />;
				})}
			</View>
		</UIView>
	);
};

export default TodayTab;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
	},
	habitsContainer: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		gap: 8,
	},
});
