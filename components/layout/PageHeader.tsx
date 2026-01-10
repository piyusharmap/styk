import { View, StyleSheet, StyleProp, TextStyle, ViewStyle } from 'react-native';
import UIText from '../ui/UIText';
import useTheme from '../../theme/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const PageHeading = ({
	children,
	style,
}: {
	children: React.ReactNode;
	style?: StyleProp<TextStyle>;
}) => {
	return <UIText style={[styles.heading, style]}>{children}</UIText>;
};

export const PageSubHeading = ({
	children,
	style,
}: {
	children: React.ReactNode;
	style?: StyleProp<TextStyle>;
}) => {
	return <UIText style={[styles.subHeading, style]}>{children}</UIText>;
};

export const PageHeader = ({
	children,
	isTopSafe,
	style,
}: {
	children: React.ReactNode;
	isTopSafe?: boolean;
	style?: StyleProp<ViewStyle>;
}) => {
	const { colors } = useTheme();

	const insets = useSafeAreaInsets();

	return (
		<View
			style={[
				{
					backgroundColor: colors.secondary + '30',
					paddingTop: isTopSafe ? insets.top + 10 : 10,
				},
				styles.container,
				style,
			]}>
			{children}
		</View>
	);
};

const styles = StyleSheet.create({
	// container styles
	container: {
		paddingHorizontal: 12,
		paddingBottom: 16,
	},

	// text styles
	heading: {
		fontSize: 24,
		fontWeight: '600',
		textAlign: 'center',
	},
	subHeading: {
		fontSize: 12,
		textAlign: 'center',
	},
});
