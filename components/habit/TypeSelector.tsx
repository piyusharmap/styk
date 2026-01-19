import { View, Pressable, StyleSheet, PressableProps } from 'react-native';
import { HabitType } from '../../types/habitTypes';
import useTheme from '../../theme/useTheme';
import UIText from '../ui/UIText';
import { TypeOptions } from '../../constants/habit';
import Icon, { IconType } from '../icon';

export type TypeOption = {
	label: string;
	description: string;
	value: HabitType;
	icon: IconType;
};

const TypeCard = ({
	type,
	isSelected,
	...props
}: PressableProps & {
	type: TypeOption;
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
				styles.typeCard,
				isSelected && { borderColor: colors.neutral },
			]}
			{...props}>
			<View style={styles.labelContainer}>
				<Icon name={type.icon} size={16} color={colors.accent} />
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
	isEditable = true,
	onPress,
}: {
	selectedType: HabitType;
	isEditable?: boolean;
	onPress: (value: HabitType) => void;
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
						disabled={!isEditable}
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
		flexDirection: 'row',
		gap: 6,
	},
	typeCard: {
		flex: 1,
		paddingHorizontal: 12,
		paddingVertical: 10,
		gap: 4,
		borderRadius: 10,
		borderWidth: 2,
	},
	labelContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		gap: 2,
	},

	// text styles
	label: {
		fontSize: 16,
		fontWeight: '500',
	},
	description: {
		fontSize: 12,
		textAlign: 'center',
	},
});
