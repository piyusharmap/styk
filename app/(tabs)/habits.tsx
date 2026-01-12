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
import UIText from '../../components/ui/UIText';
import { getGreeting } from '../../utils/greeting';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HabitsTab = () => {
	const router = useRouter();
	const insets = useSafeAreaInsets();

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

	const greeting = getGreeting();
	const todayDate = new Date().toLocaleDateString('en-US', {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
	});

	return (
		<UIView style={styles.container}>
			<View style={[{ paddingTop: insets.top + 10 }, styles.headerContainer]}>
				<View style={styles.greetingContainer}>
					<UIText style={styles.greeting}>
						{greeting.emoji} Hi, {greeting.message}
					</UIText>

					<UIText style={styles.date}>{todayDate}</UIText>
				</View>
			</View>

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
				renderSectionHeader={({ section }) => <ListHeader heading={section.title} />}
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
	},
	headerContainer: {
		flexDirection: 'row',
		paddingHorizontal: 12,
		paddingBottom: 10,
		alignItems: 'center',
		gap: 6,
	},
	iconContainer: {
		height: 40,
		width: 40,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 25,
	},
	greetingContainer: {
		flex: 1,
	},
	statsContainer: {
		paddingHorizontal: 12,
		paddingVertical: 10,
	},
	habitsContainer: {
		paddingHorizontal: 12,
		paddingTop: 10,
		paddingBottom: 80,
		gap: 6,
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
		fontSize: 20,
		fontWeight: '500',
	},
});
