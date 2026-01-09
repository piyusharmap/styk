import { Tabs } from 'expo-router';
import useTheme from '../../theme/useTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TabBarLabel from '../../components/heading/TabBarLabel';
import Icon from '../../components/icon';

const TabsLayout = () => {
	const { colors } = useTheme();

	const insets = useSafeAreaInsets();

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					height: insets.bottom + 68,
					paddingTop: 6,
					paddingBottom: insets.bottom,
					backgroundColor: colors.tabBackground,
					borderTopWidth: 1,
					borderColor: colors.border,
					elevation: 0,
					shadowColor: 'transparent',
				},
				tabBarActiveTintColor: colors.tabIconActive,
				tabBarInactiveTintColor: colors.tabIconInactive,
			}}>
			<Tabs.Screen
				name='index'
				options={{
					href: null,
				}}
			/>

			<Tabs.Screen
				name='habits'
				options={{
					title: '',
					tabBarLabel: (props) => {
						return <TabBarLabel label='Habits' style={{ color: props.color }} />;
					},
					tabBarIcon: ({ focused }) => (
						<Icon
							size={24}
							name='CalendarCheck'
							color={focused ? colors.primary : colors.tabIconInactive}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name='activity'
				options={{
					title: '',
					tabBarLabel: (props) => {
						return <TabBarLabel label='Activity' style={{ color: props.color }} />;
					},
					tabBarIcon: ({ focused }) => (
						<Icon
							size={24}
							name='ScrollText'
							color={focused ? colors.primary : colors.tabIconInactive}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name='settings'
				options={{
					title: '',
					tabBarLabel: (props) => {
						return <TabBarLabel label='Settings' style={{ color: props.color }} />;
					},
					tabBarIcon: ({ focused }) => (
						<Icon
							size={24}
							name='Settings'
							color={focused ? colors.primary : colors.tabIconInactive}
						/>
					),
				}}
			/>
		</Tabs>
	);
};

export default TabsLayout;
