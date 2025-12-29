import { FlatList, StyleSheet, View } from "react-native";
import UIView from "../../components/ui/UIView";
import { useHabitStore } from "../../store/habitStore";
import HabitTodayCard from "../../screens/today/components/HabitTodayCard";
import ListEmpty from "../../components/list/ListEmpty";
import ListHeader from "../../components/list/ListHeader";
import { getGreeting } from "../../utils/getGreeting";
import {
	PageHeader,
	PageHeading,
	PageSubHeading,
} from "../../components/layout/PageHeader";
import Badge from "../../components/Badge";
import { EMPTY_TODAY_LIST_MSG } from "../../constants/messages";

const TodayTab = () => {
	const habits = useHabitStore((s) => s.getTodayHabits());
	const greeting = getGreeting();

	const todayDate = new Date().toLocaleDateString("en-US", {
		weekday: "long",
		month: "short",
		day: "numeric",
		year: "numeric",
	});

	return (
		<UIView style={styles.container} isTopSafe>
			<View style={styles.dateContainer}>
				<Badge title={todayDate} icon="today" />
			</View>

			<PageHeader style={{ paddingTop: 0 }}>
				<PageHeading>Today</PageHeading>
				<PageSubHeading>{greeting}</PageSubHeading>
			</PageHeader>

			<FlatList
				data={habits}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.habitsContainer}
				ListHeaderComponent={<ListHeader heading="Today's Tasks" />}
				renderItem={({ item }) => {
					return <HabitTodayCard key={item.id} habit={item} />;
				}}
				ListEmptyComponent={
					<ListEmpty message={EMPTY_TODAY_LIST_MSG} />
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
	},
	dateContainer: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	habitsContainer: {
		paddingHorizontal: 16,
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
