import UIView from '../../components/ui/UIView';
import { PageHeader, PageHeading, PageSubHeading } from '../../components/layout/PageHeader';
import { TIMER_PAGE_SUBHEADING } from '../../constants/messages';
import { StyleSheet } from 'react-native';
import Stopwatch from '../../screens/timer/Stopwatch';

const TimerTab = () => {
	return (
		<UIView style={styles.container}>
			<PageHeader isTopSafe>
				<PageHeading>Timer</PageHeading>
				<PageSubHeading>{TIMER_PAGE_SUBHEADING}</PageSubHeading>
			</PageHeader>

			<Stopwatch />
		</UIView>
	);
};

export default TimerTab;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
		gap: 10,
	},
});
