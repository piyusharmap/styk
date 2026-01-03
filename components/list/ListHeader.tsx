import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import UIText from "../ui/UIText";
import { Ionicons } from "@expo/vector-icons";
import useTheme from "../../theme/useTheme";

const ListHeader = ({
	heading,
	style,
}: {
	heading: string;
	style?: StyleProp<ViewStyle>;
}) => {
	const { colors } = useTheme();

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
		paddingHorizontal: 13,
		paddingVertical: 2,
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},

	// text styles
	listHeading: {
		fontSize: 14,
	},
});
