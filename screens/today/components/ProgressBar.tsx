import { Animated, StyleSheet, View } from "react-native";
import { Habit } from "../../../types/habitTypes";
import { useHabitStore } from "../../../store/habitStore";
import { useEffect, useRef } from "react";

const ProgressBar = ({ habit }: { habit: Habit }) => {
	const progressAnim = useRef(new Animated.Value(0)).current;

	const countValue = useHabitStore((s) => s.getCountValue(habit.id));

	useEffect(() => {
		const progress =
			habit.target.type === "count"
				? Math.min(countValue / habit.target.count, 1)
				: 0;

		Animated.timing(progressAnim, {
			toValue: progress,
			duration: 400,
			useNativeDriver: false,
		}).start();
	}, [countValue]);

	if (habit.target.type !== "count") return;

	return (
		<View
			style={[
				{
					backgroundColor: habit.color + "50",
				},
				styles.progressTrack,
			]}
		>
			<Animated.View
				style={[
					{
						backgroundColor: habit.color,
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
