import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, ColorValue, Animated, Easing } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgressBar = ({
	progress,
	size = 72,
	strokeWidth = 8,
	activeColor,
	backgroundColor,
	children,
}: {
	progress: number;
	size?: number;
	strokeWidth?: number;
	activeColor?: string;
	backgroundColor: ColorValue;
	children?: React.ReactNode;
}) => {
	const center = size / 2;
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;

	const animatedProgress = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(animatedProgress, {
			toValue: progress,
			duration: 300,
			easing: Easing.out(Easing.quad),
			useNativeDriver: true,
		}).start();
	}, [progress]);

	const strokeDashoffset = animatedProgress.interpolate({
		inputRange: [0, 100],
		outputRange: [circumference, 0],
	});

	return (
		<View style={[styles.container, { width: size, height: size }]}>
			<Svg width={size} height={size}>
				<G transform={`rotate(-90 ${center} ${center})`}>
					<Circle
						cx={center}
						cy={center}
						r={radius}
						stroke={backgroundColor}
						strokeWidth={strokeWidth}
						fill='none'
					/>

					<AnimatedCircle
						cx={center}
						cy={center}
						r={radius}
						stroke={activeColor}
						strokeWidth={strokeWidth}
						fill='none'
						strokeDasharray={circumference}
						strokeDashoffset={strokeDashoffset}
						strokeLinecap='round'
					/>
				</G>
			</Svg>

			{children && <View style={styles.overlay}>{children}</View>}
		</View>
	);
};

export default CircularProgressBar;

const styles = StyleSheet.create({
	// container styles
	container: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	overlay: {
		position: 'absolute',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
