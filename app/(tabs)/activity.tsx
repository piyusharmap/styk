import { StyleSheet } from 'react-native';
import UIView from '../../components/ui/UIView';
import { PageHeader, PageHeading, PageSubHeading } from '../../components/layout/PageHeader';
import { ACTIVITY_PAGE_SUBHEADING } from '../../constants/messages';

const ActivityTab = () => {
	return (
		<UIView style={styles.container}>
			<PageHeader isTopSafe>
				<PageHeading>Activity</PageHeading>
				<PageSubHeading>{ACTIVITY_PAGE_SUBHEADING}</PageSubHeading>
			</PageHeader>
		</UIView>
	);
};

export default ActivityTab;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
	},
});
