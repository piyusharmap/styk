import { Alert, ScrollView, StyleSheet, View } from "react-native";
import {
	UIInput,
	UIInputContainer,
	UIInputError,
	UIInputLabel,
} from "../../components/ui/UIInput";
import { useState } from "react";
import { ColorOptions, InitialTarget } from "../../constants/habit";
import { Habit, HabitTarget } from "../../types/habitTypes";
import UIButton from "../../components/ui/UIButton";
import { useHabitStore } from "../../store/habitStore";
import { toDateString } from "../../utils/time";
import { useRouter } from "expo-router";
import { HABIT_NAME_PLACEHOLDER } from "../../constants/messages";
import useTheme from "../../theme/useTheme";
import ColorSelector from "../../components/habit/ColorSelector";
import HabitCounter from "../../components/habit/HabitCounter";
import UnitSelector from "../../components/habit/UnitSelector";
import FrequencySelector from "../../components/habit/FrequencySelector";
import QuitDatePicker from "../../components/habit/QuitDatePicker";

const UpdateHabitForm = ({ currentHabit }: { currentHabit: Habit }) => {
	// form states
	const [habitName, setHabitName] = useState(currentHabit.name || "");
	const [habitColor, setHabitColor] = useState(
		currentHabit.color || ColorOptions[0]
	);
	const [habitTarget, setHabitTarget] = useState<HabitTarget>(
		currentHabit.target
	);

	const [formError, setFormError] = useState<string>("");
	const [isUpdating, setIsUpdating] = useState<boolean>(false);

	const { colors } = useTheme();
	const router = useRouter();
	const updateHabit = useHabitStore((s) => s.updateHabit);

	const handleUpdateHabit = async () => {
		if (habitName.trim().length < 3 || habitName.trim().length > 40) {
			setFormError("Name must be between 3 and 40 characters.");
			return;
		}

		let target: HabitTarget;

		if (habitTarget.type === "count") {
			target = {
				type: habitTarget.type,
				frequency: habitTarget.frequency,
				count: habitTarget.count,
				unit: habitTarget.unit,
			};
		} else {
			target = {
				type: habitTarget.type,
				frequency: "daily",
				startDate: habitTarget.startDate,
				initialStartDate: habitTarget.startDate,
			};
		}

		setIsUpdating(true);

		try {
			await updateHabit(
				currentHabit.id,
				habitName.trim(),
				habitColor,
				target
			);

			router.navigate(`habit/${currentHabit.id}`);
		} catch (error) {
			Alert.alert(
				"Operation Failed",
				"Failed to update habit. Please try again."
			);
		} finally {
			setIsUpdating(false);
		}
	};

	return (
		<View style={styles.container}>
			<ScrollView
				contentContainerStyle={styles.formContainer}
				showsVerticalScrollIndicator={false}
			>
				<UIInputContainer>
					<UIInputLabel label="Name" />
					<UIInput
						value={habitName}
						onChangeInput={setHabitName}
						placeholder={HABIT_NAME_PLACEHOLDER}
					/>
					{formError && <UIInputError error={formError} />}
				</UIInputContainer>

				<UIInputContainer>
					<UIInputLabel label="Color" />
					<ColorSelector
						selectedColor={habitColor}
						onPress={setHabitColor}
					/>
				</UIInputContainer>

				{habitTarget.type === "count" && (
					<UIInputContainer>
						<UIInputLabel label="At least" />

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
									habitTarget.type === "count"
										? habitTarget.frequency
										: "daily"
								}
								onPress={(freq) =>
									setHabitTarget((prev) => {
										if (prev.type !== "count") return prev;
										return { ...prev, frequency: freq };
									})
								}
							/>
						</View>
					</UIInputContainer>
				)}

				{habitTarget.type === "quit" && (
					<UIInputContainer>
						<UIInputLabel label="Quit date" />
						<QuitDatePicker
							selectedValue={
								new Date(
									habitTarget.type === "quit"
										? habitTarget.startDate
										: new Date()
								)
							}
							onChange={(date) =>
								setHabitTarget((prev) => {
									if (prev.type !== "quit") return prev;
									return {
										...prev,
										startDate: date.toISOString(),
									};
								})
							}
						/>
					</UIInputContainer>
				)}
			</ScrollView>

			<View
				style={[{ borderColor: colors.border }, styles.actionContainer]}
			>
				<UIButton
					title="Update Habit"
					variant="primary"
					onPress={handleUpdateHabit}
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
		flex: 1,
		gap: 16,
		paddingHorizontal: 12,
		paddingTop: 10,
		paddingBottom: 60,
	},
	countDetails: {
		gap: 10,
	},
	actionContainer: {
		paddingHorizontal: 12,
		paddingVertical: 10,
		flexDirection: "row",
		gap: 8,
		borderTopWidth: 1,
	},
	actionButton: {
		flex: 1,
	},
});
