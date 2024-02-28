import { KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormGroup from '../bootstrap/forms/FormGroup';
import Label from '../bootstrap/forms/Label';
import Input from '../bootstrap/forms/Input';
import ReactSelect from 'react-select';
import Checks from '../bootstrap/forms/Checks';
import Select2 from '../bootstrap/forms/Select';
import {
	Locations,
	LocationsResponse,
	Sender,
	SenderResponse,
	getLocationsByZipCode,
	getSenders,
} from '../../services/TransactionsService';
import { colourStyles, senderFormattedData } from '../../helpers/helpers';
import Button from '../bootstrap/Button';
import { useTransactionSweet } from '../../contexts/transactionContext';

export const SenderCard = ({ ...props }) => {
	const [searchSender, setSearchSender] = useState('');
	const [searchZipCode, setSearchZipCode] = useState('');
	const [searchPhone1, setSearchPhone1] = useState('');
	const [searchType, setSearchType] = useState('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [sendersList, setSendersList] = useState<Sender[]>([]);
	const [zipCodeList, setZipCodeList] = useState<Locations[]>([]);
	const [phone1List, setPhone1List] = useState<Sender[]>([]);
	const [selectedFNameSender, setSelectedFNameSender] = useState<Sender | null>(null);
	const [selectedMNameSender, setSelectedMNameSender] = useState<Sender | null>(null);
	const [selectedLNameSender, setSelectedLNameSender] = useState<Sender | null>(null);
	const [selectedZipCode, setSelectedZipCode] = useState<Locations | null>(null);
	const [selectedPhone1, setSelectedPhone1] = useState<Sender | null>(null);
	const senderBefore = useRef(searchSender);
	const phone1Before = useRef(searchPhone1);
	const zipCodeBefore = useRef(searchZipCode);
	const [{}, { setSenderInformation }] = useTransactionSweet();

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
			email: '',
			zipcode: '',
			country: '',
			state: '',
			city: '',
			confirmEmail: false,
			cityname: '',
			nationality: '',
			birthDate: '',
			typeId: '',
			expDateId: '',
			secretWord: '',
			countryResidence: '',
			utilityBill: '',
			stateName: '',
			placeIssueId: '',
			gender: '',
			idFile: '',
			doc1: '',
			doc2: '',
			doc3: '',
			codeOrus: '',
			agencyGe: '',
			codeGe: '',
			readyToDelete: false,
			replacedBy: '',
			idStorageLocation1: '',
			idStorageLocation2: '',
			idStorageLocation3: '',
			agencyTemp: '',
			smsPhoneNumber: '',
			alternativeCode: '',
			sendSms: '',
			status: '',
			mname2: '',
			slname2: '',
			occupation: '',
			ssn: '',
			visible: false,
			backupCode: '',
			creationDate: '',
			allowSms: false,
			typeId2: '',
			enabled: false,
			deleted: false,
			mergedTo: '',
			mergedBy: '',
			mergeDate: '',
			numberId2: '',
			cristian: '',
			employerName: '',
			employerAddress: '',
			employerPhone1: '',
			personOfContact: '',
			omnexCode: '',
			idNumberEnc: '',
			sentToCompass: '',
			ssnSentToCompass: '',
			customer: '',
			numberId: '',
			appId: 0,
			idUsr: '',
			usrType: '',
			codeCountry: '',
			codeState: '',
		},
		validationSchema: Yup.object({
			fname: Yup.string().required('Required'),
			lname: Yup.string().required('Required'),
			zipcode: Yup.string().required('Required'),
			address: Yup.string().required('Required'),
			country: Yup.string().required('Required'),
			state: Yup.string().required('Required'),
			city: Yup.string().required('Required'),
			phone1: Yup.string().required('Required'),
			birthDate: Yup.date().required('Required'),
		}),
		validateOnChange: true,
		onSubmit: (values, { resetForm }) => {
			setSenderInformation(values);
			props.props.setSelectedTab(2);
			props.props.setTabValidity([true, true, false]);
		},
	});

	useEffect(() => {
		let fetchDataTimeout: NodeJS.Timeout | undefined;
		clearTimeout(fetchDataTimeout);
		fetchDataTimeout = setTimeout(() => {
			try {
				if (searchSender !== senderBefore.current) {
					senderBefore.current = searchSender;
					setIsLoading(true);
					getSenders(
						searchSender,
						(response: SenderResponse) => {
							console.error('SENDER::::::', response);
							const list = senderFormattedData(response.data, searchType);
							setSendersList(list);
						},
						(error) => {
							console.error('Error fetching data:', error);
						},
					);
				}
			} catch (error) {
				console.error('Error al obtener datos:', error);
			} finally {
				setIsLoading(false);
			}
		}, 500);
		return () => clearTimeout(fetchDataTimeout);
	}, [searchSender]);

	useEffect(() => {
		if (searchZipCode !== zipCodeBefore.current) {
			zipCodeBefore.current = searchZipCode;
			setIsLoading(true);
			getLocationsByZipCode(
				searchZipCode,
				(response: LocationsResponse) => {
					const list = senderFormattedData(response.data, searchType);
					setZipCodeList(list);
				},
				(error) => {
					console.error('Error fetching data:', error);
				},
			);
			setIsLoading(false);
		}
	}, [searchZipCode]);

	useEffect(() => {
		if (searchPhone1 !== phone1Before.current) {
			phone1Before.current = searchPhone1;
			setIsLoading(true);
			getSenders(
				searchPhone1,
				(response: SenderResponse) => {
					const list = senderFormattedData(response.data, searchType);
					setPhone1List(list);
				},
				(error) => {
					console.error('Error fetching data:', error);
				},
			);
			setIsLoading(false);
		}
	}, [searchPhone1]);

	const handleSelectChange = (selectedOption: Sender | Locations, typeSearch: string) => {
		switch (typeSearch) {
			case 'senderFName':
				if (selectedOption) {
					let findSender = sendersList.find(
						(sender) => sender.code == selectedOption.value,
					);
					if (findSender) {
						setSelectedFNameSender({ ...findSender, label: findSender.fname });
						setSelectedMNameSender({ ...findSender, label: findSender.mname });
						setSelectedLNameSender({ ...findSender, label: findSender.lname });
						formik.setValues({
							...findSender,
							birthDate: new Date(findSender.birthDate).toISOString().slice(0, 10),
						});
						setSelectedPhone1({ ...findSender, label: findSender.phone1 });
						setSenderInformation(findSender);
						localStorage.setItem('countryOrigin', findSender.codeCountry);
						localStorage.setItem('stateOrigin', findSender.codeState);
						setSelectedZipCode({
							value: findSender.zipcode,
							label: findSender.zipcode,
							isFixed: true,
							countryName: '',
							stateName: '',
							cityName: '',
							zipCode: '',
						});
					}
				} else {
					formik.resetForm();
					setSelectedFNameSender(null);
					setSelectedMNameSender(null);
					setSelectedLNameSender(null);
					setSelectedZipCode(null);
				}
				break;
			case 'senderMName':
				if (selectedOption) {
					let findSender = sendersList.find(
						(sender) => sender.code == selectedOption.value,
					);
					if (findSender) {
						setSelectedFNameSender({ ...findSender, label: findSender.fname });
						setSelectedMNameSender({ ...findSender, label: findSender.mname });
						setSelectedLNameSender({ ...findSender, label: findSender.lname });
						formik.setValues(findSender);
						localStorage.setItem('countryOrigin', findSender.codeCountry);
						localStorage.setItem('stateOrigin', findSender.codeState);
						setSenderInformation(findSender);
						setSelectedZipCode({
							value: findSender.zipcode,
							label: findSender.zipcode,
							isFixed: true,
							countryName: '',
							stateName: '',
							cityName: '',
							zipCode: '',
						});
					}
				} else {
					formik.resetForm();
					setSelectedFNameSender(null);
					setSelectedMNameSender(null);
					setSelectedLNameSender(null);
					setSelectedZipCode(null);
				}
				break;
			case 'senderLName':
				if (selectedOption) {
					let findSender = sendersList.find(
						(sender) => sender.code == selectedOption.value,
					);
					if (findSender) {
						setSelectedFNameSender({ ...findSender, label: findSender.fname });
						setSelectedMNameSender({ ...findSender, label: findSender.mname });
						setSelectedLNameSender({ ...findSender, label: findSender.lname });
						formik.setValues(findSender);
						localStorage.setItem('countryOrigin', findSender.codeCountry);
						localStorage.setItem('stateOrigin', findSender.codeState);
						setSenderInformation(findSender);
						setSelectedZipCode({
							value: findSender.zipcode,
							label: findSender.zipcode,
							isFixed: true,
							countryName: '',
							stateName: '',
							cityName: '',
							zipCode: '',
						});
					}
				} else {
					formik.resetForm();
					setSelectedFNameSender(null);
					setSelectedMNameSender(null);
					setSelectedLNameSender(null);
					setSelectedZipCode(null);
				}
				break;
			case 'zipcode':
				if (selectedOption) {
					setSelectedZipCode(selectedOption as Locations);
					formik.setFieldValue('country', selectedOption?.value);
					let findLocation = zipCodeList.find(
						(location) => location.zipCode === selectedOption.value,
					);
					formik.setFieldValue('country', findLocation?.countryName);
					formik.setFieldValue('city', findLocation?.cityName);
					formik.setFieldValue('state', findLocation?.stateName);
				} else {
					formik.setFieldValue('country', '');
					formik.setFieldValue('city', '');
					formik.setFieldValue('state', '');
					setSelectedZipCode(null);
				}
				break;
			case 'phone1':
				if (selectedOption) {
					let findPhone = phone1List.find(
						(phone1) => phone1.value === selectedOption.value,
					);
					if (findPhone) {
						setSelectedPhone1({ ...findPhone, label: findPhone.phone1 } as Sender);
					}
				} else {
					formik.setFieldValue('phone1', '');
					setSelectedPhone1(null);
				}
				break;
		}
	};

	const handleKeyDown = (event: any) => {
		if (event.key === 'Tab') {
			props.props.setActiveTab('recipient');
		}
	};

	return (
		<div className='p-4'>
			<div className='row mt-2'>
				<div className='col-md-3'>
					<FormGroup className={'row'} id='customerNo'>
						<Label className='col-sm-5' isColForLabel>
							Customer No.
						</Label>
						<div className='col-sm-7'>
							<Input
								autoComplete='customerNo'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.appId}
								isValid={formik.isValid}
								isTouched={formik.touched.appId}
								invalidFeedback={formik.errors.appId}
								validFeedback='Looks good!'
								tabIndex={1}
							/>
						</div>
					</FormGroup>
				</div>
				<div className='col-md-3'></div>
			</div>
			<div className='row mt-2'>
				<div className='col-md-3'>
					<FormGroup className={'row'} id='firstName'>
						<Label className='col-sm-5' isColForLabel>
							First Name
						</Label>
						<div className='col-sm-7'>
							<ReactSelect
								styles={{
									...colourStyles,
									control: (styles) => ({
										...styles,
										backgroundColor: '#f8f9fa',
										// border: formik.errors.fname && '1px solid #f35421',
										color: '#323232',
										paddingRight: '1rem',
										borderRadius: '1rem',
									}),
								}}
								isDisabled={false}
								isRtl={false}
								name='fname'
								options={sendersList}
								value={selectedFNameSender}
								onChange={(value) => {
									handleSelectChange(value as Sender, 'senderFName');
								}}
								onInputChange={(value) => {
									setSearchType('sender');
									setSearchSender(value);
								}}
								isClearable
								isSearchable
								isLoading={isLoading}
								tabIndex={2}
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
							<ReactSelect
								styles={colourStyles}
								isDisabled={false}
								isRtl={false}
								name='mname'
								options={sendersList}
								value={selectedMNameSender}
								onChange={(value) => {
									handleSelectChange(value as Sender, 'senderMName');
								}}
								onInputChange={(value) => {
									setSearchType('sender');
									setSearchSender(value);
								}}
								isClearable
								isSearchable
								isLoading={isLoading}
								tabIndex={3}
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
							<ReactSelect
								styles={colourStyles}
								isDisabled={false}
								isRtl={false}
								name='lname'
								options={sendersList}
								value={selectedLNameSender}
								onChange={(value) => {
									handleSelectChange(value as Sender, 'senderLName');
								}}
								onInputChange={(value) => {
									setSearchType('sender');
									setSearchSender(value);
								}}
								isClearable
								isSearchable
								isLoading={isLoading}
								tabIndex={4}
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
								tabIndex={5}
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
								tabIndex={6}
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
							<ReactSelect
								styles={colourStyles}
								isDisabled={false}
								isRtl={false}
								name='color'
								options={zipCodeList}
								value={selectedZipCode}
								onChange={(value) => {
									handleSelectChange(value, 'zipcode');
								}}
								onInputChange={(value) => {
									setSearchType('zipcode');
									setSearchZipCode(value);
								}}
								isClearable
								isSearchable
								isLoading={isLoading}
								tabIndex={7}
								required={true}
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
							<Input
								autoComplete='country'
								onChange={formik.handleChange('country')}
								onBlur={formik.handleBlur('country')}
								value={formik.values.country}
								isValid={formik.isValid}
								isTouched={formik.touched.country}
								invalidFeedback={formik.errors.country}
								validFeedback='Looks good!'
								tabIndex={8}
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
							<Input
								autoComplete='state'
								onChange={formik.handleChange('state')}
								onBlur={formik.handleBlur('state')}
								value={formik.values.state}
								isValid={formik.isValid}
								isTouched={formik.touched.state}
								invalidFeedback={formik.errors.state}
								validFeedback='Looks good!'
								tabIndex={9}
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
							<Input
								autoComplete='city'
								onChange={formik.handleChange('city')}
								onBlur={formik.handleBlur('city')}
								value={formik.values.city}
								isValid={formik.isValid}
								isTouched={formik.touched.city}
								invalidFeedback={formik.errors.city}
								validFeedback='Looks good!'
								tabIndex={10}
							/>
						</div>
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
							<ReactSelect
								placeholder={''}
								styles={colourStyles}
								isDisabled={false}
								isRtl={false}
								name='color'
								options={phone1List}
								value={selectedPhone1}
								onChange={(value) => {
									handleSelectChange(value as Sender, 'phone1');
								}}
								onInputChange={(value) => {
									setSearchType('phone1');
									setSearchPhone1(value);
								}}
								isClearable
								isSearchable
								isLoading={isLoading}
								tabIndex={11}
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
							checked={formik.values.confirmEmail}
							disabled={false}
							onChange={(e) =>
								formik.setFieldValue('confirmEmail', !formik.values.confirmEmail)
							}
							onBlur={formik.handleBlur('confirmEmail')}
							value={formik.values.confirmEmail.toString()}
							isValid={formik.isValid}
							tabIndex={12}
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
								tabIndex={13}
							/>
						</div>
					</FormGroup>
				</div>
			</div>
			<div className='row mt-2'>
				<div className='col-md-3'>
					<FormGroup className={'row'} id='birthDate'>
						<Label className='col-sm-5' isColForLabel>
							Birth Date
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
								tabIndex={14}
							/>
						</div>
					</FormGroup>
				</div>
				<div className='col-md-3'>
					<FormGroup className={'row'} id='occupation'>
						<Label className='col-sm-5' isColForLabel>
							Occupation
						</Label>
						<div className='col-sm-7'>
							<Input
								autoComplete='occupation'
								onChange={formik.handleChange('occupation')}
								value={formik.values.occupation}
								onBlur={formik.handleBlur('occupation')}
								isValid={formik.values.occupation !== '' ? true : false}
								isTouched={formik.touched.occupation}
								validFeedback='Looks good!'
								tabIndex={15}
							/>
						</div>
					</FormGroup>
				</div>
				<div className='col-md-3'>
					<FormGroup id='nationality' className={'row'}>
						<Label className='col-sm-5' isColForLabel>
							Nationality
						</Label>
						<div className='col-sm-7'>
							<Select2
								ariaLabel='Nationality'
								placeholder='Choose...'
								list={props.props.countriesList}
								value={formik.values.nationality}
								onChange={(e: { target: { value: string | any[] } }) => {
									formik.setFieldValue('nationality', e.target.value);
								}}
								isValid={formik.values.nationality !== '' ? true : false}
								isTouched={formik.touched.nationality}
								validFeedback='Looks good!'
								tabIndex={16}
							/>
						</div>
					</FormGroup>
				</div>
			</div>
			<div className='row mt-2'>
				<div className='col-md-3'>
					<FormGroup id='typeId' className={'row'}>
						<Label className='col-sm-5' isColForLabel>
							ID Type
						</Label>
						<div className='col-sm-7'>
							<Select2
								ariaLabel='ID Type'
								placeholder='Choose...'
								list={props.props.typeIndentificationList}
								value={formik.values.typeId}
								onChange={(e: { target: { value: string | any[] } }) => {
									formik.setFieldValue('typeId', e.target.value);
								}}
								isValid={formik.isValid}
								isTouched={formik.touched.typeId}
								invalidFeedback={formik.errors.typeId}
								tabIndex={17}
							/>
						</div>
					</FormGroup>
				</div>
				<div className='col-md-3'>
					<FormGroup className={'row'} id='numberId'>
						<Label className='col-sm-5' isColForLabel>
							ID No.
						</Label>
						<div className='col-sm-7'>
							<Input
								onChange={formik.handleChange('numberId')}
								onBlur={formik.handleBlur('numberId')}
								value={formik.values.numberId}
								isValid={formik.isValid}
								isTouched={formik.touched.numberId}
								invalidFeedback={formik.errors.numberId}
								validFeedback='Looks good!'
								tabIndex={18}
							/>
						</div>
					</FormGroup>
				</div>
				<div className='col-md-3'>
					<FormGroup className={'row'} id='expDateId'>
						<Label className='col-sm-5' isColForLabel>
							Exp Date
						</Label>
						<div className='col-sm-7'>
							<Input
								type='date'
								autoComplete='expDateId'
								onChange={formik.handleChange('expDateId')}
								onBlur={formik.handleBlur('expDateId')}
								value={formik.values.expDateId}
								isValid={formik.isValid}
								isTouched={formik.touched.expDateId}
								invalidFeedback={formik.errors.expDateId}
								validFeedback='Looks good!'
								tabIndex={19}
							/>
						</div>
					</FormGroup>
				</div>
				<div className='col-md-3'>
					<FormGroup className={'row'} id='issDate'>
						<Label className='col-sm-5' isColForLabel>
							Iss Date
						</Label>
						<div className='col-sm-7'>
							<Input
								onChange={formik.handleChange('issDate')}
								onBlur={formik.handleBlur('issDate')}
								value={formik.values.mergeDate}
								isValid={formik.isValid}
								isTouched={formik.touched.mergeDate}
								invalidFeedback={formik.errors.mergeDate}
								validFeedback='Looks good!'
								tabIndex={20}
							/>
						</div>
					</FormGroup>
				</div>
			</div>
			<div className='row mt-2'>
				<div className='col-md-3'>
					<FormGroup className={'row'} id='issueBy'>
						<Label className='col-sm-5' isColForLabel>
							Issue By
						</Label>
						<div className='col-sm-7'>
							<Input
								onChange={formik.handleChange('issueBy')}
								onBlur={formik.handleBlur('issueBy')}
								value={formik.values.mergedBy}
								isValid={formik.isValid}
								isTouched={formik.touched.mergedBy}
								invalidFeedback={formik.errors.mergedBy}
								validFeedback='Looks good!'
								tabIndex={21}
							/>
						</div>
					</FormGroup>
				</div>
				<div className='col-md-3'>
					<FormGroup className={'row'} id='photo'>
						<Label className='col-sm-5' isColForLabel>
							Add Photo
						</Label>
						<div className='col-sm-7'>
							<Input
								type='file'
								onChange={formik.handleChange}
								value={formik.values.doc1}
								tabIndex={22}
							/>
						</div>
					</FormGroup>
				</div>
				<div className='col-md-3'></div>
				<div className='col-md-3'>
					<FormGroup id='allowSms'>
						<Checks
							id={'allowSms'}
							name={'Allow SMS?'}
							label={'Allow SMS?'}
							type={'checkbox'}
							checked={formik.values.allowSms}
							disabled={false}
							onChange={(e) =>
								formik.setFieldValue('allowSms', !formik.values.allowSms)
							}
							onBlur={formik.handleBlur('allowSms')}
							value={formik.values.allowSms.toString()}
							isValid={formik.isValid}
							tabIndex={23}
						/>
					</FormGroup>
				</div>
			</div>
			<div className='row mt-2'>
				<div className='col-md-3'>
					<FormGroup className={'row'} id='ssneinType'>
						<Label className='col-sm-5' isColForLabel>
							SSN/EIN Type
						</Label>
						<div className='col-sm-7'>
							<Input
								onChange={formik.handleChange('ssneinType')}
								onBlur={formik.handleBlur('ssneinType')}
								value={formik.values.typeId}
								isValid={formik.isValid}
								isTouched={formik.touched.typeId}
								invalidFeedback={formik.errors.typeId}
								validFeedback='Looks good!'
								tabIndex={24}
							/>
						</div>
					</FormGroup>
				</div>
				<div className='col-md-3'>
					<FormGroup className={'row'} id='ssnein'>
						<Label className='col-sm-5' isColForLabel>
							SSN/EIN
						</Label>
						<div className='col-sm-7'>
							<Input
								onChange={formik.handleChange('ssnein')}
								onBlur={formik.handleBlur('ssnein')}
								value={formik.values.typeId2}
								isValid={formik.isValid}
								isTouched={formik.touched.typeId2}
								invalidFeedback={formik.errors.typeId2}
								onKeyDown={handleKeyDown}
								validFeedback='Looks good!'
								tabIndex={25}
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
					tabIndex={26}>
					Next
				</Button>
			</div>
		</div>
	);
};
export default SenderCard;
