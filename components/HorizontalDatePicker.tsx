import { useState, useRef, useEffect, useCallback, memo } from 'react';
import { StyleSheet, View, FlatList, Pressable } from 'react-native';
import { getDaysInMonth, getTodayString } from '../utils/time';
import UIText from './ui/UIText';
import useTheme from '../theme/useTheme';
import Icon from './icon';
import UIButton from './ui/UIButton';

const ITEM_WIDTH = 52;
const GAP = 6;
const FULL_ITEM_WIDTH = ITEM_WIDTH + GAP;

const DateItem = memo(
	({
		item,
		isSelected,
		isToday,
		onPress,
	}: {
		item: string;
		isSelected: boolean;
		isToday: boolean;
		onPress: (date: string) => void;
	}) => {
		const { colors } = useTheme();
		const dateObj = new Date(item);
		const weekday = dateObj.toLocaleDateString('en-US', { weekday: 'short' });

		return (
			<View style={styles.dateContainer}>
				<Pressable
					style={({ pressed }) => [
						{
							backgroundColor: colors.foreground,
							borderColor: colors.border,
						},
						isSelected && {
							borderColor: colors.primary,
						},
						pressed && styles.dateButtonPressed,
						styles.dateButton,
					]}
					onPress={() => onPress(item)}>
					<UIText style={[isToday && { color: colors.primary }, styles.date]}>
						{dateObj.getDate()}
					</UIText>

					<UIText style={styles.weekday} isSecondary>
						{weekday}
					</UIText>
				</Pressable>
			</View>
		);
	},
);

DateItem.displayName = 'DateItem';

const HorizontalDatePicker = ({
	selectedDate,
	onDateChange,
}: {
	selectedDate: string;
	onDateChange: (date: string) => void;
}) => {
	const { colors } = useTheme();
	const [dates, setDates] = useState<string[]>([]);
	const [viewingMonth, setViewingMonth] = useState(new Date(selectedDate));

	const flatListRef = useRef<FlatList>(null);

	useEffect(() => {
		const days = getDaysInMonth(viewingMonth.getFullYear(), viewingMonth.getMonth());
		setDates(days);

		const selectedIndex = days.indexOf(selectedDate);

		const scrollTimeout = setTimeout(() => {
			if (selectedIndex !== -1) {
				flatListRef.current?.scrollToIndex({
					index: selectedIndex,
					animated: true,
					viewPosition: 0.5,
				});
			} else {
				flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
			}
		}, 100);

		return () => clearTimeout(scrollTimeout);
	}, [viewingMonth]);

	const changeMonth = (offset: number) => {
		const newMonth = new Date(viewingMonth);
		newMonth.setMonth(viewingMonth.getMonth() + offset);
		setViewingMonth(newMonth);
	};

	const renderItem = useCallback(
		({ item }: { item: string }) => (
			<DateItem
				item={item}
				isSelected={item === selectedDate}
				isToday={item === getTodayString()}
				onPress={onDateChange}
			/>
		),
		[selectedDate, colors, onDateChange],
	);

	const monthName = viewingMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

	const goToToday = () => {
		const today = new Date();
		setViewingMonth(today);
		onDateChange(getTodayString());
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Pressable style={styles.navButton} onPress={() => changeMonth(-1)}>
					<Icon name='ChevronLeft' size={20} color={colors.accent} />
				</Pressable>

				<View style={styles.monthContainer}>
					<View
						style={[
							{
								backgroundColor: colors.secondary + '30',
								borderColor: colors.secondary,
							},
							styles.monthDisplay,
						]}>
						<UIText style={styles.month}>{monthName}</UIText>
					</View>

					<UIButton size='sm' title='Today' onPress={goToToday} />
				</View>

				<Pressable style={styles.navButton} onPress={() => changeMonth(1)}>
					<Icon name='ChevronRight' size={20} color={colors.accent} />
				</Pressable>
			</View>

			<FlatList
				ref={flatListRef}
				data={dates}
				horizontal
				keyExtractor={(item) => item}
				renderItem={renderItem}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.listContainer}
				getItemLayout={(_, index) => ({
					length: FULL_ITEM_WIDTH,
					offset: FULL_ITEM_WIDTH * index,
					index,
				})}
				onScrollToIndexFailed={(info) => {
					const wait = new Promise((resolve) => setTimeout(resolve, 100));
					wait.then(() => {
						flatListRef.current?.scrollToIndex({ index: info.index, animated: false });
					});
				}}
				snapToInterval={FULL_ITEM_WIDTH}
				decelerationRate='fast'
			/>
		</View>
	);
};

export default HorizontalDatePicker;

const styles = StyleSheet.create({
	// container styles
	container: {
		gap: 8,
	},
	header: {
		paddingHorizontal: 12,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 20,
	},
	monthContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 4,
	},
	monthDisplay: {
		height: 40,
		paddingHorizontal: 20,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 20,
		borderWidth: 2,
	},
	navButton: {
		height: ITEM_WIDTH,
		width: ITEM_WIDTH,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: '100%',
	},
	listContainer: {
		paddingHorizontal: 12,
		gap: GAP,
	},
	dateContainer: {
		alignItems: 'center',
	},
	dateButton: {
		height: 52,
		width: 52,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		borderRadius: 10,
	},
	dateButtonPressed: {
		opacity: 0.8,
	},

	// text styles
	month: {
		fontSize: 16,
		fontWeight: '600',
	},
	date: {
		fontSize: 18,
		fontWeight: '600',
	},
	weekday: {
		fontSize: 10,
		textTransform: 'uppercase',
		fontWeight: '500',
	},
});
