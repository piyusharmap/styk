import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Alert } from 'react-native';
import UIView from '../../components/ui/UIView';
import { PageHeader, PageHeading, PageSubHeading } from '../../components/layout/PageHeader';
import { ACTIVITY_PAGE_SUBHEADING } from '../../constants/messages';
import HorizontalDatePicker from '../../components/HorizontalDatePicker';
import { getTodayString } from '../../utils/time';
import { useHabitStore } from '../../store/habitStore';
import { HabitActivity } from '../../types/habitTypes';
import ActivityCard from '../../screens/activity/components/ActivityCard';
import { ListEmptyContainer } from '../../components/list/ListEmpty';
import UIText from '../../components/ui/UIText';
import ActivityListSkeleton from '../../components/skeleton/ActivityListSkeleton';

const ActivityTab = () => {
	const [selectedDate, setSelectedDate] = useState(getTodayString());
	const [activity, setActivity] = useState<HabitActivity[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const getActivity = useHabitStore((s) => s.getDailyActivity);
	const logs = useHabitStore((s) => s.logs);

	useEffect(() => {
		const loadActivity = async () => {
			setIsLoading(true);

			const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

			try {
				const [data] = await Promise.all([getActivity(selectedDate), delay(200)]);

				setActivity(data);
			} catch (error) {
				Alert.alert('Failed to load activity.', `Error: ${error}`);
			} finally {
				setIsLoading(false);
			}
		};

		loadActivity();
	}, [selectedDate, getActivity, logs]);

	return (
		<UIView style={styles.container}>
			<PageHeader isTopSafe>
				<PageHeading>Activity</PageHeading>
				<PageSubHeading>{ACTIVITY_PAGE_SUBHEADING}</PageSubHeading>
			</PageHeader>

			<HorizontalDatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />

			{isLoading && !activity.length ? (
				<ActivityListSkeleton />
			) : (
				<FlatList
					data={activity}
					keyExtractor={(item) => item.id}
					numColumns={2}
					columnWrapperStyle={styles.columnWrapper}
					contentContainerStyle={styles.activityContainer}
					renderItem={({ item }) => (
						<ActivityCard
							activityItem={item}
							isLoading={isLoading}
							style={styles.activityCard}
						/>
					)}
					ListEmptyComponent={
						<ListEmptyContainer>
							<UIText style={styles.emptyListMessage}>No Activity</UIText>
							<UIText style={styles.emptyListDescription} isSecondary>
								No activity recorded for this date.
							</UIText>
						</ListEmptyContainer>
					}
				/>
			)}
		</UIView>
	);
};

export default ActivityTab;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
		gap: 8,
	},
	loaderContainer: {
		padding: 40,
	},
	activityContainer: {
		flexGrow: 1,
		paddingHorizontal: 12,
		paddingTop: 10,
		paddingBottom: 60,
		gap: 6,
	},
	activityCard: {
		width: '50%',
	},
	columnWrapper: {
		justifyContent: 'space-between',
		gap: 6,
	},

	// text styles
	emptyListMessage: {
		fontSize: 18,
		fontWeight: '600',
	},
	emptyListDescription: {
		fontSize: 16,
	},
});
