import { View, StyleSheet, Platform } from "react-native";
import { useState } from "react";
import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { UIInput } from "../ui/UIInput";
import UIButton from "../ui/UIButton";
import { toDateString } from "../../utils/time";

const QuitDatePicker = ({
	selectedValue,
	onChange,
}: {
	selectedValue: Date;
	onChange: (value: Date) => void;
}) => {
	const [showPicker, setShowPicker] = useState<boolean>(false);

	const onDateChange = (event: DateTimePickerEvent, date?: Date) => {
		if (Platform.OS === "android") {
			setShowPicker(false);
		}
		if (date) {
			onChange(date);
		}
	};

	return (
		<>
			<View style={styles.datePicker}>
				<UIInput
					value={toDateString(selectedValue)}
					editable={false}
					pointerEvents="none"
					onChangeInput={() => {}}
					style={styles.input}
				/>

				<UIButton
					variant="secondary"
					size="sm"
					title="Pick Date"
					onPress={() => setShowPicker(true)}
				/>

				<UIButton
					size="sm"
					title=""
					iconName="refresh"
					onPress={() => setShowPicker(true)}
				/>
			</View>

			{showPicker && (
				<DateTimePicker
					value={selectedValue}
					maximumDate={new Date()}
					mode="date"
					design="material"
					onChange={onDateChange}
				/>
			)}
		</>
	);
};

export default QuitDatePicker;

const styles = StyleSheet.create({
	// container styles
	datePicker: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	input: {
		flex: 1,
	},
});
