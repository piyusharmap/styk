import { View, StyleSheet, Pressable, StyleProp, ViewStyle, PressableProps } from 'react-native';
import UIText from '../../../components/ui/UIText';
import { HabitActivity } from '../../../types/habitTypes';
import { useRouter } from 'expo-router';
import CircularProgressBar from '../../../components/habit/CircularProgressBar';
import Icon from '../../../components/icon';
import { HabitTypeDetails } from '../../../constants/habit';
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
							<UIText style={styles.unit} isSecondary>
								{activityItem.unit}
								{activityItem.count > 1 ? 's' : ''}
							</UIText>
						</View>
					) : (
						<Icon
							name={activityItem.currentValue > 0 ? 'CalendarX2' : 'CalendarHeart'}
							size={28}
							color={activityItem.color}
							fillColor={activityItem.color + '30'}
							isFilled
						/>
					)}
				</CircularProgressBar>
			</View>

			<UIText style={styles.name} numberOfLines={1}>
				{activityItem.name}
			</UIText>

			<View style={styles.badgeContainer}>
				<View style={[{ backgroundColor: activityItem.color + '20' }, styles.badge]}>
					<Icon name={typeDetails.icon} size={12} color={activityItem.color} />
					<UIText style={[{ color: activityItem.color }, styles.badgeInfo]}>
						{typeDetails.label}
					</UIText>
				</View>

				<View style={[{ backgroundColor: activityItem.color + '20' }, styles.badge]}>
					<UIText style={[{ color: activityItem.color }, styles.badgeInfo]}>
						{activityItem.frequency}
					</UIText>
				</View>
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
		alignItems: 'center',
		justifyContent: 'center',
	},
	badgeContainer: {
		flexDirection: 'row',
		gap: 4,
	},
	badge: {
		height: 20,
		paddingHorizontal: 10,
		paddingVertical: 4,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 4,
		borderRadius: 10,
	},

	// text Styles
	name: {
		flex: 1,
		fontSize: 16,
		fontWeight: '500',
		textAlign: 'center',
	},
	badgeInfo: {
		fontSize: 10,
		fontWeight: '800',
		textTransform: 'uppercase',
	},
	count: {
		fontSize: 20,
		fontWeight: '500',
	},
	countTarget: {
		fontSize: 14,
	},
	unit: {
		fontSize: 12,
	},
});
