import { SectionList, StyleSheet, View } from 'react-native';
import UIView from '../../components/ui/UIView';
import { useHabitStore } from '../../store/habitStore';
import ListEmpty from '../../components/list/ListEmpty';
import ListHeader from '../../components/list/ListHeader';
import { EMPTY_HABITS_LIST_MSG } from '../../constants/messages';
import { useRouter } from 'expo-router';
import HabitListCard from '../../screens/habits/components/HabitListCard';
import AddHabitButton from '../../screens/habits/components/AddHabitButton';
import MomentumCard from '../../screens/habits/components/MomentumCard';

const HabitsTab = () => {
	const router = useRouter();

	const habits = useHabitStore((s) => s.getTodayHabits());
	const frequencyStats = useHabitStore((s) => s.getGlobalMomentum());
	const activeHabits = habits.filter((habit) => !habit.archived);

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
			<View style={styles.statsContainer}>
				<MomentumCard score={frequencyStats} />
			</View>

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
		gap: 10,
	},
	statsContainer: {
		paddingHorizontal: 12,
		paddingVertical: 10,
	},
	habitsContainer: {
		paddingHorizontal: 12,
		paddingBottom: 80,
		gap: 6,
	},
	sectionHeader: {
		// marginTop: 4,
	},
	actionContainer: {
		position: 'absolute',
		padding: 12,
		bottom: 0,
		right: 0,
	},
});
