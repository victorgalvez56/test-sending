import { ErrorHanlder as ErrorHandler, HttpMethod, myFetch } from './baseService';

export interface GeneralReponse {
	code: string;
	name: string;
	bancomerCode: string;
	orusCode: string;
	isoCode3: string;
	sentToCompass: string;
	appId: number;
	idUsr: string;
	usrType: string;
}

export interface Countries extends GeneralReponse {
	flag: string;
	ge: string;
	isoCode2: string;
	avalCode: string;
	cofip: string;
	isoNum3: string;
	rssUrl: string;
	flagUrl: string;
	requiresZone: boolean;
	bhsCode: string;
	swCode: string;
	curGoomga: string;
	stateSwDefault: string;
	phonePrefix: string;
	englishName: string;
	riskId1: string;
	riskScore: string;
	timezone: string;
	currencyBase: string;
	phoneNumDigits: string;
	walletDefaultPayee: string;
	walletWhatsapp1: string;
	walletWhatsapp2: string;
	walletStatus: string;
	exportCode: string;
	stateCount: number;
}

export interface States extends GeneralReponse {
	country: string;
	geCode: string;
	abcId: string;
	abcStateName: string;
	status: string;
	transnetwork: string;
	finePrints: string;
	swId: string;
	identityCode: string;
	finePrintsSpanish: string;
	cityCount: number;
}

export interface Cities extends GeneralReponse {
	country: string;
	state: string;
	abcId: string;
	abcCityName: string;
	status: string;
	newCode: string;
	newState: string;
	found: string;
	bancomerAgentRegionSd: string;
	transnetwork: string;
	swId: string;
	stateIdSw: string;
	identityCode: string;
	replaceByCity: string;
	nameGeoipLocation: string;
}

export interface Payments extends GeneralReponse {
	code: string;
	name: string;
	bankRequired: string;
	ge: string;
	bhsName: string;
	isMoneyTransfer: boolean;
	swCode: string;
	appId: number;
	idUsr: string;
	usrType: string;
}

export interface Reasons {
	code: string;
	name: string;
	status: string;
	appId: number;
	idUsr: null;
	usrType: null;
}

export interface Currencies {
	code: string;
	name: string;
	symbol: string;
	bancomerCode: string;
	geCode: string;
	iso3chars: string;
	iso3num: string;
	swCode: string;
	isNational: boolean;
	sentToCompass: string;
	appId: number;
	idUsr: string;
	usrType: string;
}

