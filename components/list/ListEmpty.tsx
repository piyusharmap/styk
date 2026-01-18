import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

export const ListEmptyContainer = ({
	children,
	style,
}: {
	children: React.ReactNode;
	style?: StyleProp<ViewStyle>;
}) => {
	return <View style={[styles.messageContainer, style]}>{children}</View>;
};

const styles = StyleSheet.create({
	// container styles
	messageContainer: {
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 20,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 2,
	},
});
