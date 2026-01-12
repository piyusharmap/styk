import { View, StyleSheet, ScrollView } from 'react-native';
import { Habit } from '../../../types/habitTypes';
import ActivityReport from './ActivityReport';
import UIText from '../../../components/ui/UIText';
import TypeIconContainer from '../../../components/habit/TypeIconContainer';
import { HabitTypeDetails } from '../../../constants/habit';
import UIButton from '../../../components/ui/UIButton';

const ActivityCard = ({ habit }: { habit: Habit }) => {
	const typeDetails = HabitTypeDetails[habit.target.type];

	return (
		<ScrollView
			contentContainerStyle={[
				{ backgroundColor: habit.color + '30', borderColor: habit.color + '50' },
				styles.card,
			]}>
			<View style={styles.infoContainer}>
				<TypeIconContainer icon={typeDetails.icon} color={habit.color} />

				<View style={styles.detailsContainer}>
					<UIText style={styles.name} numberOfLines={2}>
						{habit.name}
					</UIText>

					<UIText style={styles.description} isSecondary>
						{habit.target.frequency} Activity • Past 60 Days
					</UIText>
				</View>

				<UIButton
					variant='primary'
					size='sm'
					title=''
					iconName='ArrowRight'
					isIconButton
					style={[{ backgroundColor: habit.color }, styles.button]}
				/>
			</View>

			<View style={styles.reportContainer}>
				<ActivityReport habitId={habit.id} accentColor={habit.color} />
			</View>
		</ScrollView>
	);
};

export default ActivityCard;

const styles = StyleSheet.create({
	// container styles
	card: {
		padding: 12,
		gap: 10,
		borderWidth: 1,
		borderRadius: 10,
		overflow: 'hidden',
	},
	infoContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	detailsContainer: {
		flex: 1,
		gap: 1,
	},
	reportContainer: {
		flex: 1,
	},
	button: {
		borderRadius: '100%',
	},

	// text styles
	name: {
		fontSize: 18,
		fontWeight: '500',
		lineHeight: 22,
	},
	description: {
		fontSize: 10,
		textTransform: 'capitalize',
	},
});
