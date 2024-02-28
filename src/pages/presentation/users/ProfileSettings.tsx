import React, { useState, useEffect, useContext } from 'react';
import Icon from '../../../components/icon/Icon';
import Button from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { demoPagesMenu } from '../../../menu';
import useDarkMode from '../../../hooks/useDarkMode';
import showNotification from '../../../components/extras/showNotification';
import {
	Agency,
	AgencyCatalogsList,
	getAgencyStatus,
	getSecurityLevels,
	getUsers,
	updateProfile,
} from '../../../services/UsersService';
import * as Yup from 'yup';
import AuthContext, { User } from '../../../contexts/authContext';
import moment, { Moment } from 'moment';
import { FormikHelpers, useFormik } from 'formik';
import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import CommonDesc from '../../../common/other/CommonDesc';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import Spinner from '../../../components/bootstrap/Spinner';
import Select from '../../../components/bootstrap/forms/Select';

const UsersListPage = () => {
	const { themeStatus } = useDarkMode();

	const { user } = useContext(AuthContext);
	const [items, setItems] = useState<User[]>([]);
	const [agencyStatus, setAgencyStatus] = useState<AgencyCatalogsList[]>([]);
	const [agencySecurityLevels, setAgencySecurityLevels] = useState<AgencyCatalogsList[]>([]);
	const [lastSave, setLastSave] = useState<Moment | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const handleSave = () => {
		setLastSave(moment());
		setIsLoading(false);
		showNotification(
			<span className='d-flex align-items-center'>
				<Icon icon='Info' size='lg' className='me-1' />
				<span>Updated Successfully</span>
			</span>,
			"The user's account details have been successfully updated.",
		);
	};

	useEffect(() => {
		getUsers(
			user.identityCode,
			(data) => {
				setItems(data.data);
			},
			(error) => {
				console.error(error);
			},
		);
		getAgencyStatus(
			(data) => {
				const list = data.data.reduce(
					(acc: AgencyCatalogsList[], status: Agency, index) => {
						const { name, code } = status;
						acc[index] = { value: code, text: name };
						return acc;
					},
					[],
				);
				setAgencyStatus(list);
			},
			(error) => {
				// formik.setFieldError('login', ' ');
				// formik.setFieldError('password', error);
			},
		);
		getSecurityLevels(
			(data) => {
				const list = data.data.reduce(
					(acc: AgencyCatalogsList[], status: Agency, index) => {
						const { name, code } = status;
						acc[index] = { value: code, text: name };
						return acc;
					},
					[],
				);
				setAgencySecurityLevels(list);
			},
			(error) => {
				// formik.setFieldError('login', ' ');
				// formik.setFieldError('password', error);
			},
		);
	}, []);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			firstName: user.fname,
			lastName: user.lname,
			mail: user.email,
			login: user.login,
			status: user.status,
			secLevel: user.secLevel,
			rights: user.rights,
			inactivationDate: user.inactivationDate,
			learningStatus: user.learningStatusToSent,
			language: user.language,
			password: user.password,
			currentPassword: '',
			newPassword: '',
			confirmPassword: '',
		},

		validationSchema: Yup.object().shape({
			currentPassword: Yup.string()
				.required('Current password is required')
				.test('password-match', 'Current password is incorrect', function (value) {
					return value === user.password;
				}),
			newPassword: Yup.string()
				.required('New password is required')
				.min(8, 'Password must be at least 8 characters long'),
			confirmPassword: Yup.string()
				.oneOf([Yup.ref('newPassword')], 'Passwords must match')
				.required('Confirm password is required'),
		}),
		validateOnChange: false,
		onSubmit: (values, { resetForm }) => {
			let passwordToUse: string | undefined;

			if (values.confirmPassword === '') {
				passwordToUse = user.password;
			} else {
				passwordToUse = values.confirmPassword;
			}
			updateProfile(
				{
					identityCode: user.identityCode,
					agency: user.agency,
					login: values.login,
					password: passwordToUse,
					secLevel: values.secLevel,
					email: values.mail,
					mobile: user.mobile,
					language: user.language,
					appId: 3,
					idUsr: '2',
					usrType: '0',
					status: values.status,
					name: values.firstName ? values.firstName + values.lastName : '',
					company: user.company,
					fname: values.firstName,
					lname: values.lastName,
				},
				(result) => {
					console.log(result);
					//console.log('El valor de passwordToUse es:', passwordToUse);
					//window.location.reload();
				},
				(error) => {
					console.error('Error al actualizar el perfil:', error);
				},
			);
		},
	});

	const [passwordChangeCTA, setPasswordChangeCTA] = useState<boolean>(false);

	return (
		<PageWrapper title={demoPagesMenu.editPages.subMenu.editModern.text}>
			<Page>
				<div className='row h-100 align-content-start'>
					<div className='col-md-8'>
						<Card>
							<CardHeader>
								<CardLabel icon='Person' iconColor='success'>
									<CardTitle>Personal Information</CardTitle>
									<CardSubTitle>User's credentials</CardSubTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row g-4'>
									<div className='col-md-6'>
										<FormGroup id='firstName' label='First Name' isFloating>
											<Input
												placeholder='First Name'
												autoComplete='firstName'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.firstName}
												isValid={formik.isValid}
												isTouched={formik.touched.firstName}
												invalidFeedback={formik.errors.firstName}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='col-md-6'>
										<FormGroup id='lastName' label='Last Name' isFloating>
											<Input
												placeholder='Last Name'
												autoComplete='lastName'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.lastName}
												isValid={formik.isValid}
												isTouched={formik.touched.lastName}
												invalidFeedback={formik.errors.lastName}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='col-md-6'>
										<FormGroup id='mail' label='Email' isFloating>
											<Input
												placeholder='Email'
												autoComplete='email'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.mail}
												isValid={formik.isValid}
												isTouched={formik.touched.mail}
												invalidFeedback={formik.errors.mail}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='col-md-6'>
										<FormGroup id='login' label='Login' isFloating>
											<Input
												placeholder='Login'
												autoComplete='login'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.login}
												isValid={formik.isValid}
												isTouched={formik.touched.login}
												invalidFeedback={formik.errors.login}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='col-md-6'>
										<FormGroup id='status' label='Status' isFloating>
											<Select
												ariaLabel='Default select example'
												placeholder='Open this select menu'
												onChange={formik.handleChange}
												value={formik.values.status}
												list={agencyStatus}
												name='status'
											/>
										</FormGroup>
									</div>
									<div className='col-md-6'>
										<FormGroup
											id='securityLabel'
											label='Security Label'
											isFloating>
											<Select
												ariaLabel='Default select example'
												placeholder='Open this select menu'
												onChange={formik.handleChange}
												value={formik.values.secLevel}
												list={agencySecurityLevels}
												name='security'
											/>
										</FormGroup>
									</div>
								</div>
							</CardBody>
						</Card>
						<Card>
							<CardHeader>
								<CardLabel icon='LocalPolice' iconColor='primary'>
									<CardTitle>Password</CardTitle>
									<CardSubTitle>Password change operations</CardSubTitle>
								</CardLabel>
								<CardActions>
									{passwordChangeCTA ? (
										<Button
											color='danger'
											isLight
											icon='Cancel'
											onClick={() => setPasswordChangeCTA(false)}>
											Cancel
										</Button>
									) : (
										<>
											<span>Do you want to change?</span>
											<Button
												color='primary'
												isLight
												icon='PublishedWithChanges'
												onClick={() => setPasswordChangeCTA(true)}>
												Yes
											</Button>
										</>
									)}
								</CardActions>
							</CardHeader>
							{passwordChangeCTA && (
								<CardBody>
									<div className='row g-4'>
										<div className='col-12'>
											<FormGroup
												id='currentPassword'
												label='Current password'
												isFloating>
												<Input
													type='password'
													placeholder='Current Password'
													autoComplete='current-password'
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.currentPassword}
													isValid={formik.isValid}
													isTouched={formik.touched.currentPassword}
													invalidFeedback={formik.errors.currentPassword}
													validFeedback='Looks good!'
												/>
											</FormGroup>
										</div>
										<div className='col-12'>
											<FormGroup
												id='newPassword'
												label='New password'
												isFloating>
												<Input
													type='password'
													placeholder='New password'
													autoComplete='new-password'
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.newPassword}
													isValid={formik.isValid}
													isTouched={formik.touched.newPassword}
													invalidFeedback={formik.errors.newPassword}
													validFeedback='Looks good!'
												/>
											</FormGroup>
										</div>
										<div className='col-12'>
											<FormGroup
												id='confirmPassword'
												label='Confirm new password'
												isFloating>
												<Input
													type='password'
													placeholder='Confirm new password'
													autoComplete='new-password'
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.confirmPassword}
													isValid={formik.isValid}
													isTouched={formik.touched.confirmPassword}
													invalidFeedback={formik.errors.confirmPassword}
													validFeedback='Looks good!'
												/>
											</FormGroup>
										</div>
									</div>{' '}
								</CardBody>
							)}
							<CardFooter>
								<CommonDesc>
									For your security, we recommend that you change your password
									every 3 months at most.
								</CommonDesc>
							</CardFooter>
						</Card>
					</div>
				</div>
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
													{moment(lastSave).format(
														'MMMM Do, YYYY - HH:mm',
													)}
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
														<Button
															color={themeStatus}
															icon='MoreVert'
														/>
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
			</Page>
		</PageWrapper>
	);
};

export default UsersListPage;
