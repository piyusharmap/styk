import { Animated, StyleSheet, View } from 'react-native';
import { useEffect, useRef } from 'react';
import { useHabitStore } from '../../store/habitStore';
import { HabitTarget } from '../../types/habitTypes';

const ProgressBar = ({
	habitId,
	target,
	color,
	height = 16,
}: {
	habitId: string;
	target: HabitTarget;
	color: string;
	height?: number;
}) => {
	const totalBars = 36;
	const animatedFilledCount = useRef(new Animated.Value(0)).current;

	const countValue = useHabitStore((s) => s.getCountValue(habitId));

	useEffect(() => {
		if (target.type === 'count') {
			const progressRatio = Math.min(countValue / target.count, 1);
			const targetFilledBars = progressRatio * totalBars;

			Animated.timing(animatedFilledCount, {
				toValue: targetFilledBars,
				duration: 400,
				useNativeDriver: false,
			}).start();
		}
	}, [countValue]);

	if (target.type !== 'count') return null;

	return (
		<View style={[{ height: height }, styles.container]}>
			{Array.from({ length: totalBars }).map((_, index) => {
				const barOpacity = animatedFilledCount.interpolate({
					inputRange: [index - 1, index],
					outputRange: [0.2, 1],
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
								transform: [
									{
										scaleY: barOpacity.interpolate({
											inputRange: [0.2, 1],
											outputRange: [0.7, 1],
										}),
									},
								],
							},
						]}
					/>
				);
			})}
		</View>
	);
};

export default ProgressBar;

const styles = StyleSheet.create({
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
		width: 4,
		borderRadius: 2,
	},
});
