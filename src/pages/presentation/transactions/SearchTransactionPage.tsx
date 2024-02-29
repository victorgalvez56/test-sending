import { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Moment } from 'moment';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { demoPagesMenu } from '../../../menu';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Spinner from '../../../components/bootstrap/Spinner';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Select, { StylesConfig } from 'react-select';
import {
	Search,
	Sender,
	SenderResponse,
	getAllInvoiceSearch,
	getSenders,
} from '../../../services/TransactionsService';
import * as Yup from 'yup';
import { PER_COUNT, dataPagination } from '../../../components/PaginationButtons';
import { Link } from 'react-router-dom';

interface ITableRowProps {
	inv: string;
	inV_AMOUNT: string;
	inV_DATE: string;
	seN_NAME: string;
	reC_NAME: string;
	inV_REFERENCE: string;
	folio: string;
	seN_ADDRESS: string;
	seN_PHONE: string;
	reC_PHONE: string;
	reC_ADDRESS: string;
	inV_BANK_NAME: string;
	inV_BANK_BRANCH: string;
	inV_BANK_ACCOUNT_NUMBER: string;
	isT_NAME: string;
	mtn: string;
	crE_STATUS: string;
	pmO_NAME: string;
	inV_TOTAL_RECEIVED: string;
	Bat_name: string;
	inV_CODE: number;
}
const TableRow: FC<ITableRowProps> = ({
	inv,
	inV_AMOUNT,
	inV_DATE,
	seN_NAME,
	reC_NAME,
	inV_REFERENCE,
	folio,
	seN_ADDRESS,
	seN_PHONE,
	reC_PHONE,
	reC_ADDRESS,
	inV_BANK_NAME,
	inV_BANK_BRANCH,
	inV_BANK_ACCOUNT_NUMBER,
	isT_NAME,
	mtn,
	crE_STATUS,
	pmO_NAME,
	inV_TOTAL_RECEIVED,
	Bat_name,
	inV_CODE,
}) => {
	return (
		<tr>
			<Link
				to={{ pathname: '/InvoiceTransaction', search: `?invoiceCode=${inV_CODE}` }}
				style={{ display: 'contents' }}>
				<th scope='row'>{inv}</th>
				<th scope='row'>{Number(inV_AMOUNT).toFixed(2)}</th>
				<th scope='row'>{inV_DATE}</th>
				<th scope='row'>{isT_NAME}</th>
				<th scope='row'>{seN_NAME}</th>
				<th scope='row'>{reC_NAME}</th>
				<th scope='row'>{}</th>
				<th scope='row'>{inV_REFERENCE}</th>
				<th scope='row'>{folio}</th>
				<th scope='row'>{mtn}</th>
				<th scope='row'>{pmO_NAME}</th>
				<th scope='row'>{seN_PHONE}</th>
				<th scope='row'>{crE_STATUS}</th>
				<th scope='row'>{seN_ADDRESS}</th>
				<th scope='row'>{reC_PHONE}</th>
				<th scope='row'>{reC_ADDRESS}</th>
				<th scope='row'>{inV_BANK_NAME}</th>
				<th scope='row'>{inV_BANK_BRANCH}</th>
				<th scope='row'>{inV_BANK_ACCOUNT_NUMBER}</th>
				<th scope='row'>{Bat_name}</th>
				<th scope='row'>{inV_TOTAL_RECEIVED}</th>
			</Link>
		</tr>
	);
};
const cellStyle = {
	//border: '1px solid black',
	padding: '5px',
	width: '16.66%',
};
const SearchTransactionPage = () => {
	/**
	 * Common
	 */
	const [lastSave, setLastSave] = useState<Moment | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [sendersList, setSendersList] = useState<Sender[]>([]);
	const [senders, setSenders] = useState<Sender[]>([]);
	const [invoicesList, setInvoicesList] = useState<any[]>([]);

	const handleGetSenders = (text: string) => {
		formik.setFieldValue('fname', text || '');
		setIsLoading(false);
		getSenders(
			text,
			(response: SenderResponse) => {
				const list = response.data.reduce((acc: any, sender: Sender, index: number) => {
					const { name, code } = sender;
					acc[index] = {
						value: code,
						label: name,
						isFixed: true,
					};
					return acc;
				}, []);
				setSenders(response.data);
				setSendersList(list);
			},
			() => {},
		);
	};

	const formik = useFormik<Search>({
		enableReinitialize: true,
		initialValues: {
			payee: 0,
			invNo: '',
			payeeBranch: '',
			folio: '',
			fecInicio: '01-23-2023',
			fecFin: '02-23-2023',
			status: '',
			senderG: {
				fName: '',
				midName: '',
				lName: '',
				slName: '',
				phone: '',
			},
			recipientG: {
				fName: '',
				midName: '',
				lName: '',
				slName: '',
				phone: '',
			},
		},
		validationSchema: Yup.object({
			// agentCode: Yup.string().required('Required'),
			// login: Yup.string().required('Required'),
			// password: Yup.string().required('Required'),
		}),
		validateOnChange: false,
		onSubmit: (values, { resetForm }) => {
			getAllInvoiceSearch(
				values,
				(response: any) => {
					console.warn(response);
					setInvoicesList(response.data);
				},
				() => {},
			);
		},
	});
	useEffect(() => {
		return () => {
			handleGetAllInvoiceSearch();
		};
	},[] );

	const handleGetAllInvoiceSearch = () => {
		getAllInvoiceSearch(
			formik.values,
			(response: any) => {
				console.warn(response);
				setInvoicesList(response.data);
			},
			() => {},
		);
	};
	const dot = (color = '#f8f9fa') => ({
		alignItems: 'center',
		display: 'flex',
		':before': {
			content: '" "',
			height: 10,
			width: 10,
		},
	});

	const colourStyles: StylesConfig<any> = {
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

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['3']);
	return (
		<PageWrapper title={demoPagesMenu.editPages.subMenu.editModern.text}>
			<div className='row h-100'>
				<div className='col-md-6'>
					<Card>
						<CardHeader className='pb-0'>
							<CardLabel icon='Person' iconColor='success'>
								<CardTitle>Sender Information</CardTitle>
								<CardSubTitle>Please complete the sender information</CardSubTitle>
							</CardLabel>
						</CardHeader>
						<CardBody>
							<div className='row mt-3'>
								<div className='col-md-6'>
									<FormGroup id='fName' label='First Name'>
										<Input
											name='senderG.fName'
											placeholder='First Name'
											autoComplete='family-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.senderG.fName}
										/>
									</FormGroup>
								</div>
								<div className='col-md-6'>
									<FormGroup id='midName' label='Middle Name'>
										<Input
											name='senderG.midName'
											placeholder='Middle Name'
											autoComplete='family-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.senderG.midName}
										/>
									</FormGroup>
								</div>
							</div>
							<div className='row mt-3'>
								<div className='col-md-6'>
									<FormGroup id='lName' label='Last Name'>
										<Input
											name='senderG.lName'
											placeholder='Last Name'
											autoComplete='family-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.senderG.lName}
										/>
									</FormGroup>
								</div>
								<div className='col-md-6'>
									<FormGroup id='slName' label='Maiden Name'>
										<Input
											name='senderG.slName'
											placeholder='Maiden Name'
											autoComplete='family-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.senderG.slName}
										/>
									</FormGroup>
								</div>
							</div>
							<div className='row mt-3'>
								<div className='col-md-6'>
									<FormGroup id='phone' label='Phone'>
										<Input
											name='senderG.phone'
											placeholder='Phone'
											autoComplete='family-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.senderG.phone}
										/>
									</FormGroup>
								</div>
							</div>
						</CardBody>
					</Card>
				</div>
				<div className='col-md-6'>
					<Card>
						<CardHeader className='pb-0'>
							<CardLabel icon='Person' iconColor='success'>
								<CardTitle>Recipient Information</CardTitle>
								<CardSubTitle>Please complete the sender information</CardSubTitle>
							</CardLabel>
						</CardHeader>
						<CardBody>
							<div className='row mt-3'>
								<div className='col-md-6'>
									<FormGroup id='fName' label='First Name'>
										<Input
											name='recipientG.fName'
											placeholder='First Name'
											autoComplete='family-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.recipientG.fName}
										/>
									</FormGroup>
								</div>
								<div className='col-md-6'>
									<FormGroup id='midName' label='Middle Name'>
										<Input
											name='recipientG.midName'
											placeholder='Middle Name'
											autoComplete='family-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.recipientG.midName}
										/>
									</FormGroup>
								</div>
							</div>
							<div className='row mt-3'>
								<div className='col-md-6'>
									<FormGroup id='lName' label='Last Name'>
										<Input
											name='lName'
											placeholder='Last Name'
											autoComplete='family-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.recipientG.lName}
										/>
									</FormGroup>
								</div>
								<div className='col-md-6'>
									<FormGroup id='slName' label='Maiden Name'>
										<Input
											name='slName'
											placeholder='Maiden Name'
											autoComplete='family-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.recipientG.slName}
										/>
									</FormGroup>
								</div>
							</div>
							<div className='row mt-3'>
								<div className='col-md-6'>
									<FormGroup id='phone' label='Phone'>
										<Input
											name=''
											placeholder='Phone'
											autoComplete='family-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.recipientG.phone}
										/>
									</FormGroup>
								</div>
							</div>
						</CardBody>
					</Card>
				</div>
				<div className='col-md-12'>
					<Card>
						<CardHeader className='pb-0'>
							<CardLabel icon='Person' iconColor='success'>
								<CardTitle>Invoice Information</CardTitle>
								<CardSubTitle>Please complete the sender information</CardSubTitle>
							</CardLabel>
						</CardHeader>
						<CardBody>
							<div className='row mt-3'>
								<div className='col-md-3'>
									<FormGroup id='mname' label='Payee'>
										<Input
											name='payee'
											placeholder='Payee'
											autoComplete='family-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.payee}
										/>
									</FormGroup>
								</div>
								<div className='col-md-3'>
									<FormGroup id='fname' label='Inv No.'>
										<Input
											name='invNo'
											placeholder='Inv No.'
											autoComplete='family-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.invNo}
										/>
									</FormGroup>
								</div>
								<div className='col-md-3'>
									<FormGroup id='mname' label='-'>
										<Input
											placeholder=''
											autoComplete='family-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											// value={formik.values.mname2}
										/>
									</FormGroup>
								</div>
							</div>
							<div className='row mt-3'>
								<div className='col-md-3'>
									<FormGroup id='fname' label='Payee Branch'>
										<Input
											placeholder='Payee Branch'
											autoComplete='family-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.payeeBranch}
										/>
									</FormGroup>
								</div>
								<div className='col-md-3'>
									<FormGroup id='mname' label='Folio/pin'>
										<Input
											name='folio'
											placeholder='Folio/pin'
											autoComplete='family-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.folio}
										/>
									</FormGroup>
								</div>

								<div className='col-md-3'>
									<FormGroup id='fname' label='Dates'>
										<Input
											name='fecInicio'
											type='date'
											placeholder='Dates'
											autoComplete='family-name'
											value={'2018-07-22'}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											// value={formik.values.fecInicio}
										/>
									</FormGroup>
								</div>

								<div className='col-md-3'>
									<FormGroup id='mname' label='to'>
										<Input
											name='fecFin'
											type='date'
											placeholder='to'
											autoComplete='family-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.fecFin}
										/>
									</FormGroup>
								</div>
							</div>
							<div className='row mt-3'>
								<div className='col-md-3'>
									<FormGroup id='fname' label='Status'>
										<Select
											styles={colourStyles}
											inputValue={''}
											isDisabled={false}
											isLoading={false}
											isClearable={true}
											isRtl={false}
											isSearchable={true}
											name='address'
											onInputChange={handleGetSenders}
											options={sendersList}
										/>
									</FormGroup>
								</div>
							</div>
							<div className='row'>
								<div className='col-12'>
									<div className='row align-items-center'>
										<div className='col'></div>
										<div className='col-auto'>
											<div className='row g-1'>
												<div className='col-auto'>
													<Button
														className='me-3'
														icon={isLoading ? undefined : 'Save'}
														isLight
														color={lastSave ? 'info' : 'success'}
														isDisable={isLoading}
														onClick={formik.handleSubmit}>
														{isLoading && <Spinner isSmall inButton />}
														{isLoading
															? (lastSave && 'Saving') || 'Publishing'
															: (lastSave && 'Save') || 'Publish'}
													</Button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</CardBody>
					</Card>
				</div>

				<Card>
					<CardHeader>
						<CardLabel icon='ViewList' iconColor='info'>
							<CardTitle tag='h4' className='h5'>
								Transactions List
							</CardTitle>
						</CardLabel>
					</CardHeader>
					<CardBody className='table-responsive'>
						<table className='table table-modern table-hover'>
							<thead>
								<tr>
									<th scope='col'>Invoice No.</th>
									<th scope='col'>Amount</th>
									<th scope='col'>Date</th>
									<th scope='col'>Status transactions</th>
									<th scope='col'>Sender</th>
									<th scope='col'>Beneficiary</th>
									<th scope='col'>Payee</th>
									<th scope='col'>Reference</th>
									<th scope='col'>Folio</th>
									<th scope='col'>MTN</th>
									<th scope='col'>Payment Mode</th>
									<th scope='col'>Sender Phone</th>
									<th scope='col'>CR</th>
									<th scope='col'>Sender Address</th>
									<th scope='col'>Beneficiary Phone</th>
									<th scope='col'>Beneficiary Address</th>
									<th scope='col'>Beneficiary Bank</th>
									<th scope='col'>Beneficiary Branch</th>
									<th scope='col'>Beneficiary Account Number</th>
									<th scope='col'>Account Type</th>
									<th scope='col'>Amount to Pay</th>
								</tr>
							</thead>
							<tbody>
								{dataPagination(invoicesList, currentPage, perPage).map((i) => (
									// eslint-disable-next-line react/jsx-props-no-spreading
									<TableRow key={i.id} {...i} />
								))}
							</tbody>
						</table>
					</CardBody>
					{/* <PaginationButtons
						data={items}
						label='items'
						setCurrentPage={setCurrentPage}
						currentPage={currentPage}
						perPage={perPage}
						setPerPage={setPerPage}
					/> */}
				</Card>
			</div>
		</PageWrapper>
	);
};

export default SearchTransactionPage;
