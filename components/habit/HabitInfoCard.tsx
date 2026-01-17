import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import useTheme from '../../theme/useTheme';
import UIText from '../ui/UIText';

const HabitInfoCard = ({
	heading,
	children,
	style,
}: {
	heading?: string;
	children: React.ReactNode;
	style?: StyleProp<ViewStyle>;
}) => {
	const { colors } = useTheme();

	return (
		<View
			style={[
				{
					backgroundColor: colors.foreground,
				},
				styles.card,
				style,
			]}>
			{heading && (
				<UIText style={styles.heading} isSecondary>
					{heading}
				</UIText>
			)}

			{children}
		</View>
	);
};

export default HabitInfoCard;

const styles = StyleSheet.create({
	// container styles
	card: {
		padding: 10,
		gap: 4,
		borderRadius: 10,
		overflow: 'hidden',
	},

	// text styles
	heading: {
		fontSize: 10,
		fontWeight: '600',
		textTransform: 'uppercase',
	},
});
