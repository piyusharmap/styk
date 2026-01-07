import {
	TextInput,
	StyleSheet,
	TextInputProps,
	StyleProp,
	TextStyle,
	View,
	ViewStyle,
} from 'react-native';
import { useState } from 'react';
import useTheme from '../../theme/useTheme';
import UIText from './UIText';

export const UIInputLabel = ({ label }: { label: string }) => {
	return (
		<UIText style={styles.label} isSecondary>
			{label}
		</UIText>
	);
};

export const UIInputError = ({ error }: { error: string }) => {
	const { colors } = useTheme();

	return <UIText style={[{ color: colors.danger }, styles.info]}>{error}</UIText>;
};

export const UIInputInfo = ({ info }: { info: string }) => {
	const { colors } = useTheme();

	return <UIText style={[{ color: colors.info }, styles.info]}>{info}</UIText>;
};

export const UIInput = ({
	value,
	onChangeInput,
	style,
	...props
}: TextInputProps & {
	value: string;
	onChangeInput: (value: string) => void;
	style?: StyleProp<TextStyle>;
}) => {
	const [isFocused, setIsFocused] = useState<boolean>(false);

	const { colors } = useTheme();

	const handleOnFocus = () => {
		setIsFocused(true);
	};
	const handleOnBlur = () => {
		setIsFocused(false);
	};

	return (
		<TextInput
			value={value}
			onChangeText={onChangeInput}
			placeholderTextColor={colors.textSecondary}
			placeholder='Enter'
			style={[
				{
					color: colors.text,
					borderColor: colors.border,
				},
				isFocused && { borderColor: colors.neutral },
				styles.input,
				style,
			]}
			onFocus={handleOnFocus}
			onBlur={handleOnBlur}
			{...props}
		/>
	);
};

export const UIInputContainer = ({
	children,
	style,
}: {
	children: React.ReactNode;
	style?: StyleProp<ViewStyle>;
}) => {
	return <View style={[styles.inputContainer, style]}>{children}</View>;
};

const styles = StyleSheet.create({
	// container styles
	inputContainer: {
		gap: 6,
	},

	// text styles
	input: {
		paddingHorizontal: 12,
		height: 42,
		fontSize: 14,
		borderRadius: 10,
		borderWidth: 1,
	},
	label: {
		paddingHorizontal: 2,
		paddingBottom: 4,
		fontSize: 13,
	},
	info: {
		paddingHorizontal: 2,
		fontSize: 12,
	},
});
