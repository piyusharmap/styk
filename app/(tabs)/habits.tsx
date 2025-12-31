import { FlatList, StyleSheet, View } from "react-native";
import UIView from "../../components/ui/UIView";
import AddHabitButton from "../../screens/habits/components/AddHabitButton";
import { useRouter } from "expo-router";
import { useHabitStore } from "../../store/habitStore";
import HabitListCard from "../../screens/habits/components/HabitListCard";
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
					data={habits}
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
				<AddHabitButton
					onPress={() => router.navigate("create/page")}
				/>
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
		paddingVertical: 10,
		gap: 8,
	},
	actionContainer: {
		position: "absolute",
		padding: 12,
		bottom: 0,
		right: 0,
	},
});
