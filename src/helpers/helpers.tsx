import { StylesConfig } from 'react-select';
import showNotification from '../components/extras/showNotification';
import Icon from '../components/icon/Icon';

export function test() {
	return null;
}

export function getOS() {
	const { userAgent } = window.navigator;
	const { platform } = window.navigator;
	const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
	const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
	const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
	let os = null;

	if (macosPlatforms.indexOf(platform) !== -1) {
		os = 'MacOS';
	} else if (iosPlatforms.indexOf(platform) !== -1) {
		os = 'iOS';
	} else if (windowsPlatforms.indexOf(platform) !== -1) {
		os = 'Windows';
	} else if (/Android/.test(userAgent)) {
		os = 'Android';
	} else if (!os && /Linux/.test(platform)) {
		os = 'Linux';
	}

	// @ts-ignore
	document.documentElement.setAttribute('os', os);
	return os;
}

export const hasNotch = () => {
	/**
	 * For storybook test
	 */
	const storybook = window.location !== window.parent.location;
	// @ts-ignore
	const iPhone = /iPhone/.test(navigator.userAgent) && !window.MSStream;
	const aspect = window.screen.width / window.screen.height;
	const aspectFrame = window.innerWidth / window.innerHeight;
	return (
		(iPhone && aspect.toFixed(3) === '0.462') ||
		(storybook && aspectFrame.toFixed(3) === '0.462')
	);
};

export const mergeRefs = (refs: any[]) => {
	return (value: any) => {
		refs.forEach((ref) => {
			if (typeof ref === 'function') {
				ref(value);
			} else if (ref != null) {
				ref.current = value;
			}
		});
	};
};

export const randomColor = () => {
	const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'];

	const color = Math.floor(Math.random() * colors.length);

	return colors[color];
};

export const priceFormat = (price: number) => {
	return price.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
	});
};

export const average = (array: any[]) => array.reduce((a, b) => a + b) / array.length;

export const percent = (value1: number, value2: number) =>
	Number(((value1 / value2 - 1) * 100).toFixed(2));

export const getFirstLetter = (text: string, letterCount = 2): string =>
	// @ts-ignore
	text
		.toUpperCase()
		.match(/\b(\w)/g)
		.join('')
		.substring(0, letterCount);

export const debounce = (func: (arg0: any) => void, wait = 1000) => {
	let timeout: string | number | NodeJS.Timeout | undefined;

	return function executedFunction(...args: any[]) {
		const later = () => {
			clearTimeout(timeout);
			// @ts-ignore
			func(...args);
		};

		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
};

export const showNotificationGlobal = (message: string, type: boolean) => {
	showNotification(
		<span className='d-flex align-items-center'>
			<Icon icon={type ? 'Success' : 'Warning'} size='lg' className='me-1' />
			<span>{'Success'}</span>
		</span>,
		message,
		type ? 'success' : 'warning',
	);
};

export const senderFormattedData = (data: any, searchType: any) => {
	return data.reduce((acc: any, obj: any, index: number) => {
		acc[index] = {
			value: searchType === 'zipcode' ? obj.zipCode : obj.code,
			label:
				searchType === 'sender'
					? obj.name
					: searchType === 'zipcode'
					? obj.zipCode
					: searchType === 'phone1'
					? obj.phone1
					: obj.phone2,
			isFixed: true,
			...obj,
		};
		return acc;
	}, []);
};

const dot = (_color = '#f8f9fa') => ({
	alignItems: 'center',
	display: 'flex',
	':before': {
		content: '" "',
		height: 10,
		width: 10,
	},
});

export const colourStyles: StylesConfig<any> = {
	control: (styles) => ({
		...styles,
		backgroundColor: '#f8f9fa',
		border: '1px solid #f8f9fa ',
		color: '#323232',
		paddingRight: '1rem',
		borderRadius: '1rem',
	}),
	input: (styles) => ({ ...styles, ...dot() }),
	placeholder: (styles) => ({ ...styles, paddingRight: '1rem', ...dot() }),
};
