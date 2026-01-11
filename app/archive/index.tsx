import { FlatList, StyleSheet } from 'react-native';
import UIView from '../../components/ui/UIView';
import { useHabitStore } from '../../store/habitStore';
import HabitArchivedCard from '../../screens/archive/components/HabitArchivedCard';
import ListEmpty from '../../components/list/ListEmpty';
import { EMPTY_ARCHIVE_LIST_MSG } from '../../constants/messages';

const ArchivesPage = () => {
	const habits = useHabitStore((s) => s.getAllHabits());
	const archivedHabits = habits.filter((habit) => habit.archived);

	return (
		<UIView style={styles.container} isBottomSafe>
			<FlatList
				data={archivedHabits}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.habitsContainer}
				renderItem={({ item }) => {
					return <HabitArchivedCard habit={item} />;
				}}
				ListEmptyComponent={<ListEmpty message={EMPTY_ARCHIVE_LIST_MSG} />}
			/>
		</UIView>
	);
};

export default ArchivesPage;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
	},
	habitsContainer: {
		paddingHorizontal: 12,
		paddingTop: 4,
		paddingBottom: 60,
		gap: 6,
	},
});
