import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useHabitStore } from '../../../store/habitStore';
import HabitInfoCard from '../../../components/habit/HabitInfoCard';
import useTheme from '../../../theme/useTheme';
import Icon from '../../../components/icon';
import UIText from '../../../components/ui/UIText';
import { hexToRgba } from '../../../utils/habit';

const HabitReport = ({ habitId, accentColor }: { habitId: string; accentColor: string }) => {
	const { colors } = useTheme();

	const logs = useHabitStore((s) => s.logs);
	const habits = useHabitStore((s) => s.habits);

	const report = useMemo(() => {
		return useHabitStore.getState().getLastXDaysReport(habitId, 45);
	}, [habitId, logs, habits]);

	const getItemStyles = (percentage: number, status: string) => {
		switch (status) {
			case 'fail':
				return {
					background: colors.neutral,
					borderColor: 'transparent',
				};
			case 'none':
				return {
					background: colors.foreground,
					borderColor: colors.border,
				};
			case 'skipped':
				return {
					background: 'transparent',
					borderColor: accentColor,
				};
			default:
				return {
					background: hexToRgba(accentColor, Math.max(percentage, 0.15)),
					borderColor: 'transparent',
				};
		}
	};

	return (
		<HabitInfoCard heading='Progress • Past 45 Days'>
			<View style={styles.grid}>
				{report.map((day) => {
					const itemStyle = getItemStyles(day.percentage, day.status);

					return (
						<View
							key={day.date}
							style={[
								{
									backgroundColor: itemStyle.background,
									borderColor: itemStyle.borderColor,
								},
								styles.gridItem,
							]}
						/>
					);
				})}
			</View>

			<View style={styles.legendContainer}>
				<View style={styles.legendItem}>
					<Icon name='CircleSmall' size={16} color={accentColor} isFilled />

					<UIText style={styles.label}>On Track</UIText>
				</View>

				<View style={styles.legendItem}>
					<Icon name='CircleSmall' size={16} color={accentColor} />

					<UIText style={styles.label}>Skipped</UIText>
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
		width: 20,
		height: 20,
		borderRadius: '100%',
		borderWidth: 2,
	},
	legendContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		gap: 8,
	},
	legendItem: {
		flexDirection: 'row',
		alignItems: 'center',
	},

	// text styles
	label: {
		fontSize: 10,
	},
});
