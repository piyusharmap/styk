import { SectionList, StyleSheet, View } from 'react-native';
import UIView from '../../components/ui/UIView';
import { useHabitStore } from '../../store/habitStore';
import { ListEmptyContainer } from '../../components/list/ListEmpty';
import ListHeader from '../../components/list/ListHeader';
import { useRouter } from 'expo-router';
import HabitListCard from '../../screens/habits/components/HabitListCard';
import AddHabitButton from '../../screens/habits/components/AddHabitButton';
import UIText from '../../components/ui/UIText';
import { getGreeting } from '../../utils/greeting';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useShallow } from 'zustand/react/shallow';
import DailyMomentum from '../../screens/habits/components/DailyMomentum';
import useTheme from '../../theme/useTheme';

const HabitsTab = () => {
	const { colors } = useTheme();
	const router = useRouter();
	const insets = useSafeAreaInsets();

	const habits = useHabitStore(useShallow((s) => Object.values(s.habits)));
	const activeHabits = habits.filter((habit) => !habit.archived);

	const sections = [
		{
			title: 'Build Habits',
			data: activeHabits.filter((habit) => habit.target.type === 'count'),
		},
		{
			title: 'Quit Habits',
			data: activeHabits.filter((habit) => habit.target.type === 'quit'),
		},
	].filter((section) => section.data.length > 0);

	const greeting = getGreeting();
	const todayDay = new Date().toLocaleDateString('en-US', {
		weekday: 'long',
	});
	const todayDate = new Date().toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
	});

	return (
		<UIView style={styles.container}>
			<View style={[{ paddingTop: insets.top + 10 }, styles.headerContainer]}>
				<View style={styles.greetingContainer}>
					<UIText style={styles.greeting}>
						{greeting.emoji} {greeting.message}
					</UIText>

					<UIText style={styles.date}>
						<UIText style={[{ color: colors.accent }, styles.date]}>{todayDay}</UIText>
						{', '}
						{todayDate}
					</UIText>
				</View>
			</View>

			<View style={styles.statsContainer}>
				<DailyMomentum />
			</View>

			<SectionList
				sections={sections}
				keyExtractor={(item) => item.id}
				contentContainerStyle={styles.habitsContainer}
				renderItem={({ item }) => {
					return (
						<View style={styles.habitCardContainer}>
							<HabitListCard habit={item} />
						</View>
					);
				}}
				renderSectionHeader={({ section }) => (
					<View style={styles.sectionHeaderContainer}>
						<ListHeader heading={section.title} />
					</View>
				)}
				ListEmptyComponent={
					<ListEmptyContainer>
						<UIText style={styles.emptyListMessage}>No Habits</UIText>
						<UIText style={styles.emptyListDescription} isSecondary>
							Tap the + button to create your first habit.
						</UIText>
					</ListEmptyContainer>
				}
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
	},
	headerContainer: {
		flexDirection: 'row',
		paddingHorizontal: 16,
		paddingBottom: 10,
		alignItems: 'center',
		gap: 6,
	},
	sectionHeaderContainer: {
		marginTop: 10,
		marginBottom: 4,
	},
	greetingContainer: {
		flex: 1,
	},
	statsContainer: {
		paddingHorizontal: 12,
		paddingBottom: 10,
	},
	habitsContainer: {
		flexGrow: 1,
		paddingHorizontal: 12,
		paddingBottom: 80,
	},
	habitCardContainer: {
		marginBottom: 6,
	},
	actionContainer: {
		position: 'absolute',
		padding: 12,
		bottom: 0,
		right: 0,
	},

	// text styles
	iconText: {
		fontSize: 26,
	},
	greeting: {
		fontSize: 14,
		fontWeight: '500',
	},
	date: {
		fontSize: 22,
		fontWeight: '600',
	},
	emptyListMessage: {
		fontSize: 18,
		fontWeight: '600',
	},
	emptyListDescription: {
		fontSize: 16,
	},
});
