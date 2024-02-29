import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormGroup from '../bootstrap/forms/FormGroup';
import Input from '../bootstrap/forms/Input';
import {
	InvoiceReponse,
	getBankAccountType,
	AgencyStatusResponse,
} from '../../services/InvoiceServices';
import PropTypes from 'prop-types';

interface InvoiceInformationProps {
	items: InvoiceReponse[];
}

export const InvoiceInformation: React.FC<InvoiceInformationProps> = ({ items }) => {
	const [bankAccountTypes, setBankAccountType] = useState<AgencyStatusResponse | null>(null);

	useEffect(() => {
		items.forEach((invoiceResponse) => {
			const bankAccountType = invoiceResponse.bankAccountType;
			getBankAccountType(
				bankAccountType,
				(response: AgencyStatusResponse) => {
					setBankAccountType(response);
					console.error('esto', response);
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
			agency: '',
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
		<>
			{items.map((item, index) => (
				<div key={index} className='row mt-2 '>
					<div className='col-md-2 m-2'>
						<FormGroup id='agency-payer' label='Agency Payer'>
							<Input
								placeholder='Agency Payer'
								autoComplete='agency-payer'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={item.agency}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='currency-origin' label='Currency'>
							<Input
								placeholder='Currency'
								autoComplete='agency-payer'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={item.curDestination}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='currency-origin' label='Origin'>
							<Input
								placeholder='Origin'
								autoComplete='agency-payer'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={item.curOrigin}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='currency-origin' label='Net Amount'>
							<Input
								placeholder='Net Amount'
								autoComplete='agency-payer'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={item.amount}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='currency-origin' label='Exchange Rate'>
							<Input
								placeholder='Exchange Rate'
								autoComplete='agency-payer'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={item.exchangeRate}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='currency-origin' label='Payment Mode'>
							<Input
								placeholder='Payment Mode'
								autoComplete='agency-payer'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								//value={item.agency}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='currency-origin' label='Fees'>
							<Input
								placeholder='Fees'
								autoComplete='agency-payer'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={item.fee}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='currency-origin' label='Total to pay'>
							<Input
								placeholder='Total to pay'
								autoComplete='agency-payer'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={item.payeeTotalToPay}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='currency-origin' label='Bank Name'>
							<Input
								placeholder='Bank Name'
								autoComplete='agency-payer'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={item.bankName}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='currency-origin' label='Handling'>
							<Input
								placeholder='Handling'
								autoComplete='agency-payer'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={item.handling}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='currency-origin' label='Invoice No.'>
							<Input
								placeholder='Invoice No.'
								autoComplete='agency-payer'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={item.agency + '-' + item.code}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='net-amount' label='Bank Branch'>
							<Input
								placeholder='Bank Branch'
								autoComplete='net-amount'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={item.bankBranch}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2 '>
						<FormGroup id='exchange-rate' label='Total'>
							<Input
								placeholder='Total'
								autoComplete='exchange-rate'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={item.total}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2 '>
						<FormGroup id='exchange-rate' label='Folio'>
							<Input
								placeholder='Folio'
								autoComplete='exchange-rate'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={item.folio}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2 '>
						<FormGroup id='exchange-rate' label='PIN'>
							<Input
								placeholder='PIN'
								autoComplete='exchange-rate'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={item.folio}
								isValid={formik.isValid}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2 mb-4 justify-content-start'>
						<FormGroup id='exchange-rate' label='Bank Account'>
							<Input
								placeholder='Bank Account'
								autoComplete='exchange-rate'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={
									bankAccountTypes?.data[0].name + '-' + item.bankAccountNumber
								}
								isTouched={formik.touched.mname2}
								invalidFeedback={formik.errors.mname2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
				</div>
			))}
		</>
	);
};

InvoiceInformation.propTypes = {
	items: PropTypes.array.isRequired,
  }
export default InvoiceInformation;
