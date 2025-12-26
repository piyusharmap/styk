import { View, StyleSheet } from "react-native";
import React from "react";
import UIView from "../../components/ui/UIView";
import CreateHabitForm from "../../screens/create/CreateHabitForm";

const CreateHabitPage = () => {
	return (
		<UIView style={styles.container} isBottomSafe>
			<View style={styles.createForm}>
				<CreateHabitForm />
			</View>
		</UIView>
	);
};

export default CreateHabitPage;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
	},
	createForm: {
		flex: 1,
		paddingHorizontal: 16,
		paddingVertical: 10,
	},
});
