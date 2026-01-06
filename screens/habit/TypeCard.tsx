import { View, StyleSheet } from "react-native";
import UIText from "../../components/ui/UIText";
import { IconType } from "../../components/icon";
import TypeIconContainer from "../../components/habit/TypeIconContainer";

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
			<TypeIconContainer icon={icon} color={color} />

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

	// text styles
	title: {
		fontSize: 18,
		fontWeight: "500",
	},
	description: {
		fontSize: 12,
	},
});
