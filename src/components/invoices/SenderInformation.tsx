import React, { useEffect, useState } from 'react';
import Button from '../bootstrap/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormGroup from '../bootstrap/forms/FormGroup';
import Input from '../bootstrap/forms/Input';
import Checks, { ChecksGroup } from '../bootstrap/forms/Checks';
import Modal, { ModalBody, ModalFooter, ModalTitle } from '../bootstrap/Modal';
import {
	Sender,
	AgencyStatusResponse,
	getTypeidentification,
	InvoiceReponse,
} from '../../services/InvoiceServices';

interface SenderInformationProps {
	items: Sender[];
}

export const SenderInformation: React.FC<SenderInformationProps> = ({ items }) => {
	const [typeIdentifications, setTypeIdentification] = useState<AgencyStatusResponse | null>(
		null,
	);

	useEffect(() => {
		items.forEach((invoiceResponse) => {
			const typeIdentification = invoiceResponse.typeId;
			getTypeidentification(
				typeIdentification,
				(response: AgencyStatusResponse) => {
					setTypeIdentification(response);
					console.error('lo ultimo', response);
				},
				(error) => {
					console.error('Error fetching data:', error);
				},
			);
		});
	}, [items]);

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

	const [uploadModal, setUploadModal] = useState<boolean>(false);

	return (
		<>
			{items.map((item, index) => (
				<div key={index} className='row mt-3'>
					<div className='col-md-2 m-2'>
						<FormGroup id='fname' label='First Name'>
							<Input
								placeholder='First Name'
								autoComplete='first-name'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={item.fname}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>

					<div className='col-md-2 m-2'>
						<FormGroup id='mname' label='Middle Name'>
							<Input
								placeholder='Middle Name'
								autoComplete='middle-name'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={item.mname}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='lname' label='Last Name'>
							<Input
								placeholder='Last Name'
								autoComplete='last-name'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={item.lname}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='sname' label='Second Name'>
							<Input
								placeholder='Second Name'
								autoComplete='second-name'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={item.slname}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='address' label='Address'>
							<Input
								placeholder='Address'
								autoComplete='address'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={item.address}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='zip' label='Zip Code'>
							<Input
								placeholder='Zip Code'
								autoComplete='zip-code'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={item.zipcode}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='country' label='Country'>
							<Input
								placeholder='Country'
								autoComplete='country'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={item.country}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='state' label='State'>
							<Input
								placeholder='State'
								autoComplete='state'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={item.state}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='city' label='City'>
							<Input
								placeholder='City'
								autoComplete='city'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={item.city}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='nationality' label='Nationality'>
							<Input
								placeholder='Nationality'
								autoComplete='nationality'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={item.nationality}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='issue-place' label='ID issue place'>
							<Input
								placeholder='ID issue place'
								autoComplete='issue-place'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								//value={item.idStorageLocation1}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='phone' label='Phone'>
							<Input
								placeholder='Phone'
								autoComplete='phone'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={item.phone1}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='phone2' label='Phone 2'>
							<Input
								placeholder='Phone 2'
								autoComplete='phone2'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={item.phone2}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='email' label='Email'>
							<Input
								placeholder='Email'
								autoComplete='email'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={item.email}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='address' label='ID type'>
							<Input
								placeholder='ID type'
								autoComplete='address'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={typeIdentifications?.data[0].name}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='zip' label='ID No'>
							<Input
								placeholder='ID No'
								autoComplete='zip-code'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={item.numberId}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='country' label='ID expiration date'>
							<Input
								placeholder='ID expiration date'
								autoComplete='country'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={item.expDateId.split('T')[0]}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='state' label='Birth date'>
							<Input
								placeholder='Birth date'
								autoComplete='state'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={item.birthDate.split('T')[0]}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='city' label='Utility bill'>
							<Input
								placeholder='Utility bill'
								autoComplete='city'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={item.utilityBill}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 mt-5 m-2'>
						<FormGroup id='state' label=''>
							<Checks
								id={'confirmEmail'}
								name={'Confirm by Email'}
								label={'Confirm by Email'}
								type={'checkbox'} // 'checkbox' || 'radio' || 'switch'
								checked={true}
								disabled={false}
								isInline={false}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={item.email}
								isValid={formik.isValid}></Checks>
						</FormGroup>
					</div>

					<div className='row mt-5 mb-5 justify-content-center'>
						<button
							className='btn btn-primary btn-sm col-3 mx-3'
							style={{ height: '35px' }}
							onClick={() => {
								setUploadModal(true);
							}}>
							Add Document
						</button>
					</div>
				</div>
			))}
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
								<th>Type Ident</th>
								<th>Id Number</th>
								<th>Issue Date</th>
								<th>Exp Date</th>
								<th>Satatus</th>
								<th>Name</th>
								<th>Image (Front)</th>
								<th>Image (Back)</th>
								<td />
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Other</td>
								<td>8211234567890</td>
								<td>02/02/2023</td>
								<td>02/02/2023</td>
								<td>NEW</td>
								<td>Cedula</td>
								<td className='text-primary text-decoration-underline'>
									View File
								</td>
								<td className='text-primary text-decoration-underline'>
									View File
								</td>
							</tr>
							<tr>
								<td>Other</td>
								<td>8211234567890</td>
								<td>02/02/2023</td>
								<td>02/02/2023</td>
								<td>NEW</td>
								<td>Cedula</td>
								<td className='text-primary text-decoration-underline'>
									View File
								</td>
								<td className='text-primary text-decoration-underline'>
									View File
								</td>
							</tr>
							<tr>
								<td>Other</td>
								<td>8211234567890</td>
								<td>02/02/2023</td>
								<td>02/02/2023</td>
								<td>NEW</td>
								<td>Cedula</td>
								<td className='text-primary text-decoration-underline'>
									View File
								</td>
								<td className='text-primary text-decoration-underline'>
									View File
								</td>
							</tr>
							<tr>
								<td>Other</td>
								<td>8211234567890</td>
								<td>02/02/2023</td>
								<td>02/02/2023</td>
								<td>NEW</td>
								<td>Cedula</td>
								<td className='text-primary text-decoration-underline'>
									View File
								</td>
								<td className='text-primary text-decoration-underline'>
									View File
								</td>
							</tr>
						</tbody>
					</table>
					<div className='row mt-2'>
						<div className='col-md-3 m-3'>
							<FormGroup id='paymentDate' label='Type Identification'>
								<Input
									placeholder='Type Identification'
									autoComplete='family-name'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									//value={item.zipcode}
									isValid={formik.isValid}
									isTouched={formik.touched.mname2}
									invalidFeedback={formik.errors.mname2}
									validFeedback='Looks good!'
								/>
							</FormGroup>
						</div>
						<div className='col-md-3 m-3'>
							<FormGroup id='receiver' label='Id Number'>
								<Input
									placeholder='Id Number'
									autoComplete='family-name'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									//value={item.zipcode}
									isValid={formik.isValid}
									isTouched={formik.touched.mname2}
									invalidFeedback={formik.errors.mname2}
									validFeedback='Looks good!'
								/>
							</FormGroup>
						</div>
						<div className='col-md-3 m-3'>
							<FormGroup id='receiver' label='Id Name'>
								<Input
									placeholder='Id Name'
									autoComplete='family-name'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.mname2}
									isValid={formik.isValid}
									isTouched={formik.touched.mname2}
									invalidFeedback={formik.errors.mname2}
									validFeedback='Looks good!'
								/>
							</FormGroup>
						</div>
						<div className='col-md-3 m-3'>
							<FormGroup id='paymentRDate' label='Issued By'>
								<Input
									placeholder='Payment Issued By'
									autoComplete='family-name'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.mname2}
									isValid={formik.isValid}
									isTouched={formik.touched.mname2}
									invalidFeedback={formik.errors.mname2}
									validFeedback='Looks good!'
								/>
							</FormGroup>
						</div>
						<div className='col-md-3 m-3'>
							<FormGroup id='typeID' label='Issue Date'>
								<Input
									placeholder='Issue Date'
									autoComplete='family-name'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.mname2}
									isValid={formik.isValid}
									isTouched={formik.touched.mname2}
									invalidFeedback={formik.errors.mname2}
									validFeedback='Looks good!'
								/>
							</FormGroup>
						</div>
						<div className='col-md-3 m-3'>
							<FormGroup id='typeID' label='Exp Date'>
								<Input
									autoComplete='family-name'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.mname2}
									isValid={formik.isValid}
									isTouched={formik.touched.mname2}
									invalidFeedback={formik.errors.mname2}
									validFeedback='Looks good!'
								/>
							</FormGroup>
						</div>
						<div className='col-md-3 m-3'>
							<FormGroup id='typeID' label='Country Issue'>
								<Input
									autoComplete='family-name'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.mname2}
									isValid={formik.isValid}
									isTouched={formik.touched.mname2}
									invalidFeedback={formik.errors.mname2}
									validFeedback='Looks good!'
								/>
							</FormGroup>
						</div>
						<div className='col-md-3 m-3'>
							<FormGroup id='typeID' label='State Issue'>
								<Input
									autoComplete='family-name'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.mname2}
									isValid={formik.isValid}
									isTouched={formik.touched.mname2}
									invalidFeedback={formik.errors.mname2}
									validFeedback='Looks good!'
								/>
							</FormGroup>
						</div>
						<div className='col-md-3 m-3'>
							<FormGroup id='typeID' label='ID Status'>
								<ChecksGroup className='d-flex align-items-center'>
									<Checks
										id='companyA'
										label=' APPROVED '
										onChange={formik.handleChange}
										//checked={formik.values.companyA}
										className='mx-2'
									/>
									<Checks
										id='companyB'
										label=' REJECTED '
										onChange={formik.handleChange}
										//checked={formik.values.companyB}
										className='mx-2'
									/>
									<Checks
										id='companyC'
										label=' NEW '
										onChange={formik.handleChange}
										//checked={formik.values.companyC}
										className='mx-2'
									/>
								</ChecksGroup>
							</FormGroup>
						</div>
					</div>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<label style={{ marginLeft: '5px' }}>
							File with ID tu upload (Front Side):
						</label>
						<input type='text' className='m-2 col-md-2' />
						<button className='btn btn-info m-2'>Browser</button>

						<label style={{ marginLeft: '5px' }}>
							File with ID tu upload (Back Side):
						</label>
						<input type='text' className='m-2 col-md-2' />
						<button className='btn btn-info m-2'>Browser</button>
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
						Save
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};
export default SenderInformation;
