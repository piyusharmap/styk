import UILoader from './ui/UILoader';
import UIView from './ui/UIView';
import { StyleSheet } from 'react-native';

const PageLoader = ({
	isBottomSafe = false,
	isTopSafe = false,
}: {
	isBottomSafe?: boolean;
	isTopSafe?: boolean;
}) => {
	return (
		<UIView style={styles.container} isBottomSafe={isBottomSafe} isTopSafe={isTopSafe}>
			<UILoader size={32} />
		</UIView>
	);
};

export default PageLoader;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
