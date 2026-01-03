import { StyleSheet } from "react-native";
import UIView from "../../components/ui/UIView";
import CreateHabitForm from "../../screens/create/CreateHabitForm";

const CreateHabitPage = () => {
	return (
		<UIView style={styles.container} isBottomSafe>
			<CreateHabitForm />
		</UIView>
	);
};

export default CreateHabitPage;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
	},
});
