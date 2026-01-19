import { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import UIButton from '../../components/ui/UIButton';
import UIText from '../../components/ui/UIText';
import useTheme from '../../theme/useTheme';

const Stopwatch = () => {
	const { colors } = useTheme();

	const [time, setTime] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const [laps, setLaps] = useState<number[]>([]);

	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const startTimeRef = useRef(0);

	useEffect(() => {
		if (isRunning) {
			startTimeRef.current = Date.now() - time;

			timerRef.current = setInterval(() => {
				const elapsed = Date.now() - startTimeRef.current;
				setTime(elapsed);
			}, 50);
		} else {
			if (timerRef.current) clearInterval(timerRef.current);
		}

		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, [isRunning]);

	const formatTime = (ms: number) => {
		const mins = Math.floor(ms / 60000);
		const secs = Math.floor((ms % 60000) / 1000);
		const hundredths = Math.floor((ms % 1000) / 10);
		return `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}:${hundredths < 10 ? '0' + hundredths : hundredths}`;
	};

	const handleResetOrLap = () => {
		if (isRunning) {
			setLaps((prev) => {
				const newLaps = [time, ...prev];
				return newLaps.slice(0, 10);
			});
		} else {
			setTime(0);
			setLaps([]);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.stopwatchContainer}>
				<View style={styles.timerContainer}>
					<View
						style={[
							{
								backgroundColor: colors.secondary + '30',
								borderColor: colors.secondary,
							},
							styles.timer,
						]}>
						<UIText style={styles.time}>{formatTime(time)}</UIText>
					</View>
				</View>

				{laps.length ? (
					<FlatList
						data={laps}
						keyExtractor={(_, index) => `lap-${index}`}
						renderItem={({ item, index }) => (
							<View
								style={[
									{
										backgroundColor: colors.foreground,
										borderColor: colors.border,
									},
									styles.lapRow,
								]}>
								<UIText style={styles.lapCount}>Lap {laps.length - index}</UIText>
								<UIText style={styles.lapTime}>{formatTime(item)}</UIText>
							</View>
						)}
						contentContainerStyle={styles.lapsContainer}
						showsVerticalScrollIndicator={false}
					/>
				) : null}
			</View>

			<View style={styles.actionContainer}>
				<UIButton
					variant={isRunning ? 'secondary' : 'danger'}
					size='lg'
					title={isRunning ? 'Lap' : 'Reset'}
					iconName={isRunning ? 'Timer' : 'TimerReset'}
					style={styles.actionButton}
					onPress={handleResetOrLap}
					isDisabled={time === 0}
				/>

				<UIButton
					variant={isRunning ? 'danger' : 'default'}
					size='lg'
					title={isRunning ? 'Stop' : time > 0 ? 'Resume' : 'Start'}
					iconName={isRunning ? 'Square' : 'Play'}
					style={styles.actionButton}
					onPress={() => setIsRunning(!isRunning)}
				/>
			</View>
		</View>
	);
};

export default Stopwatch;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	stopwatchContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	timerContainer: {
		paddingHorizontal: 12,
		paddingVertical: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	timer: {
		height: 260,
		width: 260,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 130,
		borderWidth: 4,
	},
	lapsContainer: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		gap: 6,
	},
	lapRow: {
		height: 50,
		width: '100%',
		paddingHorizontal: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderRadius: 25,
		borderWidth: 2,
	},
	actionContainer: {
		paddingHorizontal: 12,
		paddingVertical: 10,
		flexDirection: 'row',
		gap: 6,
	},
	actionButton: {
		flex: 1,
	},

	// text styles
	time: {
		fontSize: 36,
		fontWeight: '600',
	},
	lapCount: {
		fontSize: 14,
		fontWeight: '500',
	},
	lapTime: {
		fontSize: 16,
		fontWeight: '600',
	},
});
