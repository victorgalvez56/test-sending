import { ErrorHanlder as ErrorHandler, HttpMethod, myFetch } from './baseService';

export type GeneralResponse = {
	code: number;
	success: boolean;
	message: string;
	error: string;
};

export interface InvoiceReponse {
	identityCode: string;
	agency: string;
	code: string;
	cashier: string;
	payee: string;
	paymentMode: string;
	sender: string;
	recipient: string;
	curOrigin: string;
	curDestination: string;
	countryOrigin: string;
	countryDestination: string;
	cityDestination: string;
	date: string;
	amount: string;
	fee: string;
	handling: string;
	exchangeRate: string;
	totalReceived: string;
	fixCompany: string;
	fixCustomer: string;
	percCompany: string;
	percCustomer: string;
	minCompany: string;
	minCustomer: string;
	agencyPayable: string;
	agencyToPay: string;
	payeePerc: string;
	payeeCurrencyFix: string;
	payeeFix: string;
	payeeFeeFixToPay: string;
	payeeFeeFixRate: string;
	payeeTotalToPay: string;
	payeePercToPay: string;
	payeeFixToPay: string;
	bankName: string;
	bankBranch: string;
	bankAccountType: string;
	bankAccountNumber: string;
	bankAddress: string;
	senderIdType: string;
	senderIdNumber: string;
	senderBirthdate: string;
	agencyRateEarnings: string;
	agencyRatePerc: string;
	companyRatePerc: string;
	agencySettlementRate: string;
	status: string;
	reference: string;
	folio: string;
	dateValid: string;
	systemUser: string;
	total: string;
	distributorUser: string;
	payeeExchangeRate: string;
	payeeCurrencyPay: string;
	payeePayableAmount: string;
	agencyClosingId: string;
	payeeClosingId: string;
	minPayee: string;
	paidToPayee: string;
	wireId: string;
	payeePayableFee: string;
	earningsExchangeRate: string;
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
	payeePayable: string;
	rateServiceType: string;
	cancellationDate: string;
	bancomerTransmitted: string;
	applicationStatus: string;
	applicationBalance: string;
	agencyApplicationStatus: string;
	agencyApplicationBalance: string;
	invoiceId1: string;
	moneyRemittanceStatus: string;
	payeeGe: string;
	confirmedToGe: string;
	dateOrus: string;
	cancellationDateOrus: string;
	vietnamWard: string;
	sentBitDefault: string;
	bancomerChangeData: string;
	emailSentSenderTransSent: string;
	emailSentRecipientTransSent: string;
	emailSentSenderPaidTrans: string;
	emailSentRecipientPaidTrans: string;
	smsSentSenderTransSent: string;
	smsSentRecipientTransSent: string;
	smsSentSenderPaidTrans: string;
	smsSentRecipientPaidTrans: string;
	refundTransaction: string;
	zone: string;
	dcuAccountingGroup: string;
	downloaded: string;
	cardNumber: string;
	void: string;
	fixCustomerToBill: string;
	percCustomerToBill: string;
	fixCompanyToBill: string;
	percCompanyToBill: string;
	cancelledCounter: string;
	activeCounter: string;
	rejected: string;
	rejectedDate: string;
	idSenderRequired: string;
	prerefundId: string;
	agencyForex: string;
	companyForex: string;
	codeOri: string;
	requiredBsa: string;
	reviewedBsa: string;
	swSent: string;
	mtn: string;
	payeeBackup: string;
	swCancellationSent: string;
	bancomerTransmissionError: string;
	omnexMtn: string;
	retainTransaction: string;
	masterFeeAgentId: string;
	forMonthlyClosing: string;
	agencyClosingMonthly: string;
	escrowStatus: string;
	escrowDate: string;
	reason: string;
	service: string;
	originalId: string;
	omnexAgentMtn: string;
	onlineType: string;
	temp1: string;
	cancellationReversed: string;
	id3: string;
	fraudDetected: string;
	agencyClosingDateAdded: string;
	payeeClosingDateAdded: string;
	resolutionFollowUpDate: string;
	closeResolutionDate: string;
	id4: string;
	paymentReversed: string;
	omnexMtnValidation: string;
	senderAllDocs: string;
	incomingChannel: string;
	icApprovedByAgent: string;
	icApprovedByAgencyUser: string;
	icApprovalDateByAgencyUser: string;
	icApprovedBySystemUser: string;
	icApprovalDateBySystemUser: string;
	hasComplianceFiles: string;
	icApprovedBySystemUserId: string;
	id5: string;
	allowPaymentClosing: string;
	icApprovalStatus: string;
	pendingLocalPaymentApproval: string;
	postponeTransmission: string;
	payeeAccountingGroup: string;
	companyAgency: string;
	possibleFraudReleasedByCashier: string;
	possibleFraudReleasedBySystemUser: string;
	possibleFraudReleasedBySalesRep: string;
	possibleFraudReleasedByCashierDate: string;
	possibleFraudReleasedBySystemUserDate: string;
	possibleFraudReleasedBySalesRepDate: string;
	possibleFraud: string;
	countryOrigination: string;
	lexisNexisChecked: string;
	lexisNexisProcessed: string;
	requiresSenderId: string;
	lexisNexisSenderMatched: string;
	lexisNexisRecipientMatched: string;
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
	redPhoneRequiresId: string;
	sentToCompass: string;
	typeTransNoPayer: string;
	transNoPayerSent: string;
	escrowRegisteredBy: string;
	lexisNexisAutoreleased: string;
	refundedCustomer: string;
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
	appId: string;
	idUsr: string;
	usrType: string;
	paymentG: {
		identityCode: string;
		payee: string;
		payeeCashier: string;
		recipient: string;
		recipientIdType: string;
		recipientIdNumber: string;
		date: string;
		dateActual: string;
		systemUser: string;
		confirmationSent: string;
		paymentMode: string;
	};
}

