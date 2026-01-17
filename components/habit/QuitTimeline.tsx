import { View, StyleSheet } from 'react-native';
import Badge from '../Badge';
import { formatDisplayDate } from '../../utils/time';

const QuitTimeline = ({
	initialDate,
	currentDate,
	color,
}: {
	initialDate: string;
	currentDate: string;
	color: string;
}) => {
	return (
		<View style={styles.timeline}>
			<Badge badgeStyle={{ backgroundColor: color + '30' }}>
				{formatDisplayDate(initialDate)}
			</Badge>

			{currentDate !== initialDate && (
				<>
					<View style={[{ borderColor: color }, styles.timelineLine]} />
					<Badge icon='Zap' badgeStyle={{ backgroundColor: color + '30' }}>
						{formatDisplayDate(currentDate)}
					</Badge>
				</>
			)}

			<View style={[{ borderColor: color }, styles.timelineLine]} />

			<Badge badgeStyle={{ backgroundColor: color + '30' }}>Today</Badge>
		</View>
	);
};

export default QuitTimeline;

const styles = StyleSheet.create({
	// container styles
	timeline: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 2,
	},
	timelineLine: {
		flex: 1,
		height: 0,
		borderTopWidth: 1,
		borderStyle: 'dashed',
	},
});
