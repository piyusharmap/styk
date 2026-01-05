import { StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useHabitStore } from "../../store/habitStore";
import UIView from "../../components/ui/UIView";
import UpdateHabitForm from "../../screens/edit/UpdateHabitForm";
import UILoader from "../../components/ui/UILoader";

const EditHabitPage = () => {
	const { id } = useLocalSearchParams<{
		id: string;
	}>();

	const habitDetails = useHabitStore((s) => s.getHabitDetails(id));

	return (
		<UIView style={styles.container} isBottomSafe>
			{habitDetails ? (
				<UpdateHabitForm currentHabit={habitDetails} />
			) : (
				<UILoader />
			)}
		</UIView>
	);
};

export default EditHabitPage;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
	},
});
