import React, { useEffect, useRef } from 'react';
import { Animated, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import useTheme from '../../theme/useTheme';

const UISkeleton = ({
	children,
	style,
}: {
	children?: React.ReactNode;
	style?: StyleProp<ViewStyle>;
}) => {
	const { colors } = useTheme();

	const animatedOpacity = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		const animation = Animated.loop(
			Animated.sequence([
				Animated.timing(animatedOpacity, {
					toValue: 0.6,
					duration: 500,
					useNativeDriver: true,
				}),
				Animated.timing(animatedOpacity, {
					toValue: 1,
					duration: 500,
					useNativeDriver: true,
				}),
			]),
		);

		animation.start();
		return () => animation.stop();
	}, [animatedOpacity]);

	return (
		<Animated.View
			style={[
				{ backgroundColor: colors.foreground, opacity: animatedOpacity },
				styles.skeleton,
				style,
			]}>
			{children}
		</Animated.View>
	);
};
export default UISkeleton;

const styles = StyleSheet.create({
	// container styles
	skeleton: {
		height: 100,
		width: 100,
		borderRadius: 10,
	},
});
