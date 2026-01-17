import { View, StyleSheet, ColorValue } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

const MIN_PROGRESS = 0.02;

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
	const circumference = Math.max(2 * Math.PI * radius, 0.9);

	const adjustedProgress = MIN_PROGRESS + (progress / 100) * (100 - MIN_PROGRESS);
	const finalPercentage = Math.min(Math.max(adjustedProgress, MIN_PROGRESS), 100);

	const strokeDashoffset = circumference - (finalPercentage / 100) * circumference;

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
					<Circle
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
