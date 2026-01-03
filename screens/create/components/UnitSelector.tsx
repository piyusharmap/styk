import { Pressable, StyleSheet, FlatList } from "react-native";
import { CountUnit } from "../../../types/habitTypes";
import { UnitOptions } from "../../../constants/habit";
import UIText from "../../../components/ui/UIText";
import { Dispatch, SetStateAction } from "react";
import useTheme from "../../../theme/useTheme";

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
	const { colors } = useTheme();

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
		<FlatList
			data={UnitOptions}
			keyExtractor={(item) => item.value}
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={styles.unitSelector}
			renderItem={({ item }) => {
				return (
					<UnitBadge
						unit={item}
						isSelected={selectedUnit === item.value}
						onPress={() => onPress(item.value)}
					/>
				);
			}}
		/>
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
