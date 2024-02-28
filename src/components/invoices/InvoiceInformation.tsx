import React, { useEffect, useState, useContext } from 'react';
import Button from '../bootstrap/Button';
import Page from '../../layout/Page/Page';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useDarkMode from '../../hooks/useDarkMode';
import Card, { CardBody, CardHeader } from '../bootstrap/Card';
import FormGroup from '../bootstrap/forms/FormGroup';
import Input from '../bootstrap/forms/Input';
import InputGroup from '../bootstrap/forms/InputGroup';
import Select from '../bootstrap/forms/Select';
import Checks from '../bootstrap/forms/Checks';
import { Tabs2 } from '../transactions/Tabs';
import { demoPagesMenu } from '../../menu';

export const InvoiceInformation = ({}) => {

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
		<div className='row mt-20'>
			<div className='col-md-4 m-2'>
				<FormGroup id='agency-payer' label='Agency Payer'>
					<Input
						placeholder='Agency Payer'
						autoComplete='agency-payer'
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
			<div className='col-md-3 m-2'>
				<FormGroup id='currency-origin'   label ='Currency Origin'>
					<InputGroup id={'String'} isWrap={true}>
						<Select
							id={'currency-origin'}
							required={true}
							ariaDescribedby={'Currency Origin'}
							ariaLabelledby={'Currency Origin'}
							ariaLabel={'Currency Origin'}
							list={currencyListOrigin}
							multiple={false}
							disabled={false}
							value={currencyListOrigin}
							defaultValue={currencyListOrigin}
							onBlur={Function}
							onChange={Function}
							onFocus={Function}
							onInput={Function}
							onInvalid={Function}
							onSelect={Function}
						/>
						<Select

							id={'currency-origin'}
							required={true}
							ariaDescribedby={'Currency Dest'}
							ariaLabelledby={'Currency Dest'}
							ariaLabel={'Currency Dest'}
							list={currencyListDes}
							multiple={false}
							disabled={false}
							value={currencyListDes}
							defaultValue={currencyListDes}
							onBlur={Function}
							onChange={Function}
							onFocus={Function}
							onInput={Function}
							onInvalid={Function}
							onSelect={Function}
						/>
					</InputGroup>
				</FormGroup>
			</div>
			<div className='col-md-3 m-2'>
				<FormGroup id='net-amount' label='Net Amount'>
					<Input
						placeholder='Net Amount'
						autoComplete='net-amount'
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
			<div className='col-md-3 m-2 mb-4'>
				<FormGroup id='exchange-rate' label='Exchange Rate'>
					<Input
						placeholder='Exchange Rate'
						autoComplete='exchange-rate'
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
		</div>
	);
};
export default InvoiceInformation;
