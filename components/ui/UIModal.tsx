import { Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import UIText from './UIText';
import useTheme from '../../theme/useTheme';

export const ModalHeading = ({ heading }: { heading: string }) => {
	return <UIText style={styles.modalHeading}>{heading}</UIText>;
};

export const ModalSubHeading = ({ subHeading }: { subHeading: string }) => {
	return (
		<UIText style={styles.modalSubHeading} isSecondary>
			{subHeading}
		</UIText>
	);
};

export const ModalView = ({ children }: { children: React.ReactNode }) => {
	const { colors } = useTheme();

	return (
		<View
			style={[
				{
					backgroundColor: colors.background,
				},
				styles.modalView,
			]}>
			{children}
		</View>
	);
};

export const ModalActions = ({ children }: { children: React.ReactNode }) => {
	return <View style={styles.actionContainer}>{children}</View>;
};

export const UIModal = ({
	isVisible,
	onClose,
	children,
}: {
	isVisible: boolean;
	onClose: () => void;
	children: React.ReactNode;
}) => {
	const { colors } = useTheme();

	return (
		<Modal
			visible={isVisible}
			onRequestClose={onClose}
			transparent
			statusBarTranslucent
			navigationBarTranslucent
			animationType='fade'>
			<TouchableWithoutFeedback onPress={onClose}>
				<View
					style={[{ backgroundColor: colors.foreground + '80' }, styles.modalContainer]}>
					<TouchableWithoutFeedback>
						<View style={styles.modal}>{children}</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	);
};

const styles = StyleSheet.create({
	// container styles
	modalContainer: {
		paddingHorizontal: 12,
		paddingVertical: 40,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	modal: {
		width: '100%',
		overflow: 'hidden',
	},
	modalView: {
		padding: 16,
		gap: 10,
		borderRadius: 10,
	},
	actionContainer: {
		paddingTop: 20,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		gap: 6,
	},

	// text styles
	modalHeading: {
		fontSize: 18,
		fontWeight: '500',
	},
	modalSubHeading: {
		fontSize: 14,
	},
});
