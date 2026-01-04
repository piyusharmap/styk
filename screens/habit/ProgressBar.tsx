import { Animated, StyleSheet, View } from "react-native";
import { useEffect, useRef } from "react";
import { useHabitStore } from "../../store/habitStore";
import { HabitTarget } from "../../types/habitTypes";

const ProgressBar = ({
	habitId,
	target,
	color,
}: {
	habitId: string;
	target: HabitTarget;
	color: string;
}) => {
	const progressAnim = useRef(new Animated.Value(0)).current;

	const countValue = useHabitStore((s) => s.getCountValue(habitId));

	const totalBars = 32;
	const bars = Array.from({ length: totalBars });

	useEffect(() => {
		const progress =
			target.type === "count"
				? Math.min(countValue / target.count, 1)
				: 0;

		Animated.timing(progressAnim, {
			toValue: progress,
			duration: 300,
			useNativeDriver: false,
		}).start();
	}, [countValue]);

	if (target.type !== "count") return null;

	return (
		<View style={styles.container}>
			{bars.map((_, index) => {
				const step = index / totalBars;

				const barOpacity = progressAnim.interpolate({
					inputRange: [step, step + 0.01],
					outputRange: [0.5, 1],
					extrapolate: "clamp",
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
			})}
		</View>
	);
};

export default ProgressBar;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		width: "100%",
		height: 32,
		alignItems: "center",
		justifyContent: "space-between",
	},
	bar: {
		height: "100%",
		width: 4,
		borderRadius: 6,
	},
});
