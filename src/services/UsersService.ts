import { User } from '../contexts/authContext';
import { ErrorHanlder as ErrorHandler, HttpMethod, myFetch } from './baseService';

export type GeneralResponse = {
	code: number;
	success: boolean;
	message: string;
	error: null;
};

export interface LoginResponse extends GeneralResponse {
	idUser: string;
	token: string;
}

export interface UserResponse extends GeneralResponse {
	data: User[];
}
export interface Agency {
	code: string;
	name: string;
	appId: number;
	idUsr: string;
	usrType: string;
}
export interface AgencyCatalogsList {
	value?: string | number | undefined;
	text?: string | number | undefined;
	label?: string | number | undefined;
}
export interface AgencyStatusResponse extends GeneralResponse {
	data: Agency[];
}
export const getToken = async () => ({
	// Authorization: `Bearer ${await AsyncStorage.getItem('@token')}`
});
type UpdateResponseHandler = (response: GeneralResponse) => void;

interface RequestUpdate {
	identityCode?: number;
	agency?: string;
	login?: string;
	password?: string;
	secLevel?: string;
	email?: string;
	mobile?: string;
	language?: string;
	fname?: string;
	lname?: string;
	appId?: number;
	idUsr?: string;
	usrType?: string;
	status?: string;
	name?: string;
	company?: string;
}

export const getUsers = async (
	idUser: number | undefined,
	resultHandler: (response: UserResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<UserResponse>(
		'AgencyUser/api/UserAgency/' + idUser,
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);

export const getAgencyStatus = async (
	resultHandler: (response: AgencyStatusResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<AgencyStatusResponse>(
		'AgencyGroups/api/AgencyStatus/',
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);
export const getSecurityLevels = async (
	resultHandler: (response: AgencyStatusResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<AgencyStatusResponse>(
		'Catalogs/api/AgencySecurityLevel/',
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);
export const getLanguages = async (
	resultHandler: (response: AgencyStatusResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<AgencyStatusResponse>(
		'Catalogs/api/Language',
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);

export const updateProfile = async (
	form: RequestUpdate,
	resultHandler: UpdateResponseHandler,
	errorHandler: ErrorHandler,
) =>
	myFetch<AgencyStatusResponse>(
		'AgencyUser/api/UserAgency/',
		JSON.stringify(form),
		resultHandler,
		errorHandler,
		HttpMethod.PUT,
	);

export const createUser = async (
	form: RequestUpdate,
	resultHandler: UpdateResponseHandler,
	errorHandler: ErrorHandler,
) =>
	myFetch<AgencyStatusResponse>(
		'AgencyUser/api/UserAgency/',
		JSON.stringify(form),
		resultHandler,
		errorHandler,
		HttpMethod.POST,
	);
export const deleteUser = async (
	idUser: number | undefined,
	idUserDelete: number | undefined,
	resultHandler: UpdateResponseHandler,
	errorHandler: ErrorHandler,
) =>
	myFetch<AgencyStatusResponse>(
		'AgencyUser/api/UserAgency/Delete/' + idUser + '/' + idUserDelete,
		JSON.stringify({}),
		resultHandler,
		errorHandler,
		HttpMethod.DELETE,
	);
