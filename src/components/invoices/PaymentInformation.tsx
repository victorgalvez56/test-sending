import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormGroup from '../bootstrap/forms/FormGroup';
import Input from '../bootstrap/forms/Input';
import InputGroup from '../bootstrap/forms/InputGroup';
import Select from '../bootstrap/forms/Select';
import Checks from '../bootstrap/forms/Checks';
import { Tabs2 } from '../transactions/Tabs';
import { demoPagesMenu } from '../../menu';
import { InvoiceReponse } from '../../services/InvoiceServices';
import PropTypes from 'prop-types';

interface InvoiceInformationProps {
	items: InvoiceReponse[];
}

export const PaymentInformation: React.FC<InvoiceInformationProps> = ({ items }) => {
	const [currencyListOrigin, setCurrencyListOrigin] = useState([]);
	const [currencyListDes, setCurrencyListDes] = useState([]);
	const [bankAccounts, setBankAccounts] = useState([]);

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
		<>
			{items.map((item, index) => (
				<div key={index} className='row mt-20'>
					<div className='row mt-2'>
						<div className='col-md-3 m-3'>
							<FormGroup id='paymentDate' label='Payment Date'>
								<Input
									placeholder='Payment Date'
									autoComplete='family-name'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={item.paymentG.date.split('T')[0]}
									isValid={formik.isValid}
									isTouched={formik.touched.mname2}
									invalidFeedback={formik.errors.mname2}
									validFeedback='Looks good!'
								/>
							</FormGroup>
						</div>
						<div className='col-md-3 m-3'>
							<FormGroup id='receiver' label='Receiver'>
								<Input
									placeholder='Receiver'
									autoComplete='family-name'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={item.paymentG.recipient}
									isValid={formik.isValid}
									isTouched={formik.touched.mname2}
									invalidFeedback={formik.errors.mname2}
									validFeedback='Looks good!'
								/>
							</FormGroup>
						</div>
						<div className='col-md-3 m-3'>
							<FormGroup id='paymentRDate' label='Payment Registered Date'>
								<Input
									placeholder='Payment Registered Date'
									autoComplete='family-name'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={item.paymentG.dateActual.split('T')[0]}
									isValid={formik.isValid}
									isTouched={formik.touched.mname2}
									invalidFeedback={formik.errors.mname2}
									validFeedback='Looks good!'
								/>
							</FormGroup>
						</div>
						<div className='row mt-2'></div>
						<div className='col-md-3 m-3'>
							<FormGroup id='typeID' label='Type ID'>
								<Input
									placeholder='Type ID'
									autoComplete='family-name'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={item.paymentG.recipientIdType}
									isValid={formik.isValid}
									isTouched={formik.touched.mname2}
									invalidFeedback={formik.errors.mname2}
									validFeedback='Looks good!'
								/>
							</FormGroup>
						</div>
						<div className='col-md-3 m-3'>
							<FormGroup id='identification' label='Identification No'>
								<Input
									placeholder='Identification No'
									autoComplete='family-name'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={item.paymentG.recipientIdNumber}
									isValid={formik.isValid}
									isTouched={formik.touched.mname2}
									invalidFeedback={formik.errors.mname2}
									validFeedback='Looks good!'
								/>
							</FormGroup>
						</div>
					</div>
				</div>
			))}
		</>
	);
};
PaymentInformation.propTypes = {
	items: PropTypes.array.isRequired,
  }
export default PaymentInformation;
