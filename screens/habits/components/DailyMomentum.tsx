import { View, StyleSheet } from 'react-native';
import useTheme from '../../../theme/useTheme';
import UIText from '../../../components/ui/UIText';
import CircularProgressBar from '../../../components/habit/CircularProgressBar';
import { useHabitStore } from '../../../store/habitStore';
import { useShallow } from 'zustand/react/shallow';
import Badge from '../../../components/Badge';
import Icon, { IconType } from '../../../components/icon';

const DailyMomentum = () => {
	const { colors } = useTheme();
	const momentum = useHabitStore(useShallow((s) => s.getDailyMomentum()));
	const percentage = Math.round(momentum.score * 100);

	const getStatusMessage = () => {
		if (momentum.total === 0) {
			return {
				message: 'Add habits to begin!',
				icon: 'Sprout' as IconType,
			};
		}

		if (percentage === 100) {
			return {
				message: 'Perfect day reached!',
				icon: 'Trophy' as IconType,
			};
		}
		if (percentage >= 50) {
			return {
				message: 'Over halfway there!',
				icon: 'Rocket' as IconType,
			};
		}
		if (percentage > 0) {
			return {
				message: 'Great start! Keep going.',
				icon: 'BicepsFlexed' as IconType,
			};
		}

		return {
			message: 'Keep the streak alive!',
			icon: 'Leaf' as IconType,
		};
	};

	return (
		<View style={styles.card}>
			<View style={[styles.progressCard]}>
				<CircularProgressBar
					progress={Math.max(percentage, 1)}
					activeColor={colors.primary}
					backgroundColor={colors.primary + '50'}>
					<Icon
						name={getStatusMessage().icon}
						size={28}
						color={colors.primary}
						fillColor={colors.secondary + '80'}
						isFilled
					/>
				</CircularProgressBar>
			</View>

			<View style={styles.infoContainer}>
				<View style={styles.badgeContainer}>
					<Badge
						icon='CheckCircle'
						badgeStyle={{ backgroundColor: colors.secondary + '50' }}>
						{momentum.completed}/{momentum.total} Done
					</Badge>

					{momentum.partiallyDone > 0 && (
						<Badge
							icon='TrendingUp'
							badgeStyle={{ backgroundColor: colors.secondary + '50' }}>
							{momentum.partiallyDone} in Progress
						</Badge>
					)}
				</View>

				<UIText style={styles.message}>{getStatusMessage().message}</UIText>
			</View>
		</View>
	);
};

export default DailyMomentum;

const styles = StyleSheet.create({
	// container styles
	card: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	progressCard: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	infoContainer: {
		flex: 1,
		gap: 4,
	},
	badgeContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},

	// text styles
	message: {
		paddingLeft: 2,
		fontSize: 22,
		fontWeight: '600',
		lineHeight: 26,
	},
});
