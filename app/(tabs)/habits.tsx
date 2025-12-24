import { StyleSheet, View } from "react-native";
import UIView from "../../components/ui/UIView";
import { PageHeader, PageHeading } from "../../components/layout/PageHeader";
import { useState } from "react";
import AddHabitButton from "../../screens/habits/components/AddHabitButton";
import AddHabitModal from "../../screens/habits/components/AddHabitModal";
import { useHabitStore } from "../../store/habitStore";
import HabitListCard from "../../screens/habits/components/HabitListCard";

const HabitsTab = () => {
	const [showModal, setShowModal] = useState<boolean>(false);

	const habits = useHabitStore((s) => s.habits);

	return (
		<UIView style={styles.container} isTopSafe>
			<PageHeader>
				<PageHeading>Your Habits</PageHeading>
			</PageHeader>

			<View style={styles.habitsContainer}>
				{habits.map((habit) => {
					return <HabitListCard key={habit.id} habit={habit} />;
				})}
			</View>

			<View style={styles.actionContainer}>
				<AddHabitButton onPress={() => setShowModal(true)} />
			</View>

			<AddHabitModal
				visible={showModal}
				onClose={() => setShowModal(false)}
			/>
		</UIView>
	);
};

export default HabitsTab;

const styles = StyleSheet.create({
	// container styles
	container: {
		position: "relative",
		flex: 1,
	},
	habitsContainer: {
		paddingHorizontal: 20,
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
