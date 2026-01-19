import { View, StyleSheet, Pressable, StyleProp, ViewStyle, PressableProps } from 'react-native';
import UIText from '../../../components/ui/UIText';
import { HabitActivity } from '../../../types/habitTypes';
import { useRouter } from 'expo-router';
import CircularProgressBar from '../../../components/habit/CircularProgressBar';
import Icon from '../../../components/icon';
import { HabitTypeDetails } from '../../../constants/habit';
import Badge from '../../../components/Badge';
import UISkeleton from '../../../components/ui/UISkeleton';
import UILoader from '../../../components/ui/UILoader';

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
				{isLoading ? (
					<UISkeleton
						style={[
							{
								backgroundColor: 'transparent',
								borderColor: activityItem.color + '50',
							},
							styles.progressSkeleton,
						]}>
						<UILoader size={24} color={activityItem.color} />
					</UISkeleton>
				) : (
					<CircularProgressBar
						progress={progressValue}
						size={100}
						strokeWidth={8}
						activeColor={activityItem.color}
						backgroundColor={activityItem.color + '50'}>
						{activityItem.type === 'count' ? (
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
										activityItem.currentValue > 0
											? 'CalendarX2'
											: 'CalendarHeart'
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
				)}
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
		gap: 6,
	},
	habitCardPressed: {
		opacity: 0.8,
		transform: [{ scale: 0.99 }],
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
		gap: 4,
	},
	badgeContainer: {
		flexDirection: 'row',
		gap: 4,
	},
	progressSkeleton: {
		height: 100,
		width: 100,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 8,
		borderRadius: 50,
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
