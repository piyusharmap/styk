import { Image, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import useTheme from '../theme/useTheme';

export const Logo = ({ size = 40 }: { size?: number }) => {
	return (
		<Image
			source={require('../assets/icon.png')}
			resizeMode='contain'
			style={{ height: size, width: size }}
		/>
	);
};

export const LogoContainer = ({
	size = 40,
	style,
}: {
	size?: number;
	style?: StyleProp<ViewStyle>;
}) => {
	const { colors } = useTheme();

	return (
		<View
			style={[
				{ height: size, width: size, borderColor: colors.primary },
				styles.logoContainer,
				style,
			]}>
			<Logo size={size} />
		</View>
	);
};

const styles = StyleSheet.create({
	// container styles
	logoContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
		borderWidth: 1,
		overflow: 'hidden',
	},
});
