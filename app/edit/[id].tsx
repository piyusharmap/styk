import { StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useHabitStore } from "../../store/habitStore";
import UIView from "../../components/ui/UIView";
import UpdateHabitForm from "../../screens/edit/UpdateHabitForm";
import PageLoader from "../../components/PageLoader";

const EditHabitPage = () => {
	const { id } = useLocalSearchParams<{
		id: string;
	}>();

	const habitDetails = useHabitStore((s) => s.getHabitDetails(id));

	if (!habitDetails) return <PageLoader isBottomSafe />;

	return (
		<UIView style={styles.container} isBottomSafe>
			<UpdateHabitForm currentHabit={habitDetails!} />
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
