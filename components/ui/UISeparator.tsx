import { DimensionValue, StyleSheet, View } from 'react-native';
import useTheme from '../../theme/useTheme';

const UISeparator = ({
	length,
	width = 1,
	orientation = 'horizontal',
}: {
	length: DimensionValue;
	width?: DimensionValue;
	orientation?: 'vertical' | 'horizontal';
}) => {
	const { colors } = useTheme();

	return (
		<View
			style={[
				{
					height: orientation === 'vertical' ? length : width,
					width: orientation === 'vertical' ? width : length,
					backgroundColor: colors.border,
				},
				styles.separator,
			]}
		/>
	);
};

export default UISeparator;

const styles = StyleSheet.create({
	// container styles
	separator: {
		marginHorizontal: 'auto',
	},
});
