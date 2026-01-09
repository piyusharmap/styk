import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import useTheme from '../../../theme/useTheme';
import UIText from '../../../components/ui/UIText';

interface MomentumCardProps {
	score: number;
}

const MomentumCard = ({ score }: MomentumCardProps) => {
	const { colors } = useTheme();

	const size = 72;
	const center = size / 2;
	const strokeWidth = 8;
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const strokeDashoffset = circumference - (score / 100) * circumference;

	return (
		<View
			style={[
				styles.card,
				{ backgroundColor: colors.foreground + '80', borderColor: colors.foreground },
			]}>
			<View style={styles.chartContainer}>
				<Svg width={size} height={size}>
					<G rotation='-90' origin={`${center}, ${center}`}>
						<Circle
							cx={center}
							cy={center}
							r={radius}
							stroke={colors.secondary + '50'}
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
					<UIText style={styles.scoreText}>{score}</UIText>
				</View>
			</View>

			<View style={styles.infoContainer}>
				<UIText style={styles.title}>Daily Momentum</UIText>

				<UIText style={styles.description} isSecondary>
					Overall consistency across all your active habits.
				</UIText>

				{/* <View style={[styles.statusBadge, { backgroundColor: colors.background }]}>
					<UIText style={styles.statusText}>
						{score >= 80
							? '🔥 On Fire'
							: score >= 50
								? '⚡ Improving'
								: '🌱 Just Starting'}
					</UIText>
				</View> */}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	// Container Styles
	card: {
		padding: 10,
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
	},
	statusBadge: {
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 8,
		alignSelf: 'flex-start',
	},

	// Text Styles
	scoreText: {
		fontSize: 24,
		fontWeight: '600',
	},
	title: {
		fontSize: 18,
		fontWeight: '600',
	},
	description: {
		fontSize: 12,
	},
	statusText: {
		fontSize: 12,
	},
});

export default MomentumCard;