export interface Recipients {
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
	zipcode: string;
	email: string;
	country: string;
	state: string;
	city: string;
	codeCountry: string;
	codeState: string;
	codeCity: string;
	confirmEmail: boolean;
	sender: number;
	gender: string;
	brasilianId: string;
	codeOrus: string;
	agencyGe: string;
	identityCode: string;
	accountNumber: string;
	bankName: string;
	accountType: string;
	readyToDelete: boolean;
	newipient: string;
	previousSender: string;
	smsPhoneNumber: string;
	alternativeCode: string;
	sendSms: boolean;
	address2: string;
	status: string;
	fnameBackup: string;
	mname2: string;
	slname2: string;
	cityName: string;
	creationDate: string;
	bankAccount: string;
	bank: string;
	relationship: string;
	senderCristian: string;
	cristian: string;
	nationality: string;
	birthDate: string;
	omnexCode: string;
	idPath: string;
	typeId: string;
	sentToCompass: string;
	ofacReleased: boolean;
	customer: string;
	appId: number;
	idUsr: string;
	usrType: string;
}
export interface Payees {
	codeBranch: string;
	identityCode: number;
	agency: string;
	code: string;
	cashier: number;
	payee: string;
	paymentMode: string;
	sender: number;
	recipient: number;
	curOrigin: string;
	curDestination: string;
	countryOrigin: string;
	countryDestination: string;
	cityDestination: string;
	date: string;
	amount: number;
	fee: number;
	handling: number;
	exchangeRate: number;
	totalReceived: number;
	fixCompany: number;
	fixCustomer: number;
	percCompany: number;
	percCustomer: number;
	minCompany: number;
	minCustomer: number;
	agencyPayable: number;
	agencyToPay: number;
	payeePerc: number;
	payeeCurrencyFix: string;
	payeeFix: number;
	payeeFeeFixToPay: number;
	payeeFeeFixRate: number;
	payeeTotalToPay: number;
	payeePercToPay: number;
	payeeFixToPay: number;
	bankName: string;
	bankBranch: string;
	bankAccountType: string;
	bankAccountNumber: string;
	bankAddress: string;
	senderIdType: string;
	senderIdNumber: string;
	senderBirthdate: string;
	agencyRateEarnings: number;
	agencyRatePerc: number;
	companyRatePerc: number;
	agencySettlementRate: number;
	status: string;
	reference: number;
	folio: string;
	dateValid: string;
	systemUser: number;
	total: number;
	distributorUser: number;
	payeeExchangeRate: number;
	payeeCurrencyPay: string;
	payeePayableAmount: number;
	agencyClosingId: number;
	payeeClosingId: number;
	minPayee: number;
	paidToPayee: number;
	wireId: number;
	payeePayableFee: number;
	earningsExchangeRate: number;
	depositStatus: string;
	message: string;
	secretWord: string;
	wireStatus: string;
	bankCode: string;
	bankBranchCode: string;
	motIndicator1: number;
	motIndicator2: number;
	motIndicator3: number;
	motIndicator4: number;
	confirmed: number;
	id1: string;
	id2: string;
	senderName: string;
	senderFname: string;
	senderMname: string;
	senderLname: string;
	senderSlname: string;
	recipientName: string;
	recipientFname: string;
	recipientMname: string;
	recipientLname: string;
	recipientSlname: string;
	transmissionDate: string;
	paymentDate: string;
	payeePayable: number;
	rateServiceType: string;
	cancellationDate: string;
	bancomerTransmitted: number;
	applicationStatus: string;
	applicationBalance: number;
	agencyApplicationStatus: string;
	agencyApplicationBalance: number;
	invoiceId1: string;
	moneyRemittanceStatus: number;
	payeeGe: string;
	confirmedToGe: boolean;
	dateOrus: string;
	cancellationDateOrus: string;
	vietnamWard: number;
	sentBitDefault: boolean;
	bancomerChangeData: boolean;
	emailSentSenderTransSent: boolean;
	emailSentRecipientTransSent: boolean;
	emailSentSenderPaidTrans: boolean;
	emailSentRecipientPaidTrans: boolean;
	smsSentSenderTransSent: boolean;
	smsSentRecipientTransSent: boolean;
	smsSentSenderPaidTrans: boolean;
	smsSentRecipientPaidTrans: boolean;
	refundTransaction: number;
	zone: string;
	dcuAccountingGroup: string;
	downloaded: boolean;
	cardNumber: string;
	void: boolean;
	fixCustomerToBill: number;
	percCustomerToBill: number;
	fixCompanyToBill: number;
	percCompanyToBill: number;
	cancelledCounter: number;
	activeCounter: number;
	rejected: boolean;
	rejectedDate: string;
	idSenderRequired: number;
	prerefundId: number;
	agencyForex: number;
	companyForex: number;
	codeOri: number;
	requiredBsa: boolean;
	reviewedBsa: boolean;
	swSent: boolean;
	mtn: string;
	payeeBackup: string;
	swCancellationSent: boolean;
	bancomerTransmissionError: boolean;
	omnexMtn: string;
	retainTransaction: boolean;
	masterFeeAgentId: number;
	forMonthlyClosing: boolean;
	agencyClosingMonthly: number;
	escrowStatus: string;
	escrowDate: string;
	reason: string;
	service: string;
	originalId: number;
	omnexAgentMtn: number;
	onlineType: string;
	temp1: string;
	cancellationReversed: boolean;
	id3: string;
	fraudDetected: boolean;
	agencyClosingDateAdded: string;
	payeeClosingDateAdded: string;
	resolutionFollowUpDate: string;
	closeResolutionDate: string;
	id4: string;
	paymentReversed: boolean;
	omnexMtnValidation: string;
	senderAllDocs: boolean;
	incomingChannel: string;
	icApprovedByAgent: boolean;
	icApprovedByAgencyUser: number;
	icApprovalDateByAgencyUser: string;
	icApprovedBySystemUser: boolean;
	icApprovalDateBySystemUser: string;
	hasComplianceFiles: boolean;
	icApprovedBySystemUserId: number;
	id5: string;
	allowPaymentClosing: boolean;
	icApprovalStatus: string;
	pendingLocalPaymentApproval: boolean;
	postponeTransmission: string;
	payeeAccountingGroup: string;
	companyAgency: string;
	possibleFraudReleasedByCashier: number;
	possibleFraudReleasedBySystemUser: number;
	possibleFraudReleasedBySalesRep: number;
	possibleFraudReleasedByCashierDate: string;
	possibleFraudReleasedBySystemUserDate: string;
	possibleFraudReleasedBySalesRepDate: string;
	possibleFraud: boolean;
	countryOrigination: string;
	lexisNexisChecked: boolean;
	lexisNexisProcessed: boolean;
	requiresSenderId: boolean;
	lexisNexisSenderMatched: boolean;
	lexisNexisRecipientMatched: boolean;
	lexisNexisSenderMatchId: string;
	lexisNexisRecipientMatchId: string;
	lexisNexisSenderResultId: string;
	lexisNexisRecipientResultId: string;
	preReceiptDate: string;
	availabilityDate: string;
	cancelReminderSentDate: string;
	availabilityDateReceipt: string;
	companyPayee: string;
	caseReviewedDate: string;
	caseReviewedBy: number;
	redPhoneRequiresId: boolean;
	sentToCompass: string;
	typeTransNoPayer: string;
	transNoPayerSent: string;
	escrowRegisteredBy: number;
	lexisNexisAutoreleased: string;
	refundedCustomer: boolean;
	refundedCustomerBy: number;
	refundedCustomerDate: string;
	ssn: string;
	compassProcessId: number;
	sentToCompassStart: string;
	sentToCompassEnd: string;
	startTransmissionToCompass: string;
	refundedToCustomer: string;
	refundedToCustomerSystemUser: number;
	originalPayee: string;
	walletStoreReceiptNumber: string;
	tip: number;
	walletRefundDate: string;
	walletRefundCashier: number;
	walletRefundedId: number;
	appId: number;
	idUsr: string;
	usrType: string;
	name?: string;
	rate?: string;
}
export interface BranchPayees {
	disCode: string;
	disName: string;
	disAddress: string;
	disCodeCountry: string;
	disCountryName: string;
	disCodeState: string;
	disStateName: string;
	disCityCode: string;
	disCityName: string;
	disPhone1: string;
	disPhone2: string;
	disFax: string;
	disWorkingHours: string;
	dCurPaymentLimitAmount: number;
	dCurPaymentLimitAmountNatCur: number;
}
export interface Invoices {
	invBankAccountNumber: string;
	invBankAccountType: string;
	invBankBranch: string;
	invBankName: string;
	invCode: number;
	invCurDestination: string;
	invPaymentMode: string;
	recName: string;
	sumAmount: number;
	invPayee: string;
}
export interface Rate {
	rate: string;
}
export interface Fee {
	feeFound: string;
	fixCompany: number;
	fixCustomer: number;
	percCompany: number;
	percCustomer: number;
	minCustomer: number;
	minCompany: number;
}
export interface InsertInvoice {
	error: string;
	code: number;
	identityCode: number;
}
export interface SearchInvoice {
	identityCode: number;
	agency: string;
	code: number;
	cashier: number;
	payee: string;
	paymentMode: string;
	senderG: {
		sender: number;
		senderIdType: string;
		senderIdNumber: string;
		senderBirthdate: string;
		senderName: string;
		senderFname: string;
		senderMname: string;
		senderLname: string;
		senderSlname: string;
	};
	recipientG: {
		recipient: number;
		recipientName: string;
		recipientFname: string;
		recipientMname: string;
		recipientLname: string;
		recipientSlname: string;
	};
	curOrigin: string;
	curDestination: string;
	countryOrigin: string;
	countryDestination: string;
	cityDestination: string;
	date: string;
	amount: number;
	fee: number;
	handling: number;
	exchangeRate: number;
	totalReceived: number;
	fixCompany: number;
	fixCustomer: number;
	percCompany: number;
	percCustomer: number;
	minCompany: number;
	minCustomer: number;
	agencyPayable: number;
	agencyToPay: number;
	payeePerc: number;
	payeeCurrencyFix: string;
	payeeFix: number;
	payeeFeeFixToPay: number;
	payeeFeeFixRate: number;
	payeeTotalToPay: number;
	payeePercToPay: number;
	payeeFixToPay: number;
	bankName: string;
	bankBranch: string;
	bankAccountType: string;
	bankAccountNumber: string;
	bankAddress: string;
	agencyRateEarnings: string;
	agencyRatePerc: string;
	companyRatePerc: string;
	agencySettlementRate: number;
	status: string;
	reference: number;
	folio: string;
	dateValid: string;
	systemUser: number;
	total: number;
	distributorUser: string;
	payeeExchangeRate: number;
	payeeCurrencyPay: string;
	payeePayableAmount: number;
	agencyClosingId: string;
	payeeClosingId: string;
	minPayee: number;
	paidToPayee: string;
	wireId: string;
	payeePayableFee: number;
	earningsExchangeRate: number;
	depositStatus: string;
	message: string;
	secretWord: string;
	wireStatus: string;
	bankCode: string;
	bankBranchCode: string;
	motIndicator1: string;
	motIndicator2: string;
	motIndicator3: string;
	motIndicator4: string;
	confirmed: string;
	id1: string;
	id2: string;
	transmissionDate: string;
	paymentDate: string;
	payeePayable: number;
	rateServiceType: string;
	cancellationDate: string;
	bancomerTransmitted: number;
	applicationStatus: string;
	applicationBalance: number;
	agencyApplicationStatus: string;
	agencyApplicationBalance: string;
	invoiceId1: string;
	moneyRemittanceStatus: number;
	payeeGe: string;
	confirmedToGe: boolean;
	dateOrus: string;
	cancellationDateOrus: string;
	vietnamWard: string;
	sentBitDefault: boolean;
	bancomerChangeData: boolean;
	emailSentSenderTransSent: boolean;
	emailSentRecipientTransSent: boolean;
	emailSentSenderPaidTrans: boolean;
	emailSentRecipientPaidTrans: boolean;
	smsSentSenderTransSent: boolean;
	smsSentRecipientTransSent: boolean;
	smsSentSenderPaidTrans: boolean;
	smsSentRecipientPaidTrans: boolean;
	refundTransaction: string;
	zone: string;
	dcuAccountingGroup: string;
	downloaded: boolean;
	cardNumber: string;
	void: boolean;
	fixCustomerToBill: string;
	percCustomerToBill: string;
	fixCompanyToBill: string;
	percCompanyToBill: string;
	cancelledCounter: number;
	activeCounter: number;
	rejected: boolean;
	rejectedDate: string;
	idSenderRequired: number;
	prerefundId: string;
	agencyForex: number;
	companyForex: number;
	codeOri: string;
	requiredBsa: boolean;
	reviewedBsa: boolean;
	swSent: boolean;
	mtn: string;
	payeeBackup: string;
	swCancellationSent: string;
	bancomerTransmissionError: boolean;
	omnexMtn: string;
	retainTransaction: string;
	masterFeeAgentId: string;
	forMonthlyClosing: boolean;
	agencyClosingMonthly: string;
	escrowStatus: string;
	escrowDate: string;
	reason: string;
	service: string;
	originalId: number;
	omnexAgentMtn: string;
	onlineType: string;
	temp1: string;
	cancellationReversed: boolean;
	id3: string;
	fraudDetected: boolean;
	agencyClosingDateAdded: string;
	payeeClosingDateAdded: string;
	resolutionFollowUpDate: string;
	closeResolutionDate: string;
	id4: string;
	paymentReversed: boolean;
	omnexMtnValidation: string;
	senderAllDocs: boolean;
	incomingChannel: string;
	icApprovedByAgent: boolean;
	icApprovedByAgencyUser: string;
	icApprovalDateByAgencyUser: string;
	icApprovedBySystemUser: boolean;
	icApprovalDateBySystemUser: string;
	hasComplianceFiles: boolean;
	icApprovedBySystemUserId: string;
	id5: string;
	allowPaymentClosing: boolean;
	icApprovalStatus: string;
	pendingLocalPaymentApproval: boolean;
	postponeTransmission: string;
	payeeAccountingGroup: string;
	companyAgency: string;
	possibleFraudReleasedByCashier: string;
	possibleFraudReleasedBySystemUser: string;
	possibleFraudReleasedBySalesRep: string;
	possibleFraudReleasedByCashierDate: string;
	possibleFraudReleasedBySystemUserDate: string;
	possibleFraudReleasedBySalesRepDate: string;
	possibleFraud: boolean;
	countryOrigination: string;
	lexisNexisChecked: boolean;
	lexisNexisProcessed: boolean;
	requiresSenderId: boolean;
	lexisNexisSenderMatched: boolean;
	lexisNexisRecipientMatched: boolean;
	lexisNexisSenderMatchId: string;
	lexisNexisRecipientMatchId: string;
	lexisNexisSenderResultId: string;
	lexisNexisRecipientResultId: string;
	preReceiptDate: string;
	availabilityDate: string;
	cancelReminderSentDate: string;
	availabilityDateReceipt: string;
	companyPayee: string;
	caseReviewedDate: string;
	caseReviewedBy: string;
	redPhoneRequiresId: boolean;
	sentToCompass: string;
	typeTransNoPayer: string;
	transNoPayerSent: string;
	escrowRegisteredBy: string;
	lexisNexisAutoreleased: string;
	refundedCustomer: boolean;
	refundedCustomerBy: string;
	refundedCustomerDate: string;
	ssn: string;
	compassProcessId: string;
	sentToCompassStart: string;
	sentToCompassEnd: string;
	startTransmissionToCompass: string;
	refundedToCustomer: string;
	refundedToCustomerSystemUser: string;
	originalPayee: string;
	walletStoreReceiptNumber: string;
	tip: string;
	walletRefundDate: string;
	walletRefundCashier: string;
	walletRefundedId: string;
	appId: number;
	idUsr: string;
	usrType: string;
}
export interface RequestInvoice {
	autogeninvno: number;
	invoiceg: {
		invcode: number;
		invagency: string;
		invcashier: number;
		invpayee: string;
		invpaymentmode: string;
		invcurorigin: string;
		invcurdestination: string;
		invcountryorigin: string | null;
		invcountrydestination: string | null;
		invcitydestination: string | null;
		invamount: number;
		invfee: number;
		invhandling: number;
		invexchangerate: number;
		invtotalreceived: number;
		invfixcompany: number;
		invfixcustomer: number;
		invperccompany: number;
		invperccustomer: number;
		invmincompany: number;
		invmincustomer: number;
		invbankname: string;
		invbankbranch: string;
		invbankaccounttype: string;
		invbankaccountnumber: string;
		invtotal: number;
		invmessage: string;
		invbankcode: string;
		invbankbranchcode: string;
		invrateservicetype: string;
		invagencysettlementrate: number;
		invreason: string;
		invrequiredbsa: boolean;
		invcountryorigination: string | null;
		invonlinetype: string;
		invincomingchannel: string;
		inviD1: string;
		invfolio: string;
	};
	senderg: {
		sencode: number;
		senfname: string;
		senmname: string;
		senlname: string;
		sensname: string;
		senaddress: string;
		senphonE1: string;
		senconfirmemail: boolean;
		senemail: string;
		senzipcode: string;
		sencountry: string;
		senstate: string;
		sencityname: string;
		sennationality: string;
		senbirthdate: string;
		senexpdate: string;
		sentypeid: string;
		sennumberid: string;
		sencountryres: string;
		senutilitybill: string;
		senstatename: string;
		senoccupation: string;
		senidissuedate: string;
		senissueby: string;
		senphotoidpath: string;
		senkeygen: string;
		senidentityid: string;
		senallowsms: boolean;
		sentypeiD2: string;
		sennumberiD2: string;
		senemployername: string;
		senemployeraddress: string;
		senemployerphonE1: string;
		senpersonofcontact: string;
	};
	recipientg: {
		reccode: number;
		recfname: string;
		recmname: string;
		reclname: string;
		recsname: string;
		recaddress: string;
		recphonE1: string;
		recconfirmemail: boolean;
		recemail: string;
		reczipcode: string;
		reccountry: string;
		recstate: string;
		reccity: string;
		recidnumber: string;
		recsendsms: boolean;
		recrelationship: string;
		recbirthdate: string;
		recnationality: string;
		rectypeid: string;
		reccityname: string;
	};
}
export interface CountriesResponse {
	data: Countries[];
}
export interface StatesResponse {
	data: States[];
}
export interface CitiesResponse {
	data: Cities[];
}
export interface PaymentsResponse {
	data: Payments[];
}
export interface ReasonsResponse {
	data: Reasons[];
}
export interface CurrenciesResponse {
	data: Currencies[];
}
export interface RecipientsResponse {
	data: Recipients[];
}
export interface PayeesResponse {
	data: Payees[];
}
export interface BranchPayeesResponse {
	data: BranchPayees[];
}
export interface RateResponse {
	data: Rate[];
}
export interface FeeResponse {
	data: Fee[];
}
export interface InvoicesResponse {
	data: Invoices[];
}
export interface InsertInvoicesResponse {
	data: InsertInvoice[];
}
export interface SearchInvoiceResponse {
	data: SearchInvoice[];
}

