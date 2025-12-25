import { Pressable, StyleSheet, View } from "react-native";
import { ColorOptions } from "../../../constants/habit";
import { Dispatch, SetStateAction } from "react";
import useThemeColor from "../../../theme/useThemeColor";

const ColorSelector = ({
	selectedColor,
	onPress,
}: {
	selectedColor: string;
	onPress: Dispatch<SetStateAction<string>>;
}) => {
	const colors = useThemeColor();

	return (
		<View style={styles.colorSelector}>
			{ColorOptions.map((color) => {
				return (
					<Pressable
						key={color}
						style={[
							{ borderColor: colors.neutral },
							styles.colorOption,
							selectedColor === color && { borderWidth: 1 },
						]}
						onPress={() => onPress(color)}
					>
						<View
							style={[
								{ backgroundColor: color },
								styles.colorView,
								selectedColor === color &&
									styles.colorViewTransform,
							]}
						/>
					</Pressable>
				);
			})}
		</View>
	);
};

export default ColorSelector;

const styles = StyleSheet.create({
	// container styles
	colorSelector: {
		flexDirection: "row",
		justifyContent: "space-between",
		flexWrap: "wrap",
		gap: 8,
	},
	colorOption: {
		height: 40,
		width: 40,
		borderRadius: 10,
		overflow: "hidden",
		borderWidth: 0,
	},
	colorView: {
		height: "100%",
		width: "100%",
		borderRadius: 8,
	},
	colorViewTransform: {
		transform: [{ scale: 0.9 }],
	},
});
