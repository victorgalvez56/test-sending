import { User } from '../contexts/authContext';
import { ErrorHanlder as ErrorHandler, HttpMethod, myFetch } from './baseService';

export const getSession = () => {
	let user = localStorage.getItem('userSession');
	if (user == null) {
		let userSession = {
			isLogged: false,
			user: {},
		};
		user = JSON.stringify(userSession);
		localStorage.setItem('userSession', user);
	}
	return JSON.parse(user);
};

export const setUserSessionData = (
	user: User,
	currency: string,
	preReceiptType: number,
	agencyCredit: number,
	agencyBalance: number,
	agencyExtendeCredit: number,
	agencyLimit: number,
) => {
	let userSession = {
		isLogged: true,
		user: {
			agency: user.agency,
			fname: user.fname,
			lname: user.lname,
			name: user.name,
			login: user.login,
			secLevel: user.secLevel,
			company: user.company,
			identityCode: user.identityCode,
		},
		currencyOrigin: currency,
		preReceiptType: preReceiptType,
		dataCredit: {
			agencyCredit: agencyCredit,
			agencyBalance: agencyBalance,
			agencyExtendeCredit: agencyExtendeCredit,
			agencyLimit: agencyLimit,
		},
	};
	localStorage.setItem('userSession', JSON.stringify(userSession));
};

const deleteCookie = (name: string) => {
	document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

const deleteSessionCookie = () => deleteCookie('connect.sid');

export const deleteSession = () => {
	localStorage.removeItem('userSession');
	deleteSessionCookie();
};
export type GeneralResponse = {
	code: number;
	success: boolean;
	message: string;
	error: null;
	use2FA?: boolean;
};

export interface LoginResponse extends GeneralResponse {
	idUser: string;
	token: string;
	data: [
		{
			address: string;
			phone1: string;
			phone2: string;
			country: string;
			state: string;
			city: string;
			cityName: string;
			cityNameGeolocation: string;
			zipcode: string;
			name: string;
			currency: string;
			main: string;
			status: string;
			allowChangeRate: boolean;
			controlDepositDays: number;
			controlDepositFrequency: boolean;
			allowEnterCode: boolean;
			code: string;
			typeReceiptPrint: number;
			accountGroup: string;
			language: string;
			allowCheckProcessing: boolean;
			allowBillPayment: boolean;
			allowControlHandling: boolean;
			payomaticId: string;
			smsCreditGapSent: string;
			tempPinCode: string;
			sendFax: boolean;
			incomingChannel: string;
			whitelistIpValidation: boolean;
			whitelistIp: string;
		},
	];
}

export type CreditResponse = {
	code: number;
	success: boolean;
	message: string;
	error: string;
	data: [
		{
			agencyCredit: number;
			agencyBalance: number;
			agencyExtendeCredit: number;
			agencyLimit: number;
		},
	];
};

export interface UserResponse extends GeneralResponse {
	data: User[];
}

export const getToken = async () => ({
	// Authorization: `Bearer ${await AsyncStorage.getItem('@token')}`
});

export interface RequestLogin {
	login?: string;
	password?: string;
	agentCode: string;
	idApp: number;
	usrType: string;
	verificationCode?: string;
}

export const login = async (
	form: RequestLogin,
	resultHandler: (response: LoginResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<LoginResponse>(
		'Authentication/api/AuthenticationAgency',
		JSON.stringify(form),
		resultHandler,
		errorHandler,
		HttpMethod.POST,
	);

export const resend2FA = async (
	form: RequestLogin,
	resultHandler: (response: LoginResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<LoginResponse>(
		'Authentication/api/AuthenticationAgency/Resend2FA',
		JSON.stringify(form),
		resultHandler,
		errorHandler,
		HttpMethod.POST,
	);
export const validate2FA = async (
	form: RequestLogin,
	resultHandler: (response: LoginResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<LoginResponse>(
		'Authentication/api/AuthenticationAgency/Validate2FA',
		JSON.stringify(form),
		resultHandler,
		errorHandler,
		HttpMethod.POST,
	);
export const getUser = async (
	idUser: string,
	idUserConsult: string,
	resultHandler: (response: UserResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<UserResponse>(
		'AgencyUser/api/UserAgency/' + idUser + '/' + idUserConsult,
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);

export const getCreditInformation = async (
	codeAgency: string,
	resultHandler: (response: CreditResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<CreditResponse>(
		'AgencyGroups/api/Agency/GetAgencyCredit/' + codeAgency,
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);
