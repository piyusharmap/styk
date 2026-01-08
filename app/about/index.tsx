import { StyleSheet, View } from 'react-native';
import UIView from '../../components/ui/UIView';
import UIText from '../../components/ui/UIText';
import useTheme from '../../theme/useTheme';
import Logo from '../../components/logo';

const AboutPage = () => {
	const { colors } = useTheme();

	return (
		<UIView style={styles.container} isBottomSafe>
			<View style={styles.content}>
				<View style={[{ borderColor: colors.border }, styles.logoContainer]}>
					<Logo size={100} />
				</View>

				<View style={styles.headingContainer}>
					<UIText style={styles.heading}>Styk</UIText>

					<UIText style={styles.subheading} isSecondary>
						A minimal habit trakcer. Build better routines. Quit bad cycles.
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
		justifyContent: 'center',
		alignItems: 'center',
		gap: 10,
	},
	headingContainer: {
		paddingVertical: 10,
		alignItems: 'center',
		gap: 8,
	},
	logoContainer: {
		height: 100,
		width: 100,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 8,
		borderWidth: 2,
		overflow: 'hidden',
	},

	// text styles
	heading: {
		fontSize: 28,
		fontWeight: '600',
	},
	subheading: {
		fontSize: 16,
		textAlign: 'center',
	},
});
