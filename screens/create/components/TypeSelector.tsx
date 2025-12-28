import { View, Pressable, StyleSheet, PressableProps } from "react-native";
import { HabitType } from "../../../types/habitTypes";
import { TypeOptions } from "../../../constants/habit";
import UIText from "../../../components/ui/UIText";
import { Dispatch, SetStateAction } from "react";
import useThemeColor from "../../../theme/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import { IonIconType } from "../../../types/iconTypes";

export type TypeOption = {
	label: string;
	description: string;
	value: HabitType;
	icon: IonIconType;
};

const TypeCard = ({
	type,
	isSelected,
	onPress,
	...props
}: PressableProps & {
	type: TypeOption;
	isSelected: boolean;
	onPress: () => void;
}) => {
	const colors = useThemeColor();

	return (
		<Pressable
			style={[
				{
					backgroundColor: colors.foreground + "80",
					borderColor: colors.border,
				},
				styles.typeCard,
				isSelected && { borderColor: colors.neutral },
			]}
			onPress={onPress}
			{...props}
		>
			<View style={styles.labelContainer}>
				<Ionicons name={type.icon} size={16} color={colors.accent} />
				<UIText style={styles.label}>{type.label}</UIText>
			</View>

			<UIText style={styles.description} isSecondary>
				{type.description}
			</UIText>
		</Pressable>
	);
};

const TypeSelector = ({
	selectedType,
	onPress,
}: {
	selectedType: HabitType;
	onPress: Dispatch<SetStateAction<HabitType>>;
}) => {
	return (
		<View style={styles.typeSelector}>
			{TypeOptions.map((type) => {
				return (
					<TypeCard
						key={type.value}
						type={type}
						isSelected={selectedType === type.value}
						onPress={() => onPress(type.value)}
					/>
				);
			})}
		</View>
	);
};

export default TypeSelector;

const styles = StyleSheet.create({
	// container styles
	typeSelector: {
		flexDirection: "row",
		gap: 8,
	},
	typeCard: {
		flex: 1,
		paddingHorizontal: 12,
		paddingVertical: 10,
		gap: 4,
		borderRadius: 10,
		borderWidth: 1,
	},
	labelContainer: {
		justifyContent: "center",
		alignItems: "center",
		gap: 2,
	},

	// text styles
	label: {
		fontSize: 16,
		fontWeight: "600",
	},
	description: {
		fontSize: 12,
		textAlign: "center",
	},
});
