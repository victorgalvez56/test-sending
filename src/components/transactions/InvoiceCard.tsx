import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormGroup from '../bootstrap/forms/FormGroup';
import Label from '../bootstrap/forms/Label';
import Input from '../bootstrap/forms/Input';
import Select2 from '../bootstrap/forms/Select';
import Button, { ButtonGroup } from '../bootstrap/Button';
import { ListsSelect } from '../../services/TransactionsService';
import ReactSelect from 'react-select';
import { colourStyles } from '../../helpers/helpers';
import {
	BranchPayees,
	Currencies,
	Fee,
	GetAllPaymentModeByCity,
	GetBranchbyInvoice,
	GetPayeeBranch,
	GetRate,
	Getfee,
	Invoice,
	Payees,
	Payments,
	Reasons,
	SearchInvoice,
	getCurrenciesByCode,
	getCurrenciesByCountry,
	getInvoiceByCode,
	getPaymentByCode,
} from '../../services/NewTransactionService';
import { useEffect, useState } from 'react';
import { getSession } from '../../services/AuthService';
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle } from '../bootstrap/Modal';
import { useTransactionSweet } from '../../contexts/transactionContext';
import { PreReceipt } from './PreReceipt';
import { PosPreReceipt } from './PosPreReceipt';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
} from '../bootstrap/Card';
import ReceiptOnePage from './ReceiptOnePage';
import PropTypes from 'prop-types';
interface InvoiceCardProps {
	bankAccountingTypeList: ListsSelect[];
	serviceList: ListsSelect[];
	setSelectedTab: any;
	setTabValidity: any;
}

