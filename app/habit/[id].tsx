import { StyleSheet } from "react-native";
import React from "react";
import UIView from "../../components/ui/UIView";
import UIText from "../../components/ui/UIText";
import { useLocalSearchParams } from "expo-router/build/hooks";

const HabitDetailsPage = () => {
	const { id } = useLocalSearchParams<{ id: string }>();

	return (
		<UIView style={styles.container} isBottomSafe>
			<UIText>{id}</UIText>
		</UIView>
	);
};

export default HabitDetailsPage;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
