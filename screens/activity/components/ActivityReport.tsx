import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useHabitStore } from '../../../store/habitStore';
import useTheme from '../../../theme/useTheme';

const ActivityReport = ({ habitId, accentColor }: { habitId: string; accentColor: string }) => {
	const { colors } = useTheme();
	const logs = useHabitStore((s) => s.logs);
	const habits = useHabitStore((s) => s.habits);

	const report = useMemo(() => {
		return useHabitStore.getState().getLastXDaysReport(habitId, 60);
	}, [habitId, logs, habits]);

	return (
		<View style={styles.gridContainer}>
			<View style={styles.grid}>
				{report.map((day) =>
					day.status === 'fail' ? (
						<View
							key={day.date}
							style={[
								{
									backgroundColor: colors.neutral,
								},
								styles.gridItem,
							]}
						/>
					) : (
						<View
							key={day.date}
							style={[
								{
									backgroundColor: accentColor,
									opacity: Math.max(day.percentage, 0.15),
								},
								styles.gridItem,
							]}
						/>
					),
				)}
			</View>
		</View>
	);
};

export default ActivityReport;

const styles = StyleSheet.create({
	// container styles
	gridContainer: {
		flex: 1,
	},
	grid: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		gap: 4,
	},
	gridItem: {
		width: 12,
		height: 12,
		borderRadius: 2,
	},
});
