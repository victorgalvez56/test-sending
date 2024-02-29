import { useEffect, useState } from 'react';
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
import classNames from 'classnames';
import UserUpdate from './UserUpdate';
import UserCreate from './UserCreate';
import { User } from '../../../contexts/authContext';
import Modal, { ModalBody, ModalFooter } from '../../../components/bootstrap/Modal';
import { t } from 'i18next';
import { getSession } from '../../../services/AuthService';

const UsersListPage = () => {
	const { darkModeStatus } = useDarkMode();
	const session = getSession();
	console.warn(session);
	const [listUsers, setListUsers] = useState<User[]>([]);
	const [userUpdate, setUserUpdate] = useState<User>();
	const [editOffcanvas, setEditOffcanvas] = useState(false);
	const [createOffcanvas, setCreateOffcanvas] = useState(false);
	const [userDelete, setUserDelete] = useState(0);
	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		return () => {
			initial();
		};
	}, []);

	const initial = () => {
		if (session) {
			getUsers(
				session.user.identityCode,
				(data) => {
					setListUsers(data.data);
				},
				(error) => {
					console.error(error);
				},
			);
		}
	};
	const deleteUserHandler = (userDeleteId: number) => {
		deleteUser(
			session.user.identityCode,
			userDeleteId,
			(data) => {
				initial();
			},
			(error) => {
				console.error(error);
			},
		);
	};

	return (
		<PageWrapper title={demoPagesMenu.editPages.subMenu.editInCanvas.text}>
			<Page container='fluid'>
				<div className='row h-100'>
					<div className='col-12'>
						<Card stretch={true}>
							<CardHeader borderSize={1}>
								<CardLabel icon='People' iconColor='info'>
									<CardTitle>Users</CardTitle>
								</CardLabel>
								<CardActions>
									{session.user.secLevel !== 'C' && (
										<Button
											color='info'
											icon='PersonAdd'
											isLight
											onClick={() => setCreateOffcanvas(true)}>
											Add new user
										</Button>
									)}
								</CardActions>
							</CardHeader>
							<CardBody className='table-responsive' isScrollable={true}>
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
										{listUsers.map((item: User, index) => (
											<tr key={index}>
												<td>{item.fname}</td>
												<td>{item.lname}</td>
												<td>{item.login}</td>
												<td>{item.email}</td>
												<td>{item.status}</td>
												<td>{item.secLevel}</td>
												<td>{item.rights}</td>
												<td>{item.inactivationDate}</td>
												<td>
													{item.learningStatusToSent ? 'True' : 'False'}
												</td>
												<td>{item.language}</td>
												<td>
													{session.user.secLevel === 'S'
														? item.secLevel !== 'A' && (
																<>
																	<Button
																		isOutline={!darkModeStatus}
																		color='dark'
																		isLight={darkModeStatus}
																		className={classNames(
																			'text-nowrap',
																			{
																				'border-light':
																					!darkModeStatus,
																			},
																		)}
																		icon='Edit'
																		onClick={() => {
																			setUserUpdate(item);
																			setEditOffcanvas(true);
																		}}>
																		Edit
																	</Button>
																	<Button
																		isOutline={!darkModeStatus}
																		color='dark'
																		isLight={darkModeStatus}
																		className={classNames(
																			'text-nowrap',
																			{
																				'border-light':
																					!darkModeStatus,
																			},
																		)}
																		icon='Delete'
																		onClick={() => {}}>
																		Delete
																	</Button>
																</>
														  )
														: session.user.secLevel === 'A' && (
																<>
																	<Button
																		isOutline={!darkModeStatus}
																		color='dark'
																		isLight={darkModeStatus}
																		className={classNames(
																			'text-nowrap',
																			{
																				'border-light':
																					!darkModeStatus,
																			},
																		)}
																		icon='Edit'
																		onClick={() => {
																			setUserUpdate(item);
																			setEditOffcanvas(true);
																		}}>
																		Edit
																	</Button>
																	<Button
																		isOutline={!darkModeStatus}
																		color='dark'
																		isLight={darkModeStatus}
																		className={classNames(
																			'text-nowrap',
																			{
																				'border-light':
																					!darkModeStatus,
																			},
																		)}
																		icon='Delete'
																		onClick={() => {
																			setOpenModal(true);
																			setUserDelete(
																				item.identityCode,
																			);
																		}}>
																		Delete
																	</Button>
																</>
														  )}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</CardBody>
						</Card>
						<UserUpdate
							editOffcanvas={editOffcanvas}
							setEditOffcanvas={setEditOffcanvas}
							userUpdate={userUpdate}
							setListUsers={setListUsers}
						/>
						<UserCreate
							createOffcanvas={createOffcanvas}
							setCreateOffcanvas={setCreateOffcanvas}
							setListUsers={setListUsers}
						/>
						<Modal
							isOpen={openModal}
							setIsOpen={setOpenModal}
							titleId='exampleModalLabel'
							isStaticBackdrop={false}
							isScrollable={false}
							isCentered={true}
							size={'sm'}
							fullScreen={'lg'}
							isAnimation={true}>
							<ModalBody>{t('Are you sure delete this user?')}</ModalBody>
							<ModalFooter>
								<Button
									color='info'
									isOutline
									className='border-0'
									onClick={() => {
										setOpenModal(false);
									}}>
									Close
								</Button>
								<Button
									color='info'
									icon='Save'
									onClick={() => {
										deleteUserHandler(userDelete);
										setOpenModal(false);
									}}>
									Save changes
								</Button>
							</ModalFooter>
						</Modal>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default UsersListPage;
