import { Pressable, StyleSheet, View } from "react-native";
import UIText from "../../../components/ui/UIText";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import useThemeColor from "../../../theme/useThemeColor";

const SettingsSection = ({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) => {
	const [showOptions, setShowOptions] = useState<boolean>(true);

	const colors = useThemeColor();

	return (
		<View style={styles.section}>
			<Pressable
				style={styles.headingContainer}
				onPress={() => setShowOptions((prev) => !prev)}
			>
				<UIText style={styles.heading}>{title}</UIText>

				<Ionicons
					name={showOptions ? "chevron-down" : "chevron-forward"}
					size={16}
					color={colors.textSecondary}
				/>
			</Pressable>

			{showOptions && (
				<View style={styles.settingsContainer}>{children}</View>
			)}
		</View>
	);
};

export default SettingsSection;

const styles = StyleSheet.create({
	// container styles
	section: {
		paddingHorizontal: 12,
		paddingVertical: 10,
	},
	headingContainer: {
		paddingHorizontal: 4,
		paddingVertical: 10,
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	settingsContainer: {
		gap: 4,
	},

	// text styles
	heading: {
		fontSize: 14,
	},
});
