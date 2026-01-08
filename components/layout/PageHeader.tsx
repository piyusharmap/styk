import { View, StyleSheet, StyleProp, TextStyle, ViewStyle } from 'react-native';
import UIText from '../ui/UIText';
import useTheme from '../../theme/useTheme';

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
	return (
		<UIText style={[styles.subHeading, style]} isSecondary>
			{children}
		</UIText>
	);
};

export const PageHeader = ({
	children,
	style,
}: {
	children: React.ReactNode;
	style?: StyleProp<ViewStyle>;
}) => {
	const { colors } = useTheme();

	return (
		<View style={[{ borderColor: colors.border }, styles.container, style]}>{children}</View>
	);
};

const styles = StyleSheet.create({
	// container styles
	container: {
		paddingHorizontal: 12,
		paddingTop: 10,
		paddingBottom: 16,
		borderBottomWidth: 1,
		alignItems: 'center',
	},

	// text styles
	heading: {
		fontSize: 28,
		fontWeight: '500',
		textAlign: 'center',
	},
	subHeading: {
		fontSize: 14,
		textAlign: 'center',
	},
});
