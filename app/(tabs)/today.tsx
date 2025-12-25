import { StyleSheet } from "react-native";
import UIView from "../../components/ui/UIView";
import { PageHeader, PageHeading } from "../../components/layout/PageHeader";

const TodayTab = () => {
	return (
		<UIView style={styles.container} isTopSafe>
			<PageHeader>
				<PageHeading>Today</PageHeading>
			</PageHeader>
		</UIView>
	);
};

export default TodayTab;

const styles = StyleSheet.create({
	// container styles
	container: {
		flex: 1,
	},
});
