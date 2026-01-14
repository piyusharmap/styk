import UIView from '../../components/ui/UIView';
import { PageHeader, PageHeading, PageSubHeading } from '../../components/layout/PageHeader';
import { TODO_PAGE_SUBHEADING } from '../../constants/messages';
import { StyleSheet } from 'react-native';

const TodoTab = () => {
	return (
		<UIView style={styles.container}>
			<PageHeader isTopSafe>
				<PageHeading>Daily Tasks</PageHeading>
				<PageSubHeading>{TODO_PAGE_SUBHEADING}</PageSubHeading>
			</PageHeader>
		</UIView>
	);
};

export default TodoTab;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
	},
});
