import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useHabitStore } from '../../../store/habitStore';
import HabitInfoCard from '../../../components/habit/HabitInfoCard';
import useTheme from '../../../theme/useTheme';
import Icon from '../../../components/icon';
import UIText from '../../../components/ui/UIText';

const HabitReport = ({ habitId, accentColor }: { habitId: string; accentColor: string }) => {
	const { colors } = useTheme();

	const logs = useHabitStore((s) => s.logs);
	const habits = useHabitStore((s) => s.habits);

	const report = useMemo(() => {
		return useHabitStore.getState().getLastXDaysReport(habitId, 60);
	}, [habitId, logs, habits]);

	return (
		<HabitInfoCard heading='Progress • Past 60 Days'>
			<View style={styles.grid}>
				{report.map((day) =>
					day.status === 'fail' ? (
						<View
							key={day.date}
							style={[
								{
									backgroundColor: colors.neutral,
									borderColor: colors.neutral,
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
									borderColor: accentColor,
									opacity: Math.max(day.percentage, 0.15),
								},
								styles.gridItem,
							]}
						/>
					),
				)}
			</View>

			<View style={styles.legendContainer}>
				<View style={styles.legendItem}>
					<Icon name='CircleSmall' size={16} color={accentColor} isFilled />

					<UIText style={styles.label}>On Track</UIText>
				</View>

				<View style={styles.legendItem}>
					<Icon name='CircleSmall' size={16} color={colors.neutral} isFilled />

					<UIText style={styles.label}>Off Track</UIText>
				</View>
			</View>
		</HabitInfoCard>
	);
};

export default HabitReport;

const styles = StyleSheet.create({
	// container styles
	grid: {
		paddingVertical: 6,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		gap: 4,
	},
	gridItem: {
		width: 16,
		height: 16,
		borderRadius: '100%',
	},
	legendContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		gap: 8,
	},
	legendItem: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 2,
	},

	// text styles
	label: {
		fontSize: 10,
	},
});
