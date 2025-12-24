import { View, Text, StyleSheet, Pressable } from "react-native";
import useThemeColor from "../../../theme/useThemeColor";

const ColorOption = ({
	color,
	selectedColor,
	onPress,
}: {
	color: string;
	selectedColor: string;
	onPress: () => void;
}) => {
	const colors = useThemeColor();

	return (
		<Pressable
			style={({ pressed }) => [
				styles.colorOption,
				pressed && styles.colorOptionPressed,
				color === selectedColor && {
					borderColor: colors.secondary,
				},
			]}
			onPress={onPress}
		>
			<View
				style={[
					{
						height: "100%",
						width: "100%",
						borderRadius: 25,
						backgroundColor: color,
					},
					color === selectedColor && {
						transform: [{ scale: 0.8 }],
					},
				]}
			/>
		</Pressable>
	);
};

export default ColorOption;

const styles = StyleSheet.create({
	// container styles
	colorOption: {
		height: 50,
		width: 50,
		borderRadius: 25,
		borderWidth: 2,
		borderColor: "transparent",
		overflow: "hidden",
	},
	colorOptionPressed: {
		opacity: 0.8,
	},
});
