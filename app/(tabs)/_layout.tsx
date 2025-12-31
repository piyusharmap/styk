import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useThemeColor from "../../theme/useThemeColor";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TabBarLabel from "../../components/heading/TabBarLabel";

const TabsLayout = () => {
	const colors = useThemeColor();

	const insets = useSafeAreaInsets();

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					height: insets.bottom + 60,
					paddingTop: 4,
					paddingBottom: insets.bottom,
					backgroundColor: colors.tabBackground,
					borderTopWidth: 1,
					borderColor: colors.border,
					elevation: 0,
					shadowColor: "transparent",
				},
				tabBarActiveTintColor: colors.tabIconActive,
				tabBarInactiveTintColor: colors.tabIconInactive,
			}}
		>
			<Tabs.Screen
				name="today"
				options={{
					title: "",
					tabBarLabel: (props) => {
						return (
							<TabBarLabel
								label="Today"
								style={{ color: props.color }}
							/>
						);
					},
					tabBarIcon: ({ focused }) => (
						<Ionicons
							size={24}
							name={focused ? "today" : "today-outline"}
							color={
								focused
									? colors.tabIconActive
									: colors.tabIconInactive
							}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name="habits"
				options={{
					title: "",
					tabBarLabel: (props) => {
						return (
							<TabBarLabel
								label="Habits"
								style={{ color: props.color }}
							/>
						);
					},
					tabBarIcon: ({ focused }) => (
						<Ionicons
							size={24}
							name={focused ? "calendar" : "calendar-outline"}
							color={
								focused
									? colors.tabIconActive
									: colors.tabIconInactive
							}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name="measure"
				options={{
					href: null, // remove after implementing measure functionality
					title: "",
					tabBarLabel: (props) => {
						return (
							<TabBarLabel
								label="Measure"
								style={{ color: props.color }}
							/>
						);
					},
					tabBarIcon: ({ focused }) => (
						<Ionicons
							size={24}
							name={focused ? "scale" : "scale-outline"}
							color={
								focused
									? colors.tabIconActive
									: colors.tabIconInactive
							}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name="settings"
				options={{
					title: "",
					tabBarLabel: (props) => {
						return (
							<TabBarLabel
								label="Settings"
								style={{ color: props.color }}
							/>
						);
					},
					tabBarIcon: ({ focused }) => (
						<Ionicons
							size={24}
							name={focused ? "settings" : "settings-outline"}
							color={
								focused
									? colors.tabIconActive
									: colors.tabIconInactive
							}
						/>
					),
				}}
			/>
		</Tabs>
	);
};

export default TabsLayout;
