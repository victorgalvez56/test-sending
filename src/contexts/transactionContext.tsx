import { createStore, createHook } from 'react-sweet-state';
import { Sender } from '../services/TransactionsService';
import { Payees, Recipients } from '../services/NewTransactionService';

const Store = createStore({
	initialState: {
		senderInformation: {} as Sender,
		recipientInformation: {} as Recipients,
		invoiceInformation: {} as Payees,
		invoiceCountry: '' as string,
		invoiceCity: '' as string,
	},
	actions: {
		setSenderInformation:
			(senderInformation: Sender) =>
			({ setState }) => {
				setState({
					senderInformation,
				});
			},
		setRecipientInformation:
			(recipientInformation: Recipients) =>
			({ setState }) => {
				setState({
					recipientInformation,
				});
			},
		setInvoiceInformation:
			(invoiceInformation: Payees) =>
			({ setState }) => {
				setState({
					invoiceInformation,
				});
			},
		setInvoiceCountry:
			(invoiceCountry: string) =>
			({ setState }) => {
				setState({
					invoiceCountry,
				});
			},
		setInvoiceCity:
			(invoiceCity: string) =>
			({ setState }) => {
				setState({
					invoiceCity,
				});
			},
	},
	name: 'useUserSweet',
});
export const useTransactionSweet = createHook(Store);
