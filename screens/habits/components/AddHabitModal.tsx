import { View, Modal, StyleSheet } from "react-native";
import useThemeColor from "../../../theme/useThemeColor";
import UIText from "../../../components/ui/UIText";
import {
	ModalHeader,
	ModalHeading,
} from "../../../components/layout/ModalHeader";
import { HabitFrequency } from "../../../types/habitTypes";
import UIButton from "../../../components/ui/UIButton";
import { useHabitStore } from "../../../store/habitStore";
import { useState } from "react";
import {
	UIInput,
	UIInputContainer,
	UIInputLabel,
} from "../../../components/ui/UIInput";
import FrequencyBadge from "./FrequencyBadge";
import ColorOption from "./ColorOption";

const FrequencyOptions: { title: string; value: HabitFrequency }[] = [
	{
		title: "Daily",
		value: "daily",
	},
	{
		title: "Weekly",
		value: "weekly",
	},
	{
		title: "Montly",
		value: "monthly",
	},
];

const ColorOptions: string[] = [
	"#3B82F6", // blue
	"#6366F1", // indigo
	"#8B5CF6", // violet
	"#A855F7", // purple
	"#EC4899", // pink
	"#22C55E", // green
	"#16A34A", // emerald green
	"#84CC16", // lime
	"#F59E0B", // amber (yellowish, not orange)
];

const AddHabitModal = ({
	visible,
	onClose,
}: {
	visible: boolean;
	onClose: () => void;
}) => {
	const [habitName, setHabitName] = useState<string>("");
	const [habitFreq, setHabitFreq] = useState<HabitFrequency>("daily");
	const [habitColor, setHabitColor] = useState<string>(ColorOptions[0]);

	const colors = useThemeColor();
	const addHabit = useHabitStore((s) => s.addHabit);

	function handleSave() {
		if (!habitName.trim()) return;

		addHabit(habitName.trim(), habitFreq, habitColor);
		setHabitName("");
		setHabitFreq("daily");
		onClose();
	}

	return (
		<Modal visible={visible} animationType="slide" transparent>
			<View
				style={[{ backgroundColor: colors.background }, styles.modal]}
			>
				<ModalHeader>
					<ModalHeading>Add Habit</ModalHeading>
				</ModalHeader>

				<View style={styles.inputContainer}>
					<UIInputContainer>
						<UIInputLabel label="Name" />
						<UIInput
							value={habitName}
							onChangeInput={setHabitName}
							placeholder="Enter Habit Name"
						/>
					</UIInputContainer>

					<UIInputContainer>
						<UIInputLabel label="Frequency" />

						<View style={styles.badgeContainer}>
							{FrequencyOptions.map((freq) => (
								<FrequencyBadge
									key={freq.value}
									title={freq.title}
									value={freq.value}
									selectedValue={habitFreq}
									onPress={() => setHabitFreq(freq.value)}
								/>
							))}
						</View>
					</UIInputContainer>

					<UIInputContainer>
						<UIInputLabel label="Color" />

						<View style={styles.colorContainer}>
							{ColorOptions.map((color) => (
								<ColorOption
									key={color}
									color={color}
									selectedColor={habitColor}
									onPress={() => setHabitColor(color)}
								/>
							))}
						</View>
					</UIInputContainer>
				</View>

				<View style={styles.actionContainer}>
					<UIButton
						title="Cancel"
						variant="danger"
						style={styles.actionButton}
						onPress={onClose}
					/>
					<UIButton
						title="Save"
						style={styles.actionButton}
						onPress={handleSave}
					/>
				</View>
			</View>
		</Modal>
	);
};

export default AddHabitModal;

const styles = StyleSheet.create({
	// container styles
	modal: {
		flex: 1,
	},
	inputContainer: {
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 10,
		gap: 20,
	},
	badgeContainer: {
		flexDirection: "row",
		gap: 8,
	},
	colorContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
	},
	actionContainer: {
		paddingHorizontal: 20,
		paddingVertical: 12,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 8,
	},
	actionButton: {
		flex: 1,
	},
});
