import { ActivityIndicator, ActivityIndicatorProps, StyleProp, ViewStyle } from 'react-native';
import useTheme from '../../theme/useTheme';

const UILoader = ({
	size = 18,
	style,
	...props
}: ActivityIndicatorProps & {
	size?: number;
	style?: StyleProp<ViewStyle>;
}) => {
	const { colors } = useTheme();

	return <ActivityIndicator size={size} style={style} color={colors.neutral} {...props} />;
};

export default UILoader;