export interface Sender {
	code: string;
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
	codeCountry: string;
	country: string;
	codeState: string;
	state: string;
	codeCity: string;
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
	gender: string | null;
	idFile: string | null;
	doc1: string | null;
	doc2: string | null;
	doc3: string | null;
	codeOrus: string | null;
	agencyGe: string | null;
	codeGe: string | null;
	readyToDelete: boolean;
	replacedBy: string | null;
	idStorageLocation1: string | null;
	idStorageLocation2: string | null;
	idStorageLocation3: string | null;
	agencyTemp: string | null;
	smsPhoneNumber: string | null;
	alternativeCode: string | null;
	sendSms: string | null;
	status: string | null;
	mname2: string;
	slname2: string;
	occupation: string;
	ssn: string;
	visible: boolean;
	backupCode: string | null;
	creationDate: string;
	allowSms: boolean;
	typeId2: string;
	enabled: boolean;
	deleted: boolean;
	mergedTo: string | null;
	mergedBy: string | null;
	mergeDate: string;
	numberId2: string;
	cristian: string | null;
	employerName: string;
	employerAddress: string;
	employerPhone1: string;
	personOfContact: string;
	omnexCode: string | null;
	idNumberEnc: string;
	sentToCompass: string | null;
	ssnSentToCompass: string | null;
	customer: string | null;
	numberId: string;
	appId: number;
	idUsr: string | null;
	usrType: string | null;
}

export interface Recipient {
	code: string;
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
	gender: string | null;
	brasilianId: string;
	codeOrus: string | null;
	agencyGe: string | null;
	identityCode: string | null;
	accountNumber: string | null;
	bankName: string | null;
	accountType: string | null;
	readyToDelete: boolean;
	newipient: any | null;
	previousSender: any | null;
	smsPhoneNumber: string | null;
	alternativeCode: string | null;
	sendSms: boolean;
	address2: string | null;
	status: string | null;
	fnameBackup: string | null;
	mname2: string;
	slname2: string;
	cityName: string | null;
	creationDate: string;
	bankAccount: string;
	bank: string;
	relationship: string;
	senderCristian: string | null;
	cristian: string | null;
	nationality: string;
	birthDate: string | null;
	omnexCode: string | null;
	idPath: string | null;
	typeId: string;
	sentToCompass: string | null;
	ofacReleased: boolean;
	customer: any | null;
	appId: string;
	idUsr: string | null;
	usrType: string | null;
}

export interface SelectInvoiceResponse extends GeneralResponse {
	data: InvoiceReponse[];
}

export interface SenderResponse extends GeneralResponse {
	data: Sender[];
}

export interface RecipientResponse extends GeneralResponse {
	data: Recipient[];
}
export interface AgencyStatusResponse extends GeneralResponse {
	data: Agency[];
}
export interface Agency {
	code: string;
	name: string;
	appId: number;
	idUsr: string;
	usrType: string;
}

export const getInvoiceId = async (
	inV_CODE: number | undefined,
	resultHandler: (response: SelectInvoiceResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<SelectInvoiceResponse>(
		'Invoice/api/Invoice/' + inV_CODE,
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);

export const getSenderId = async (
	inV_CODE: number | undefined,
	resultHandler: (response: SenderResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<SenderResponse>(
		'Sender/api/Sender/' + inV_CODE,
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);

export const getRecipientId = async (
	inV_CODE: number | undefined,
	resultHandler: (response: RecipientResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<RecipientResponse>(
		'Recipient/api/Recipient/' + inV_CODE,
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);

export const getBankAccountType = async (
	type_code: string | undefined,
	resultHandler: (response: AgencyStatusResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<AgencyStatusResponse>(
		'Bank/api/BankAccountType/' + type_code,
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);

export const getTypeidentification = async (
	type_code: string | undefined,
	resultHandler: (response: AgencyStatusResponse) => void,
	errorHandler: ErrorHandler,
) =>
	myFetch<AgencyStatusResponse>(
		'Catalogs/api/TypeIdentification/' + type_code,
		'',
		resultHandler,
		errorHandler,
		HttpMethod.GET,
	);
