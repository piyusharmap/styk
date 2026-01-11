import { StyleSheet, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import UIView from '../components/ui/UIView';
import { LogoContainer } from '../components/logo';
import UIText from '../components/ui/UIText';
import UIButton from '../components/ui/UIButton';
import NavigationButton from '../components/layout/NavigationButton';
import useTheme from '../theme/useTheme';

const HomePage = () => {
	const router = useRouter();
	const { colors } = useTheme();

	const handleNavigate = () => {
		router.navigate('(tabs)');
	};

	return (
		<>
			<Stack.Screen
				options={{
					headerRight(props) {
						return (
							<NavigationButton
								icon='X'
								tint={props.tintColor}
								onPress={handleNavigate}
							/>
						);
					},
				}}
			/>

			<UIView style={styles.container} isBottomSafe>
				<View style={styles.brandingContainer}>
					<LogoContainer size={50} />

					<UIText style={styles.greeting}>
						Welcome to <UIText style={styles.greetingHightlight}>Styk</UIText>
					</UIText>

					<UIText style={styles.tagline}>
						<UIText style={[{ color: colors.primary }, styles.taglineHighlight]}>
							Build
						</UIText>{' '}
						Better Routines.{' '}
						<UIText style={[{ color: colors.primary }, styles.taglineHighlight]}>
							Quit
						</UIText>{' '}
						Bad Cycles.{' '}
					</UIText>
				</View>

				<View style={styles.actionContainer}>
					<UIButton
						variant='primary'
						size='lg'
						title='Continue to app'
						iconName='ArrowRight'
						style={[
							{
								backgroundColor: colors.secondary + '50',
								borderColor: colors.primary,
							},
							styles.button,
						]}
						onPress={handleNavigate}
					/>
				</View>
			</UIView>
		</>
	);
};

export default HomePage;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-end',
	},
	brandingContainer: {
		paddingHorizontal: 12,
		paddingTop: 10,
		paddingBottom: 40,
		gap: 10,
	},
	actionContainer: {
		paddingHorizontal: 12,
		paddingTop: 10,
		paddingBottom: 40,
	},
	button: {
		borderRadius: 25,
		borderWidth: 1,
	},

	// text styles
	greeting: {
		fontSize: 16,
	},
	greetingHightlight: {
		fontWeight: '600',
	},
	tagline: {
		fontSize: 40,
		fontWeight: '500',
	},
	taglineHighlight: {
		fontStyle: 'italic',
	},
});
