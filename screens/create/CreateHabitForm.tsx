import { Alert, ScrollView, StyleSheet, View } from "react-native";
import {
	UIInput,
	UIInputContainer,
	UIInputError,
	UIInputLabel,
} from "../../components/ui/UIInput";
import { useState } from "react";
import {
	ColorOptions,
	InitialTarget,
	MAX_NAME_LENGTH,
	MIN_NAME_LENGTH,
} from "../../constants/habit";
import { HabitTarget } from "../../types/habitTypes";
import UIButton from "../../components/ui/UIButton";
import { useHabitStore } from "../../store/habitStore";
import { toDateString } from "../../utils/time";
import { useRouter } from "expo-router";
import { HABIT_NAME_PLACEHOLDER } from "../../constants/messages";
import useTheme from "../../theme/useTheme";
import ColorSelector from "../../components/habit/ColorSelector";
import TypeSelector from "../../components/habit/TypeSelector";
import HabitCounter from "../../components/habit/HabitCounter";
import UnitSelector from "../../components/habit/UnitSelector";
import FrequencySelector from "../../components/habit/FrequencySelector";
import QuitDatePicker from "../../components/habit/QuitDatePicker";

const CreateHabitForm = () => {
	// form states
	const [habitName, setHabitName] = useState("");
	const [habitColor, setHabitColor] = useState(ColorOptions[0]);
	const [habitTarget, setHabitTarget] =
		useState<typeof InitialTarget>(InitialTarget);

	const [formError, setFormError] = useState<string>("");
	const [isSaving, setIsSaving] = useState<boolean>(false);

	const { colors } = useTheme();
	const router = useRouter();
	const addHabit = useHabitStore((s) => s.addHabit);

	const resetForm = () => {
		setFormError("");

		setHabitName("");
		setHabitColor(ColorOptions[0]);
		setHabitTarget(InitialTarget);
	};

	const handleSaveHabit = async () => {
		if (
			habitName.trim().length < MIN_NAME_LENGTH ||
			habitName.trim().length > MAX_NAME_LENGTH
		) {
			setFormError(
				`Name must be between ${MIN_NAME_LENGTH} and ${MAX_NAME_LENGTH} characters.`
			);
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
				startDate: toDateString(habitTarget.initialStartDate),
				initialStartDate: toDateString(habitTarget.initialStartDate),
			};
		}

		setIsSaving(true);

		try {
			await addHabit(habitName.trim(), habitColor, target);

			resetForm();
			router.navigate("(tabs)/habits");
		} catch (error) {
			Alert.alert(
				"Operation Failed",
				"Failed to save habit. Please try again."
			);
		} finally {
			setIsSaving(false);
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

				<UIInputContainer>
					<UIInputLabel label="Type" />
					<TypeSelector
						selectedType={habitTarget.type}
						onPress={(type) =>
							setHabitTarget((prev) => ({ ...prev, type }))
						}
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
								selectedFrequency={habitTarget.frequency}
								onPress={(frequency) =>
									setHabitTarget((prev) => ({
										...prev,
										frequency,
									}))
								}
							/>
						</View>
					</UIInputContainer>
				)}

				{habitTarget.type === "quit" && (
					<UIInputContainer>
						<UIInputLabel label="Quit date" />
						<QuitDatePicker
							selectedValue={habitTarget.initialStartDate}
							onChange={(date) =>
								setHabitTarget((prev) => ({
									...prev,
									initialStartDate: date,
								}))
							}
						/>
					</UIInputContainer>
				)}
			</ScrollView>

			<View
				style={[{ borderColor: colors.border }, styles.actionContainer]}
			>
				<UIButton
					title="Reset"
					onPress={resetForm}
					iconName="refresh"
					style={styles.actionButton}
					isDisabled={isSaving}
				/>

				<UIButton
					title="Save Habit"
					variant="primary"
					onPress={handleSaveHabit}
					style={styles.actionButton}
					isLoading={isSaving}
					isDisabled={isSaving}
				/>
			</View>
		</View>
	);
};

export default CreateHabitForm;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
	},
	formContainer: {
		gap: 16,
		paddingHorizontal: 12,
		paddingTop: 4,
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
