import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import UIText from '../ui/UIText';

const ListEmpty = ({ message, style }: { message: string; style?: StyleProp<ViewStyle> }) => {
	return (
		<View style={[styles.messageContainer, style]}>
			<UIText style={styles.message} isSecondary>
				{message}
			</UIText>
		</View>
	);
};

export default ListEmpty;

const styles = StyleSheet.create({
	// container styles
	messageContainer: {
		paddingHorizontal: 20,
		paddingVertical: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},

	// text styles
	message: {
		fontSize: 14,
		fontWeight: '300',
		fontStyle: 'italic',
	},
});
