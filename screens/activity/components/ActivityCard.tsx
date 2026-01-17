import { View, StyleSheet, Pressable, StyleProp, ViewStyle, PressableProps } from 'react-native';
import UIText from '../../../components/ui/UIText';
import { HabitActivity } from '../../../types/habitTypes';
import { useRouter } from 'expo-router';
import CircularProgressBar from '../../../components/habit/CircularProgressBar';
import Icon from '../../../components/icon';
import { HabitTypeDetails } from '../../../constants/habit';
import UILoader from '../../../components/ui/UILoader';
import Badge from '../../../components/Badge';

const ActivityCard = ({
	activityItem,
	isLoading,
	style,
	...props
}: PressableProps & {
	activityItem: HabitActivity;
	isLoading: boolean;
	style?: StyleProp<ViewStyle>;
}) => {
	const router = useRouter();

	const progressValue = Math.round(activityItem.progress * 100);
	const typeDetails = HabitTypeDetails[activityItem.type];

	return (
		<Pressable
			style={({ pressed }) => [
				{
					backgroundColor: activityItem.color + '20',
					borderColor: activityItem.color + '80',
				},
				styles.habitCard,
				pressed && styles.habitCardPressed,
				style,
			]}
			onPress={() => {
				router.navigate({
					pathname: `habit/${activityItem.id}`,
					params: { color: activityItem.color },
				});
			}}
			{...props}>
			<View style={styles.chartSection}>
				<CircularProgressBar
					progress={progressValue}
					size={100}
					strokeWidth={8}
					activeColor={activityItem.color}
					backgroundColor={activityItem.color + '50'}>
					{isLoading ? (
						<UILoader size={24} color={activityItem.color} />
					) : activityItem.type === 'count' ? (
						<View style={styles.progressDetails}>
							<UIText style={styles.count}>
								{activityItem.currentValue}
								<UIText style={styles.countTarget} isSecondary>
									{`/${activityItem.count}`}
								</UIText>
							</UIText>

							<UIText style={styles.unit}>
								{activityItem.unit}
								{activityItem.count > 1 ? 's' : ''}
							</UIText>
						</View>
					) : (
						<View style={styles.quitDetails}>
							<Icon
								name={
									activityItem.currentValue > 0 ? 'CalendarX2' : 'CalendarHeart'
								}
								size={24}
								color={activityItem.color}
								fillColor={activityItem.color + '30'}
								isFilled
							/>

							<UIText style={styles.unit}>
								{activityItem.currentValue > 0 ? 'Relapsed' : 'On Track'}
							</UIText>
						</View>
					)}
				</CircularProgressBar>
			</View>

			<UIText style={styles.name} numberOfLines={1}>
				{activityItem.name}
			</UIText>

			<View style={styles.badgeContainer}>
				<Badge
					icon={typeDetails.icon}
					badgeStyle={{ backgroundColor: activityItem.color + '30' }}
					textStyle={{
						textTransform: 'uppercase',
					}}>
					{typeDetails.label}
				</Badge>

				<Badge
					badgeStyle={{ backgroundColor: activityItem.color + '30' }}
					textStyle={{
						textTransform: 'uppercase',
					}}>
					{activityItem.frequency}
				</Badge>
			</View>
		</Pressable>
	);
};

export default ActivityCard;

const styles = StyleSheet.create({
	// container styles
	habitCard: {
		padding: 16,
		alignItems: 'center',
		borderRadius: 24,
		borderWidth: 2,
		gap: 6,
	},
	habitCardPressed: {
		opacity: 0.8,
		transform: [{ scale: 0.98 }],
	},
	chartSection: {
		marginBottom: 4,
	},
	progressDetails: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	quitDetails: {
		alignItems: 'center',
		gap: 2,
	},
	badgeContainer: {
		flexDirection: 'row',
		gap: 4,
	},

	// text Styles
	name: {
		flex: 1,
		fontSize: 16,
		fontWeight: '600',
		textAlign: 'center',
	},
	count: {
		fontSize: 22,
		fontWeight: '600',
	},
	countTarget: {
		fontSize: 14,
	},
	unit: {
		fontSize: 12,
	},
});
