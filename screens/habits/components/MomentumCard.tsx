import { View, StyleSheet } from 'react-native';
import useTheme from '../../../theme/useTheme';
import UIText from '../../../components/ui/UIText';
import { MOMENTUM_CARD_DESCRIPTION } from '../../../constants/messages';
import CircularProgressBar from '../../../components/habit/CircularProgressBar';

const MomentumCard = ({ score }: { score: number }) => {
	const { colors } = useTheme();

	return (
		<View
			style={[
				styles.card,
				{ backgroundColor: colors.secondary + '30', borderColor: colors.secondary },
			]}>
			<View style={styles.infoContainer}>
				<UIText style={styles.title}>Momentum Score</UIText>

				<UIText style={styles.description}>{MOMENTUM_CARD_DESCRIPTION}</UIText>
			</View>

			<CircularProgressBar
				progress={score}
				activeColor={colors.primary}
				backgroundColor={colors.primary + '50'}>
				<UIText style={styles.scoreText}>{score}</UIText>
			</CircularProgressBar>
		</View>
	);
};

const styles = StyleSheet.create({
	// Container Styles
	card: {
		paddingHorizontal: 12,
		paddingVertical: 10,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		borderRadius: 20,
		borderWidth: 2,
	},
	chartContainer: {
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
	},
	scoreOverlay: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
	},
	infoContainer: {
		flex: 1,
		gap: 1,
	},
	statusBadge: {
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 8,
		alignSelf: 'flex-start',
	},

	// Text Styles
	scoreText: {
		fontSize: 20,
		fontWeight: '600',
	},
	title: {
		fontSize: 18,
		fontWeight: '600',
	},
	description: {
		fontSize: 12,
		lineHeight: 16,
	},
	statusText: {
		fontSize: 12,
	},
});

export default MomentumCard;
