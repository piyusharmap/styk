import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import {
	UIInput,
	UIInputContainer,
	UIInputError,
	UIInputInfo,
	UIInputLabel,
} from '../../components/ui/UIInput';
import { useState } from 'react';
import {
	ColorOptions,
	InitialTarget,
	MAX_NAME_LENGTH,
	MIN_NAME_LENGTH,
} from '../../constants/habit';
import { Habit, HabitTarget } from '../../types/habitTypes';
import UIButton from '../../components/ui/UIButton';
import { useHabitStore } from '../../store/habitStore';
import { useRouter } from 'expo-router';
import { HABIT_NAME_PLACEHOLDER } from '../../constants/messages';
import useTheme from '../../theme/useTheme';
import ColorSelector from '../../components/habit/ColorSelector';
import HabitCounter from '../../components/habit/HabitCounter';
import UnitSelector from '../../components/habit/UnitSelector';
import FrequencySelector from '../../components/habit/FrequencySelector';
import TypeSelector from '../../components/habit/TypeSelector';
import { fromDateString, toDateString } from '../../utils/time';
import DatePicker from '../../components/DatePicker';
import UIText from '../../components/ui/UIText';

const UpdateHabitForm = ({ currentHabit }: { currentHabit: Habit }) => {
	// form states
	const [habitName, setHabitName] = useState(currentHabit.name || '');
	const [habitColor, setHabitColor] = useState(currentHabit.color || ColorOptions[0]);
	const [habitTarget, setHabitTarget] = useState<typeof InitialTarget>({
		type: currentHabit.target.type,
		unit: currentHabit.target.type === 'count' ? currentHabit.target.unit : 'time',
		count: currentHabit.target.type === 'count' ? currentHabit.target.count : 1,
		frequency: currentHabit.target.frequency,
		startDate:
			currentHabit.target.type === 'quit'
				? fromDateString(currentHabit.target.startDate)
				: new Date(),
		initialStartDate:
			currentHabit.target.type === 'quit'
				? fromDateString(currentHabit.target.initialStartDate)
				: new Date(),
		currentStreak: currentHabit.target.type === 'count' ? currentHabit.target.currentStreak : 0,
		longestStreak: currentHabit.target.type === 'count' ? currentHabit.target.currentStreak : 0,
	});

	const [formError, setFormError] = useState<string>('');
	const [isUpdating, setIsUpdating] = useState<boolean>(false);

	const { colors } = useTheme();
	const router = useRouter();
	const updateHabit = useHabitStore((s) => s.updateHabit);

	const handleUpdateHabit = async () => {
		if (
			habitName.trim().length < MIN_NAME_LENGTH ||
			habitName.trim().length > MAX_NAME_LENGTH
		) {
			setFormError(
				`Name must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters.`,
			);
			return;
		}

		let target: HabitTarget;

		if (habitTarget.type === 'count') {
			target = {
				type: habitTarget.type,
				frequency: habitTarget.frequency,
				count: habitTarget.count,
				unit: habitTarget.unit,
				currentStreak: habitTarget.currentStreak,
				longestStreak: habitTarget.longestStreak,
			};
		} else {
			target = {
				type: habitTarget.type,
				frequency: 'daily',
				startDate: toDateString(habitTarget.startDate),
				initialStartDate: toDateString(habitTarget.initialStartDate),
			};
		}

		setIsUpdating(true);

		try {
			await updateHabit(currentHabit.id, habitName.trim(), habitColor, target);

			router.navigate('(tabs)/habits');
		} catch (error) {
			Alert.alert('Failed to update habit.', `Error: ${error}`);
			setIsUpdating(false);
		}
	};

	return (
		<View style={styles.container}>
			<ScrollView
				contentContainerStyle={styles.formContainer}
				showsVerticalScrollIndicator={false}>
				<UIInputContainer>
					<View style={styles.nameDetails}>
						<UIInputLabel label='Name' />

						<UIText style={styles.nameLimit} isSecondary>
							<UIText
								style={[
									{
										color:
											habitName.length < MIN_NAME_LENGTH ||
											habitName.length > MAX_NAME_LENGTH
												? colors.danger
												: colors.success,
									},
									styles.nameLimitHighlight,
								]}>
								{habitName.length}
							</UIText>
							/{MAX_NAME_LENGTH}
						</UIText>
					</View>

					<UIInput
						value={habitName}
						onChangeInput={setHabitName}
						placeholder={HABIT_NAME_PLACEHOLDER}
					/>
					{formError && <UIInputError error={formError} />}
				</UIInputContainer>

				<UIInputContainer>
					<UIInputLabel label='Color' />
					<ColorSelector selectedColor={habitColor} onPress={setHabitColor} />
				</UIInputContainer>

				<UIInputContainer>
					<UIInputLabel label='Type' />
					<TypeSelector
						selectedType={habitTarget.type}
						onPress={(type) => setHabitTarget((prev) => ({ ...prev, type }))}
						isEditable={false}
					/>
					<UIInputInfo info='Type cannot be edited. Create a new habit instead.' />
				</UIInputContainer>

				{habitTarget.type === 'count' && (
					<UIInputContainer>
						<UIInputLabel label='At least' />

						<View style={styles.countDetails}>
							<HabitCounter
								count={habitTarget.count}
								onPress={(count) =>
									setHabitTarget((prev) => ({
										...prev,
										count,
									}))
								}
							/>

							<UnitSelector
								selectedUnit={habitTarget.unit}
								onPress={(unit) =>
									setHabitTarget((prev) => ({
										...prev,
										unit,
									}))
								}
							/>

							<FrequencySelector
								selectedFrequency={
									habitTarget.type === 'count' ? habitTarget.frequency : 'daily'
								}
								onPress={(frequency) =>
									setHabitTarget((prev) => ({
										...prev,
										frequency,
									}))
								}
								isEditable={false}
							/>
							<UIInputInfo info='Frequency cannot be edited. Create a new habit instead.' />
						</View>
					</UIInputContainer>
				)}

				{habitTarget.type === 'quit' && (
					<>
						<UIInputContainer>
							<UIInputLabel label='Relapsed date' />
							<UIInput
								value={toDateString(habitTarget.startDate)}
								editable={false}
								pointerEvents='none'
								onChangeInput={() => {}}
							/>
						</UIInputContainer>

						<UIInputContainer>
							<UIInputLabel label='Quit date' />
							<DatePicker
								selectedValue={habitTarget.initialStartDate}
								maxDate={habitTarget.startDate}
								onChange={(date) =>
									setHabitTarget((prev) => ({
										...prev,
										initialStartDate: date,
									}))
								}
							/>
							<UIInputInfo info='Start date must be an elapsed date or a date in the past.' />
						</UIInputContainer>
					</>
				)}
			</ScrollView>

			<View
				style={[
					{ backgroundColor: colors.tabBackground, borderColor: colors.border },
					styles.actionContainer,
				]}>
				<UIButton
					title='Save Changes'
					variant='primary'
					onPress={handleUpdateHabit}
					iconName='Save'
					style={styles.actionButton}
					isLoading={isUpdating}
					isDisabled={isUpdating}
				/>
			</View>
		</View>
	);
};

export default UpdateHabitForm;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
	},
	formContainer: {
		gap: 12,
		paddingHorizontal: 12,
		paddingTop: 4,
		paddingBottom: 60,
	},
	nameDetails: {
		paddingRight: 2,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	countDetails: {
		gap: 6,
	},
	actionContainer: {
		paddingHorizontal: 12,
		paddingVertical: 10,
		flexDirection: 'row',
		gap: 8,
		borderTopWidth: 1,
	},
	actionButton: {
		flex: 1,
	},

	// text styles
	nameLimit: {
		fontSize: 12,
	},
	nameLimitHighlight: {
		fontWeight: '500',
	},
});
