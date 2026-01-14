import { useEffect, useState } from 'react';
import { StyleSheet, FlatList, Alert, View } from 'react-native';
import UIView from '../../components/ui/UIView';
import { PageHeader, PageHeading, PageSubHeading } from '../../components/layout/PageHeader';
import { ACTIVITY_PAGE_SUBHEADING } from '../../constants/messages';
import HorizontalDatePicker from '../../components/HorizontalDatePicker';
import { getTodayString } from '../../utils/time';
import { useHabitStore } from '../../store/habitStore';
import { HabitActivity } from '../../types/habitTypes';
import UILoader from '../../components/ui/UILoader';
import ListEmpty from '../../components/list/ListEmpty';
import ActivityCard from '../../screens/activity/components/ActivityCard';

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
				const [data] = await Promise.all([
					getActivity(selectedDate),
					new Promise((resolve) => setTimeout(resolve, 300)),
				]);
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

			{loading ? (
				<View style={styles.loaderContainer}>
					<UILoader size={32} />
				</View>
			) : (
				<FlatList
					data={activity}
					keyExtractor={(item) => item.id}
					numColumns={2}
					columnWrapperStyle={styles.columnWrapper}
					contentContainerStyle={styles.habitsContainer}
					renderItem={({ item }) => <ActivityCard activityItem={item} />}
					ListEmptyComponent={<ListEmpty message='No activity recorded for this date.' />}
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
	habitsContainer: {
		paddingHorizontal: 12,
		paddingTop: 10,
		paddingBottom: 60,
		gap: 6,
	},
	columnWrapper: {
		justifyContent: 'space-between',
		gap: 6,
	},
});
