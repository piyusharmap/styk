const isDev = __DEV__;

export const logger = {
	error: (message: string, error?: any) => {
		if (isDev) {
			console.error(message, error);
		} else {
			// perform some action in future
		}
	},
};
