import { StyleSheet, TextInput, View } from 'react-native';
import useTheme from '../../theme/useTheme';
import UIButton from '../ui/UIButton';
import { DM_SANS } from '../../theme/fonts';

const HabitCounter = ({ count, onPress }: { count: number; onPress: (count: number) => void }) => {
	const { colors } = useTheme();

	const handleCountIncrement = () => {
		onPress(count + 1);
	};

	const handleCountDecrement = () => {
		if (count <= 1) return;
		onPress(count - 1);
	};

	const handleInputChange = (text: string) => {
		const cleanedText = text.replace(/[^0-9]/g, '');

		if (cleanedText === '' || cleanedText === '0') {
			onPress(1);
			return;
		}

		const newCount = parseInt(cleanedText, 10);

		if (!isNaN(newCount)) {
			onPress(newCount);
		}
	};

	return (
		<View style={styles.habitCounter}>
			<UIButton title='' iconName='ChevronDown' isIconButton onPress={handleCountDecrement} />

			<View style={[{ borderColor: colors.border }, styles.countContainer]}>
				<TextInput
					value={count.toString()}
					onChangeText={handleInputChange}
					placeholderTextColor={colors.textSecondary}
					placeholder=''
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
		fontSize: 52,
	},
});
