import { FC, useEffect, useState, useContext } from 'react';
import classNames from 'classnames';
import { useFormik } from 'formik';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import OffCanvas, {
	OffCanvasBody,
	OffCanvasHeader,
	OffCanvasTitle,
} from '../../components/bootstrap/OffCanvas';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';

import useDarkMode from '../../hooks/useDarkMode';
import {
	Agency,
	AgencyCatalogsList,
	getAgencyStatus,
	getLanguages,
	getSecurityLevels,
	getUsers,
	updateProfile,
} from '../../services/UsersService';
import Select from '../../components/bootstrap/forms/Select';
import * as Yup from 'yup';
import AuthContext, { User } from '../../contexts/authContext';

interface ICommonUpcomingEventsProps {
	isFluid?: boolean;
}
const CommonUpcomingEvents: FC<ICommonUpcomingEventsProps> = ({ isFluid }) => {
	const { themeStatus, darkModeStatus } = useDarkMode();
	const { user, setUser } = useContext(AuthContext);

	const [items, setItems] = useState<User[]>([]);
	const [agencyStatus, setAgencyStatus] = useState<AgencyCatalogsList[]>([]);
	const [agencySecurityLevels, setAgencySecurityLevels] = useState<AgencyCatalogsList[]>([]);
	const [languages, setLanguages] = useState<AgencyCatalogsList[]>([]);
	const [learningStatus, setLearningStatus] = useState<AgencyCatalogsList[]>([
		{ value: 'True', text: 'True', label: '' },
		{ value: 'False', text: 'False', label: '' },
	]);

	const [createOffcanvas, setCreateOffcanvas] = useState(false);
	const [editOffcanvas, setEditOffcanvas] = useState(false);

	const handleUpcomingEdit = (item: User) => {
		formik.setValues({
			fname: item.fname,
			lname: item.lname,
			login: item.login,
			email: item.email,
			status: item.status,
			secLevel: item.secLevel,
			identityCode: item.identityCode,
			agency: item.agency,
			password: item.password,
			mobile: item.mobile,
			language: item.language,
			appId: 3,
			idUsr: JSON.stringify(user.identityCode),
			usrType: '0',
			name: item.fname + item.lname,
			company: item.company,
		});
		setEditOffcanvas(!editOffcanvas);
	};
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
					getUsers(
						user.identityCode,
						(data) => {
							setItems(data.data);
						},
						(error) => {
							console.error(error);
						},
					);
					setEditOffcanvas(false);
				},
				(error) => {},
			);
		},
	});

	return (
		<>
			<Card stretch={isFluid}>
				<CardHeader borderSize={1}>
					<CardLabel icon='People' iconColor='info'>
						<CardTitle>Users</CardTitle>
					</CardLabel>
					<CardActions>
						<Button color='info' icon='PersonAdd' isLight>
							Add new user
						</Button>
					</CardActions>
				</CardHeader>
				<CardBody className='table-responsive' isScrollable={isFluid}>
					<table className='table table-modern'>
						<thead>
							<tr>
								<th>First Name</th>
								<th>Last Name</th>
								<th>Login</th>
								<th>Email</th>
								<th>Status</th>
								<th>Security Level</th>
								<th>RIGHTS</th>
								<th>Inactivatic Date</th>
								<th>Learning Status</th>
								<th>Language</th>
								<td />
							</tr>
						</thead>
						<tbody>
							{items.map((item: User, index) => (
								<tr key={index}>
									<td>{item.fname}</td>
									<td>{item.lname}</td>
									<td>{item.login}</td>
									<td>{item.email}</td>
									<td>{item.status}</td>
									<td>{item.secLevel}</td>
									<td>{item.rights}</td>
									<td>{item.inactivationDate}</td>
									<td>{item.learningStatusToSent ? 'True' : 'False'}</td>
									<td>{item.language}</td>
									<td>
										<Button
											isOutline={!darkModeStatus}
											color='dark'
											isLight={darkModeStatus}
											className={classNames('text-nowrap', {
												'border-light': !darkModeStatus,
											})}
											icon='Edit'
											onClick={() => handleUpcomingEdit(item)}>
											Edit
										</Button>
										<Button
											isOutline={!darkModeStatus}
											color='dark'
											isLight={darkModeStatus}
											className={classNames('text-nowrap', {
												'border-light': !darkModeStatus,
											})}
											icon='Delete'
											onClick={handleUpcomingEdit}>
											Delete
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</CardBody>
			</Card>

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

			<OffCanvas
				setOpen={setCreateOffcanvas}
				isOpen={createOffcanvas}
				titleId='upcomingEdit'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setCreateOffcanvas}>
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
		</>
	);
};

export default CommonUpcomingEvents;
