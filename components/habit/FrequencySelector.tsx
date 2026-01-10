import { Pressable, StyleSheet, FlatList, PressableProps } from 'react-native';
import UIText from '../ui/UIText';
import { HabitFrequency } from '../../types/habitTypes';
import { FrequencyOptions } from '../../constants/habit';
import useTheme from '../../theme/useTheme';

export type FrequencyOption = {
	label: string;
	value: HabitFrequency;
};

const FrequencyBadge = ({
	frequency,
	isSelected,
	...props
}: PressableProps & {
	frequency: FrequencyOption;
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
				styles.freqBadge,
				isSelected && { borderColor: colors.neutral },
			]}
			{...props}>
			<UIText style={styles.label}>{frequency.label}</UIText>
		</Pressable>
	);
};

const FrequencySelector = ({
	selectedFrequency,
	isEditable = true,
	onPress,
}: {
	selectedFrequency: HabitFrequency;
	isEditable?: boolean;
	onPress: (value: HabitFrequency) => void;
}) => {
	return (
		<FlatList
			data={FrequencyOptions}
			keyExtractor={(item) => item.value}
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={styles.freqSelector}
			renderItem={({ item }) => {
				return (
					<FrequencyBadge
						frequency={item}
						isSelected={selectedFrequency === item.value}
						onPress={() => onPress(item.value)}
						disabled={!isEditable}
					/>
				);
			}}
		/>
	);
};

export default FrequencySelector;

const styles = StyleSheet.create({
	// container styles
	freqSelector: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	freqBadge: {
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
