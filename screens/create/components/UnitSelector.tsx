import { View, Pressable, StyleSheet } from "react-native";
import { CountUnit } from "../../../types/habitTypes";
import { UnitOptions } from "../../../constants/habit";
import UIText from "../../../components/ui/UIText";
import { Dispatch, SetStateAction } from "react";
import useThemeColor from "../../../theme/useThemeColor";

export type UnitOption = {
	label: string;
	value: CountUnit;
};

const UnitBadge = ({
	unit,
	isSelected,
	onPress,
}: {
	unit: UnitOption;
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
				styles.unitBadge,
				isSelected && { borderColor: colors.neutral },
			]}
			onPress={onPress}
		>
			<UIText style={styles.label}>{unit.label}</UIText>
		</Pressable>
	);
};

const UnitSelector = ({
	selectedUnit,
	onPress,
}: {
	selectedUnit: CountUnit;
	onPress: Dispatch<SetStateAction<CountUnit>>;
}) => {
	return (
		<View style={styles.unitSelector}>
			{UnitOptions.map((unit) => {
				return (
					<UnitBadge
						key={unit.value}
						unit={unit}
						isSelected={selectedUnit === unit.value}
						onPress={() => onPress(unit.value)}
					/>
				);
			})}
		</View>
	);
};

export default UnitSelector;

const styles = StyleSheet.create({
	// container styles
	unitSelector: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	unitBadge: {
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 10,
		borderWidth: 1,
	},

	// text styles
	label: {
		fontSize: 14,
	},
});
