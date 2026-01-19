import { View, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import UISkeleton from '../ui/UISkeleton';

const ActivityListSkeleton = () => {
	const skeletonItems = Array.from({ length: 4 });

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={styles.activityContainer}>
				{skeletonItems.map((_, index) => (
					<UISkeleton key={index} style={styles.card} />
				))}
			</View>
		</ScrollView>
	);
};

export default ActivityListSkeleton;

const styles = StyleSheet.create({
	// container styles
	activityContainer: {
		flex: 1,
		paddingHorizontal: 12,
		paddingTop: 10,
		paddingBottom: 60,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		gap: 6,
	},
	card: {
		flex: 1,
		minWidth: '40%',
		height: 200,
		alignItems: 'center',
		borderRadius: 24,
	},
	circularProgress: {
		height: 100,
		width: 100,
		borderRadius: 50,
	},
});
