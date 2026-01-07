import { Pressable, StyleSheet, FlatList, PressableProps } from 'react-native';
import { CountUnit } from '../../types/habitTypes';
import useTheme from '../../theme/useTheme';
import UIText from '../ui/UIText';
import { UnitOptions } from '../../constants/habit';

export type UnitOption = {
	label: string;
	value: CountUnit;
};

const UnitBadge = ({
	unit,
	isSelected,
	...props
}: PressableProps & {
	unit: UnitOption;
	isSelected: boolean;
}) => {
	const { colors } = useTheme();

	return (
		<Pressable
			style={[
				{
					backgroundColor: colors.foreground + '80',
					borderColor: colors.border,
				},
				styles.unitBadge,
				isSelected && { borderColor: colors.neutral },
			]}
			{...props}>
			<UIText style={styles.label}>{unit.label}</UIText>
		</Pressable>
	);
};

const UnitSelector = ({
	selectedUnit,
	isEditable = true,
	onPress,
}: {
	selectedUnit: CountUnit;
	isEditable?: boolean;
	onPress: (value: CountUnit) => void;
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
						disabled={!isEditable}
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
		flexDirection: 'row',
		alignItems: 'center',
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
