import React, { Dispatch, SetStateAction, useEffect, useState, useContext } from 'react';
import Button from '../../../components/bootstrap/Button';
import {
	Agency,
	AgencyCatalogsList,
	getAgencyStatus,
	getLanguages,
	getSecurityLevels,
	getUsers,
	updateProfile,
} from '../../../services/UsersService';
import OffCanvas, {
	OffCanvasBody,
	OffCanvasHeader,
	OffCanvasTitle,
} from '../../../components/bootstrap/OffCanvas';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Select from '../../../components/bootstrap/forms/Select';
import { useFormik } from 'formik';
import { showNotificationGlobal } from '../../../helpers/helpers';
import * as Yup from 'yup';
import Input from '../../../components/bootstrap/forms/Input';
import AuthContext, { User } from '../../../contexts/authContext';

type ChildProps = {
	editOffcanvas: boolean;
	setEditOffcanvas: Dispatch<SetStateAction<boolean>>;
	userUpdate: User | undefined;
	setListUsers: Dispatch<SetStateAction<User[]>>;
};
const UserUpdate: React.FC<ChildProps> = ({
	editOffcanvas,
	setEditOffcanvas,
	userUpdate,
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
				console.warn(error);
			},
		);
		getSecurityLevels(
			(data) => {
				const list = data.data.reduce(
					(acc: AgencyCatalogsList[], levels: Agency, index) => {
						const { name, code } = levels;
						acc[index] = { value: code, text: name };
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
	useEffect(() => {
		if (userUpdate !== undefined) {
			formik.setValues({
				fname: userUpdate.fname,
				lname: userUpdate.lname,
				login: userUpdate.login,
				email: userUpdate.email,
				status: userUpdate.status,
				secLevel: userUpdate.secLevel,
				identityCode: userUpdate.identityCode,
				agency: userUpdate.agency,
				password: userUpdate.password,
				mobile: userUpdate.mobile,
				language: userUpdate.language,
				appId: 3,
				idUsr: JSON.stringify(user.identityCode),
				usrType: '0',
				name: userUpdate.fname + userUpdate.lname,
				company: userUpdate.company,
			});
		}
	}, [userUpdate]);
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
			agency: '',
			password: '',
			mobile: '',
			language: '',
			appId: 3,
			idUsr: JSON.stringify(user.identityCode),
			usrType: '0',
			name: '',
			company: '',
		},
		validationSchema: Yup.object({}),
		validateOnChange: false,
		onSubmit: (values, { resetForm }) => {
			updateProfile(
				values,
				(response) => {
					showNotificationGlobal(response.message, true);
					getUsers(
						user.identityCode,
						(data) => {
							setListUsers(data.data);
						},
						(error) => {
							console.error(error);
						},
					);
					setEditOffcanvas(false);
				},
				(error) => {
					showNotificationGlobal(error, false);
				},
			);
		},
	});

	return (
		<OffCanvas
			setOpen={setEditOffcanvas}
			isOpen={editOffcanvas}
			titleId='upcomingEdit'
			isBodyScroll
			placement='end'>
			<OffCanvasHeader setOpen={setEditOffcanvas}>
				<OffCanvasTitle id='upcomingEdit'>Edit User</OffCanvasTitle>
			</OffCanvasHeader>
			<OffCanvasBody>
				<div className='row g-4'>
					<div className='col-12'>
						<FormGroup id='fname' label='First Name'>
							<Input onChange={formik.handleChange} value={formik.values.fname} />
						</FormGroup>
					</div>
					<div className='col-12'>
						<FormGroup id='lname' label='Last Name'>
							<Input onChange={formik.handleChange} value={formik.values.lname} />
						</FormGroup>
					</div>
					<div className='col-12'>
						<FormGroup id='login' label='Login'>
							<Input onChange={formik.handleChange} value={formik.values.login} />
						</FormGroup>
					</div>
					<div className='col-12'>
						<FormGroup id='email' label='Email'>
							<Input onChange={formik.handleChange} value={formik.values.email} />
						</FormGroup>
					</div>
					<div className='col-12'>
						<FormGroup id='password' label='Password'>
							<Input
								type='password'
								onChange={formik.handleChange}
								value={formik.values.password}
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
								value={formik.values.status}
								list={agencyStatus}
								name='status'
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

export default UserUpdate;