export const getToken = async () => ({
	// Authorization: `Bearer ${await AsyncStorage.getItem('@token')}`
});

export const getCountries = async (
	resultHandler: (response: CountriesResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<CountriesResponse>(
		'Location/api/Country',
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);

export const getStates = async (
	text: string,
	resultHandler: (response: StatesResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<StatesResponse>(
		'Location/api/State/' + text,
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);

export const getCities = async (
	formData: { country: string | undefined | number; state: string },
	resultHandler: (response: CitiesResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<CitiesResponse>(
		'Location/api/State/' + formData.country + '/' + formData.state,
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);

export const getPaymentMode = async (
	resultHandler: (response: PaymentsResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<PaymentsResponse>(
		'Payments/api/PaymentMode/',
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);

export const getReasons = async (
	resultHandler: (response: ReasonsResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<ReasonsResponse>(
		'Invoice/api/InvoiceReason',
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);

export const getCurrencies = async (
	resultHandler: (response: CurrenciesResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<CurrenciesResponse>(
		'Catalogs/api/Currency',
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);
export const getRecipientsBySender = async (
	text: number,
	resultHandler: (response: RecipientsResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<RecipientsResponse>(
		'Recipient/api/Recipient/GetAllRecipientsBySender/' + text,
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);
export const getRecipient = async (
	id: number,
	resultHandler: (response: RecipientsResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<RecipientsResponse>(
		'Recipient/api/Recipient/' + id,
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
		'RateGroups/api/RateServiceType',
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);
export const GetAllInvoiceByRecipient = async (
	agencyCode: string,
	senderCode: number,
	recipientCode: number,
	resultHandler: (response: InvoicesResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<InvoicesResponse>(
		'Invoice/api/Invoice/GetAllInvoiceByRecipient/' +
			agencyCode +
			'/' +
			senderCode +
			'/' +
			recipientCode,
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);

export const GetBranchbyInvoice = async (
	data: {
		pmCode: string | number | undefined;
		CodeCur: string | number | undefined;
		codeCity: string | null;
		codeCountry: string | null;
		codeCompany: string;
		codeAgency: string;
	},
	resultHandler: (response: PayeesResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<PayeesResponse>(
		'Invoice/api/Invoice/GetBranchbyInvoice/' +
			data.pmCode +
			'/' +
			data.CodeCur +
			'/' +
			data.codeCountry +
			'/' +
			data.codeCity +
			'/' +
			data.codeCompany +
			'/' +
			data.codeAgency,
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);

export const GetPayeeBranch = async (
	data: {
		pmoCode: string | number | undefined;
		CodeCur: string | number | undefined;
		codeCity: string | null;
		codeCountry: string | null;
		codeCompany: string;
		codeMainDis: string;
	},
	resultHandler: (response: BranchPayeesResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<BranchPayeesResponse>(
		'PayeeBank/api/PayeeBankBranch/GetPayeeBranch/' +
			data.pmoCode +
			'/' +
			data.CodeCur +
			'/' +
			data.codeCountry +
			'/' +
			data.codeCity +
			'/' +
			data.codeCompany +
			'/' +
			data.codeMainDis,
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);

export const GetRate = async (
	data: {
		CodeCountryOrigin: string | null;
		CodeCurrencyOrigin: string;
		CodeCountryDestination: string | null;
		CodeCurrencyDestination: string | number | undefined;
		CodeAgency: string;
		CodePayee: string | undefined;
		CodeStateOrigin: string | null;
		CodeRateType: string;
		CodePMo: string | number | undefined;
	},
	resultHandler: (response: RateResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<RateResponse>(
		'RateGroups/api/Rate/GetRate/' +
			data.CodeCountryOrigin +
			'/' +
			data.CodeCurrencyOrigin +
			'/' +
			data.CodeCountryDestination +
			'/' +
			data.CodeCurrencyDestination +
			'/' +
			data.CodeAgency +
			'/' +
			data.CodePayee +
			'/' +
			data.CodeStateOrigin +
			'/' +
			data.CodeRateType +
			'/' +
			data.CodePMo,
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);

export const getCurrenciesByCountry = async (
	country: string | null,
	resultHandler: (response: CurrenciesResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<CurrenciesResponse>(
		'Catalogs/api/Currency/CurrenciesByCountry/' + country,
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);

export const GetAllPaymentModeByCity = async (
	city: string | null,
	resultHandler: (response: PaymentsResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<PaymentsResponse>(
		'Payments/api/PaymentMode/GetAllPaymentModeByCity/' + city,
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);

export const Getfee = async (
	data: {
		Amount: string;
		CodeCountryOrigin: string | null;
		CodeCurrencyOrigin: string;
		CodeCountryDestination: string | null;
		CodeCurrencyDestination: string | number | undefined;
		CodeAgency: string;
		CodePayee: string | undefined;
		CodeService: string;
		CodeState: string | null;
		CodePMo: string | number | undefined;
	},
	resultHandler: (response: FeeResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<FeeResponse>(
		'Feesgroups/api/Fees/GetFee/' +
			data.Amount +
			'/' +
			data.CodeCountryOrigin +
			'/' +
			data.CodeCurrencyOrigin +
			'/' +
			data.CodeCountryDestination +
			'/' +
			data.CodeCurrencyDestination +
			'/' +
			data.CodeAgency +
			'/' +
			data.CodePayee +
			'/' +
			data.CodeService +
			'/' +
			data.CodePMo +
			'/' +
			data.CodeState,
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);

export const Invoice = async (
	form: RequestInvoice,
	resultHandler: (response: InsertInvoicesResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<InsertInvoicesResponse>(
		'Invoice/api/Invoice',
		JSON.stringify(form),
		resultHandler,
		errorHandler,
		HttpMethod.POST,
	);

export const getInvoiceByCode = async (
	code: number | null,
	resultHandler: (response: SearchInvoiceResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<SearchInvoiceResponse>(
		'Invoice/api/Invoice/' + code,
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);
