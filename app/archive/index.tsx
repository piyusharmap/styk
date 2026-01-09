import { FlatList, StyleSheet } from 'react-native';
import UIView from '../../components/ui/UIView';
import { useHabitStore } from '../../store/habitStore';
import ListContainer from '../../components/list/ListContainer';
import HabitArchivedCard from '../../screens/archive/HabitArchivedCard';
import ListEmpty from '../../components/list/ListEmpty';
import { EMPTY_ARCHIVE_LIST_MSG } from '../../constants/messages';

const ArchivesPage = () => {
	const habits = useHabitStore((s) => s.getAllHabits());

	return (
		<UIView style={styles.container} isBottomSafe>
			<ListContainer>
				<FlatList
					data={habits.filter((habit) => habit.archived)}
					keyExtractor={(item) => item.id}
					contentContainerStyle={styles.habitsContainer}
					renderItem={({ item }) => {
						return <HabitArchivedCard habit={item} />;
					}}
					ListEmptyComponent={<ListEmpty message={EMPTY_ARCHIVE_LIST_MSG} />}
				/>
			</ListContainer>
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
