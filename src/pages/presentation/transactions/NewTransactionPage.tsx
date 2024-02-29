import { useEffect, useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { demoPagesMenu } from '../../../menu';
import Page from '../../../layout/Page/Page';
import Card, { CardHeader } from '../../../components/bootstrap/Card';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import {
	Agency,
	ListsSelect,
	Locations,
	getBankAccountType,
	getNationalities,
	getRateServiceType,
	getTypeidentification,
	getRecipientRelationship,
} from '../../../services/TransactionsService';
import {
	Countries,
	Reasons,
	getReasons,
	getCountries,
} from '../../../services/NewTransactionService';
import Label from '../../../components/bootstrap/forms/Label';
import SenderCard from '../../../components/transactions/SenderCard';
import RecipientCard from '../../../components/transactions/RecipientCard';
import InvoiceCard from '../../../components/transactions/InvoiceCard';
import { Tabs } from '../../../components/transactions/Tabs';

const NewTransactionPage = () => {
	const [locationsList, setLocationsList] = useState<Locations[]>([]);
	const [phone1List, setPhone1List] = useState<ListsSelect[]>([]);
	const [nationalitiesList, setNationalitiesList] = useState<ListsSelect[]>([]);
	const [typeIndentificationList, setTypeIndentificationList] = useState<ListsSelect[]>([]);
	const [bankAccountingTypeList, setBankAccountingTypeList] = useState<ListsSelect[]>([]);
	const [countriesList, setCountriesList] = useState<ListsSelect[]>([]);
	const [reasonList, setReasonList] = useState([]);
	const [serviceList, setServiceList] = useState<ListsSelect[]>([]);
	const [relationShip, setRelationShip] = useState([]);
	const [selectedTab, setSelectedTab] = useState(1);
	const [tabValidity, setTabValidity] = useState([true, false, false]); // Inicialmente, solo la pestaña 1 es válida

	useEffect(() => {
		getNationalities(
			(response) => {
				const list = response.data.reduce(
					(acc: any, nationality: Agency, index: number) => {
						const { name, code } = nationality;
						acc[index] = {
							value: code,
							label: name,
							isFixed: true,
						};
						return acc;
					},
					[],
				);
				setNationalitiesList(list);
			},
			() => {},
		);
		getCountries(
			(response) => {
				const list = response.data.reduce((acc: any, country: Countries, index: number) => {
					const { name, code } = country;
					acc[index] = {
						value: code,
						label: name,
						isFixed: true,
					};
					return acc;
				}, []);
				setCountriesList(list);
			},
			() => {},
		);
		getTypeidentification(
			(response) => {
				const list = response.data.reduce((acc: any, sender: Agency, index: number) => {
					const { name, code } = sender;
					acc[index] = {
						value: code,
						label: name,
						isFixed: true,
					};
					return acc;
				}, []);
				setTypeIndentificationList(list);
			},
			() => {},
		);
		getRecipientRelationship(
			(response) => {
				const list = response.data.reduce((acc: any, sender: Agency, index: number) => {
					const { name, code } = sender;
					acc[index] = {
						value: code,
						label: name,
						isFixed: true,
					};
					return acc;
				}, []);
				setRelationShip(list);
			},
			() => {},
		);
		getBankAccountType(
			(response) => {
				const list = response.data.reduce((acc: any, sender: Agency, index: number) => {
					const { name, code } = sender;
					acc[index] = {
						value: code,
						label: name,
						isFixed: true,
					};
					return acc;
				}, []);
				setBankAccountingTypeList(list);
			},
			() => {},
		);
		getReasons(
			(response) => {
				const list = response.data.reduce((acc: any, reason: Reasons, index: number) => {
					const { name, code } = reason;
					acc[index] = {
						value: code,
						label: name,
						isFixed: true,
					};
					return acc;
				}, []);

				setReasonList(list);
			},
			() => {},
		);
		getRateServiceType(
			(response) => {
				const list = response.data.reduce((acc: any, reason: Reasons, index: number) => {
					const { name, code } = reason;
					acc[index] = {
						value: code,
						text: name,
						isFixed: true,
					};
					return acc;
				}, []);
				setServiceList(list);
			},
			() => {},
		);
	}, []);

	const handleTabChange = (tabId: number) => {
		if (canChangeTab(tabId)) {
			setSelectedTab(tabId);
		}
	};

	const canChangeTab = (tabId: number) => {
		if (tabId < selectedTab) {
			setTabValidity((prevValidity) => ({
				...prevValidity,
				[selectedTab - 1]: false,
			}));
		} else if (tabId === selectedTab + 1) {
			return tabValidity[selectedTab];
		}
		return true;
	};

	return (
		<PageWrapper title={demoPagesMenu.editPages.subMenu.editModern.text}>
			<Page>
				<div className='row p-2'>
					<div className='col-md-9'></div>
					<div className='col-md-3'>
						<FormGroup className={'row'} id='invoiceNo'>
							<Label className='col-sm-5' isColForLabel>
								Invoice No.
							</Label>
							<div className='col-sm-7'>
								<Input
									placeholder='Invoice No.'
									autoComplete='invoiceNo'
									validFeedback='Looks good!'
								/>
							</div>
						</FormGroup>
					</div>
				</div>

				<Card>
					<CardHeader>
						<div className='card-actions'>
							<Tabs
								onSelectTab={handleTabChange}
								selectedTab={selectedTab}
								tabValidity={tabValidity}
							/>
						</div>
					</CardHeader>
					<div className={1 === selectedTab ? '' : 'd-none'}>
						<SenderCard
							countriesList={countriesList}
							typeIndentificationList={typeIndentificationList}
							setTabValidity={setTabValidity}
							setSelectedTab={setSelectedTab}
						/>
					</div>
					<div className={2 === selectedTab ? '' : 'd-none'}>
						<RecipientCard
							countriesList={countriesList}
							nationalitiesList={nationalitiesList}
							relationShip={relationShip}
							reasonList={reasonList}
							typeIndentificationList={typeIndentificationList}
							setTabValidity={setTabValidity}
							setSelectedTab={setSelectedTab}
						/>
					</div>
					<div className={3 === selectedTab ? '' : 'd-none'}>
						<InvoiceCard
							bankAccountingTypeList={bankAccountingTypeList}
							serviceList={serviceList}
							setTabValidity={setTabValidity}
							setSelectedTab={setSelectedTab}
						/>
					</div>
				</Card>
			</Page>
		</PageWrapper>
	);
};

export default NewTransactionPage;
