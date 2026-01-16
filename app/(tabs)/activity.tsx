import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Alert, View } from 'react-native';
import UIView from '../../components/ui/UIView';
import { PageHeader, PageHeading, PageSubHeading } from '../../components/layout/PageHeader';
import { ACTIVITY_PAGE_SUBHEADING, EMPTY_ACTIVITY_LIST_MSG } from '../../constants/messages';
import HorizontalDatePicker from '../../components/HorizontalDatePicker';
import { getTodayString } from '../../utils/time';
import { useHabitStore } from '../../store/habitStore';
import { HabitActivity } from '../../types/habitTypes';
import ListEmpty from '../../components/list/ListEmpty';
import ActivityCard from '../../screens/activity/components/ActivityCard';
import UILoader from '../../components/ui/UILoader';

const ActivityTab = () => {
	const [selectedDate, setSelectedDate] = useState(getTodayString());
	const [activity, setActivity] = useState<HabitActivity[]>([]);
	const [loading, setLoading] = useState(false);

	const getActivity = useHabitStore((s) => s.getDailyActivity);
	const logs = useHabitStore((s) => s.logs);

	useEffect(() => {
		const loadActivity = async () => {
			setLoading(true);
			try {
				const [data] = await Promise.all([getActivity(selectedDate)]);
				setActivity(data);
			} catch (error) {
				Alert.alert('Failed to load activity.', `Error: ${error}`);
			} finally {
				setLoading(false);
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

			<FlatList
				data={activity}
				keyExtractor={(item) => item.id}
				numColumns={2}
				columnWrapperStyle={styles.columnWrapper}
				contentContainerStyle={styles.activityContainer}
				renderItem={({ item }) => (
					<ActivityCard
						activityItem={item}
						style={styles.activityCard}
						isLoading={loading}
					/>
				)}
				ListEmptyComponent={
					loading ? (
						<View>
							<UILoader size={32} />
						</View>
					) : (
						<ListEmpty message={EMPTY_ACTIVITY_LIST_MSG} />
					)
				}
			/>
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
});
