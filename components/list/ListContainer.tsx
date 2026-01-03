import { StyleSheet, View } from "react-native";

const ListContainer = ({ children }: { children: React.ReactNode }) => {
	return <View style={styles.listContainer}>{children}</View>;
};

export default ListContainer;

const styles = StyleSheet.create({
	// container styles
	listContainer: {
		flex: 1,
		gap: 4,
	},
});
