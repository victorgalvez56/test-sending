import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, { CardBody, CardHeader } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Logo from '../../../components/Logo';
import useDarkMode from '../../../hooks/useDarkMode';
import { useFormik } from 'formik';
import Spinner from '../../../components/bootstrap/Spinner';
import {
	getUser,
	login,
	resend2FA,
	setUserSessionData,
	validate2FA,
} from '../../../services/AuthService';
import * as Yup from 'yup';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown';
import LANG, { ILang, changeLanguage, getLangWithKey } from '../../../lang';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import AuthContext from '../../../contexts/authContext';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';
import OtpInput from 'react-otp-input';
import { showNotificationGlobal } from '../../../helpers/helpers';

interface ILoginHeaderProps {
	isNewUser?: boolean;
}
const LoginHeader: FC<ILoginHeaderProps> = ({ isNewUser }) => {
	if (isNewUser) {
		return (
			<>
				<div className='text-center h1 fw-bold mt-5'>Create Account,</div>
				<div className='text-center h4 text-muted mb-5'>Sign up to get started!</div>
			</>
		);
	}
	return (
		<>
			<div className='text-center h1 fw-bold mt-5'>Welcome,</div>
			<div className='text-center h4 text-muted mb-5'>Sign in to continue!</div>
		</>
	);
};

