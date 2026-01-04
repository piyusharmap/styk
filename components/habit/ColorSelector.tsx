import { Pressable, StyleSheet, View } from "react-native";
import { ColorOptions } from "../../constants/habit";
import useTheme from "../../theme/useTheme";

const ColorSelector = ({
	selectedColor,
	onPress,
}: {
	selectedColor: string;
	onPress: (value: string) => void;
}) => {
	const { colors } = useTheme();

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
		gap: 4,
	},
	colorOption: {
		height: 40,
		width: 40,
		borderRadius: 20,
		overflow: "hidden",
		borderWidth: 0,
	},
	colorView: {
		height: "100%",
		width: "100%",
		borderRadius: "100%",
	},
	colorViewTransform: {
		transform: [{ scale: 0.85 }],
	},
});
