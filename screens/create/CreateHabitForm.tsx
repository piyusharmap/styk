import { ScrollView, StyleSheet, View } from "react-native";
import {
	UIInput,
	UIInputContainer,
	UIInputLabel,
} from "../../components/ui/UIInput";
import { useState } from "react";
import { ColorOptions } from "../../constants/habit";
import { CountUnit, HabitFrequency, HabitType } from "../../types/habitTypes";

import ColorSelector from "./components/ColorSelector";
import TypeSelector from "./components/TypeSelector";
import UnitSelector from "./components/UnitSelector";
import HabitCounter from "./components/HabitCounter";
import FrequencySelector from "./components/FrequencySelector";
import UIButton from "../../components/ui/UIButton";

const CreateHabitForm = () => {
	const [habitName, setHabitName] = useState("");
	const [habitColor, setHabitColor] = useState(ColorOptions[0]);
	const [habitType, setHabitType] = useState<HabitType>("count");
	const [habitUnit, setHabitUnit] = useState<CountUnit>("times");
	const [habitCount, setHabitCount] = useState<number>(1);
	const [habitFrequency, setHabitFrequency] =
		useState<HabitFrequency>("daily");

	const handleResetHabit = () => {
		setHabitName("");
		setHabitColor(ColorOptions[0]);
		setHabitUnit("times");
		setHabitCount(1);
		setHabitFrequency("daily");
	};

	const handleSaveHabit = () => {
		let habitTarget = {};

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
				frequency: habitFrequency,
			};
		}

		const habit = {
			name: habitName.trim(),
			color: habitColor,
			target: habitTarget,
		};

		console.log(habit);
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
						placeholder="e.g. Study, Run, Read"
					/>
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
			</ScrollView>

			<View style={styles.actionContainer}>
				<UIButton
					title="Reset"
					onPress={handleResetHabit}
					iconName="refresh"
					style={styles.actionButton}
				/>
				<UIButton
					title="Save Habit"
					variant="primary"
					onPress={handleSaveHabit}
					style={styles.actionButton}
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
		justifyContent: "space-between",
	},
	formContainer: {
		gap: 16,
	},
	countDetails: {
		gap: 10,
	},
	actionContainer: {
		flexDirection: "row",
		gap: 8,
	},
	actionButton: {
		flex: 1,
	},
});
