import { View, Pressable, StyleSheet } from "react-native";
import { HabitFrequency } from "../../../types/habitTypes";
import { FrequencyOptions } from "../../../constants/habit";
import UIText from "../../../components/ui/UIText";
import { Dispatch, SetStateAction } from "react";
import useThemeColor from "../../../theme/useThemeColor";

export type FrequencyOption = {
	label: string;
	value: HabitFrequency;
};

const FrequencyBadge = ({
	frequency,
	isSelected,
	onPress,
}: {
	frequency: FrequencyOption;
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
				styles.freqBadge,
				isSelected && { borderColor: colors.neutral },
			]}
			onPress={onPress}
		>
			<UIText style={styles.label}>{frequency.label}</UIText>
		</Pressable>
	);
};

const FrequencySelector = ({
	selectedFrequency,
	onPress,
}: {
	selectedFrequency: HabitFrequency;
	onPress: Dispatch<SetStateAction<HabitFrequency>>;
}) => {
	return (
		<View style={styles.freqSelector}>
			{FrequencyOptions.map((freq) => {
				return (
					<FrequencyBadge
						key={freq.value}
						frequency={freq}
						isSelected={selectedFrequency === freq.value}
						onPress={() => onPress(freq.value)}
					/>
				);
			})}
		</View>
	);
};

export default FrequencySelector;

const styles = StyleSheet.create({
	// container styles
	freqSelector: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
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
