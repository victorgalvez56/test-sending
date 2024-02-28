import { User } from '../contexts/authContext';
import { ReasonsResponse } from './NewTransactionService';
import { ErrorHanlder as ErrorHandler, HttpMethod, myFetch } from './baseService';

export interface Sender {
	value?: number;
	label?: string;
	isFixed?: boolean;
	code: number;
	name: string;
	fname: string;
	mname: string;
	lname: string;
	slname: string;
	address: string;
	phone1: string;
	phone2: string;
	mobile: string;
	email: string;
	zipcode: string;
	country: string;
	state: string;
	city: string;
	confirmEmail: boolean;
	cityname: string;
	nationality: string;
	birthDate: string;
	typeId: string;
	expDateId: string;
	secretWord: string;
	countryResidence: string;
	utilityBill: string;
	stateName: string;
	placeIssueId: string;
	gender: string;
	idFile: string;
	doc1: string;
	doc2: string;
	doc3: string;
	codeOrus: string;
	agencyGe: string;
	codeGe: string;
	readyToDelete: boolean;
	replacedBy: string;
	idStorageLocation1: string;
	idStorageLocation2: string;
	idStorageLocation3: string;
	agencyTemp: string;
	smsPhoneNumber: string;
	alternativeCode: string;
	sendSms: string;
	status: string;
	mname2: string;
	slname2: string;
	occupation: string;
	ssn: string;
	visible: boolean;
	backupCode: string;
	creationDate: string;
	allowSms: boolean;
	typeId2: string;
	enabled: boolean;
	deleted: boolean;
	mergedTo: string;
	mergedBy: string;
	mergeDate: string;
	numberId2: string;
	cristian: string;
	employerName: string;
	employerAddress: string;
	employerPhone1: string;
	personOfContact: string;
	omnexCode: string;
	idNumberEnc: string;
	sentToCompass: string;
	ssnSentToCompass: string;
	customer: string;
	numberId: string;
	appId: number;
	idUsr: string;
	usrType: string;
	codeCountry: string;
	codeState: string;
}

export interface Search {
	payee: number;
	invNo: string;
	payeeBranch: string;
	folio: string;
	fecInicio: string;
	fecFin: string;
	status: string;
	senderG: {
		fName: string;
		midName: string;
		lName: string;
		slName: string;
		phone: string;
	};
	recipientG: {
		fName: string;
		midName: string;
		lName: string;
		slName: string;
		phone: string;
	};
}

export interface Locations {
	value?: number | string;
	label?: string;
	isFixed: boolean;
	countryName: string;
	stateName: string;
	cityName: string;
	zipCode: string;
}
export type GeneralResponse = {
	code: number;
	success: boolean;
	message: string;
	error: string;
};

export type ListsSelect = {
	value: string | number;
	label: string;
	isFixed: boolean;
};
export interface LoginResponse extends GeneralResponse {
	idUser: string;
	token: string;
}

export interface UserResponse extends GeneralResponse {
	data: User[];
}
export interface SenderResponse extends GeneralResponse {
	data: Sender[];
}

export interface LocationsResponse extends GeneralResponse {
	data: Locations[];
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
		'Catalogs/api/AgencyStatus/',
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
export const getTypeidentification = async (
	resultHandler: (response: AgencyStatusResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<AgencyStatusResponse>(
		'Catalogs/api/TypeIdentification',
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);
export const getBankAccountType = async (
	resultHandler: (response: AgencyStatusResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<AgencyStatusResponse>(
		'Bank/api/BankAccountType',
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);

export const getNationalities = async (
	resultHandler: (response: AgencyStatusResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<AgencyStatusResponse>(
		'Catalogs/api/Nationalities',
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);

export const getSenders = async (
	text: string,
	resultHandler: (response: SenderResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<SenderResponse>(
		'Sender/api/Sender/SenderAC/' + text,
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);

export const getLocationsByZipCode = async (
	text: string,
	resultHandler: (response: LocationsResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<LocationsResponse>(
		'Location/api/ZipCode/ZipCodeAC/' + text,
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);

export const getRecipientRelationship = async (
	resultHandler: (response: AgencyStatusResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<AgencyStatusResponse>(
		'Recipient/api/RecipientRelationship/',
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);

export const getRateServiceType = async (
	resultHandler: (response: ReasonsResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<ReasonsResponse>(
		'RateGroups/api/RateServiceType/',
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);
// Search Transactions
export const getAllInvoiceSearch = async (
	form: Search,
	resultHandler: (response: { data: any[] }) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<SenderResponse>(
		'Invoice/api/Invoice/GetAllInvoiceSearch',
		JSON.stringify(form),
		resultHandler,
		errorHandler,
		HttpMethod.POST,
	);
