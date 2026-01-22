import { Animated, StyleSheet, View } from 'react-native';
import { useEffect, useMemo, useRef } from 'react';
import { useHabitStore } from '../../store/habitStore';
import { HabitTarget } from '../../types/habitTypes';

const TOTAL_BARS = 44;

const ProgressBar = ({
	habitId,
	target,
	color,
	height = 12,
}: {
	habitId: string;
	target: HabitTarget;
	color: string;
	height?: number;
}) => {
	const animatedFilledCount = useRef(new Animated.Value(0)).current;

	const countValue = useHabitStore((s) => s.getCountValue(habitId));

	useEffect(() => {
		if (target.type === 'count') {
			const progressRatio = Math.min(countValue / target.count, 1);
			const targetFilledBars = progressRatio * TOTAL_BARS;

			Animated.timing(animatedFilledCount, {
				toValue: targetFilledBars,
				duration: 300,
				useNativeDriver: true,
			}).start();
		}
	}, [countValue]);

	const bars = useMemo(() => {
		return Array.from({ length: TOTAL_BARS }).map((_, index) => {
			const barOpacity = animatedFilledCount.interpolate({
				inputRange: [index - 1, index, index + 0.1],
				outputRange: [0.3, 1, 1],
				extrapolate: 'clamp',
			});

			return (
				<Animated.View
					key={index}
					style={[
						styles.bar,
						{
							backgroundColor: color,
							opacity: barOpacity,
						},
					]}
				/>
			);
		});
	}, [color]);

	if (target.type !== 'count') return null;

	return <View style={[{ height: height }, styles.container]}>{bars}</View>;
};

export default ProgressBar;

const styles = StyleSheet.create({
	// container styles
	container: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 2,
		overflow: 'hidden',
	},
	bar: {
		height: '100%',
		width: 3,
		borderRadius: 1,
	},
});
