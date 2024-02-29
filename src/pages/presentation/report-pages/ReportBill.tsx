import { useContext } from 'react';
import Button from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';

import { demoPagesMenu } from '../../../menu';
import useDarkMode from '../../../hooks/useDarkMode';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import classNames from 'classnames';
import AuthContext from '../../../contexts/authContext';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Select from 'react-select';
import Textarea from '../../../components/bootstrap/forms/Textarea';

const ReportBill = () => {
	const { darkModeStatus } = useDarkMode();
	const { user } = useContext(AuthContext);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			code: 1,
			name: '',
			fname: '',
			mname: '',
			lname: '',
			slname: '',
			address: 'TEST ADDRESS FOR SENDER ARGENPER ORDER',
			phone1: '123456757',
			phone2: '0',
			mobile: '',
			email: '',
			zipcode: '07631',
			country: 'CHL',
			state: 'CL002',
			city: 'CL',
			confirmEmail: false,
			cityname: 'Englewood',
			nationality: '',
			birthDate: '',
			typeId: '',
			expDateId: '',
			secretWord: '',
			countryResidence: 'Colombia',
			utilityBill: '',
			stateName: 'NJ',
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
			visible: true,
			backupCode: '',
			creationDate: '2023-01-06T11:16:25.48',
			allowSms: false,
			typeId2: '',
			enabled: true,
			deleted: false,
			mergedTo: '',
			mergedBy: '',
			mergeDate: '2023-01-06T11:16:25.48',
			numberId2: '',
			cristian: '',
			employerName: '',
			employerAddress: '',
			employerPhone1: '',
			personOfContact: '',
			omnexCode: '',
			idNumberEnc: 'AgAAAKEVIqd6klNuQdvTVM1HFqdfim3CaKEsT05l2GfFEXu+89K52tjA9ir0Ody2S2FLEQ==',
			sentToCompass: '',
			ssnSentToCompass: '',
			customer: '',
			numberId: '',
			appId: 0,
			idUsr: '',
			usrType: '',
		},
		validationSchema: Yup.object({
			// agentCode: Yup.string().required('Required'),
			// login: Yup.string().required('Required'),
			// password: Yup.string().required('Required'),
		}),
		validateOnChange: false,
		onSubmit: (values, { resetForm }) => {},
	});

	return (
		<PageWrapper title={demoPagesMenu.editPages.subMenu.editInCanvas.text}>
			<Page container='fluid'>
				<div className='row h-100'>
					<div className='col-12'>
						<Card stretch={true}>
							<div className='col-md-12'>
								<Card>
									<CardHeader className='pb-0'>
										<CardLabel icon='Person' iconColor='success'>
											<CardTitle>Cost Detailded Agency</CardTitle>
										</CardLabel>
									</CardHeader>
									<CardBody>
										<div className='row mt-2'>
											<div className='col-md-3'>
												<FormGroup id='fname' label='Type Report:'>
													<Select
														//styles={colourStyles}
														inputValue={''}
														isDisabled={false}
														isLoading={false}
														isClearable={true}
														isRtl={false}
														isSearchable={true}
														name='address'
														//onInputChange={handleGetSenders}
														//options={sendersList}
													/>
												</FormGroup>
											</div>
											<div className='col-md-3'>
												<FormGroup id='fname' label='Transaction Status:'>
													<Select
														//styles={colourStyles}
														inputValue={''}
														isDisabled={false}
														isLoading={false}
														isClearable={true}
														isRtl={false}
														isSearchable={true}
														name='address'
														//onInputChange={handleGetSenders}
														//options={sendersList}
													/>
												</FormGroup>
											</div>
										</div>

										<div className='row mt-2'>
											<div className='col-md-3'>
												<FormGroup id='fname' label='Currency Origin:'>
													<Select
														//styles={colourStyles}
														inputValue={''}
														isDisabled={false}
														isLoading={false}
														isClearable={true}
														isRtl={false}
														isSearchable={true}
														name='address'
														//onInputChange={handleGetSenders}
														//options={sendersList}
													/>
												</FormGroup>
											</div>
										</div>

										<div className='row mt-2'>
											<div className='col-md-3'>
												<FormGroup id='fname' label='Initial Date:'>
													<Input
														autoComplete='family-name'
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														value={formik.values.mname2}
														isValid={formik.isValid}
														isTouched={formik.touched.mname2}
														invalidFeedback={formik.errors.mname2}
														validFeedback='Looks good!'
														type='date'
													/>
												</FormGroup>
											</div>
											<div className='col-md-3'>
												<FormGroup id='fname' label='Final Date:'>
													<Input
														autoComplete='family-name'
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														value={formik.values.mname2}
														isValid={formik.isValid}
														isTouched={formik.touched.mname2}
														invalidFeedback={formik.errors.mname2}
														validFeedback='Looks good!'
														type='date'
													/>
												</FormGroup>
											</div>
										</div>

										<div className='row mt-2'>
											<div className='col-md-3'>
												<FormGroup id='fname' label='Agency:'>
													<Select
														//styles={colourStyles}
														inputValue={''}
														isDisabled={false}
														isLoading={false}
														isClearable={true}
														isRtl={false}
														isSearchable={true}
														name='address'
														//onInputChange={handleGetSenders}
														//options={sendersList}
													/>
												</FormGroup>
											</div>

											<div className='col-md-3'>
												<FormGroup id='fname' label='Country Origin:'>
													<Select
														//styles={colourStyles}
														inputValue={''}
														isDisabled={false}
														isLoading={false}
														isClearable={true}
														isRtl={false}
														isSearchable={true}
														name='address'
														//onInputChange={handleGetSenders}
														//options={sendersList}
													/>
												</FormGroup>
											</div>
										</div>

										<div className='row mt-2'>
											<div className='col-md-3'>
												<FormGroup id='fname' label='States:'>
													<Select
														//styles={colourStyles}
														inputValue={''}
														isDisabled={false}
														isLoading={false}
														isClearable={true}
														isRtl={false}
														isSearchable={true}
														name='address'
														//onInputChange={handleGetSenders}
														//options={sendersList}
													/>
												</FormGroup>
											</div>
											<div className='col-md-3 mt-2'>
												<FormGroup id='fname'>
													<Textarea />
												</FormGroup>
											</div>
										</div>

										<div className='row mt-3'>
											<div className='col-md-3'>
												<FormGroup id='fname' label='Country Destin:'>
													<Select
														//styles={colourStyles}
														inputValue={''}
														isDisabled={false}
														isLoading={false}
														isClearable={true}
														isRtl={false}
														isSearchable={true}
														name='address'
														//onInputChange={handleGetSenders}
														//options={sendersList}
													/>
												</FormGroup>
											</div>
											<div className='col-md-3'>
												<FormGroup id='fname' label='Export Format:'>
													<Select
														//styles={colourStyles}
														inputValue={''}
														isDisabled={false}
														isLoading={false}
														isClearable={true}
														isRtl={false}
														isSearchable={true}
														name='address'
														//onInputChange={handleGetSenders}
														//options={sendersList}
													/>
												</FormGroup>
											</div>
										</div>

										<div
											style={{
												display: 'flex',
												justifyContent: 'center',
												gap: '20px',
											}}>
											<Button
												isOutline={!darkModeStatus}
												color='dark'
												isLight={darkModeStatus}
												className={classNames('text-nowrap', {
													'border-light': !darkModeStatus,
												})}
												style={{ marginTop: '50px' }}
												icon='LocalPrintshop'
												onClick={() => {}}>
												View Report
											</Button>
										</div>
									</CardBody>
								</Card>
							</div>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default ReportBill;
