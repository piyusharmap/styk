import { View, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import useTheme from '../../../theme/useTheme';
import UIText from '../../../components/ui/UIText';
import { MOMENTUM_CARD_DESCRIPTION } from '../../../constants/messages';

const MomentumCard = ({ score }: { score: number }) => {
	const { colors } = useTheme();

	const visualScore = Math.max(0.03, score);

	const size = 64;
	const center = size / 2;
	const strokeWidth = 6;
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const strokeDashoffset = circumference - (visualScore / 100) * circumference;

	return (
		<View
			style={[
				styles.card,
				{ backgroundColor: colors.secondary + '30', borderColor: colors.secondary + '80' },
			]}>
			<View style={styles.infoContainer}>
				<UIText style={styles.title}>Daily Momentum</UIText>

				<UIText style={styles.description} isSecondary>
					{MOMENTUM_CARD_DESCRIPTION}
				</UIText>
			</View>

			<View style={styles.chartContainer}>
				<Svg width={size} height={size}>
					<G transform={`rotate(-90 ${center} ${center})`}>
						<Circle
							cx={center}
							cy={center}
							r={radius}
							stroke={colors.primary + '50'}
							strokeWidth={strokeWidth}
							fill='none'
						/>

						<Circle
							cx={center}
							cy={center}
							r={radius}
							stroke={colors.primary}
							strokeWidth={strokeWidth}
							fill='none'
							strokeDasharray={circumference}
							strokeDashoffset={strokeDashoffset}
							strokeLinecap='round'
						/>
					</G>
				</Svg>

				<View style={styles.scoreOverlay}>
					<UIText style={[{ color: colors.primary }, styles.scoreText]}>{score}</UIText>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	// Container Styles
	card: {
		paddingHorizontal: 16,
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
		fontWeight: '800',
	},
	title: {
		fontSize: 18,
		fontWeight: '500',
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
