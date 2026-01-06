import { FlatList, StyleSheet, View } from "react-native";
import UIView from "../../components/ui/UIView";
import { useRouter } from "expo-router";
import { useHabitStore } from "../../store/habitStore";
import {
	PageHeader,
	PageHeading,
	PageSubHeading,
} from "../../components/layout/PageHeader";
import ListHeader from "../../components/list/ListHeader";
import ListEmpty from "../../components/list/ListEmpty";
import {
	EMPTY_HABITS_LIST_MSG,
	HABITS_PAGE_SUBHEADING,
} from "../../constants/messages";
import ListContainer from "../../components/list/ListContainer";
import HabitListCard from "../../screens/habitsTab/components/HabitListCard";
import AddHabitButton from "../../screens/habitsTab/components/AddHabitButton";

const HabitsTab = () => {
	const router = useRouter();

	const habits = useHabitStore((s) => s.getAllHabits());

	return (
		<UIView style={styles.container} isTopSafe>
			<PageHeader>
				<PageHeading>Habits</PageHeading>
				<PageSubHeading>{HABITS_PAGE_SUBHEADING}</PageSubHeading>
			</PageHeader>

			<ListContainer>
				<ListHeader heading="Your Habits" />

				<FlatList
					data={habits.filter((habit) => !habit.archived)}
					keyExtractor={(item) => item.id}
					contentContainerStyle={styles.habitsContainer}
					renderItem={({ item }) => {
						return <HabitListCard habit={item} />;
					}}
					ListEmptyComponent={
						<ListEmpty message={EMPTY_HABITS_LIST_MSG} />
					}
				/>
			</ListContainer>

			<View style={styles.actionContainer}>
				<AddHabitButton onPress={() => router.navigate("create")} />
			</View>
		</UIView>
	);
};

export default HabitsTab;

const styles = StyleSheet.create({
	// container styles
	container: {
		position: "relative",
		flex: 1,
		gap: 4,
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
