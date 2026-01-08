import { Image } from 'react-native';

const Logo = ({ size = 40 }: { size?: number }) => {
	return (
		<Image
			source={require('../assets/icon.png')}
			resizeMode='contain'
			style={{ height: size, width: size }}
		/>
	);
};

export default Logo;
