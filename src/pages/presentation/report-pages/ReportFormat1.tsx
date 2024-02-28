import React, { useEffect, useState, useContext } from 'react';
import Button from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';

import { demoPagesMenu } from '../../../menu';
import useDarkMode from '../../../hooks/useDarkMode';
import { deleteUser, getUsers } from '../../../services/UsersService';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import AuthContext, { User } from '../../../contexts/authContext';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Select, { StylesConfig } from 'react-select';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import * as Yup from 'yup';
import Label from '../../../components/bootstrap/forms/Label';
import { useFormik } from 'formik';
import Icon from '../../../components/icon/Icon';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const ReportFormat1 = () => {
	const { user } = useContext(AuthContext);
	const { darkModeStatus } = useDarkMode();
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
							<CardHeader borderSize={1}>
								<CardLabel icon='People' iconColor='info'>
									<CardTitle>Statement</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
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
								</div>

								<div className='container mx-5'>
									<div className='row mt-5'>
										<div className='col-md-3 mx-5'>
											<div className='border border-dark p-3'>
												<Link to={''}>
													<div className='row align-items-center'>
														<div className='col-auto'>
															<Icon
																icon='SupportAgent'
																className='text-info h1'
																size='5x'
															/>
														</div>
														<div className='col'>
															<div className='row'>
																<div className='col'>
																	<strong>
																		AGENCY TEST (001)
																	</strong>
																</div>
															</div>
															<div className='row mt-4'>
																<div className='col'>
																	<strong>
																		Get Statement/ Mirar estado
																		de cuenta
																	</strong>
																</div>
															</div>
														</div>
													</div>
												</Link>
											</div>

											<div className='border border-dark p-3 mt-4'>
												<Link to={''}>
													<div className='row align-items-center'>
														<div className='col-auto'>
															<Icon
																icon='SupportAgent'
																className='text-info h1'
																size='5x'
															/>
														</div>
														<div className='col'>
															<div className='row'>
																<div className='col'>
																	<strong>
																		AGENCY TEST (001)
																	</strong>
																</div>
															</div>
															<div className='row mt-4'>
																<div className='col'>
																	<strong>
																		Get Statement/ Mirar estado
																		de cuenta
																	</strong>
																</div>
															</div>
														</div>
													</div>
												</Link>
											</div>
										</div>

										<div className='col-md-3 mx-5'>
											<div className='border border-dark p-3'>
												<Link to={''}>
													<div className='row align-items-center'>
														<div className='col-auto'>
															<Icon
																icon='SupportAgent'
																className='text-info h1'
																size='5x'
															/>
														</div>
														<div className='col'>
															<div className='row'>
																<div className='col'>
																	<strong>
																		AGENCY TEST (001)
																	</strong>
																</div>
															</div>
															<div className='row mt-4'>
																<div className='col'>
																	<strong>
																		Get Statement/ Mirar estado
																		de cuenta
																	</strong>
																</div>
															</div>
														</div>
													</div>
												</Link>
											</div>

											<div className='border border-dark p-3 mt-4'>
												<Link to={''}>
													<div className='row align-items-center'>
														<div className='col-auto'>
															<Icon
																icon='SupportAgent'
																className='text-info h1'
																size='5x'
															/>
														</div>
														<div className='col'>
															<div className='row'>
																<div className='col'>
																	<strong>
																		AGENCY TEST (001)
																	</strong>
																</div>
															</div>
															<div className='row mt-4'>
																<div className='col'>
																	<strong>
																		Get Statement/ Mirar estado
																		de cuenta
																	</strong>
																</div>
															</div>
														</div>
													</div>
												</Link>
											</div>
										</div>

										<div className='col-md-3'>
											<div className='border border-dark p-3'>
												<Link to={''}>
													<div className='row align-items-center'>
														<div className='col-auto'>
															<Icon
																icon='SupportAgent'
																className='text-info h1'
																size='5x'
															/>
														</div>
														<div className='col'>
															<div className='row'>
																<div className='col'>
																	<strong>
																		AGENCY TEST (001)
																	</strong>
																</div>
															</div>
															<div className='row mt-4'>
																<div className='col'>
																	<strong>
																		Get Statement/ Mirar estado
																		de cuenta
																	</strong>
																</div>
															</div>
														</div>
													</div>
												</Link>
											</div>

											<div className='border border-dark p-3 mt-4'>
												<div className='row align-items-center'>
													<Link to={''}>
														<div className='row align-items-center'>
															<div className='col-auto'>
																<Icon
																	icon='SupportAgent'
																	className='text-info h1'
																	size='5x'
																/>
															</div>
															<div className='col'>
																<div className='row'>
																	<div className='col'>
																		<strong>
																			AGENCY TEST (001)
																		</strong>
																	</div>
																</div>
																<div className='row mt-4'>
																	<div className='col'>
																		<strong>
																			Get Statement/ Mirar
																			estado de cuenta
																		</strong>
																	</div>
																</div>
															</div>
														</div>
													</Link>
												</div>
											</div>
										</div>
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
										icon='ArrowBack'
										onClick={() => {}}>
										Back
									</Button>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default ReportFormat1;
