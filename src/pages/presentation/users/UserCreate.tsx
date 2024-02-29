import React, { Dispatch, SetStateAction, useEffect, useState, useContext } from 'react';
import Button from '../../../components/bootstrap/Button';
import {
	Agency,
	AgencyCatalogsList,
	getAgencyStatus,
	getLanguages,
	getSecurityLevels,
	getUsers,
	createUser,
} from '../../../services/UsersService';
import OffCanvas, {
	OffCanvasBody,
	OffCanvasHeader,
	OffCanvasTitle,
} from '../../../components/bootstrap/OffCanvas';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Select from '../../../components/bootstrap/forms/Select';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../../../components/bootstrap/forms/Input';
import { showNotificationGlobal } from '../../../helpers/helpers';
import AuthContext, { User } from '../../../contexts/authContext';

type ChildProps = {
	createOffcanvas: boolean;
	setCreateOffcanvas: Dispatch<SetStateAction<boolean>>;
	setListUsers: Dispatch<SetStateAction<User[]>>;
};
const UserCreate: React.FC<ChildProps> = ({
	createOffcanvas,
	setCreateOffcanvas,
	setListUsers,
}: ChildProps) => {
	const { user } = useContext(AuthContext);

	const [agencyStatus, setAgencyStatus] = useState<AgencyCatalogsList[]>([]);
	const [agencySecurityLevels, setAgencySecurityLevels] = useState<AgencyCatalogsList[]>([]);
	const [languages, setLanguages] = useState<AgencyCatalogsList[]>([]);

	useEffect(() => {
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
				console.error(error);
			},
		);
		getSecurityLevels(
			(data) => {
				const list = data.data.reduce(
					(acc: AgencyCatalogsList[], levels: Agency, index) => {
						const { name, code } = levels;
						if (user.secLevel === 'A') {
							acc[index] = { value: code, text: name };
						} else if (user.secLevel === 'S') {
							if (code !== 'A') {
								acc[index] = { value: code, text: name };
							}
						}
						return acc;
					},
					[],
				);
				setAgencySecurityLevels(list);
			},
			(error) => {
				console.warn(error);
			},
		);
		getLanguages(
			(data) => {
				const list = data.data.reduce(
					(acc: AgencyCatalogsList[], language: Agency, index) => {
						const { name, code } = language;
						acc[index] = { value: code, text: name };
						return acc;
					},
					[],
				);
				setLanguages(list);
			},
			(error) => {
				console.warn(error);
			},
		);
	}, []);
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			fname: '',
			lname: '',
			login: '',
			email: '',
			status: '',
			secLevel: '',
			identityCode: 0,
			agency: user.agency,
			password: '',
			mobile: '',
			appId: 3,
			idUsr: JSON.stringify(user.identityCode),
			usrType: '0',
			name: '',
			company: 'ECH',
			language: '',
		},
		validationSchema: Yup.object({
			fname: Yup.string().required('Required'),
			lname: Yup.string().required('Required'),
			login: Yup.string().required('Required'),
			email: Yup.string().required('Required').email(),
			status: Yup.string().required('Required'),
			secLevel: Yup.string().required('Required'),
			language: Yup.string().required('Required'),
		}),
		validateOnChange: false,
		onSubmit: (values, { resetForm }) => {
			createUser(
				values,
				(response) => {
					showNotificationGlobal(response.message, true);
					if (user) {
						getUsers(
							user.identityCode,
							(data) => {
								setListUsers(data.data);
							},
							(error) => {
								console.error(error);
							},
						);
					}
					setCreateOffcanvas(false);
				},
				(error) => {
					showNotificationGlobal(error, false);
				},
			);
		},
	});

	return (
		<OffCanvas
			setOpen={setCreateOffcanvas}
			isOpen={createOffcanvas}
			titleId='upcomingEdit'
			isBodyScroll
			placement='end'>
			<OffCanvasHeader setOpen={setCreateOffcanvas}>
				<OffCanvasTitle id='upcomingEdit'>Add User</OffCanvasTitle>
			</OffCanvasHeader>
			<OffCanvasBody>
				<div className='row g-4'>
					<div className='col-12'>
						<FormGroup id='fname' label='First Name'>
							<Input
								autoComplete='fname'
								value={formik.values.fname}
								isTouched={formik.touched.fname}
								invalidFeedback={formik.errors.fname}
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
						<FormGroup id='lname' label='Last Name'>
							<Input
								autoComplete='lname'
								value={formik.values.lname}
								isTouched={formik.touched.lname}
								invalidFeedback={formik.errors.lname}
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
						<FormGroup id='login' label='Login'>
							<Input
								autoComplete='login'
								value={formik.values.login}
								isTouched={formik.touched.login}
								invalidFeedback={formik.errors.login}
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
						<FormGroup id='email' label='Email'>
							<Input
								autoComplete='login'
								value={formik.values.email}
								isTouched={formik.touched.email}
								invalidFeedback={formik.errors.email}
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
						<FormGroup id='password' label='Password'>
							<Input
								autoComplete='login'
								type='password'
								value={formik.values.password}
								isTouched={formik.touched.password}
								invalidFeedback={formik.errors.password}
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
						<FormGroup id='status' label='Status' className='col-12'>
							<Select
								ariaLabel=''
								placeholder='Open this select menu'
								onChange={(e: { target: { value: string | any[] } }) => {
									formik.setFieldValue('status', e.target.value);
								}}
								list={agencyStatus}
								name='status'
								value={formik.values.status}
								isTouched={formik.touched.status}
								invalidFeedback={formik.errors.status}
								isValid={formik.isValid}
								onBlur={formik.handleBlur}
								onFocus={() => {
									formik.setErrors({});
								}}
							/>
						</FormGroup>
					</div>
					<div className='col-12'>
						<FormGroup id='secLevel' label='Security Level' className='col-12'>
							<Select
								ariaLabel=''
								placeholder='Open this select menu'
								onChange={(e: { target: { value: string | any[] } }) => {
									formik.setFieldValue('secLevel', e.target.value);
								}}
								value={formik.values.secLevel}
								list={agencySecurityLevels}
								name='securityLevel'
								isTouched={formik.touched.secLevel}
								invalidFeedback={formik.errors.secLevel}
								isValid={formik.isValid}
								onBlur={formik.handleBlur}
								onFocus={() => {
									formik.setErrors({});
								}}
							/>
						</FormGroup>
					</div>
					<div className='col-12'>
						<FormGroup id='language' label='Language' className='col-12'>
							<Select
								ariaLabel=''
								placeholder='Open this select menu'
								onChange={(e: { target: { value: string | any[] } }) => {
									formik.setFieldValue('language', e.target.value);
								}}
								value={formik.values.language}
								list={languages}
								name='securityLevel'
								isTouched={formik.touched.language}
								invalidFeedback={formik.errors.language}
								isValid={formik.isValid}
								onBlur={formik.handleBlur}
								onFocus={() => {
									formik.setErrors({});
								}}
							/>
						</FormGroup>
					</div>
				</div>
			</OffCanvasBody>
			<div className='row m-0'>
				<div className='col-12 p-3'>
					<Button color='info' className='w-100' onClick={formik.handleSubmit}>
						Save
					</Button>
				</div>
			</div>
		</OffCanvas>
	);
};

export default UserCreate;
