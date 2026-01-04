import { Animated, StyleSheet, View } from "react-native";
import { HabitTarget } from "../../../types/habitTypes";
import { useHabitStore } from "../../../store/habitStore";
import { useEffect, useRef } from "react";

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

	if (target.type !== "count") return;

	return (
		<View
			style={[
				{
					backgroundColor: color + "50",
				},
				styles.progressTrack,
			]}
		>
			<Animated.View
				style={[
					{
						backgroundColor: color,
						width: progressAnim.interpolate({
							inputRange: [0, 1],
							outputRange: ["0%", "100%"],
						}),
					},
					styles.progressBar,
				]}
			/>
		</View>
	);
};

export default ProgressBar;

const styles = StyleSheet.create({
	// container styles
	progressTrack: {
		width: "100%",
		height: 4,
		borderRadius: 2,
		overflow: "hidden",
	},
	progressBar: {
		minWidth: 2,
		height: "100%",
	},
});
