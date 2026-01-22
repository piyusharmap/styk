import { StyleSheet, TextInput, View } from 'react-native';
import useTheme from '../../theme/useTheme';
import UIButton from '../ui/UIButton';
import { DM_SANS } from '../../theme/fonts';
import { parseToInteger } from '../../utils/habit';

const HabitCounter = ({ count, onPress }: { count: string; onPress: (count: string) => void }) => {
	const { colors } = useTheme();

	const handleCountIncrement = () => {
		const parsedValue = count === '' ? 0 : parseToInteger(count);

		const newCount = parsedValue + 1;

		onPress(newCount.toString());
	};

	const handleCountDecrement = () => {
		const parsedValue = parseToInteger(count);

		if (parsedValue <= 0 || isNaN(parsedValue)) {
			onPress('0');
			return;
		}

		const newCount = parsedValue - 1;

		onPress(newCount.toString());
	};

	const handleInputChange = (value: string) => {
		const cleanedValue = value.replace(/[^0-9]/g, '');

		if (cleanedValue === '') {
			onPress('');
			return;
		}

		const newCount = parseToInteger(cleanedValue);
		onPress(newCount.toString());
	};

	return (
		<View style={styles.habitCounter}>
			<UIButton title='' iconName='ChevronDown' isIconButton onPress={handleCountDecrement} />

			<View
				style={[
					{ backgroundColor: colors.foreground + '80', borderColor: colors.border },
					styles.countContainer,
				]}>
				<TextInput
					value={count.toString()}
					onChangeText={handleInputChange}
					placeholderTextColor={colors.textSecondary}
					placeholder='0'
					keyboardType='numeric'
					style={[
						{
							fontFamily: DM_SANS.normal['500'],
							color: colors.text,
						},
						styles.count,
					]}
				/>
			</View>

			<UIButton title='' iconName='ChevronUp' isIconButton onPress={handleCountIncrement} />
		</View>
	);
};

export default HabitCounter;

const styles = StyleSheet.create({
	// container styles
	habitCounter: {
		padding: 10,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 12,
	},
	countContainer: {
		minWidth: 100,
		paddingHorizontal: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		borderStyle: 'dashed',
		borderRadius: 10,
	},
	countButton: {
		height: 40,
		width: 40,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
		borderWidth: 2,
	},

	// text styles
	count: {
		width: '100%',
		fontSize: 52,
		textAlign: 'center',
	},
});
