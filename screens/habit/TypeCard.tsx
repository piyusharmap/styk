import { View, StyleSheet } from "react-native";
import React from "react";
import UIText from "../../components/ui/UIText";
import Icon, { IconType } from "../../components/icon";

const TypeCard = ({
	label,
	description,
	icon,
	color,
}: {
	label: string;
	description: string;
	icon: IconType;
	color?: string;
}) => {
	return (
		<View
			style={[
				{ backgroundColor: color + "30", borderColor: color },
				styles.card,
			]}
		>
			<View
				style={[
					{ backgroundColor: color + "50" },
					styles.iconContainer,
				]}
			>
				<Icon name={icon} size={26} color={color} />
			</View>

			<View style={styles.details}>
				<UIText style={styles.title}>{label}</UIText>

				<UIText style={styles.description} isSecondary>
					{description}
				</UIText>
			</View>
		</View>
	);
};

export default TypeCard;

const styles = StyleSheet.create({
	// container styles
	card: {
		padding: 12,
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		borderRadius: 10,
		borderWidth: 0.5,
	},
	details: {
		flex: 1,
	},
	iconContainer: {
		height: 40,
		width: 40,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 8,
	},

	// text styles
	title: {
		fontSize: 18,
		fontWeight: "500",
	},
	description: {
		fontSize: 12,
	},
});
