import { FlatList, StyleSheet, View } from "react-native";
import UIView from "../../components/ui/UIView";
import { useHabitStore } from "../../store/habitStore";
import HabitTodayCard from "../../screens/todayTab/components/HabitTodayCard";
import ListEmpty from "../../components/list/ListEmpty";
import ListHeader from "../../components/list/ListHeader";
import { getGreeting } from "../../utils/greeting";
import {
	PageHeader,
	PageHeading,
	PageSubHeading,
} from "../../components/layout/PageHeader";
import Badge from "../../components/Badge";
import { EMPTY_TODAY_LIST_MSG } from "../../constants/messages";
import ListContainer from "../../components/list/ListContainer";

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
			<PageHeader>
				<PageHeading>Today</PageHeading>
				<PageSubHeading>{greeting}</PageSubHeading>
			</PageHeader>

			<View style={styles.dateContainer}>
				<Badge title={todayDate} icon="calendar-clear-outline" />
			</View>

			<ListContainer>
				<ListHeader heading="Today's Tasks" />

				<FlatList
					data={habits}
					keyExtractor={(item) => item.id}
					contentContainerStyle={styles.habitsContainer}
					renderItem={({ item }) => {
						return <HabitTodayCard habit={item} />;
					}}
					ListEmptyComponent={
						<ListEmpty message={EMPTY_TODAY_LIST_MSG} />
					}
				/>
			</ListContainer>
		</UIView>
	);
};

export default TodayTab;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
		gap: 4,
	},
	dateContainer: {
		paddingHorizontal: 12,
		paddingVertical: 2,
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	habitsContainer: {
		paddingHorizontal: 12,
		paddingTop: 4,
		paddingBottom: 100,
		gap: 8,
	},
	actionContainer: {
		position: "absolute",
		padding: 12,
		bottom: 0,
		right: 0,
	},
});
