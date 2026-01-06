import { StyleSheet, View, Image } from "react-native";
import UIView from "../../components/ui/UIView";
import UIText from "../../components/ui/UIText";
import useTheme from "../../theme/useTheme";

const AboutPage = () => {
	const { colors } = useTheme();

	return (
		<UIView style={styles.container} isBottomSafe>
			<View style={styles.content}>
				<View
					style={[
						{ borderColor: colors.border },
						styles.logoContainer,
					]}
				>
					<Image
						source={require("../../assets/icon.png")}
						resizeMode="contain"
						style={styles.logo}
					/>
				</View>

				<View style={styles.headingContainer}>
					<UIText style={styles.heading}>Styk</UIText>

					<UIText style={styles.subheading} isSecondary>
						A minimal habit trakcer. Build better routines. Break
						bad cycles.
					</UIText>
				</View>
			</View>
		</UIView>
	);
};

export default AboutPage;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		paddingHorizontal: 12,
		paddingTop: 80,
		alignItems: "center",
		gap: 10,
	},
	headingContainer: {
		paddingVertical: 10,
		alignItems: "center",
		gap: 8,
	},
	logoContainer: {
		borderRadius: 10,
		borderWidth: 1,
		overflow: "hidden",
	},
	logo: {
		width: 100,
		height: 100,
	},

	// text styles
	heading: {
		fontSize: 28,
		fontWeight: "600",
	},
	subheading: {
		fontSize: 16,
		textAlign: "center",
	},
});
