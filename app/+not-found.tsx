import UIView from '../components/ui/UIView';
import UIText from '../components/ui/UIText';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import UIButton from '../components/ui/UIButton';

const NotFoundPage = () => {
	const router = useRouter();

	return (
		<UIView style={styles.container} isBottomSafe>
			<View style={styles.headingContainer}>
				<UIText style={styles.heading}>Woops! Page not found.</UIText>

				<UIText style={styles.message} isSecondary>
					A wrong turn is just a chance to reset. Let&apos;s get back to your goals.
				</UIText>
			</View>

			<View style={styles.actionContainer}>
				<UIButton
					variant='primary'
					title='Go Back'
					iconName='ChevronLeft'
					onPress={() => router.back()}
				/>
			</View>
		</UIView>
	);
};

export default NotFoundPage;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
		padding: 20,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 10,
	},
	headingContainer: {
		alignItems: 'center',
		gap: 2,
	},
	actionContainer: {
		paddingVertical: 20,
	},

	// text styles
	heading: {
		fontSize: 20,
		fontWeight: '500',
	},
	message: {
		fontSize: 14,
		textAlign: 'center',
	},
});