export const InvoiceCard: React.FC<InvoiceCardProps> = ({
	bankAccountingTypeList,
	serviceList,
	setSelectedTab,
	setTabValidity,
}) => {
	const userSession = getSession();
	const [paymentList, setPaymentList] = useState<ListsSelect[]>([]);
	const [currenciesList, setCurrenciesList] = useState<ListsSelect[]>([]);
	const [payeesList, setPayeesList] = useState<Payees[]>([]);
	const [feeList, setFeeList] = useState<Fee>();
	const [payeesBranchList, setPayeesBranchList] = useState<BranchPayees[]>([]);
	const [isOpenBranch, setIsOpenBranch] = useState<boolean>(false);
	const [isOpenPayee, setIsOpenPayee] = useState<boolean>(false);
	const [isOpenAlert, setIsOpenAlert] = useState<boolean>(false);
	const [isOpenInvoice, setIsOpenInvoice] = useState<boolean>(false);
	const [isOpenHelp, setIsOpenHelp] = useState<boolean>(false);
	const [isOpenReceipt, setIsOpenReceipt] = useState<boolean>(false);
	const [isPrint, setIsPrint] = useState<boolean>(false);
	const [selectedCurrency, setSelectedCurrency] = useState<ListsSelect>();
	const [selectedPayment, setSelectedPayment] = useState<ListsSelect>();
	const [selectedPayee, setSelectedPayee] = useState<undefined | string>('');
	const [selectedRate, setSelectedRate] = useState<undefined | string>('');
	const [selectedBranch, setSelectedBranch] = useState<undefined | string>('');
	const [focus, setFocus] = useState<boolean>(false);
	const [invoiceInfo, setinvoiceInfo] = useState<SearchInvoice>();
	const [preReceiptType, setPreReceiptType] = useState<number>(0);
	const [
		{
			invoiceCountry,
			invoiceCity,
			recipientInformation,
			senderInformation,
			invoiceInformation,
		},
	] = useTransactionSweet();

	useEffect(() => {
		setPreReceiptType(userSession.preReceiptType);
		if (invoiceCountry && invoiceCity) {
			setFocus(true);
			getCurrenciesByCountry(
				invoiceCountry,
				(response) => {
					const list = response.data.reduce(
						(acc: any, currency: Currencies, index: number) => {
							const { name, code } = currency;
							acc[index] = {
								value: code,
								label: name,
								isFixed: true,
							};
							return acc;
						},
						[],
					);
					setCurrenciesList(list);
				},
				() => {},
			);
			GetAllPaymentModeByCity(
				localStorage.getItem('cityRecipient'),
				(response) => {
					const list = response.data.reduce(
						(acc: any, payment: Payments, index: number) => {
							const { name, code } = payment;
							acc[index] = {
								value: code,
								label: name,
								isFixed: true,
							};
							return acc;
						},
						[],
					);
					setPaymentList(list);
				},
				() => {},
			);
		}
	}, [invoiceCountry, invoiceCity]);

	useEffect(() => {
		if (invoiceInformation) {
			setSelectedBranch(invoiceInformation.invPayee);
			getCurrenciesByCode(
				invoiceInformation.invCurDestination,
				(response) => {
					setSelectedCurrency({
						value: response.data[0].code,
						label: response.data[0].name,
						isFixed: true,
					});
				},
				() => {},
			);
			getPaymentByCode(
				invoiceInformation.invPaymentMode,
				(response) => {
					setSelectedPayment({
						value: response.data[0].code,
						label: response.data[0].name,
						isFixed: true,
					});
				},
				() => {},
			);
			GetRate(
				{
					CodeCountryOrigin: localStorage.getItem('countryOrigin'),
					CodeCurrencyOrigin: userSession.currencyOrigin,
					CodeCountryDestination: localStorage.getItem('countryRecipient'),
					CodeCurrencyDestination: invoiceInformation.invCurDestination,
					CodeAgency: userSession.user.agency,
					CodePayee: invoiceInformation.invPayee,
					CodeStateOrigin: localStorage.getItem('stateOrigin'),
					CodeRateType: formik.values.service,
					CodePMo: invoiceInformation.invPaymentMode,
				},
				(res) => {
					setSelectedRate(res.data[0].rate);
					formik.setFieldValue('exchangeRate', res.data[0].rate);
				},
				() => {},
			);
		}
	}, [invoiceInformation]);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			currency: invoiceInformation ? invoiceInformation.invCurDestination : '',
			service: 'E',
			netAmount: 0,
			exchangeRate: '0',
			paymentMode: invoiceInformation ? invoiceInformation.invPaymentMode : '',
			fees: '',
			totalToPay: '',
			bankName: invoiceInformation ? invoiceInformation.invBankName : '',
			handling: 0,
			forexProfit: '',
			bankBranch: invoiceInformation ? invoiceInformation.invBankBranch : '',
			total: '',
			folioPinNumber: '',
			bankAccountNumber: invoiceInformation ? invoiceInformation.invBankAccountNumber : '',
			bankAccountType: invoiceInformation ? invoiceInformation.invBankAccountType : '',
			agentFee: '',
		},
		validationSchema: Yup.object({
			netAmount: Yup.number().min(1, 'Too Short!').required('Required'),
		}),
		onSubmit: (values, { resetForm }) => {
			setIsOpenInvoice(true);
		},
	});

	const handleSelectChange = (selectedOption: ListsSelect, typeSearch: string) => {
		setPayeesList([]);
		switch (typeSearch) {
			case 'currency':
				if (selectedOption) {
					let findCurrency = currenciesList.find(
						(currency: ListsSelect) => currency.value == selectedOption.value,
					);
					if (findCurrency) {
						formik.setFieldValue('currency', findCurrency.label);
						setSelectedCurrency({
							value: findCurrency.value.toString(),
							label: findCurrency.label,
							isFixed: true,
						});
					}
				} else {
					formik.setFieldValue('currency', '');
				}
				break;
			case 'state':
				if (selectedOption) {
					let findService = serviceList.find(
						(service: ListsSelect) => service.value == selectedOption.value,
					);
					if (findService) {
						formik.setFieldValue('service', findService.label);
					}
				} else {
					formik.setFieldValue('service', '');
				}
				break;
			case 'paymentMode':
				if (selectedOption) {
					let findPayment = paymentList.find(
						(service: ListsSelect) => service.value == selectedOption.value,
					);
					if (findPayment) {
						formik.setFieldValue('paymentMode', findPayment.value);
						setSelectedPayment({
							value: findPayment.value.toString(),
							label: findPayment.label,
							isFixed: true,
						});
						var arr: Payees[] = [];
						GetBranchbyInvoice(
							{
								pmCode: findPayment.value,
								CodeCur: selectedCurrency?.value,
								codeCountry: localStorage.getItem('countryRecipient'),
								codeCity: localStorage.getItem('cityRecipient'),
								codeCompany:
									userSession.user.company === 'A'
										? 'ECH'
										: userSession.user.company,
								codeAgency: userSession.user.agency,
							},
							(response) => {
								response.data.map((item: Payees, index: any) =>
									GetRate(
										{
											CodeCountryOrigin:
												localStorage.getItem('countryOrigin'),
											CodeCurrencyOrigin: userSession.currencyOrigin,
											CodeCountryDestination:
												localStorage.getItem('countryRecipient'),
											CodeCurrencyDestination: selectedCurrency?.value,
											CodeAgency: userSession.user.agency,
											CodePayee: item.codeBranch,
											CodeStateOrigin: localStorage.getItem('stateOrigin'),
											CodeRateType: formik.values.service,
											CodePMo: findPayment?.value,
										},
										(res) => {
											arr.push({
												...item,
												rate: res.data[0].rate,
											});
										},
										() => {},
									),
								);
								setPayeesList(arr);
								setTimeout(() => {
									setIsOpenBranch(false);
									setIsOpenPayee(true);
								}, 3000);
							},
							() => {},
						);
					}
				} else {
					formik.setFieldValue('paymentMode', '');
				}
				break;
			case 'nationality':
				break;
		}
	};

	const takeBranch = (payee: Payees) => {
		setSelectedPayee(payee.code);
		setSelectedRate(payee.rate);
		GetPayeeBranch(
			{
				pmoCode: selectedPayment?.value,
				CodeCur: selectedCurrency?.value,
				codeCountry: localStorage.getItem('countryRecipient'),
				codeCity: localStorage.getItem('cityRecipient'),
				codeCompany: userSession.user.company === 'A' ? 'ECH' : userSession.user.company,
				codeMainDis: payee.code,
			},
			(response) => {
				setPayeesBranchList(response.data);
				setIsOpenBranch(true);
			},
			() => {},
		);
	};

	const takePayee = (branchPayees: BranchPayees) => {
		setSelectedBranch(branchPayees.disCode);
		setIsOpenPayee(false);
		setIsOpenBranch(false);
	};

	const findFee = (amount: string) => {
		formik.setFieldValue('netAmount', amount);
		Getfee(
			{
				Amount: amount,
				CodeCountryOrigin: localStorage.getItem('countryOrigin'),
				CodeCurrencyOrigin: userSession.currencyOrigin,
				CodeCountryDestination: localStorage.getItem('countryRecipient'),
				CodeCurrencyDestination: selectedCurrency?.value,
				CodeAgency: userSession.user.agency,
				CodePayee: selectedBranch,
				CodeService: formik.values.service,
				CodePMo: selectedPayment?.value,
				CodeState: localStorage.getItem('stateOrigin'),
			},
			(response) => {
				setFeeList(response.data[0]);
				if (response.data[0].feeFound === 'Y') {
					calculations(response.data[0], amount);
				} else {
					formik.resetForm();
					setIsOpenAlert(true);
				}
			},
			() => {},
		);
	};

	const calculations = (fees: Fee, amount: string) => {
		formik.setFieldValue('netAmount', Number(amount).toFixed(2));

		let FeeCustomer = (Number(amount) * fees.percCustomer + fees.fixCustomer).toFixed(2);
		formik.setFieldValue('fees', FeeCustomer);

		let FeeCompany = (Number(amount) * fees.percCompany + fees.fixCompany).toFixed(2);

		formik.setFieldValue('exchangeRate', selectedRate);

		let totalToPay = (Number(amount) * Number(selectedRate)).toFixed(2);
		formik.setFieldValue('totalToPay', totalToPay);

		let TOTAL = Number(
			Number(amount) + Number(FeeCustomer) + Number(formik.values.handling),
		).toFixed(2);
		formik.setFieldValue('total', TOTAL);
	};

	const calculationsHandling = (fees: Fee | undefined, handling: string) => {
		formik.setFieldValue('handling', Number(handling).toFixed(2));
		if (fees) {
			let FeeCustomer = (
				Number(formik.values.netAmount) * fees.percCustomer +
				fees.fixCustomer
			).toFixed(2);
			formik.setFieldValue('fees', FeeCustomer);

			let FeeCompany = Number(formik.values.netAmount) * fees.percCompany + fees.fixCompany;

			formik.setFieldValue('exchangeRate', selectedRate);

			let totalToPay = (Number(formik.values.netAmount) * Number(selectedRate)).toFixed(2);
			formik.setFieldValue('totalToPay', totalToPay);

			let TOTAL = Number(
				Number(formik.values.netAmount) + Number(FeeCustomer) + Number(handling),
			).toFixed(2);
			formik.setFieldValue('total', TOTAL);
		}
	};

	const handlePrint = () => {
		const content = document.getElementById('modalContent');
		if (content) {
			const printWindow = window.open('', '_blank');
			if (printWindow) {
				printWindow.document.write(content.innerHTML);
				printWindow.document.close();
				printWindow.print();
			}
		}
		setIsPrint(true);
	};

	const save = () => {
		Invoice(
			{
				autogeninvno: 1,
				invoiceg: {
					invcode: 0,
					invagency: userSession.user.agency,
					invcashier: userSession.user.identityCode,
					invpayee: selectedBranch ? selectedBranch : '',
					invpaymentmode: selectedPayment ? selectedPayment.value : '',
					invcurorigin: userSession.currencyOrigin,
					invcurdestination: selectedCurrency ? selectedCurrency.value : '',
					invcountryorigin: localStorage.getItem('countryOrigin'),
					invcountrydestination: localStorage.getItem('countryRecipient'),
					invcitydestination: localStorage.getItem('cityRecipient'),
					invamount: Number(formik.values.netAmount),
					invfee: Number(formik.values.fees),
					invhandling: formik.values.handling,
					invexchangerate: Number(formik.values.exchangeRate),
					invtotalreceived: Number(formik.values.totalToPay),
					invfixcompany: Number(feeList?.fixCompany),
					invfixcustomer: Number(feeList?.fixCustomer),
					invperccompany: Number(feeList?.percCompany),
					invperccustomer: Number(feeList?.percCustomer),
					invmincompany: Number(feeList?.minCompany),
					invmincustomer: Number(feeList?.minCustomer),
					invbankname: formik.values.bankName,
					invbankbranch: formik.values.bankBranch,
					invbankaccounttype: formik.values.bankAccountType,
					invbankaccountnumber: formik.values.bankAccountNumber,
					invtotal: Number(formik.values.total),
					invmessage: '',
					invbankcode: '',
					invbankbranchcode: '',
					invrateservicetype: formik.values.service,
					invagencysettlementrate: 0,
					invreason: '',
					invrequiredbsa: true,
					invcountryorigination: localStorage.getItem('countryOrigin'),
					invonlinetype: 'W',
					invincomingchannel: 'A',
					inviD1: '',
					invfolio: '1234567890',
				},
				senderg: {
					sencode: senderInformation.code,
					senfname: senderInformation.fname,
					senmname: senderInformation.mname,
					senlname: senderInformation.lname,
					sensname: senderInformation.slname2,
					senaddress: senderInformation.address,
					senphonE1: senderInformation.phone1,
					senconfirmemail: senderInformation.confirmEmail,
					senemail: senderInformation.email,
					senzipcode: senderInformation.zipcode,
					sencountry: senderInformation.codeCountry,
					senstate: senderInformation.codeState,
					sencityname: senderInformation.cityname,
					sennationality: senderInformation.nationality,
					senbirthdate: new Date(senderInformation.birthDate).toISOString().slice(0, 10),
					senexpdate: new Date(senderInformation.expDateId).toISOString().slice(0, 10),
					sentypeid: senderInformation.typeId,
					sennumberid: senderInformation.numberId,
					sencountryres: senderInformation.countryResidence,
					senutilitybill: senderInformation.utilityBill,
					senstatename: senderInformation.stateName,
					senoccupation: senderInformation.occupation,
					senidissuedate: new Date().toISOString().slice(0, 10),
					senissueby: senderInformation.placeIssueId,
					senphotoidpath: '',
					senkeygen: '',
					senidentityid: '0',
					senallowsms: senderInformation.allowSms,
					sentypeiD2: senderInformation.typeId2,
					sennumberiD2: senderInformation.numberId2,
					senemployername: senderInformation.employerName,
					senemployeraddress: senderInformation.employerAddress,
					senemployerphonE1: senderInformation.employerPhone1,
					senpersonofcontact: senderInformation.personOfContact,
				},
				recipientg: {
					reccode: recipientInformation.code,
					recfname: recipientInformation.fname,
					recmname: recipientInformation.mname,
					reclname: recipientInformation.lname,
					recsname: recipientInformation.slname2,
					recaddress: recipientInformation.address,
					recphonE1: recipientInformation.phone1,
					recconfirmemail: recipientInformation.confirmEmail,
					recemail: recipientInformation.email,
					reczipcode: recipientInformation.zipcode,
					reccountry: recipientInformation.codeCountry,
					recstate: recipientInformation.codeState,
					reccity: recipientInformation.codeCity,
					recidnumber: recipientInformation.identityCode,
					recsendsms: recipientInformation.sendSms,
					recrelationship: recipientInformation.relationship,
					recbirthdate: recipientInformation.birthDate,
					recnationality: recipientInformation.nationality,
					rectypeid: recipientInformation.typeId,
					reccityname: recipientInformation.city,
				},
			},
			(response) => {
				setIsPrint(false);
				setIsOpenInvoice(false);
				getInvoiceByCode(
					response.data[0].identityCode,
					(res) => {
						setinvoiceInfo(res.data[0]);
						setIsOpenReceipt(true);
						setIsOpenInvoice(false);
						console.error('SEARCH INVOICE', res);
					},
					() => {},
				);
			},
			(error) => {},
		);
	};

	return (
		<div className='p-4'>
			<div className='row'>
				<div className='col-10'>
					<div className='row mb-4 p-2' style={{ backgroundColor: 'ButtonFace' }}>
						<div className='col-md-3'>
							<p className='lead mb-0 mt-2 mx-2'>Invoice Information</p>
						</div>
						<div className='col-md-3'></div>
						<div className='col-md-3'>
							<p className='lead mb-0 mt-2 mx-2'>Payee: {selectedPayee}</p>
						</div>
					</div>
					<div className='row mt-2'>
						<div className='col-md-4'>
							<FormGroup id='currency' className={'row'}>
								<Label className='col-sm-5' isColForLabel>
									Currency
								</Label>
								<div className='col-sm-7'>
									<ReactSelect
										autoFocus={focus}
										styles={colourStyles}
										isDisabled={false}
										isRtl={false}
										name='color'
										options={currenciesList}
										value={selectedCurrency}
										onChange={(value) => {
											handleSelectChange(value, 'currency');
										}}
										onInputChange={(value) => {
											formik.setFieldValue('currency', value);
										}}
										isClearable
										isSearchable
										tabIndex={49}
									/>
								</div>
							</FormGroup>
						</div>
						<div className='col-md-4'>
							<FormGroup className={'row'} id='netAmount'>
								<Label className='col-sm-5' isColForLabel>
									Net Amount
								</Label>
								<div className='col-sm-7'>
									<Input
										onChange={(e: { target: { value: string } }) => {
											findFee(e.target.value);
										}}
										onBlur={formik.handleBlur}
										value={formik.values.netAmount}
										isValid={formik.isValid}
										isTouched={formik.touched.netAmount}
										invalidFeedback={formik.errors.netAmount}
										validFeedback='Looks good!'
										tabIndex={50}
									/>
								</div>
							</FormGroup>
						</div>
						<div className='col-md-4'>
							<FormGroup className={'row'} id='exchangeRate'>
								<Label className='col-sm-5' isColForLabel>
									Exchange Rate
								</Label>
								<div className='col-sm-7'>
									<Input
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.exchangeRate}
										isValid={formik.isValid}
										isTouched={formik.touched.exchangeRate}
										invalidFeedback={formik.errors.exchangeRate}
										validFeedback='Looks good!'
										tabIndex={51}
										disabled
									/>
								</div>
							</FormGroup>
						</div>
					</div>
					<div className='row mt-2'>
						<div className='col-md-4'>
							<FormGroup className={'row'} id='service'>
								<Label className='col-sm-5' isColForLabel>
									Service
								</Label>
								<div className='col-sm-7'>
									<Select2
										ariaLabel='Service'
										placeholder='Choose...'
										list={serviceList}
										onChange={formik.handleChange('service')}
										onBlur={formik.handleBlur}
										value={formik.values.service}
										defaultValue={formik.values.service}
										isValid={formik.isValid}
										isTouched={formik.touched.service}
										invalidFeedback={formik.errors.service}
										tabIndex={52}
									/>
								</div>
							</FormGroup>
						</div>
						<div className='col-md-4'>
							<FormGroup className={'row'} id='fees'>
								<Label className='col-sm-5' isColForLabel>
									Fees
								</Label>
								<div className='col-sm-7'>
									<Input
										onChange={formik.handleChange('fee')}
										onBlur={formik.handleBlur}
										value={formik.values.fees}
										isValid={formik.isValid}
										isTouched={formik.touched.fees}
										invalidFeedback={formik.errors.fees}
										validFeedback='Looks good!'
										tabIndex={53}
									/>
								</div>
							</FormGroup>
						</div>
						<div className='col-md-4'>
							<FormGroup className={'row'} id='totalToPay'>
								<Label className='col-sm-5' isColForLabel>
									Total to pay
								</Label>
								<div className='col-sm-7'>
									<Input
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.totalToPay}
										isValid={formik.isValid}
										isTouched={formik.touched.totalToPay}
										invalidFeedback={formik.errors.totalToPay}
										validFeedback='Looks good!'
										tabIndex={54}
									/>
								</div>
							</FormGroup>
						</div>
					</div>
					<div className='row mt-2'>
						<div className='col-md-4'>
							<FormGroup className={'row'} id='paymentMode'>
								<Label className='col-sm-5' isColForLabel>
									Payment Mode
								</Label>
								<div className='col-sm-7'>
									<ReactSelect
										styles={colourStyles}
										isDisabled={false}
										isRtl={false}
										name='color'
										options={paymentList}
										value={selectedPayment}
										onChange={(value) => {
											handleSelectChange(value, 'paymentMode');
										}}
										onInputChange={(value) => {
											formik.setFieldValue('paymentMode', value);
										}}
										isClearable
										isSearchable
										tabIndex={55}
									/>
								</div>
							</FormGroup>
						</div>
						<div className='col-md-4'>
							<FormGroup className={'row'} id='handling'>
								<Label className='col-sm-5' isColForLabel>
									Handling
								</Label>
								<div className='col-sm-7'>
									<Input
										onChange={(e: { target: { value: string } }) => {
											calculationsHandling(feeList, e.target.value);
										}}
										onBlur={formik.handleBlur}
										value={formik.values.handling}
										isValid={formik.isValid}
										isTouched={formik.touched.handling}
										invalidFeedback={formik.errors.handling}
										validFeedback='Looks good!'
										tabIndex={56}
									/>
								</div>
							</FormGroup>
						</div>
						<div className='col-md-4'>
							<FormGroup id='invoice-number' label='Forex Profit'>
								<p className='lead mb-0 mt-2 mx-2 text-center'></p>
							</FormGroup>
						</div>
					</div>
					<div className='row mt-2'>
						<div className='col-md-4'>
							<FormGroup className={'row'} id='bankName'>
								<Label className='col-sm-5' isColForLabel>
									Bank Name
								</Label>
								<div className='col-sm-7'>
									<Input
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.bankName}
										isValid={formik.isValid}
										isTouched={formik.touched.bankName}
										invalidFeedback={formik.errors.bankName}
										validFeedback='Looks good!'
										tabIndex={57}
									/>
								</div>
							</FormGroup>
						</div>
						<div className='col-md-4'>
							<FormGroup className={'row'} id='total'>
								<Label className='col-sm-5' isColForLabel>
									Total
								</Label>
								<div className='col-sm-7'>
									<Input
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.total}
										isValid={formik.isValid}
										isTouched={formik.touched.total}
										invalidFeedback={formik.errors.total}
										validFeedback='Looks good!'
										tabIndex={58}
									/>
								</div>
							</FormGroup>
						</div>
						<div className='col-md-4'>
							<FormGroup className={'row'} id='folioPinNumber'>
								<Label className='col-sm-5' isColForLabel>
									Folio/Pin Number
								</Label>
								<div className='col-sm-7'>
									<Input
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.folioPinNumber}
										isValid={formik.isValid}
										isTouched={formik.touched.folioPinNumber}
										invalidFeedback={formik.errors.folioPinNumber}
										validFeedback='Looks good!'
										tabIndex={59}
									/>
								</div>
							</FormGroup>
						</div>
					</div>
					<div className='row mt-2 mb-4'>
						<div className='col-md-4'>
							<FormGroup className={'row'} id='bankBranch'>
								<Label className='col-sm-5' isColForLabel>
									Bank Branch
								</Label>
								<div className='col-sm-7'>
									<Input
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.bankBranch}
										isValid={formik.isValid}
										isTouched={formik.touched.bankBranch}
										invalidFeedback={formik.errors.bankBranch}
										validFeedback='Looks good!'
										tabIndex={60}
									/>
								</div>
							</FormGroup>
						</div>
						<div className='col-md-4'>
							<FormGroup id='agent-fee'>
								<p className='lead mb-0 mt-2 mx-2 text-center'></p>
							</FormGroup>
						</div>
						<div className='col-md-4'>
							<FormGroup id='agent-fee' label='Agent Fee'>
								<p className='lead mb-0 mt-2 mx-2 text-center'></p>
							</FormGroup>
						</div>
					</div>
					<div className='row mt-2 mb-4'>
						<div className='col-md-4'>
							<FormGroup className={'row'} id='bankAccountType'>
								<Label className='col-sm-5' isColForLabel>
									Bank Account Type
								</Label>
								<div className='col-sm-7'>
									<Select2
										ariaLabel='Bank Account'
										placeholder='Choose...'
										list={bankAccountingTypeList}
										onChange={formik.handleChange('bankAccountType')}
										onBlur={formik.handleBlur}
										value={formik.values.bankAccountType}
										isValid={formik.isValid}
										isTouched={formik.touched.bankAccountType}
										invalidFeedback={formik.errors.bankAccountType}
										tabIndex={61}
									/>
								</div>
							</FormGroup>
						</div>
					</div>
					<div className='row mt-2 mb-4'>
						<div className='col-md-4'>
							<FormGroup className={'row'} id='bankAccountType'>
								<Label className='col-sm-5' isColForLabel>
									Bank Account Number
								</Label>
								<div className='col-sm-7'>
									<Input
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.bankAccountNumber}
										isValid={formik.isValid}
										isTouched={formik.touched.bankAccountNumber}
										invalidFeedback={formik.errors.bankAccountNumber}
										validFeedback='Looks good!'
										tabIndex={62}
									/>
								</div>
							</FormGroup>
						</div>
						<div className='col-md-2'>
							<FormGroup className={'row'}>
								<Button
									onClick={formik.handleSubmit}
									className='w-75'
									color={'primary'}
									size={'sm'}
									rounded={1}
									shadow={'none'}
									hoverShadow={'none'}
									tag={'button'}
									type={'button'}
									tabIndex={63}>
									Save
								</Button>
							</FormGroup>
						</div>
						<div className='col-md-2'>
							<FormGroup className={'row'}>
								<Button
									className='w-75'
									color={'primary'}
									size={'sm'}
									rounded={1}
									shadow={'none'}
									hoverShadow={'none'}
									tag={'button'}
									type={'button'}
									tabIndex={64}
									onClick={() => {
										formik.resetForm();
										setSelectedTab(1);
										setTabValidity([true, false, false]);
									}}>
									New
								</Button>
							</FormGroup>
						</div>
					</div>
				</div>
				<div className='col-2'>
					<Card>
						<CardBody>
							<h6>
								<b>Credit Information</b>
							</h6>
							<p style={{ margin: 0 }}>
								Available/Disponible:{' '}
								{userSession.dataCredit.agencyCredit.toFixed(4)}
							</p>
							<p style={{ margin: 0 }}>
								Limit/Limite: {userSession.dataCredit.agencyLimit.toFixed(4)}
							</p>
							<p style={{ margin: 0 }}>
								Extend Credit:{' '}
								{userSession.dataCredit.agencyExtendeCredit.toFixed(4)}
							</p>
							<p style={{ margin: 0 }}>
								Balance: {userSession.dataCredit.agencyBalance.toFixed(4)}
							</p>
							<hr style={{ marginBottom: 30 }}></hr>
							<Button
								color='info'
								isActive={preReceiptType != 3}
								icon={
									preReceiptType != 3
										? 'radio-button-checked'
										: 'radio-button-unchecked'
								}
								size={'sm'}
								style={{ marginTop: 20, width: '100%' }}
								isLink
								onClick={() => setPreReceiptType(1)}>
								One receipt per page
							</Button>
							<Button
								color='info'
								icon={
									preReceiptType === 3
										? 'radio-button-checked'
										: 'radio-button-unchecked'
								}
								isActive={preReceiptType === 3}
								size={'sm'}
								isLink
								style={{ marginTop: 20, width: '100%' }}
								onClick={() => setPreReceiptType(3)}>
								Pos printer
							</Button>
							<Button
								style={{ marginTop: 20, width: '100%' }}
								color='info'
								icon='help'
								isLight
								size={'lg'}
								onClick={() => setIsOpenHelp(true)}>
								Help
							</Button>
						</CardBody>
					</Card>
				</div>
			</div>
			<Modal
				setIsOpen={setIsOpenPayee}
				size={'xl'}
				isOpen={isOpenPayee}
				titleId='transfer-modal'>
				<ModalHeader setIsOpen={setIsOpenPayee}>
					<ModalTitle id='transfer-modal'>List of Payee's</ModalTitle>
				</ModalHeader>
				<ModalBody className='h-100 d-flex align-items-center'>
					<table className='table w-25 table-hover table-responsive m-2'>
						<thead style={{ height: 80 }}>
							<tr className='table-info align-middle text-center'>
								<th>Payee Name</th>
								<th>Payee Rate</th>
							</tr>
						</thead>
						<tbody className='text-center align-middle'>
							{payeesList.map((item: Payees, index: any) => (
								<tr
									key={index}
									onClick={() => takeBranch(item)}
									style={{ height: 50 }}>
									<td>{item.name}</td>
									<td>{item.rate}</td>
								</tr>
							))}
						</tbody>
					</table>
					{isOpenBranch && (
						<table className='table w-75 table-hover table-responsive m-2'>
							<thead style={{ height: 80 }}>
								<tr className='table-info text-center align-middle'>
									<th>Branch Name</th>
									<th>Address</th>
									<th>City</th>
									<th>Phone</th>
									<th>Payment Limit USD</th>
									<th>Payment Limit National</th>
									<th>Working Hours</th>
								</tr>
							</thead>
							<tbody className='text-center text-break align-middle'>
								{payeesBranchList.map((item: BranchPayees, index: any) => (
									<tr
										key={index}
										onClick={() => takePayee(item)}
										style={{ height: 50 }}>
										<td>{item.disName}</td>
										<td>{item.disAddress}</td>
										<td>{item.disCityName}</td>
										<td>{item.disPhone1}</td>
										<td>{item.dCurPaymentLimitAmount}</td>
										<td>{item.dCurPaymentLimitAmountNatCur}</td>
										<td>{item.disWorkingHours}</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</ModalBody>
			</Modal>
			<Modal
				setIsOpen={setIsOpenAlert}
				size={'lg'}
				isOpen={isOpenAlert}
				titleId='transfer-modal'>
				<ModalHeader setIsOpen={setIsOpenAlert}>
					<ModalTitle id='transfer-modal'>Warning</ModalTitle>
				</ModalHeader>
				<ModalBody className='h-100 d-flex align-items-center'>
					<p>There is no FEE available for the selected currencies</p>
				</ModalBody>
				<ModalFooter>
					<Button color='info' onClick={() => setIsOpenAlert(false)}>
						OK
					</Button>
				</ModalFooter>
			</Modal>
			<Modal
				setIsOpen={setIsOpenInvoice}
				size={'xl'}
				isOpen={isOpenInvoice}
				titleId='transfer-modal'>
				<ModalHeader setIsOpen={setIsOpenInvoice}>
					<ModalTitle id='example-title'>
						{preReceiptType != 3 ? 'One receipt per page' : 'Pos printer'}
					</ModalTitle>
				</ModalHeader>
				<ModalBody className='h-100 d-flex align-items-center'>
					<Card>
						<CardHeader>
							<CardLabel>
								<Button
									color='primary'
									size={'lg'}
									icon='print'
									onClick={() => handlePrint()}
									style={{ marginBottom: 10 }}
								/>
								<CardSubTitle>
									{!isPrint &&
										'Print pre-receipt to continue with the receipt/ Imprimir pre-recibo para continuar con el recibo'}
								</CardSubTitle>
							</CardLabel>
							{isPrint && (
								<CardActions>
									<Button hoverShadow='default' isDisable isLink isLight>
										YOU AGREE AND WISH TO CONTINUE?
									</Button>
									<Button
										color='info'
										hoverShadow='default'
										icon='Save'
										isLight
										onClick={() => save()}>
										YES
									</Button>
									<Button
										color='danger'
										hoverShadow='default'
										icon='cancel'
										isLight
										onClick={() => {
											setIsPrint(false);
											setIsOpenInvoice(false);
										}}>
										NO
									</Button>
								</CardActions>
							)}
						</CardHeader>
						<CardBody id='modalContent'>
							{preReceiptType != 3 ? (
								<PreReceipt
									agency={userSession.user.agency}
									invoiceInfo={formik.values}
									sender={senderInformation}
									recipient={recipientInformation}
									currencyDest={selectedCurrency?.value}
								/>
							) : (
								<PosPreReceipt
									agency={userSession.user.agency}
									invoiceInfo={formik.values}
									sender={senderInformation}
									recipient={recipientInformation}
									currencyDest={selectedCurrency?.value}
								/>
							)}
						</CardBody>
					</Card>
				</ModalBody>
			</Modal>
			<Modal
				setIsOpen={setIsOpenHelp}
				size={'xl'}
				isOpen={isOpenHelp}
				titleId='transfer-modal'>
				<ModalHeader setIsOpen={setIsOpenHelp}>
					<div className='row w-100'>
						<div className='col-12'>
							<img
								width='200'
								height='100'
								src='https://www.choicemoneytransfer.com/newsite/cmtlogo.png'
							/>
						</div>
						<div className='col-12 d-flex justify-content-center align-items-center'>
							<h4 className='m-0'>Welcome to Technical Support</h4>
						</div>
					</div>
				</ModalHeader>
				<ModalBody id='modalContent' className='h-100 d-flex align-items-center'>
					<div className='row'>
						<div className='col-12 d-flex justify-content-center align-items-center'>
							<img
								className='h-50 w-50 d-inline-block'
								src='https://www.choicemoneytransfer.com/newsite/screenconnect.png'
							/>
						</div>
						<div className='col-12 d-flex justify-content-center align-items-center'>
							<p>
								CHOICE MONEY TRANSFER-SW TECHNICIAN ONLY USES SCREEN CONNECT to
								Connect to your computers. Technicians using Teamviewer, Showmypc,
								Any desk or any other tool are NOT FROM CHOICE MONEY TRANSFER. If a
								CHOICE MONEY TRANSFER-SW Technician calls and ask for a Teamviewer,
								Showmypc, Any desk or any other tool different that Screen Connect,
								DO NOT ALLOW IT. HANG UP AND CALL BACK TO TECHNICAL SUPPORT (212)
								2689290 Option 3.
							</p>
						</div>
						<div className='col-12 d-flex justify-content-center align-items-center'>
							<p>
								LOS TÉCNICOS DE CHOICE MONEY TRANSFER-SW SÓLO UTILIZAN SCREEN
								CONNECT para conectarse a sus computadoras. Técnicos que utilizan
								Teamviewer, Showmypc, o Anydesk o cualquier otra herramienta, NO
								PERTENECEN A CHOICE MONEY TRANSFER. Si un técnico de CHOICE MONEY
								TRANSFER-SW llama y pregunta por Teamviewer, Showmypc, Anydesk o
								cualquier otra herramienta diferente a Screen Connect, NO PERMITA
								QUE SE CONECTE, CUELGUE Y LLAME A SOPORTE SERVICIO TÉCNICO AL (212)
								2689290, Opcion 3.
							</p>
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button
						style={{ marginTop: 20, width: '100%' }}
						color='info'
						icon='help'
						isLight
						size={'lg'}
						onClick={() => window.open('https://cmtsw.screenconnect.com/', '_blank')}>
						Download Screen Connect - Descargar Screen Connect
					</Button>
				</ModalFooter>
			</Modal>
			<Modal
				setIsOpen={setIsOpenReceipt}
				size={'xl'}
				isOpen={isOpenReceipt}
				titleId='transfer-modal'>
				<ModalHeader setIsOpen={setIsOpenReceipt}>
					<ModalTitle id='example-title'>Receipt</ModalTitle>
				</ModalHeader>
				<ModalBody className='h-100 d-flex align-items-center'>
					<ReceiptOnePage
						items={invoiceInfo}
						recipient={recipientInformation}
						sender={senderInformation}
					/>
				</ModalBody>
			</Modal>
		</div>
	);
};

InvoiceCard.propTypes = {
	bankAccountingTypeList: PropTypes.array.isRequired,
	serviceList: PropTypes.array.isRequired,
	setSelectedTab: PropTypes.any.isRequired,
	setTabValidity: PropTypes.any.isRequired,
};

export default InvoiceCard;
