import { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useHabitStore } from '../../store/habitStore';
import HabitInfoCard from '../../screens/habit/HabitInfoCard';
import UIText from '../../components/ui/UIText';
import useTheme from '../../theme/useTheme';
import Icon from '../../components/icon';

const HabitReport = ({ habitId, accent }: { habitId: string; accent: string }) => {
	const { colors } = useTheme();

	const logs = useHabitStore((s) => s.logs);
	const habits = useHabitStore((s) => s.habits);

	const report = useMemo(() => {
		return useHabitStore.getState().getLast30DayReport(habitId);
	}, [habitId, logs, habits]);

	const getItemColor = (status: string) => {
		switch (status) {
			case 'success':
				return { color: accent, border: accent };
			case 'incomplete':
				return {
					color: accent + '50',
					border: accent,
				};
			case 'fail':
				return {
					color: colors.neutral,
					border: colors.neutral,
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
					<Icon name='CircleSmall' size={16} color={accent} isFilled />

					<UIText style={styles.label} isSecondary>
						Done
					</UIText>
				</View>

				<View style={styles.legendItem}>
					<Icon
						name='CircleSmall'
						size={16}
						color={accent}
						isFilled
						fillColor={accent + '50'}
					/>

					<UIText style={styles.label} isSecondary>
						Pending
					</UIText>
				</View>

				<View style={styles.legendItem}>
					<Icon name='CircleSmall' size={16} color={colors.neutral} isFilled />

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
		gap: 4,
		paddingVertical: 10,
		justifyContent: 'flex-start',
	},
	gridItem: {
		width: 20,
		height: 20,
		borderRadius: 4,
		borderWidth: 1,
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
