import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormGroup from '../bootstrap/forms/FormGroup';
import Label from '../bootstrap/forms/Label';
import Input from '../bootstrap/forms/Input';
import ReactSelect from 'react-select';
import Checks from '../bootstrap/forms/Checks';
import Select2 from '../bootstrap/forms/Select';
import Button from '../bootstrap/Button';
import {
	Cities,
	GetAllInvoiceByRecipient,
	Invoices,
	Recipients,
	RecipientsResponse,
	States,
	getCities,
	getRecipient,
	getRecipientsBySender,
	getStates,
} from '../../services/NewTransactionService';
import { ListsSelect } from '../../services/TransactionsService';
import { colourStyles } from '../../helpers/helpers';
import { useTransactionSweet } from '../../contexts/transactionContext';
import Modal, { ModalBody, ModalFooter, ModalHeader, ModalTitle } from '../bootstrap/Modal';
import { getSession } from '../../services/AuthService';
import PropTypes from 'prop-types';

interface RecipientCardProps {
	countriesList: ListsSelect[];
	typeIndentificationList: ListsSelect[];
	setSelectedTab: any;
	setTabValidity: any;
	nationalitiesList: ListsSelect[];
	relationShip: ListsSelect[];
	reasonList: ListsSelect[];
}

export const RecipientCard: React.FC<RecipientCardProps> = ({
	countriesList,
	typeIndentificationList,
	setSelectedTab,
	setTabValidity,
	nationalitiesList,
	relationShip,
	reasonList,
}) => {
	const userSession = getSession();
	const [changeRecipientOld, setChangeRecipientOld] = useState(true);
	const [reasonRecipient, setReasonRecipient] = useState('');
	const [statesList, setStatesList] = useState<ListsSelect[]>([]);
	const [citiesList, setCitiesList] = useState<ListsSelect[]>([]);
	const [selectedCountry, setSelectedCountry] = useState<ListsSelect | null>();
	const [selectedState, setSelectedState] = useState<ListsSelect | null>();
	const [selectedCity, setSelectedCity] = useState<ListsSelect | null>();
	const [recipients, setRecipients] = useState<Recipients[]>([]);
	const [isOpenInvoice, setIsOpenInvoice] = useState<boolean>(false);
	const [invoices, setInvoices] = useState<Invoices[]>([]);
	const [
		{ senderInformation },
		{ setRecipientInformation, setInvoiceCountry, setInvoiceCity, setInvoiceInformation },
	] = useTransactionSweet();

	useEffect(() => {
		senderInformation &&
			getRecipientsBySender(
				senderInformation.code,
				(response) => {
					setRecipients(response.data);
				},
				() => {},
			);
	}, [senderInformation]);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			code: 1,
			name: '',
			fname: '',
			mname: '',
			lname: '',
			slname: '',
			address: '',
			phone1: '',
			phone2: '',
			mobile: '',
			zipcode: '',
			email: '',
			country: '',
			state: '',
			city: '',
			codeCountry: '',
			codeState: '',
			codeCity: '',
			confirmEmail: false,
			sender: 0,
			gender: '',
			brasilianId: '',
			codeOrus: '',
			agencyGe: '',
			identityCode: '',
			accountNumber: '',
			bankName: '',
			accountType: '',
			readyToDelete: false,
			newipient: '',
			previousSender: '',
			smsPhoneNumber: '',
			alternativeCode: '',
			sendSms: false,
			address2: '',
			status: '',
			fnameBackup: '',
			mname2: '',
			slname2: '',
			cityName: '',
			creationDate: '',
			bankAccount: '',
			bank: '',
			relationship: '',
			senderCristian: '',
			cristian: '',
			nationality: '',
			birthDate: '',
			omnexCode: '',
			idPath: '',
			typeId: '',
			sentToCompass: '',
			ofacReleased: false,
			customer: '',
			appId: 0,
			idUsr: '',
			usrType: '',
		},
		validationSchema: Yup.object({
			fname: Yup.string().required('Required'),
			lname: Yup.string().required('Required'),
			address: Yup.string().required('Required'),
			country: Yup.string().required('Required'),
			state: Yup.string().required('Required'),
			city: Yup.string().required('Required'),
			phone1: Yup.string().required('Required'),
			birthDate: Yup.string().required('Required'),
			identityCode: Yup.string().required('Required'),
		}),
		onSubmit: (values, { resetForm }) => {
			setRecipientInformation(values);
			GetAllInvoiceByRecipient(
				userSession.user.company,
				senderInformation.code,
				values.code,
				(response) => {
					setInvoices(response.data);
					setIsOpenInvoice(true);
				},
				() => {},
			);
		},
	});

	const takeInvoice = (invoice: Invoices) => {
		setInvoiceInformation(invoice);
		setIsOpenInvoice(false);
		// setSelectedCountry(null);
		// setSelectedState(null);
		// setSelectedCity(null);
		// formik.resetForm();
		setSelectedTab(3);
		setTabValidity([true, true, true]);
	};

	const handleSelectChange = (selectedOption: ListsSelect, typeSearch: string) => {
		switch (typeSearch) {
			case 'country':
				if (selectedOption) {
					let findCountry = countriesList.find(
						(country: ListsSelect) => country.value == selectedOption.value,
					);
					if (findCountry) {
						getStatesApi(findCountry.value);
						setSelectedCountry(findCountry);
						formik.setFieldValue('country', findCountry.label);
						formik.setFieldValue('codeCountry', findCountry.value);
						setInvoiceCountry(findCountry.value.toString());
					}
				} else {
					formik.setFieldValue('country', '');
				}
				break;
			case 'state':
				if (selectedOption) {
					let findState = statesList.find(
						(state: ListsSelect) => state.value == selectedOption.value,
					);
					if (findState) {
						getCitiesApi(findState.value.toString());
						setSelectedState(findState);
						formik.setFieldValue('state', findState.label);
						formik.setFieldValue('codeState', findState.value);
						localStorage.setItem('stateRecipient', findState.value.toString());
					}
				} else {
					formik.setFieldValue('state', '');
				}
				break;
			case 'city':
				if (selectedOption) {
					let findCity = citiesList.find(
						(city: ListsSelect) => city.value == selectedOption.value,
					);
					if (findCity) {
						setSelectedCity(findCity);
						formik.setFieldValue('city', findCity.label);
						formik.setFieldValue('cityName', findCity.label);
						formik.setFieldValue('codeCity', findCity.value);
						setInvoiceCity(findCity.value.toString());
					}
				} else {
					formik.setFieldValue('city', '');
				}
				break;
			case 'nationality':
				if (selectedOption) {
					let findNationality = nationalitiesList.find(
						(nationality: ListsSelect) => nationality.value == selectedOption.value,
					);
					if (findNationality) {
						formik.setFieldValue('nationality', findNationality.label);
					}
				} else {
					formik.setFieldValue('nationality', '');
				}
				break;
		}
	};

	const getStatesApi = (codeCountry: string | number) => {
		getStates(
			codeCountry,
			(response) => {
				const list = response.data.reduce((acc: any, state: States, index: number) => {
					const { name, code } = state;
					acc[index] = {
						value: code,
						label: name,
						isFixed: true,
					};
					return acc;
				}, []);
				setStatesList(list);
			},
			() => {},
		);
	};

	const getCitiesApi = (codeState: string) => {
		getCities(
			{ country: selectedCountry?.value, state: codeState },
			(response) => {
				const list = response.data.reduce((acc: any, city: Cities, index: number) => {
					const { name, code } = city;
					acc[index] = {
						value: code,
						label: name,
						isFixed: true,
					};
					return acc;
				}, []);
				setCitiesList(list);
			},
			() => {},
		);
	};

	const takeUser = (recipient: Recipients) => {
		getRecipient(
			recipient.code,
			(response: RecipientsResponse) => {
				console.error('hdhbhbsahbdshbadhk', response.data[0]);
				setSelectedCountry({
					value: response.data[0].codeCountry,
					label: response.data[0].country,
					isFixed: true,
				});
				setSelectedState({
					value: response.data[0].codeState,
					label: response.data[0].state,
					isFixed: true,
				});
				setSelectedCity({
					value: response.data[0].codeCity,
					label: response.data[0].city,
					isFixed: true,
				});
				setInvoiceCountry(response.data[0].codeCountry.toString());
				setInvoiceCity(response.data[0].codeCity.toString());
				formik.setValues(response.data[0]);
			},
			() => {},
		);
		setChangeRecipientOld(false);
	};

	const handleKeyDown = (event: any) => {
		if (event.key === 'Tab') {
			setSelectedTab(3);
			setTabValidity([true, true, true]);
		}
	};

	const skip = () => {
		setIsOpenInvoice(false);
		// setSelectedCountry(null);
		// setSelectedState(null);
		// setSelectedCity(null);
		// formik.resetForm();
		setSelectedTab(3);
		setTabValidity([true, true, true]);
	};

	return (
		<div className='p-4'>
			<Modal
				setIsOpen={setIsOpenInvoice}
				size={'lg'}
				isOpen={isOpenInvoice}
				titleId='transfer-modal'>
				<ModalHeader setIsOpen={setIsOpenInvoice}>
					<ModalTitle id='transfer-modal'>List of Invoices</ModalTitle>
				</ModalHeader>
				<ModalBody className='h-100 d-flex align-items-center'>
					<table className='table table-hover table-responsive'>
						<thead>
							<tr className='table-info'>
								<th>#</th>
								<th>Payee Name</th>
								<th>Currency destination</th>
								<th>Amount</th>
							</tr>
						</thead>
						<tbody>
							{invoices.map((item: Invoices, index: any) => (
								<tr key={index} onClick={() => takeInvoice(item)}>
									<td>{index + 1}</td>
									<td>{item.recName}</td>
									<td>{item.invCurDestination}</td>
									<td>{item.sumAmount}</td>
								</tr>
							))}
						</tbody>
					</table>
				</ModalBody>
				<ModalFooter>
					<Button color='info' onClick={() => skip()} tabIndex={48}>
						Skip
					</Button>
				</ModalFooter>
			</Modal>
			<div
				className='row mb-4 p-2 d-flex justify-content-between'
				style={{ backgroundColor: 'ButtonFace' }}>
				<div className='col-md-4'>
					<FormGroup>
						<p className='lead mb-0 mt-2 mx-2 col-3'>Recipient</p>
					</FormGroup>
				</div>
				<div className='col-md-4 d-flex justify-content-end'>
					<FormGroup>
						{changeRecipientOld ? (
							<Button
								color={'info'}
								icon='person'
								onClick={() => setChangeRecipientOld(!changeRecipientOld)}>
								New
							</Button>
						) : (
							<Button
								color={'info'}
								icon='search'
								onClick={() => setChangeRecipientOld(!changeRecipientOld)}
							/>
						)}
					</FormGroup>
				</div>
			</div>

			{changeRecipientOld ? (
				<table className='table table-hover table-responsive'>
					<thead>
						<tr className='table-info'>
							<th>#</th>
							<th>First Name</th>
							<th>Middle Name</th>
							<th>Last Name</th>
							<th>Maiden Name</th>
							<th>Phone 1</th>
							<th>Email</th>
						</tr>
					</thead>
					<tbody>
						{recipients.map((item: Recipients, index: any) => (
							<tr key={index} onClick={() => takeUser(item)}>
								<td>{index + 1}</td>
								<td>{item.fname}</td>
								<td>{item.mname}</td>
								<td>{item.lname}</td>
								<td>{item.slname}</td>
								<td>{item.phone1}</td>
								<td>{item.email}</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<>
					<div className='row mt-2'>
						<div className='col-md-3'>
							<FormGroup className={'row'} id='firstName'>
								<Label className='col-sm-5' isColForLabel>
									First Name
								</Label>
								<div className='col-sm-7'>
									<Input
										onChange={formik.handleChange('fname')}
										onBlur={formik.handleBlur('fname')}
										value={formik.values.fname}
										isValid={formik.isValid}
										isTouched={formik.touched.fname}
										invalidFeedback={formik.errors.fname}
										validFeedback='Looks good!'
										tabIndex={27}
									/>
								</div>
							</FormGroup>
						</div>
						<div className='col-md-3'>
							<FormGroup className={'row'} id='middleName'>
								<Label className='col-sm-5' isColForLabel>
									Middle name
								</Label>
								<div className='col-sm-7'>
									<Input
										onChange={formik.handleChange('mname')}
										onBlur={formik.handleBlur('mname')}
										value={formik.values.mname}
										isValid={formik.isValid}
										isTouched={formik.touched.mname}
										invalidFeedback={formik.errors.mname}
										validFeedback='Looks good!'
										tabIndex={28}
									/>
								</div>
							</FormGroup>
						</div>
						<div className='col-md-3'>
							<FormGroup className={'row'} id='lastName'>
								<Label className='col-sm-5' isColForLabel>
									Last Name
								</Label>
								<div className='col-sm-7'>
									<Input
										onChange={formik.handleChange('lname')}
										onBlur={formik.handleBlur('lname')}
										value={formik.values.lname}
										isValid={formik.isValid}
										isTouched={formik.touched.lname}
										invalidFeedback={formik.errors.lname}
										validFeedback='Looks good!'
										tabIndex={29}
									/>
								</div>
							</FormGroup>
						</div>
						<div className='col-md-3'>
							<FormGroup className={'row'} id='maidenName'>
								<Label className='col-sm-5' isColForLabel>
									Maiden Name
								</Label>
								<div className='col-sm-7'>
									<Input
										onChange={formik.handleChange('mname2')}
										onBlur={formik.handleBlur('mname2')}
										value={formik.values.mname2}
										isValid={formik.isValid}
										isTouched={formik.touched.mname2}
										invalidFeedback={formik.errors.mname2}
										validFeedback='Looks good!'
										tabIndex={30}
									/>
								</div>
							</FormGroup>
						</div>
					</div>
					<div className='row mt-2'>
						<div className='col-md-3'>
							<FormGroup className={'row'} id='address'>
								<Label className='col-sm-5' isColForLabel>
									Address
								</Label>
								<div className='col-sm-7'>
									<Input
										autoComplete='address'
										onChange={formik.handleChange('address')}
										onBlur={formik.handleBlur('address')}
										value={formik.values.address}
										isValid={formik.isValid}
										isTouched={formik.touched.address}
										invalidFeedback={formik.errors.address}
										validFeedback='Looks good!'
										tabIndex={31}
									/>
								</div>
							</FormGroup>
						</div>
						<div className='col-md-6'></div>
						<div className='col-md-3'>
							<FormGroup className={'row'} id='zipCode'>
								<Label className='col-sm-5' isColForLabel>
									Zip Code
								</Label>
								<div className='col-sm-7'>
									<Input
										autoComplete='zipcode'
										onChange={formik.handleChange('zipcode')}
										onBlur={formik.handleBlur('zipcode')}
										value={formik.values.zipcode}
										isValid={formik.isValid}
										isTouched={formik.touched.zipcode}
										invalidFeedback={formik.errors.zipcode}
										validFeedback='Looks good!'
										tabIndex={32}
									/>
								</div>
							</FormGroup>
						</div>
					</div>
					<div className='row mt-2'>
						<div className='col-md-3'>
							<FormGroup className={'row'} id='country'>
								<Label className='col-sm-5' isColForLabel>
									Country
								</Label>
								<div className='col-sm-7'>
									<ReactSelect
										styles={colourStyles}
										isDisabled={false}
										isRtl={false}
										name='color'
										options={countriesList}
										value={selectedCountry}
										onChange={(value) => {
											handleSelectChange(value, 'country');
										}}
										onInputChange={(value) => {
											formik.setFieldValue('country', value);
										}}
										isClearable
										isSearchable
										tabIndex={33}
									/>
								</div>
							</FormGroup>
						</div>
						<div className='col-md-3'>
							<FormGroup className={'row'} id='state'>
								<Label className='col-sm-5' isColForLabel>
									State
								</Label>
								<div className='col-sm-7'>
									<ReactSelect
										styles={colourStyles}
										isDisabled={false}
										isRtl={false}
										name='color'
										options={statesList}
										value={selectedState}
										onChange={(value) => {
											handleSelectChange(value, 'state');
										}}
										onInputChange={(value) => {
											formik.setFieldValue('state', value);
										}}
										isClearable
										isSearchable
										tabIndex={34}
									/>
								</div>
							</FormGroup>
						</div>
						<div className='col-md-3'>
							<FormGroup className={'row'} id='city'>
								<Label className='col-sm-5' isColForLabel>
									City
								</Label>
								<div className='col-sm-7'>
									<ReactSelect
										styles={colourStyles}
										isDisabled={false}
										isRtl={false}
										name='color'
										options={citiesList}
										value={selectedCity}
										onChange={(value) => {
											handleSelectChange(value, 'city');
										}}
										onInputChange={(value) => {
											formik.setFieldValue('city', value);
										}}
										isClearable
										isSearchable
										tabIndex={35}
									/>
								</div>
							</FormGroup>
						</div>
						<div className='col-md-3'>
							<FormGroup id='allowSMS'>
								<Checks
									id={'allowSMS'}
									name={'Allow SMS?'}
									label={'Allow SMS?'}
									type={'checkbox'}
									checked={true}
									disabled={false}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									// value={formik.values.smsPhoneNumber}
									isValid={formik.isValid}
									tabIndex={36}
								/>
							</FormGroup>
						</div>
					</div>
					<div className='row mt-2'>
						<div className='col-md-3'>
							<FormGroup className={'row'} id='phone1'>
								<Label className='col-sm-5' isColForLabel>
									Phone 1
								</Label>
								<div className='col-sm-7'>
									<Input
										autoComplete='phone1'
										onChange={formik.handleChange('phone1')}
										onBlur={formik.handleBlur('phone1')}
										value={formik.values.phone1}
										isValid={formik.isValid}
										isTouched={formik.touched.phone1}
										invalidFeedback={formik.errors.phone1}
										validFeedback='Looks good!'
										tabIndex={37}
									/>
								</div>
							</FormGroup>
						</div>
						<div className='col-md-3'></div>
						<div className='col-md-3'>
							<FormGroup id='confirmEmail'>
								<Checks
									id={'confirmEmail'}
									name={'Confirm by Email'}
									label={'Confirm by Email'}
									type={'checkbox'}
									checked={true}
									disabled={false}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									// value={formik.values.confirmEmail.toString()}
									isValid={formik.isValid}
									tabIndex={38}
								/>
							</FormGroup>
						</div>
						<div className='col-md-3'>
							<FormGroup className={'row'} id='email'>
								<Label className='col-sm-5' isColForLabel>
									Email
								</Label>
								<div className='col-sm-7'>
									<Input
										onChange={formik.handleChange('email')}
										onBlur={formik.handleBlur('email')}
										value={formik.values.email}
										isValid={formik.isValid}
										isTouched={formik.touched.email}
										invalidFeedback={formik.errors.email}
										validFeedback='Looks good!'
										tabIndex={39}
									/>
								</div>
							</FormGroup>
						</div>
					</div>
					<div className='row mt-2'>
						<div className='col-md-3'>
							<FormGroup className={'row'} id='RbeneficiaryId'>
								<Label className='col-sm-5' isColForLabel>
									ID Beneficiary
								</Label>
								<div className='col-sm-7'>
									<Input
										onChange={formik.handleChange('identityCode')}
										onBlur={formik.handleBlur('identityCode')}
										value={formik.values.identityCode}
										isValid={formik.isValid}
										isTouched={formik.touched.identityCode}
										invalidFeedback={formik.errors.identityCode}
										validFeedback='Looks good!'
										tabIndex={40}
									/>
								</div>
							</FormGroup>
						</div>
						<div className='col-md-3'>
							<FormGroup className={'row'} id='RtypeId'>
								<Label className='col-sm-5' isColForLabel>
									ID Type
								</Label>
								<div className='col-sm-7'>
									<Select2
										ariaLabel='ID Type'
										placeholder='Choose...'
										list={typeIndentificationList}
										value={formik.values.typeId}
										onChange={(e: { target: { value: string | any[] } }) => {
											formik.setFieldValue('typeId', e.target.value);
										}}
										isValid={formik.isValid}
										isTouched={formik.touched.typeId}
										invalidFeedback={formik.errors.typeId}
										tabIndex={41}
									/>
								</div>
							</FormGroup>
						</div>
						<div className='col-md-6'>
							<FormGroup className={'row'} id='reason'>
								<Label className='col-sm-2' isColForLabel>
									Reason
								</Label>
								<div className='col-sm-10'>
									<Select2
										ariaLabel='Reason'
										placeholder='Choose...'
										value={reasonRecipient}
										list={reasonList}
										onChange={(e: { target: { value: string | any[] } }) => {
											setReasonRecipient(e.target.value.toString());
										}}
										isValid={formik.isValid}
										tabIndex={42}
									/>
								</div>
							</FormGroup>
						</div>
					</div>
					<div className='row mt-2'>
						<div className='col-md-3'>
							<FormGroup className={'row'} id='relationship'>
								<Label className='col-sm-5' isColForLabel>
									Relationship
								</Label>
								<div className='col-sm-7'>
									<Select2
										ariaLabel='Country'
										placeholder='Choose...'
										list={relationShip}
										value={formik.values.relationship}
										onChange={(e: { target: { value: string | any[] } }) => {
											formik.setFieldValue('relationship', e.target.value);
										}}
										isValid={formik.isValid}
										isTouched={formik.touched.relationship}
										invalidFeedback={formik.errors.relationship}
										tabIndex={43}
									/>
								</div>
							</FormGroup>
						</div>
						<div className='col-md-3'>
							<FormGroup className={'row'} id='RbirthDate'>
								<Label className='col-sm-5' isColForLabel>
									Birth date
								</Label>
								<div className='col-sm-7'>
									<Input
										type='date'
										autoComplete='birthDate'
										onChange={formik.handleChange('birthDate')}
										onBlur={formik.handleBlur('birthDate')}
										value={formik.values.birthDate}
										isValid={formik.isValid}
										isTouched={formik.touched.birthDate}
										invalidFeedback={formik.errors.birthDate}
										validFeedback='Looks good!'
										tabIndex={44}
									/>
								</div>
							</FormGroup>
						</div>
						<div className='col-md-3'>
							<FormGroup className={'row'} id='Rnationality'>
								<Label className='col-sm-5' isColForLabel>
									Nationality
								</Label>
								<div className='col-sm-7'>
									<ReactSelect
										styles={colourStyles}
										isDisabled={false}
										isRtl={false}
										name='color'
										options={nationalitiesList}
										// defaultValue={formik.values.nationality}
										onChange={(value) => {
											handleSelectChange(value, 'nationality');
										}}
										onInputChange={(value) => {
											formik.setFieldValue('nationality', value);
										}}
										isClearable
										isSearchable
										tabIndex={45}
									/>
								</div>
							</FormGroup>
						</div>
						<div className='col-md-3'>
							<FormGroup className={'row'} id='message'>
								<Label className='col-sm-5' isColForLabel>
									Message
								</Label>
								<div className='col-sm-7'>
									<Input
										onChange={formik.handleChange('status')}
										onBlur={formik.handleBlur('status')}
										// value={formik.values.status}
										// isValid={formik.isValid}
										// isTouched={formik.touched.status}
										// invalidFeedback={formik.errors.status}
										onKeyDown={handleKeyDown}
										validFeedback='Looks good!'
										tabIndex={46}
									/>
								</div>
							</FormGroup>
						</div>
					</div>
					<div className='row mt-2  justify-content-center'>
						<Button
							color='primary'
							style={{ width: '85px' }}
							onClick={() => {
								formik.submitForm();
							}}
							tabIndex={47}>
							Next
						</Button>
					</div>
				</>
			)}
		</div>
	);
};

RecipientCard.propTypes = {
	countriesList: PropTypes.array.isRequired,
	typeIndentificationList: PropTypes.array.isRequired,
	setSelectedTab: PropTypes.any.isRequired,
	setTabValidity: PropTypes.any.isRequired,
	nationalitiesList: PropTypes.array.isRequired,
	relationShip: PropTypes.array.isRequired,
	reasonList: PropTypes.array.isRequired,
};
export default RecipientCard;
