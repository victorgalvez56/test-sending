import React, { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import moment, { Moment } from 'moment';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { adminPagesMenu, demoPagesMenu } from '../../../menu';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import useDarkMode from '../../../hooks/useDarkMode';
import Spinner from '../../../components/bootstrap/Spinner';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Breadcrumb from '../../../components/bootstrap/Breadcrumb';
import Avatar from '../../../components/Avatar';
import USERS from '../../../common/data/userDummyData';
import CommonDesc from '../../../common/other/CommonDesc';
import Label from '../../../components/bootstrap/forms/Label';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import validate from '../demo-pages/helper/editPagesValidate';
import Select, { StylesConfig } from 'react-select';
import {
	Search,
	Sender,
	SenderResponse,
	getAllInvoiceSearch,
	getSenders,
} from '../../../services/TransactionsService';
import { User } from '../../../contexts/authContext';
import * as Yup from 'yup';
import LANG from '../../../lang';
import i18n from '../../../i18n';
import PaginationButtons, {
	PER_COUNT,
	dataPagination,
} from '../../../components/PaginationButtons';
import useSortableData from '../../../hooks/useSortableData';
import data from '../knowledge/helper/dummyKnowledgeData';
import { ApexOptions } from 'apexcharts';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Chart from '../../../components/extras/Chart';
import { Badge } from '../../../components/icon/material-icons';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';

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
	const { themeStatus } = useDarkMode();

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
	const [PrintModal, setPrintModal] = useState<boolean>(false);
	const handlePrint = () => {
		const content = document.getElementById('modalContent');
		if (content) {
			const printWindow = window.open('', '_blank');
			if (printWindow) {
				printWindow.document.write(`
					<!DOCTYPE html>
					<html lang="en">
					<head>
						<meta charset="UTF-8">
						<meta name="viewport" content="width=device-width, initial-scale=1.0">
						<title>Print</title>
						<style>
							@media print {
								body {
									margin: 0;
									padding: 0;
								}
								.print-content {
									width: 100mm;
									height: 100mm;
									position: absolute;
									top: 10mm; 
									left: 10mm;
								}
							}
						</style>
					</head>
					<body>
						<div class="print-content">
							${content.innerHTML}
						</div>
					</body>
					</html>
				`);
				printWindow.document.close();
				printWindow.print();
			}
		}
	};

	const formik = useFormik<Search>({
		enableReinitialize: true,
		initialValues: {
			payee: 0,
			invNo: '',
			payeeBranch: '',
			folio: '',
			fecInicio: "01-23-2023",
			fecFin: "02-23-2023",
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
		onSubmit: (values, { resetForm }) => {},
	});

	useEffect(() => {
		handleGetAllInvoiceSearch();
	}, []);

	const handleGetAllInvoiceSearch = () => {
		getAllInvoiceSearch(
			formik.values,
			(response: any) => {
				console.warn(response);
				setInvoicesList(response.data);
			},
			() => { },
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

	const TOP_SELLER_FILTER = {
		DAY: 'day',
		WEEK: 'week',
		MONTH: 'month',
	};
	const [topSellerFilter, setTopSellerFilter] = useState(TOP_SELLER_FILTER.DAY);
	const filteredData = data
		.filter(
			(f: any) =>
				(topSellerFilter === TOP_SELLER_FILTER.DAY && f.id < 6) ||
				(topSellerFilter === TOP_SELLER_FILTER.WEEK && f.name.includes('c')) ||
				(topSellerFilter === TOP_SELLER_FILTER.MONTH && f.price > 13),
		)
		.filter((c: any, index: any) => index < 5);

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['3']);
	const { items, requestSort, getClassNamesFor } = useSortableData(filteredData);
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
							<div className='row mt-2'>
								<div className='col-md-6'>
									<FormGroup id='fname' label='First Name'>
										<Input
											name='fName'
											placeholder='First Name'
											autoComplete='family-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.senderG.fName}
											isValid={formik.isValid}
											isTouched={formik.touched.senderG && formik.touched.senderG.fName}
											invalidFeedback={formik.errors.senderG && formik.errors.senderG.fName}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
								<div className='col-md-6'>
									<FormGroup id='mname' label='Middle Name'>
										<Input
											name='midName'
											placeholder='Middle Name'
											autoComplete='family-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.senderG.midName}
											isValid={formik.isValid}
											isTouched={formik.touched.senderG && formik.touched.senderG.midName}
											invalidFeedback={formik.errors.senderG && formik.errors.senderG.midName}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
							</div>
							<div className='row mt-2'>
								<div className='col-md-6'>
									<FormGroup id='lname' label='Last Name'>
										<Input
											placeholder='Last Name'
											autoComplete='family-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.senderG.lName}
											isValid={formik.isValid}
											isTouched={formik.touched.senderG && formik.touched.senderG.lName}
											invalidFeedback={formik.errors.senderG && formik.errors.senderG.lName}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
								<div className='col-md-6'>
									<FormGroup id='mname' label='Maiden Name'>
										<Input
											placeholder='Maiden Name'
											autoComplete='family-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											// value={formik.values.mname2}
											isValid={formik.isValid}
											// isTouched={formik.touched.mname2}
											// invalidFeedback={formik.errors.mname2}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
							</div>
							{/* <div className='row mt-2'>
								<div className='col-md-6'>
									<FormGroup id='phone1' label='Phone'>
										<Input
											placeholder='Phone'
											autoComplete='family-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.mname2}
											isValid={formik.isValid}
											isTouched={formik.touched.mname2}
											invalidFeedback={formik.errors.mname2}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
							</div> */}
						</CardBody>
					</Card>
				</div>
				{/* <div className='col-md-6'>
					<Card>
						<CardHeader className='pb-0'>
							<CardLabel icon='Person' iconColor='success'>
								<CardTitle>Recipient Information</CardTitle>
								<CardSubTitle>Please complete the sender information</CardSubTitle>
							</CardLabel>
						</CardHeader>
						<CardBody>
							<div className='row mt-2'>
								<div className='col-md-6'>
									<FormGroup id='fname' label='First Name'>
										<Input
											placeholder='First Name'
											autoComplete='family-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.mname2}
											isValid={formik.isValid}
											isTouched={formik.touched.mname2}
											invalidFeedback={formik.errors.mname2}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
								<div className='col-md-6'>
									<FormGroup id='mname' label='Middle Name'>
										<Input
											placeholder='Middle Name'
											autoComplete='family-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.mname2}
											isValid={formik.isValid}
											isTouched={formik.touched.mname2}
											invalidFeedback={formik.errors.mname2}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
							</div>
							<div className='row mt-2'>
								<div className='col-md-6'>
									<FormGroup id='lname' label='Last Name'>
										<Input
											placeholder='Last Name'
											autoComplete='family-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.mname2}
											isValid={formik.isValid}
											isTouched={formik.touched.mname2}
											invalidFeedback={formik.errors.mname2}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
								<div className='col-md-6'>
									<FormGroup id='mname' label='Maiden Name'>
										<Input
											placeholder='Maiden Name'
											autoComplete='family-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.mname2}
											isValid={formik.isValid}
											isTouched={formik.touched.mname2}
											invalidFeedback={formik.errors.mname2}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
							</div>
							<div className='row mt-2'>
								<div className='col-md-6'>
									<FormGroup id='phone1' label='Phone'>
										<Input
											placeholder='Phone'
											autoComplete='family-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.mname2}
											isValid={formik.isValid}
											isTouched={formik.touched.mname2}
											invalidFeedback={formik.errors.mname2}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
							</div>
						</CardBody>
					</Card>
				</div> */}
				<div className='col-md-12'>
					<Card>
						<CardHeader className='pb-0'>
							<CardLabel icon='Person' iconColor='success'>
								<CardTitle>Invoice Information</CardTitle>
								<CardSubTitle>Please complete the sender information</CardSubTitle>
							</CardLabel>
						</CardHeader>
						<CardBody>
							{/* <div className='row mt-2'>
								<div className='col-md-3'>
									<FormGroup id='fname' label='Ref No'>
										<Input
											placeholder='Ref No'
											autoComplete='family-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.mname2}
											isValid={formik.isValid}
											isTouched={formik.touched.mname2}
											invalidFeedback={formik.errors.mname2}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
								<div className='col-md-3'>
									<FormGroup id='mname' label='Payee'>
										<Input
											placeholder='Payee'
											autoComplete='family-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.mname2}
											isValid={formik.isValid}
											isTouched={formik.touched.mname2}
											invalidFeedback={formik.errors.mname2}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
								<div className='col-md-3'>
									<FormGroup id='fname' label='Inv No.'>
										<Input
											placeholder='Inv No.'
											autoComplete='family-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.mname2}
											isValid={formik.isValid}
											isTouched={formik.touched.mname2}
											invalidFeedback={formik.errors.mname2}
											validFeedback='Looks good!'
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
											value={formik.values.mname2}
											isValid={formik.isValid}
											isTouched={formik.touched.mname2}
											invalidFeedback={formik.errors.mname2}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
							</div>
							<div className='row mt-2'>
								<div className='col-md-3'>
									<FormGroup id='fname' label='Payee Branch'>
										<Input
											placeholder='Payee Branch'
											autoComplete='family-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.mname2}
											isValid={formik.isValid}
											isTouched={formik.touched.mname2}
											invalidFeedback={formik.errors.mname2}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
								<div className='col-md-3'>
									<FormGroup id='mname' label='Folio/pin'>
										<Input
											placeholder='Folio/pin'
											autoComplete='family-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.mname2}
											isValid={formik.isValid}
											isTouched={formik.touched.mname2}
											invalidFeedback={formik.errors.mname2}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
								<div className='col-md-3'>
									<FormGroup id='fname' label='Dates'>
										<Input
											placeholder='Dates'
											autoComplete='family-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.mname2}
											isValid={formik.isValid}
											isTouched={formik.touched.mname2}
											invalidFeedback={formik.errors.mname2}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
								<div className='col-md-3'>
									<FormGroup id='mname' label='to'>
										<Input
											placeholder='to'
											autoComplete='family-name'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.mname2}
											isValid={formik.isValid}
											isTouched={formik.touched.mname2}
											invalidFeedback={formik.errors.mname2}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
							</div>
							<div className='row mt-2'>
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
							</div> */}

						</CardBody>
					</Card>
					<div className='row'>
						<div className='col-12'>
							<Card>
								<CardBody>
									<div className='row align-items-center'>
										<div className='col'>
											{lastSave ? (
												<>
													<Icon
														icon='DoneAll'
														size='lg'
														className='me-2 text-muted'
													/>
													<span className='me-2 text-muted'>Last Saved</span>
													<strong>
														{moment(lastSave).format('MMMM Do, YYYY - HH:mm')}
													</strong>
												</>
											) : (
												<>
													<Icon
														icon='Warning'
														size='lg'
														className='me-2 text-warning'
													/>
													<span className='text-warning'>Not saved yet</span>
												</>
											)}
										</div>
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
												<div className='col-auto'>
													<Dropdown direction='up'>
														<DropdownToggle hasIcon={false}>
															<Button color={themeStatus} icon='MoreVert' />
														</DropdownToggle>
														<DropdownMenu isAlignmentEnd>
															<DropdownItem>
																<Button
																	className='me-3'
																	icon='Save'
																	isLight
																	isDisable={isLoading}
																	onClick={formik.resetForm}>
																	Reset
																</Button>
															</DropdownItem>
														</DropdownMenu>
													</Dropdown>
												</div>
											</div>
										</div>
									</div>
								</CardBody>
							</Card>
						</div>
					</div>
				</div>

				<Card stretch>
					<CardHeader>
						<CardLabel icon='ViewList' iconColor='info'>
							<CardTitle tag='h4' className='h5'>
								Transactions List
							</CardTitle>
						</CardLabel>
						<CardActions>
							<Dropdown isButtonGroup>
								<Button color='success' isLight icon='WaterfallChart'>
									{(topSellerFilter === TOP_SELLER_FILTER.DAY &&
										moment().format('MMM Do')) ||
										(topSellerFilter === TOP_SELLER_FILTER.WEEK &&
											`${moment()
												.startOf('week')
												.format('MMM Do')} - ${moment()
												.endOf('week')
												.format('MMM Do')}`) ||
										(topSellerFilter === TOP_SELLER_FILTER.MONTH &&
											moment().format('MMM YYYY'))}
								</Button>
								<DropdownToggle>
									<Button color='success' isLight isVisuallyHidden />
								</DropdownToggle>
								<DropdownMenu isAlignmentEnd>
									<DropdownItem>
										<Button
											onClick={() =>
												setTopSellerFilter(TOP_SELLER_FILTER.DAY)
											}>
											Last Day
										</Button>
									</DropdownItem>
									<DropdownItem>
										<Button
											onClick={() =>
												setTopSellerFilter(TOP_SELLER_FILTER.WEEK)
											}>
											Last Week
										</Button>
									</DropdownItem>
									<DropdownItem>
										<Button
											onClick={() =>
												setTopSellerFilter(TOP_SELLER_FILTER.MONTH)
											}>
											Last Month
										</Button>
									</DropdownItem>
								</DropdownMenu>
							</Dropdown>
							<Button
								color='info'
								icon='CloudDownload'
								isLight
								tag='a'
								to='/somefile.txt'
								target='_blank'
								download>
								Export
							</Button>
						</CardActions>
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
					<PaginationButtons
						data={items}
						label='items'
						setCurrentPage={setCurrentPage}
						currentPage={currentPage}
						perPage={perPage}
						setPerPage={setPerPage}
					/>
				</Card>
			</div>
		</PageWrapper>
	);
};

export default SearchTransactionPage;
