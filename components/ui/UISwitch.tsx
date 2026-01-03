import { StyleSheet, Switch, SwitchProps } from "react-native";
import useTheme from "../../theme/useTheme";

const UISwitch = ({
	value,
	onChange,
	...props
}: SwitchProps & {
	value: boolean;
	onChange: (value: boolean) => void;
}) => {
	const { colors } = useTheme();

	return (
		<Switch
			value={value}
			onValueChange={onChange}
			trackColor={{
				false: colors.secondary + "50",
				true: colors.secondary + "80",
			}}
			thumbColor={colors.primary}
			style={styles.switch}
			{...props}
		/>
	);
};

export default UISwitch;

const styles = StyleSheet.create({
	// container styles
	switch: {
		height: 40,
		width: 100,
		flexShrink: 1,
	},
});
