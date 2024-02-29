import { createStore, createHook } from 'react-sweet-state';
import { Sender } from '../services/TransactionsService';
import { Invoices, Recipients } from '../services/NewTransactionService';

const Store = createStore({
	initialState: {
		senderInformation: {} as Sender,
		recipientInformation: {} as Recipients,
		invoiceInformation: {} as Invoices,
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
			(invoiceInformation: Invoices) =>
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
