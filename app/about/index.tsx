import { StyleSheet, View } from 'react-native';
import UIView from '../../components/ui/UIView';
import UIText from '../../components/ui/UIText';
import { LogoContainer } from '../../components/logo';
import { ABOUT_US_TAGLINE } from '../../constants/messages';

const AboutPage = () => {
	return (
		<UIView style={styles.container} isBottomSafe>
			<View style={styles.content}>
				<LogoContainer size={100} />

				<View style={styles.headingContainer}>
					<UIText style={styles.heading}>Styk</UIText>

					<UIText style={styles.subheading} isSecondary>
						{ABOUT_US_TAGLINE}
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
		gap: 4,
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
