import { View } from 'react-native';
import useTheme from '../../theme/useTheme';

const UISeparator = ({
	length,
	width = 1,
	orientation = 'horizontal',
}: {
	length: number;
	width?: number;
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
			]}
		/>
	);
};

export default UISeparator;
