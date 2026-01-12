import { SectionList, StyleSheet } from 'react-native';
import UIView from '../../components/ui/UIView';
import { PageHeader, PageHeading, PageSubHeading } from '../../components/layout/PageHeader';
import { ACTIVITY_PAGE_SUBHEADING, EMPTY_ACTIVITY_LIST_MSG } from '../../constants/messages';
import { useHabitStore } from '../../store/habitStore';
import ListEmpty from '../../components/list/ListEmpty';
import ActivityCard from '../../screens/activity/components/ActivityCard';
import ListHeader from '../../components/list/ListHeader';

const ActivityTab = () => {
	const habits = useHabitStore((s) => s.getTodayHabits());
	const activeHabits = habits.filter((habit) => !habit.archived);

	const sections = [
		{
			title: 'Build Activities',
			data: activeHabits.filter((h) => h.target.type === 'count'),
		},
		{
			title: 'Quit Activities',
			data: activeHabits.filter((h) => h.target.type === 'quit'),
		},
	].filter((section) => section.data.length > 0);

	return (
		<UIView style={styles.container}>
			<PageHeader isTopSafe>
				<PageHeading>Activity</PageHeading>
				<PageSubHeading>{ACTIVITY_PAGE_SUBHEADING}</PageSubHeading>
			</PageHeader>

			<SectionList
				sections={sections}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.habitsContainer}
				renderItem={({ item }) => {
					return <ActivityCard habit={item} />;
				}}
				renderSectionHeader={({ section }) => <ListHeader heading={section.title} />}
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
		paddingTop: 20,
		paddingBottom: 80,
		gap: 6,
	},
});
