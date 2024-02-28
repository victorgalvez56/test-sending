import showNotification from './components/extras/showNotification';
import Icon from './components/icon/Icon';
import i18n from './i18n';

export interface ILang {
	[key: string]: {
		text: string;
		lng: 'en' | 'sp';
		icon: string;
	};
}

const LANG: ILang = {
	EN: {
		text: 'English',
		lng: 'en',
		icon: 'CustomUsa',
	},
	SP: {
		text: 'Spanish',
		lng: 'sp',
		icon: 'CustomGermany',
	},
};

export const changeLanguage = (lng: ILang['key']['lng']) => {
	i18n.changeLanguage(lng).then();
	showNotification(
		<span className='d-flex align-items-center'>
			<Icon icon={getLangWithKey(lng)?.icon} size='lg' className='me-1' />
			<span>{`Language changed to ${getLangWithKey(lng)?.text}`}</span>
		</span>,
		'You updated the language of the site.',
	);
};

export const getLangWithKey = (key: ILang['key']['lng']): ILang['key'] => {
	// @ts-ignore
	return LANG[Object.keys(LANG).filter((f) => key.includes(LANG[f].lng))];
};

export default LANG;
