import { FlatList, StyleSheet } from 'react-native';
import UIView from '../../components/ui/UIView';
import { PageHeader, PageHeading, PageSubHeading } from '../../components/layout/PageHeader';
import { ACTIVITY_PAGE_SUBHEADING, EMPTY_ACTIVITY_LIST_MSG } from '../../constants/messages';
import { useHabitStore } from '../../store/habitStore';
import ListEmpty from '../../components/list/ListEmpty';
import ActivityCard from '../../screens/activity/components/ActivityCard';

const ActivityTab = () => {
	const habits = useHabitStore((s) => s.getTodayHabits());
	const activeHabits = habits.filter((habit) => !habit.archived);

	return (
		<UIView style={styles.container}>
			<PageHeader isTopSafe>
				<PageHeading>Activity</PageHeading>
				<PageSubHeading>{ACTIVITY_PAGE_SUBHEADING}</PageSubHeading>
			</PageHeader>

			<FlatList
				data={activeHabits}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.habitsContainer}
				renderItem={({ item }) => {
					return <ActivityCard habit={item} />;
				}}
				ListEmptyComponent={<ListEmpty message={EMPTY_ACTIVITY_LIST_MSG} />}
			/>
		</UIView>
	);
};

export default ActivityTab;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
	},
	habitsContainer: {
		paddingHorizontal: 12,
		paddingTop: 10,
		paddingBottom: 60,
		gap: 10,
	},
});
