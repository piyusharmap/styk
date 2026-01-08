import { SectionList, StyleSheet, View } from 'react-native';
import UIView from '../../components/ui/UIView';
import { useHabitStore } from '../../store/habitStore';
import ListEmpty from '../../components/list/ListEmpty';
import ListHeader from '../../components/list/ListHeader';
import { PageHeader, PageHeading, PageSubHeading } from '../../components/layout/PageHeader';
import { EMPTY_HABITS_LIST_MSG, HABITS_PAGE_SUBHEADING } from '../../constants/messages';
import { useRouter } from 'expo-router';
import HabitListCard from '../../screens/habitsTab/components/HabitListCard';
import AddHabitButton from '../../screens/habitsTab/components/AddHabitButton';

const HabitsTab = () => {
	const router = useRouter();
	const habits = useHabitStore((s) => s.getTodayHabits());
	const activeHabits = habits.filter((habit) => !habit.archived);

	const todayDate = new Date().toLocaleDateString('en-US', {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
	});

	const sections = [
		{
			title: 'Build Habits',
			data: activeHabits.filter((h) => h.target.type === 'count'),
		},
		{
			title: 'Quit Habits',
			data: activeHabits.filter((h) => h.target.type === 'quit'),
		},
	].filter((section) => section.data.length > 0);

	return (
		<UIView style={styles.container} isTopSafe>
			<PageHeader>
				<PageHeading>Habits</PageHeading>
				<PageSubHeading>{HABITS_PAGE_SUBHEADING}</PageSubHeading>
			</PageHeader>

			<SectionList
				sections={sections}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.habitsContainer}
				renderItem={({ item }) => {
					return <HabitListCard habit={item} />;
				}}
				renderSectionHeader={({ section }) => (
					<View style={styles.sectionHeader}>
						<ListHeader heading={section.title} />
					</View>
				)}
				ListEmptyComponent={<ListEmpty message={EMPTY_HABITS_LIST_MSG} />}
			/>

			<View style={styles.actionContainer}>
				<AddHabitButton onPress={() => router.navigate('create')} />
			</View>
		</UIView>
	);
};

export default HabitsTab;

const styles = StyleSheet.create({
	// container styles
	container: {
		position: 'relative',
		flex: 1,
		gap: 4,
	},
	dateContainer: {
		paddingHorizontal: 12,
		paddingVertical: 2,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	habitsContainer: {
		paddingHorizontal: 12,
		paddingTop: 4,
		paddingBottom: 80,
		gap: 6,
	},
	sectionHeader: {
		marginTop: 10,
	},
	actionContainer: {
		position: 'absolute',
		padding: 12,
		bottom: 0,
		right: 0,
	},
});