interface ILoginProps {
	isSignUp?: boolean;
}
const Login: FC<ILoginProps> = ({ isSignUp }) => {
	const { i18n } = useTranslation();
	const { setUser } = useContext(AuthContext);
	const { darkModeStatus, setDarkModeStatus } = useDarkMode();
	const [signInPassword, setSignInPassword] = useState<boolean>(false);
	const [singUpStatus, setSingUpStatus] = useState<boolean>(!!isSignUp);
	const navigate = useNavigate();
	const handleOnClick = useCallback(() => navigate('/dashboard'), [navigate]);
	const [show2FA, setShow2FA] = useState(false);
	let timer: ReturnType<typeof setTimeout>;
	const [twoFA, setTwoFA] = useState('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isLoadingLogin, setIsLoadingLogin] = useState<boolean>(false);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			agentCode: '000001',
			login: process.env.REACT_APP_USER,
			password: process.env.REACT_APP_PASSWORD,
			idApp: 3,
			usrType: '0',
		},
		validationSchema: Yup.object({
			agentCode: Yup.string().required('Required'),
			login: Yup.string().required('Required'),
			password: Yup.string().required('Required'),
		}),
		validateOnChange: false,
		onSubmit: (values, { resetForm }) => {
			setIsLoadingLogin(true);
			setSignInPassword(true);
			login(
				values,
				(response) => {
					if (response.use2FA) {
						setSignInPassword(true);
						localStorage.setItem('token', response.token);
						getUser(
							response.idUser,
							response.idUser,
							(data) => {
								setUserSessionData(data.data[0], response.data[0].currency, response.data[0].typeReceiptPrint);
								setUser(data.data[0]);
							},
							(error) => {
								console.error(error);
							},
						);
					} else {
						getUser(
							response.idUser,
							response.idUser,
							(data) => {
								setUserSessionData(data.data[0], response.data[0].currency,response.data[0].typeReceiptPrint);
								setUser(data.data[0]);
								handleOnClick();
							},
							(error) => {
								console.error(error);
							},
						);
					}
				},
				(error) => {
					formik.setFieldError('login', ' ');
					formik.setFieldError('password', error);
				},
			);
		},
	});
	const resend2FACode = () => {
		setTwoFA('');
		resend2FA(
			{ ...formik.values, verificationCode: twoFA },
			(data) => {},
			(error) => {
				console.error(error);
			},
		);
	};
	useEffect(() => {
		if (twoFA.length === 4) {
			validate2FA(
				{ ...formik.values, verificationCode: twoFA },
				(data) => {
					console.warn(data);
					if (data.success) {
						showNotificationGlobal(data.message, true);
						handleOnClick();
					} else {
						showNotificationGlobal(data.message, false);
					}
				},
				(error) => {
					showNotificationGlobal(error, false);
					console.error(error);
				},
			);
		}
	}, [twoFA]);

	const handleContinue = () => {
		setIsLoading(true);
		setTimeout(() => {
			setSignInPassword(true);
			setIsLoading(false);
		}, 1000);
	};
	const handleBack = () => {
		setIsLoading(true);
		setTimeout(() => {
			setSignInPassword(false);
			formik.resetForm();
			setIsLoading(false);
		}, 1000);
	};
	return (
		<PageWrapper
			isProtected={false}
			title={singUpStatus ? 'Sign Up' : 'Login'}
			className={classNames({ 'bg-dark': !singUpStatus, 'bg-light': singUpStatus })}>
			<Page className='p-0'>
				<div className='row h-100 align-items-center justify-content-center'>
					<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
						<Card className='shadow-3d-dark' data-tour='login-page'>
							<CardHeader className='justify-content-end'>
								<Dropdown>
									<DropdownToggle hasIcon={false}>
										<Button
											// eslint-disable-next-line react/jsx-props-no-spreading
											icon={
												getLangWithKey(i18n.language as ILang['key']['lng'])
													?.icon
											}
											aria-label='Change language'
											data-tour='lang-selector'
										/>
									</DropdownToggle>
									<DropdownMenu isAlignmentEnd data-tour='lang-selector-menu'>
										{Object.keys(LANG).map((i) => (
											<DropdownItem key={LANG[i].lng}>
												<Button
													icon={LANG[i].icon}
													onClick={() => changeLanguage(LANG[i].lng)}>
													{LANG[i].text}
												</Button>
											</DropdownItem>
										))}
									</DropdownMenu>
								</Dropdown>
							</CardHeader>
							<CardBody>
								<div className='text-center my-5'>
									<Link
										to='/'
										className={classNames(
											'text-decoration-none  fw-bold display-2',
											{
												'text-dark': !darkModeStatus,
												'text-light': darkModeStatus,
											},
										)}>
										<Logo width={200} />
									</Link>
								</div>
								<div
									className={classNames('rounded-3', {
										'bg-l10-dark': !darkModeStatus,
										'bg-dark': darkModeStatus,
									})}>
									<div className='row row-cols-2 g-3 pb-3 px-3 mt-0'>
										<div className='col'>
											<Button
												color={darkModeStatus ? 'light' : 'dark'}
												isLight={singUpStatus}
												className='rounded-1 w-100'
												size='lg'
												onClick={() => {
													setSignInPassword(false);
													setSingUpStatus(!singUpStatus);
												}}>
												Login
											</Button>
										</div>
										<div className='col'>
											<Button
												color={darkModeStatus ? 'light' : 'dark'}
												isLight={!singUpStatus}
												className='rounded-1 w-100'
												size='lg'
												onClick={() => {
													setSignInPassword(false);
													setSingUpStatus(!singUpStatus);
												}}>
												Sign Up
											</Button>
										</div>
									</div>
								</div>

								<LoginHeader isNewUser={singUpStatus} />

								<form className='row g-4'>
									{singUpStatus ? (
										<>
											<div className='col-12'>
												<FormGroup
													id='signup-email'
													isFloating
													label='Your email'>
													<Input type='email' autoComplete='email' />
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup
													id='signup-name'
													isFloating
													label='Your name'>
													<Input autoComplete='given-name' />
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup
													id='signup-surname'
													isFloating
													label='Your surname'>
													<Input autoComplete='family-name' />
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup
													id='signup-password'
													isFloating
													label='Password'>
													<Input
														type='password'
														autoComplete='password'
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												<Button
													color='info'
													className='w-100 py-3'
													onClick={handleOnClick}>
													Sign Up
												</Button>
											</div>
										</>
									) : (
										<>
											<div className='col-12'>
												<FormGroup
													id='agentCode'
													isFloating
													label='Agency Code'
													className={classNames({
														'd-none': signInPassword,
													})}>
													<Input
														autoComplete='agentCode'
														value={formik.values.agentCode}
														isTouched={formik.touched.agentCode}
														invalidFeedback={formik.errors.agentCode}
														isValid={formik.isValid}
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
														onFocus={() => {
															formik.setErrors({});
														}}
													/>
												</FormGroup>
											</div>

											<div className='col-12'>
												<FormGroup
													id='login'
													isFloating
													label='Agency Username'
													className={classNames({
														'd-none': !signInPassword,
													})}>
													<Input
														type='text'
														autoComplete='current-login'
														value={formik.values.login}
														isTouched={formik.touched.login}
														invalidFeedback={formik.errors.login}
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												<FormGroup
													id='password'
													isFloating
													label='Password'
													className={classNames({
														'd-none': !signInPassword,
													})}>
													<Input
														type='password'
														autoComplete='current-password'
														value={formik.values.password}
														isTouched={formik.touched.password}
														invalidFeedback={formik.errors.password}
														onChange={formik.handleChange}
														onBlur={formik.handleBlur}
													/>
												</FormGroup>
											</div>
											<div className='col-12'>
												{!signInPassword ? (
													<Button
														color='warning'
														className='w-100 py-3'
														isDisable={!formik.values.agentCode}
														onClick={handleContinue}>
														{isLoading && (
															<Spinner isSmall inButton isGrow />
														)}
														Continue
													</Button>
												) : (
													<>
														<div className='col-12'>
															<Button
																color='warning'
																className='w-100 py-3'
																isDisable={
																	!formik.values.login ||
																	!formik.values.password
																}
																onClick={formik.handleSubmit}>
																{isLoadingLogin && (
																	<Spinner
																		isSmall
																		inButton
																		isGrow
																	/>
																)}
																Login
															</Button>
														</div>
														<div className='col-12 mt-2'>
															<Button
																color='warning'
																className='w-100 py-3'
																onClick={handleBack}>
																{isLoading && (
																	<Spinner
																		isSmall
																		inButton
																		isGrow
																	/>
																)}
																Back
															</Button>
														</div>
													</>
												)}
											</div>
										</>
									)}
								</form>
							</CardBody>
						</Card>
						<div className='text-center'>
							<a
								href='/'
								className={classNames('text-decoration-none me-3', {
									'link-light': singUpStatus,
									'link-dark': !singUpStatus,
								})}>
								Privacy policy
							</a>
							<a
								href='/'
								className={classNames('link-light text-decoration-none', {
									'link-light': singUpStatus,
									'link-dark': !singUpStatus,
								})}>
								Terms of use
							</a>
						</div>
					</div>
				</div>
			</Page>
			<Modal
				isOpen={show2FA}
				setIsOpen={setShow2FA}
				titleId='exampleModalLabel'
				isStaticBackdrop={true}
				isScrollable={false}
				isCentered={true}
				size={'sm'}
				fullScreen={'md'}
				isAnimation={true}>
				<ModalHeader>
					<ModalTitle id='add-new-card'>{t('Two-Factor Authentication')}</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<div className='align-items-center p-2 row mt-2 text-center'>
						<OtpInput
							value={twoFA}
							onChange={(value) => {
								setTwoFA(value);
							}}
							numInputs={4}
							inputType='password'
							inputStyle={{
								width: '50%',
								height: 35,
								borderRadius: 10,
								borderWidth: 1,
								marginLeft: 'auto',
								marginRight: 'auto',
							}}
							renderInput={(props) => (
								<div className='col-md-3 w-25'>
									<Input {...props} />
								</div>
							)}
						/>
					</div>
				</ModalBody>
				<ModalFooter>
					<div className='text-center mr-0 w-100 fw-light fs-8'>
						{'Didn’t get a verification code?'}
					</div>
					<div className='row'>
						<div className='col-md-12'>
							<Button
								onClick={() => resend2FACode()}
								color='primary'
								isLight
								icon='refresh'
								className='w-100 h-100'>
								{'Resend Code'}
							</Button>
						</div>
						<div className='col-md-12 mt-2'>
							<Button
								color='danger'
								isLight
								icon='Cancel'
								className='w-100 h-100'
								onClick={() => {
									setTwoFA('');
									setShow2FA(false);
								}}>
								Cancel
							</Button>
						</div>
					</div>
				</ModalFooter>
			</Modal>
		</PageWrapper>
	);
};
Login.propTypes = {
	isSignUp: PropTypes.bool,
};
Login.defaultProps = {
	isSignUp: false,
};

export default Login;
