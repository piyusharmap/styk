import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useHabitStore } from '../../store/habitStore';
import HabitInfoCard from '../../screens/habit/HabitInfoCard';
import UIText from '../../components/ui/UIText';
import useTheme from '../../theme/useTheme';
import Icon from '../../components/icon';

const HabitReport = ({ habitId }: { habitId: string }) => {
	const { colors } = useTheme();

	const logs = useHabitStore((s) => s.logs);
	const habits = useHabitStore((s) => s.habits);

	const report = useMemo(() => {
		return useHabitStore.getState().getLast30DayReport(habitId);
	}, [habitId, logs, habits]);

	const getItemColor = (status: string) => {
		switch (status) {
			case 'success':
				return { color: colors.neutral, border: colors.neutral };
			case 'incomplete':
				return {
					color: colors.foreground,
					border: colors.neutral,
				};
			case 'fail':
				return {
					color: colors.danger,
					border: colors.danger,
				};
			default:
				return {
					color: colors.foreground,
					border: colors.border,
				};
		}
	};

	return (
		<HabitInfoCard heading='Report • Past 30 Days'>
			<View style={styles.grid}>
				{report.map((day) => (
					<View
						key={day.date}
						style={[
							{
								backgroundColor: getItemColor(day.status).color,
								borderColor: getItemColor(day.status).border,
							},
							styles.gridItem,
						]}
					/>
				))}
			</View>

			<View style={styles.legendContainer}>
				<View style={styles.legendItem}>
					<Icon name='CircleSmall' size={16} color={colors.neutral} isFilled />

					<UIText style={styles.label} isSecondary>
						Completed
					</UIText>
				</View>

				<View style={styles.legendItem}>
					<Icon name='CircleSmall' size={16} color={colors.danger} isFilled />

					<UIText style={styles.label} isSecondary>
						Missed
					</UIText>
				</View>
			</View>
		</HabitInfoCard>
	);
};

export default HabitReport;

const styles = StyleSheet.create({
	// container styles
	grid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
		paddingVertical: 12,
		justifyContent: 'flex-start',
	},
	gridItem: {
		width: 20,
		height: 20,
		borderRadius: 10,
		borderWidth: 2,
	},
	legendContainer: {
		paddingTop: 4,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		gap: 10,
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
