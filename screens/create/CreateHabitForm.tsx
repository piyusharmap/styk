import { Alert, ScrollView, StyleSheet, View } from "react-native";
import {
	UIInput,
	UIInputContainer,
	UIInputError,
	UIInputLabel,
} from "../../components/ui/UIInput";
import { useState } from "react";
import { ColorOptions } from "../../constants/habit";
import {
	CountUnit,
	HabitFrequency,
	HabitTarget,
	HabitType,
} from "../../types/habitTypes";
import ColorSelector from "./components/ColorSelector";
import TypeSelector from "./components/TypeSelector";
import UnitSelector from "./components/UnitSelector";
import HabitCounter from "./components/HabitCounter";
import FrequencySelector from "./components/FrequencySelector";
import UIButton from "../../components/ui/UIButton";
import { useHabitStore } from "../../store/habitStore";
import { toDateString } from "../../utils/time";
import QuitDatePicker from "./components/StartDatePicker";
import { useRouter } from "expo-router";
import { HABIT_NAME_PLACEHOLDER } from "../../constants/messages";
import useTheme from "../../theme/useTheme";

const CreateHabitForm = () => {
	const [habitName, setHabitName] = useState("");
	const [habitColor, setHabitColor] = useState(ColorOptions[0]);
	const [habitType, setHabitType] = useState<HabitType>("count");
	const [habitUnit, setHabitUnit] = useState<CountUnit>("time");
	const [habitCount, setHabitCount] = useState<number>(1);
	const [habitFrequency, setHabitFrequency] =
		useState<HabitFrequency>("daily");
	const [habitStartDate, setHabitStartDate] = useState<Date>(new Date());
	const [formError, setFormError] = useState<string>("");
	const [isSaving, setIsSaving] = useState<boolean>(false);

	const { colors } = useTheme();
	const router = useRouter();
	const addHabit = useHabitStore((s) => s.addHabit);

	const resetForm = () => {
		setFormError("");

		setHabitName("");
		setHabitColor(ColorOptions[0]);
		setHabitUnit("time");
		setHabitCount(1);
		setHabitFrequency("daily");
		setHabitStartDate(new Date());
	};

	const handleSaveHabit = async () => {
		if (habitName.trim().length < 3) {
			setFormError("Name should be at least 5 characters long.");
			return;
		}

		if (habitName.trim().length > 40) {
			setFormError("Name should not exceed 40 characters.");
			return;
		}

		let habitTarget: HabitTarget;
		if (habitType === "count") {
			habitTarget = {
				type: habitType,
				frequency: habitFrequency,
				count: habitCount,
				unit: habitUnit,
			};
		} else {
			habitTarget = {
				type: habitType,
				startDate: toDateString(habitStartDate),
				initialStartDate: toDateString(habitStartDate),
				frequency: "daily",
			};
		}

		setIsSaving(true);

		try {
			await addHabit(habitName.trim(), habitColor, habitTarget);

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
						selectedType={habitType}
						onPress={setHabitType}
					/>
				</UIInputContainer>

				{habitType === "count" ? (
					<UIInputContainer>
						<UIInputLabel label="At least" />

						<View style={styles.countDetails}>
							<HabitCounter
								count={habitCount}
								onChange={setHabitCount}
							/>

							<UnitSelector
								selectedUnit={habitUnit}
								onPress={setHabitUnit}
							/>

							<FrequencySelector
								selectedFrequency={habitFrequency}
								onPress={setHabitFrequency}
							/>
						</View>
					</UIInputContainer>
				) : null}

				{habitType === "quit" ? (
					<UIInputContainer>
						<UIInputLabel label="Quit date" />
						<QuitDatePicker
							selectedValue={habitStartDate}
							onChange={setHabitStartDate}
						/>
					</UIInputContainer>
				) : null}
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
		flex: 1,
		gap: 16,
		paddingHorizontal: 12,
		paddingTop: 10,
		paddingBottom: 40,
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
