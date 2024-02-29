import { useEffect, useState, useContext } from 'react';
import Button from '../../../components/bootstrap/Button';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { demoPagesMenu } from '../../../menu';
import useDarkMode from '../../../hooks/useDarkMode';
import Card, { CardHeader } from '../../../components/bootstrap/Card';
import { Tabs2 } from '../../../components/transactions/Tabs';
import SenderInformation from '../../../components/invoices/SenderInformation';
import RecipientInformation from '../../../components/invoices/RecipientInformation';
import InvoiceInformation from '../../../components/invoices/InvoiceInformation';
import PaymentInformation from '../../../components/invoices/PaymentInformation';
import ReceiptPos from '../../../components/invoices/ReceiptPos';
import Modal, { ModalBody, ModalFooter, ModalTitle } from '../../../components/bootstrap/Modal';
import {
	InvoiceReponse,
	getInvoiceId,
	getSenderId,
	Sender,
	Recipient,
	getRecipientId,
} from '../../../services/InvoiceServices';
import { useLocation } from 'react-router-dom';
import AuthContext from '../../../contexts/authContext';
import ReceiptOnePage from '../../../components/invoices/ReceiptOnePage';

const InvoicePage = () => {
	const { darkModeStatus } = useDarkMode();
	const [uploadModal, setUploadModal] = useState<boolean>(false);
	const [openModalCancel, setOpenModalCancel] = useState<boolean>(false);
	const [messageModal, setMessageModal] = useState<boolean>(false);
	const [formModal, setFormModal] = useState<boolean>(false);
	const [PrintModal, setPrintModal] = useState<boolean>(false);
	const [currencyListOrigin, setCurrencyListOrigin] = useState([]);
	const [currencyListDes, setCurrencyListDes] = useState([]);
	const [items, setItems] = useState<InvoiceReponse[]>([]);
	const [itemsSender, setItemsSender] = useState<Sender[]>([]);
	const [itemsRecipient, setItemsRecipient] = useState<Recipient[]>([]);
	const { user, setUser } = useContext(AuthContext);

	console.error('qaq', user);
	const location = useLocation();

	const [selectedTab, setSelectedTab] = useState(1);

	const handleTabChange = (tabId: number) => {
		setSelectedTab(tabId);
	};

	const cellStyle = {
		border: '1px solid black',
		padding: '5px',
		width: '16.66%',
	};

	const handlePrint = () => {
		const content = document.getElementById('modalContent');
		if (content) {
			const printWindow = window.open('', '_blank');
			if (printWindow) {
				printWindow.document.write(content.innerHTML);
				printWindow.document.close();
				printWindow.print();
			}
		}
	};

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const invoiceCode = searchParams.get('invoiceCode');

		if (invoiceCode) {
			getInvoiceId(
				Number(invoiceCode),
				(data) => {
					setItems(data.data);
					console.warn('funcio', data);
				},
				(error) => {
					console.error(error);
				},
			);

			getSenderId(
				Number(invoiceCode),
				(data) => {
					setItemsSender(data.data);
					console.warn('sender', data);
				},
				(error) => {
					console.error(error);
				},
			);

			getRecipientId(
				Number(invoiceCode),
				(data) => {
					setItemsRecipient(data.data);
					console.warn('recipient', data);
				},
				(error) => {
					console.error(error);
				},
			);
		} else {
			console.error('El parámetro invoiceCode no está presente en la URL');
		}
	}, [location.search]);

	return (
		<PageWrapper title={demoPagesMenu.editPages.subMenu.editInCanvas.text}>
			<Page container='fluid'>
				<div className='row h-150'>
					<div className='col-12'>
						<Card>
							{items.map((item, index) => (
								<>
									<div className='row m-2 d-flex justify-content-center'>
										<label className='col-12 col-md-3 '>
											<div key={index}>
												<label className='m-2'>
													Date: {item.preReceiptDate.split('T')[0]}
												</label>
											</div>
										</label>
										<label className='col-12 col-md-3 '>
											Status: {item.status}
										</label>
										<label className='col-12 col-md-3 '>
											Agency: {item.agency}
										</label>
									</div>
									<div className='row m-2 d-flex justify-content-center'>
										<label className='col-12 col-md-3  '>
											Invoice No: 000001-3503
										</label>
										<label className='col-12 col-md-3 '>
											Reference: {item.reference}
										</label>
										<label className='col-12 col-md-3 '>
											Folio: 123457890098766
										</label>
									</div>
									<div className='row mt-4 justify-content-center'>
										<button
											className='btn btn-primary btn-sm col-1 mx-1'
											onClick={() => {
												setMessageModal(true);
											}}>
											MSGS
										</button>
										<button
											className='btn btn-primary btn-sm col-1 mx-1'
											onClick={() => {
												setPrintModal(true);
											}}>
											Print
										</button>
										<button
											className='btn btn-primary btn-sm col-2'
											onClick={() => {
												setOpenModalCancel(true);
											}}>
											Cancel/Modification
										</button>
										<button
											className='btn btn-primary btn-sm col-1 mx-1'
											onClick={() => {
												setUploadModal(true);
											}}>
											Upload Files
										</button>
										<button
											className='btn btn-primary btn-sm col-1 mx-1'
											onClick={() => {
												setFormModal(true);
											}}>
											BSA Form
										</button>
									</div>
									<CardHeader>
										<div className='card-actions mt-4 justify-content-center'>
											<Tabs2
												onSelectTab={handleTabChange}
												selectedTab={selectedTab}
											/>
										</div>
									</CardHeader>
									<div className={1 === selectedTab ? '' : 'd-none'}>
										<SenderInformation items={itemsSender} />
									</div>
									<div className={2 === selectedTab ? '' : 'd-none'}>
										<RecipientInformation items={itemsRecipient} />
									</div>
									<div className={3 === selectedTab ? '' : 'd-none'}>
										<InvoiceInformation items={items} />
									</div>
									<div className={4 === selectedTab ? '' : 'd-none'}>
										<PaymentInformation items={items}  />
									</div>
								</>
							))}
						</Card>
					</div>
				</div>
			</Page>

			<Modal
				isOpen={openModalCancel}
				setIsOpen={setOpenModalCancel}
				titleId='exampleModalLabel'
				isStaticBackdrop={false}
				isScrollable={false}
				isCentered={true}
				size={'lg'}
				fullScreen={'xl'}
				isAnimation={true}>
				<ModalTitle id='tour-title' className='d-flex align-items-end bg-light '>
					<div className='m-3 '>Modification Request</div>
				</ModalTitle>
				<ModalBody>
					<div>
						<label className='m-2'> Transaction Number: 00000000</label>
						<br />
						<label className='m-2 '> Date: 21/01/2024</label>
					</div>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<div className='form-group d-flex align-items-center mb-3'>
							<label className='m-2 md-4'>Email:</label>
							<input
								type='text'
								className='form-control m-2'
								style={{ maxWidth: '180px' }}
							/>
						</div>

						<div className='form-group d-flex align-items-center mb-3'>
							<label className='m-2' style={{ marginRight: '10px' }}>
								Reason:
							</label>
							<input
								type='text'
								className='form-control m-2'
								style={{ maxWidth: '180px' }}
							/>
						</div>

						<div className='form-group d-flex align-items-center'>
							<label className='m-2' style={{ marginRight: '10px' }}>
								New Value:
							</label>
							<input
								type='text'
								className='form-control m-2'
								style={{ maxWidth: '180px' }}
							/>
						</div>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button
						color='info'
						isOutline
						onClick={() => {
							setOpenModalCancel(false);
						}}>
						Close
					</Button>
					<Button
						color='info'
						icon='Save'
						onClick={() => {
							setOpenModalCancel(false);
						}}>
						Save changes
					</Button>
				</ModalFooter>
			</Modal>

			<Modal
				isOpen={uploadModal}
				setIsOpen={setUploadModal}
				titleId='exampleModalLabel'
				isStaticBackdrop={false}
				isScrollable={false}
				isCentered={true}
				size={'lg'}
				fullScreen={'xl'}
				isAnimation={true}>
				<ModalTitle id='tour-title' className='d-flex align-items-end bg-light '>
					<div className='m-3 '>Compliance Documents Upload</div>
				</ModalTitle>
				<ModalBody>
					<table className='table table-modern'>
						<thead>
							<tr>
								<th>Cashier</th>
								<th>File Name</th>
								<th>Date</th>
								<th>Compliance Image</th>
								<td />
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>No records to Display</td>
							</tr>
						</tbody>
					</table>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<label style={{ marginLeft: '5px' }}>Select the File:</label>
						<input type='text' className='m-2 col-md-4' />
						<button className='btn btn-info m-2'>Select</button>
					</div>
				</ModalBody>
				<ModalFooter>
					<Button
						color='info'
						isOutline
						className='border-0'
						onClick={() => {
							setUploadModal(false);
						}}>
						Close
					</Button>
					<Button
						color='info'
						icon='Save'
						onClick={() => {
							setUploadModal(false);
						}}>
						Upload
					</Button>
				</ModalFooter>
			</Modal>

			<Modal
				isOpen={messageModal}
				setIsOpen={setMessageModal}
				titleId='exampleModalLabel'
				isStaticBackdrop={false}
				isScrollable={false}
				isCentered={true}
				size={'lg'}
				fullScreen={'xl'}
				isAnimation={true}>
				<ModalTitle id='tour-title' className='d-flex align-items-end bg-light '>
					<div className='m-3 '>Add Message</div>
				</ModalTitle>
				<ModalBody>
					<div className='container'>
						<form>
							<div className='form-group row'>
								<label className='col-sm-3 col-form-label'>
									Message Destination
								</label>
								<div className='col-sm-9'>
									<input
										type='text'
										className='form-control'
										id='messageDestination'
										placeholder='Enter message destination'
									/>
								</div>
							</div>

							<div className='form-group row mt-3'>
								<label className='col-sm-3 col-form-label'>Text Message</label>
								<div className='col-sm-9'>
									<textarea
										className='form-control'
										id='textMessage'
										placeholder='Enter your text message'></textarea>
								</div>
							</div>
						</form>

						<div className='form-group row justify-content-end mt-3 mb-3'>
							<div className='col-auto'>
								<Button
									color='info'
									isOutline
									className='border-0'
									onClick={() => {
										setMessageModal(false);
									}}>
									Back
								</Button>
							</div>
							<div className='col-auto'>
								<Button
									color='info'
									icon='Save'
									onClick={() => {
										setMessageModal(false);
									}}>
									Save
								</Button>
							</div>
						</div>
					</div>

					<table className='table table-modern'>
						<thead>
							<tr>
								<th>Date</th>
								<th>Origin</th>
								<th>User</th>
								<th>Destination</th>
								<th>Status</th>
								<th>Message</th>
								<td />
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>02/02/2024 01:00:00 PM </td>
								<td>Agency</td>
								<td>Alejandro Molina</td>
								<td>Agency</td>
								<td>Open</td>
								<td>Test</td>
							</tr>
							<tr>
								<td>02/02/2024 01:00:00 PM </td>
								<td>Agency</td>
								<td>Alejandro Molina</td>
								<td>Agency</td>
								<td>Open</td>
								<td>Test</td>
							</tr>
							<tr>
								<td>02/02/2024 01:00:00 PM </td>
								<td>Agency</td>
								<td>Alejandro Molina</td>
								<td>Agency</td>
								<td>Open</td>
								<td>Test</td>
							</tr>
						</tbody>
					</table>
				</ModalBody>
			</Modal>

			<Modal
				isOpen={formModal}
				setIsOpen={setFormModal}
				titleId='exampleModalLabel'
				isStaticBackdrop={false}
				isScrollable={false}
				isCentered={true}
				size={'lg'}
				fullScreen={'xl'}
				isAnimation={true}>
				<ModalBody>
					<table border={1}>
						<tbody>
							<tr>
								<td style={cellStyle} colSpan={3}>
									<img
										src='https://www.firstbanknigeria.com/wp-content/uploads/2021/11/small-world.jpg'
										alt='Descripción de la imagen'
										style={{ maxWidth: '50%', height: 'auto' }}
									/>
								</td>
								<td
									style={{
										...cellStyle,
										fontSize: '20px',
										fontWeight: 'bold',
										maxHeight: '90px',
									}}
									colSpan={6}>
									A compliance form orders USD $7500 and over fees Excluded
								</td>
							</tr>
							<tr>
								<td
									style={{
										...cellStyle,
										textAlign: 'right',
										textDecoration: 'underline',
									}}
									colSpan={8}>
									Send to Print
								</td>
							</tr>
							<tr>
								<td style={{ ...cellStyle, fontWeight: 'bold' }}>Agency Name:</td>
								<td style={cellStyle} colSpan={3}>
									Test Agency (000001)
								</td>
								<td style={{ ...cellStyle, fontWeight: 'bold' }}>Agent: </td>
								<td style={cellStyle} colSpan={3}>
									000001
								</td>
							</tr>
							<tr>
								<td style={{ ...cellStyle, fontWeight: 'bold' }}>Order Number:</td>
								<td style={cellStyle} colSpan={2}>
									0001-1-2001
								</td>

								<td style={{ ...cellStyle, fontWeight: 'bold' }} colSpan={1}>
									Date:
								</td>
								<td style={cellStyle}>05/02/2024</td>
								<td style={{ ...cellStyle, fontWeight: 'bold' }}>Amount USD$:</td>
								<td style={cellStyle} colSpan={3}>
									5
								</td>
							</tr>
							<tr>
								<td style={{ ...cellStyle, height: '25px' }} colSpan={8}></td>
							</tr>
							<tr>
								<td
									style={{
										...cellStyle,
										textAlign: 'center',
										fontWeight: 'bold',
									}}
									colSpan={8}>
									SENDERS DATA
								</td>
							</tr>
							<tr>
								<td style={{ ...cellStyle, fontWeight: 'bold' }}>First Name:</td>
								<td style={cellStyle} colSpan={2}>
									Alejandro
								</td>

								<td style={{ ...cellStyle, fontWeight: 'bold' }} colSpan={1}>
									M.I:
								</td>
								<td style={cellStyle}>Nuevo</td>
								<td style={{ ...cellStyle, fontWeight: 'bold' }}>Last Name:</td>
								<td style={cellStyle} colSpan={3}>
									Molina
								</td>
							</tr>
							<tr>
								<td style={{ ...cellStyle, fontWeight: 'bold' }} colSpan={1}>
									Addres:
								</td>
								<td style={cellStyle} colSpan={3}>
									AVE 678
								</td>

								<td style={{ ...cellStyle, fontWeight: 'bold' }} colSpan={1}>
									City:
								</td>
								<td style={cellStyle} colSpan={3}>
									Cali
								</td>
							</tr>
							<tr>
								<td style={{ ...cellStyle, fontWeight: 'bold' }}>State:</td>
								<td style={cellStyle} colSpan={2}>
									Cali
								</td>

								<td style={{ ...cellStyle, fontWeight: 'bold' }} colSpan={1}>
									Zip Code:
								</td>
								<td style={cellStyle}>113101</td>
								<td style={{ ...cellStyle, fontWeight: 'bold' }}>Phone:</td>
								<td style={cellStyle} colSpan={3}>
									123456789
								</td>
							</tr>
							<tr>
								<td style={{ ...cellStyle, fontWeight: 'bold' }} colSpan={1}>
									Social Security(*):
								</td>
								<td style={cellStyle} colSpan={3}>
									123567890
								</td>

								<td style={{ ...cellStyle, fontWeight: 'bold' }} colSpan={2}>
									DOB(Fecha de Nacimiento):
								</td>
								<td style={cellStyle} colSpan={2}>
									01/01/2001
								</td>
							</tr>
							<tr>
								<td style={{ ...cellStyle, fontWeight: 'bold' }} colSpan={4}>
									Reason for Remittance:
								</td>
								<td style={cellStyle} colSpan={4}>
									Family Support
								</td>
							</tr>
							<tr>
								<td style={{ ...cellStyle, fontWeight: 'bold' }} colSpan={4}>
									RelationShip with Beneficiary:
								</td>
								<td style={cellStyle} colSpan={4}>
									Aunt
								</td>
							</tr>
							<tr>
								<td style={{ ...cellStyle, fontWeight: 'bold' }} colSpan={8}>
									(*)The sender must provide the SSN. If the customer does not
									have a Social Security Number, the ID must be mot expured
									passport. If the customer does moy have a Social Security Number
									AND does not have a foreign paaport, please check this box.
								</td>
							</tr>
							<tr>
								<td style={{ ...cellStyle, height: '25px' }} colSpan={8}></td>
							</tr>
							<tr>
								<td
									style={{
										...cellStyle,
										textAlign: 'center',
										fontWeight: 'bold',
									}}
									colSpan={8}>
									PHOTO IDENTIFICATION
								</td>
							</tr>
							<tr>
								<td style={{ ...cellStyle, fontWeight: 'bold' }} colSpan={8}>
									TYPE OF PROVIDED: PASSPORT
								</td>
							</tr>
							<tr>
								<td style={{ ...cellStyle, fontWeight: 'bold' }}>ID Number:</td>
								<td style={cellStyle} colSpan={2}>
									123
								</td>

								<td style={{ ...cellStyle, fontWeight: 'bold' }} colSpan={1}>
									EXPIRATION DATE(*):
								</td>
								<td style={cellStyle}>01/01/2000</td>
								<td style={{ ...cellStyle, fontWeight: 'bold' }}>
									STATE or COUNTRY OF ISSUED:
								</td>
								<td style={cellStyle} colSpan={3}>
									01/01/2000
								</td>
							</tr>
							<tr>
								<td style={cellStyle} colSpan={4}></td>
								<td style={{ ...cellStyle, fontWeight: 'bold' }} colSpan={4}>
									(*must not be expired)
								</td>
							</tr>
							<tr>
								<td style={{ ...cellStyle, height: '25px' }} colSpan={8}></td>
							</tr>
							<tr>
								<td
									style={{
										...cellStyle,
										textAlign: 'center',
										fontWeight: 'bold',
									}}
									colSpan={8}>
									JOB INFORMATION MUST BE PROVIDED
								</td>
							</tr>
							<tr>
								<td style={{ ...cellStyle, fontWeight: 'bold' }} colSpan={2}>
									Employer/Company:
								</td>
								<td style={cellStyle} colSpan={2}>
									SMA
								</td>
								<td style={{ ...cellStyle, fontWeight: 'bold' }} colSpan={2}>
									Phone:
								</td>
								<td style={cellStyle} colSpan={2}>
									12345678
								</td>
							</tr>
							<tr>
								<td style={{ ...cellStyle, fontWeight: 'bold' }} colSpan={4}>
									Addres:
								</td>
								<td style={cellStyle} colSpan={4}></td>
							</tr>
							<tr>
								<td style={{ ...cellStyle, fontWeight: 'bold' }} colSpan={4}>
									Occupation:
								</td>
								<td style={cellStyle} colSpan={4}></td>
							</tr>
							<tr>
								<td style={{ ...cellStyle, fontWeight: 'bold' }} colSpan={4}>
									Contact Person:
								</td>
								<td style={cellStyle} colSpan={4}></td>
							</tr>
							<tr>
								<td style={{ ...cellStyle, height: '25px' }} colSpan={8}></td>
							</tr>
							<tr>
								<td
									style={{
										...cellStyle,
										textAlign: 'center',
										fontWeight: 'bold',
									}}
									colSpan={8}>
									ADITIONAL INFORMATION
								</td>
							</tr>
							<tr>
								<td style={{ ...cellStyle, fontWeight: 'bold' }} colSpan={8}>
									LOOK FOR THE AGENT MANUAL FOR TRANSACTION EQUAL OR OVER US
									$5.000.00 AND/OR AGGREGATED AMOUNT THE AGENTMUST KEEP RECORD FOR
									FIVE YEARS FROM THE TRANSACTION DATE. Transaction in HOLD over
									48 hours will be rejected. Any delay in providing the requested
									information will be subject to any changes in the rate.
								</td>
							</tr>
						</tbody>
					</table>
				</ModalBody>
				<ModalFooter>
					<Button
						color='info'
						icon='Save'
						onClick={() => {
							setUploadModal(false);
						}}>
						Save & Send
					</Button>
				</ModalFooter>
			</Modal>

			<Modal
				isOpen={PrintModal}
				setIsOpen={setPrintModal}
				titleId='exampleModalLabel'
				isStaticBackdrop={false}
				isScrollable={false}
				isCentered={true}
				size={'lg'}
				fullScreen={'lg'}
				isAnimation={true}>
				<ModalTitle id='tour-title' className='d-flex align-items-end bg-light '>
					<div className='m-3 '></div>
				</ModalTitle>
				<ModalBody id='modalContent'>
				{/* {tipo === 1 ? ReceiptOnePage items={items}  : tipo === 2 ? <ReceiptPos items={items} /> : null} */}
				<ReceiptOnePage items={items} />
				</ModalBody>
			</Modal>
		</PageWrapper>
	);
};
export default InvoicePage;
