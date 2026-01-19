import { FlatList, StyleSheet } from 'react-native';
import UIView from '../../components/ui/UIView';
import { useHabitStore } from '../../store/habitStore';
import HabitArchivedCard from '../../screens/archive/components/HabitArchivedCard';
import { ListEmptyContainer } from '../../components/list/ListEmpty';
import UIText from '../../components/ui/UIText';
import { useShallow } from 'zustand/react/shallow';

const ArchivesPage = () => {
	const habits = useHabitStore(useShallow((s) => Object.values(s.habits)));
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
				ListEmptyComponent={
					<ListEmptyContainer>
						<UIText style={styles.emptyListMessage}>No Archives</UIText>
						<UIText style={styles.emptyListDescription} isSecondary>
							Nothing has been archived yet.
						</UIText>
					</ListEmptyContainer>
				}
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
		flexGrow: 1,
		paddingHorizontal: 12,
		paddingTop: 4,
		paddingBottom: 60,
		gap: 6,
	},

	// text styles
	emptyListMessage: {
		fontSize: 18,
		fontWeight: '600',
	},
	emptyListDescription: {
		fontSize: 16,
	},
});
