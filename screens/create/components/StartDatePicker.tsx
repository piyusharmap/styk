import { View, StyleSheet, Platform } from "react-native";
import { Dispatch, SetStateAction, useState } from "react";
import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import UIButton from "../../../components/ui/UIButton";
import { UIInput } from "../../../components/ui/UIInput";
import { toDateString } from "../../../utils/time";

const StartDatePicker = ({
	selectedValue,
	onChange,
}: {
	selectedValue: Date;
	onChange: Dispatch<SetStateAction<Date>>;
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

export default StartDatePicker;

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
