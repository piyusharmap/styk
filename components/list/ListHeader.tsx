import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import UIText from "../ui/UIText";
import { Ionicons } from "@expo/vector-icons";
import useThemeColor from "../../theme/useThemeColor";

const ListHeader = ({
	heading,
	style,
}: {
	heading: string;
	style?: StyleProp<ViewStyle>;
}) => {
	const colors = useThemeColor();

	return (
		<View style={[styles.listHeader, style]}>
			<UIText style={styles.listHeading}>{heading}</UIText>

			<Ionicons name="arrow-forward" size={12} color={colors.accent} />
		</View>
	);
};

export default ListHeader;

const styles = StyleSheet.create({
	// container styles
	listHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		paddingLeft: 1,
	},

	// text styles
	listHeading: {
		fontSize: 14,
	},
});
