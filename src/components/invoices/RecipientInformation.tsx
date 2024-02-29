import React from 'react';
import FormGroup from '../bootstrap/forms/FormGroup';
import Input from '../bootstrap/forms/Input';
import Checks from '../bootstrap/forms/Checks';
import { Recipient } from '../../services/InvoiceServices';

interface RecipientInformationProps {
	items: Recipient[];
}

export const RecipientInformation: React.FC<RecipientInformationProps> = ({ items }) => {
	return (
		<>
			{items.map((item, index) => (
				<div key={index} className='row mt-2'>
					<div className='col-md-2 m-2'>
						<FormGroup id='fname' label='First Name'>
							<Input
								placeholder='First Name'
								autoComplete='first-name'
								value={item.fname}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='mname' label='Middle Name'>
							<Input
								placeholder='Middle Name'
								autoComplete='middle-name'
								value={item.mname}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='lname' label='Last Name'>
							<Input
								placeholder='Last Name'
								autoComplete='last-name'
								value={item.lname}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='sname' label='Second Name'>
							<Input
								placeholder='Second Name'
								autoComplete='second-name'
								value={item.slname}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='address' label='Address'>
							<Input
								placeholder='Address'
								autoComplete='address'
								value={item.address}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='zip' label='Zip Code'>
							<Input
								placeholder='Zip Code'
								autoComplete='zip-code'
								value={item.zipcode}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='country' label='Country'>
							<Input
								placeholder='Country'
								autoComplete='country'
								value={item.country}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='state' label='State'>
							<Input
								placeholder='State'
								autoComplete='state'
								value={item.state}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='city' label='City'>
							<Input
								placeholder='City'
								autoComplete='city'
								value={item.city}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='phone' label='Phone'>
							<Input
								placeholder='Phone'
								autoComplete='phone'
								value={item.phone1}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='phone2' label='Phone 2'>
							<Input
								placeholder='Phone 2'
								autoComplete='phone2'
								value={item.phone2}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-2'>
						<FormGroup id='email' label='Email'>
							<Input
								placeholder='Email'
								autoComplete='email'
								value={item.email}
								validFeedback='Looks good!'
							/>
						</FormGroup>
					</div>
					<div className='col-md-2 m-5'>
						<FormGroup id='state' label=''>
							<Checks
								id={'confirmEmail'}
								name={'Confirm by Email'}
								label={'Confirm by Email'}
								type={'checkbox'} // 'checkbox' || 'radio' || 'switch'
								checked={true}
								disabled={false}
								isInline={false}
								value={item.fname}></Checks>
						</FormGroup>
					</div>
				</div>
			))}
		</>
	);
};
export default RecipientInformation;
