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
					height: insets.bottom + 72,
					paddingTop: 8,
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
				name='today'
				options={{
					title: '',
					tabBarLabel: (props) => {
						return <TabBarLabel label='Today' style={{ color: props.color }} />;
					},
					tabBarIcon: ({ focused }) => (
						<Icon
							size={22}
							name='CalendarCheck2'
							color={focused ? colors.primary : colors.tabIconInactive}
						/>
					),
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
							size={22}
							name='Calendar'
							color={focused ? colors.primary : colors.tabIconInactive}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name='measure'
				options={{
					href: null, // remove after implementing measure functionality
					title: '',
					tabBarLabel: (props) => {
						return <TabBarLabel label='Measure' style={{ color: props.color }} />;
					},
					tabBarIcon: ({ focused }) => (
						<Icon
							size={22}
							name='Ruler'
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
							size={22}
							name='Settings2'
							color={focused ? colors.primary : colors.tabIconInactive}
						/>
					),
				}}
			/>
		</Tabs>
	);
};

export default TabsLayout;
