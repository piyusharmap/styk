import {
	TextInput,
	StyleSheet,
	TextInputProps,
	StyleProp,
	TextStyle,
	View,
} from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import useThemeColor from "../../theme/useThemeColor";
import UIText from "./UIText";

export const UIInputLabel = ({ label }: { label: string }) => {
	return (
		<UIText style={styles.label} isSecondary>
			{label}
		</UIText>
	);
};

export const UIInput = ({
	value,
	onChangeInput,
	style,
	...props
}: TextInputProps & {
	value: string;
	onChangeInput: Dispatch<SetStateAction<string>>;
	style?: StyleProp<TextStyle>;
}) => {
	const colors = useThemeColor();

	return (
		<TextInput
			value={value}
			onChangeText={onChangeInput}
			placeholderTextColor={colors.textSecondary}
			placeholder="Enter"
			style={[
				{
					color: colors.text,
					borderColor: colors.border,
				},
				styles.input,
				style,
			]}
			{...props}
		/>
	);
};

export const UIInputContainer = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	return <View style={styles.inputContainer}>{children}</View>;
};

const styles = StyleSheet.create({
	// container styles
	inputContainer: {
		gap: 8,
	},

	// text styles
	input: {
		width: "100%",
		height: 42,
		borderRadius: 4,
		borderWidth: 1,
		paddingHorizontal: 12,
		fontSize: 16,
	},
	label: {
		paddingHorizontal: 4,
		fontSize: 14,
	},
});
