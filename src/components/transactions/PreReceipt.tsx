import { FC } from 'react';
import { Recipients, SearchInvoice } from '../../services/NewTransactionService';
import { Sender } from '../../services/TransactionsService';

interface PreReceiptProps {
	invoiceInfo: {
		currency: string;
		service: string;
		netAmount: number;
		exchangeRate: string;
		paymentMode: string;
		fees: string;
		totalToPay: string;
		bankName: string;
		handling: number;
		forexProfit: string;
		bankBranch: string;
		total: string;
		folioPinNumber: string;
		bankAccountNumber: string;
		bankAccountType: string;
		agentFee: string;
	};
	recipient: Recipients;
	sender: Sender;
	agency: string;
	currencyDest: string | undefined;
}

export const PreReceipt: FC<PreReceiptProps> = ({
	invoiceInfo,
	recipient,
	sender,
	agency,
	currencyDest,
}) => {
	return (
		<div className='row'>
			<div className='col-10'>
				<p>
					<span>
						<table>
							<tr>
								<td style={{ width: '50%', textAlign: 'start' }}>
									<img
										width='150'
										height='100'
										src='https://www.firstbanknigeria.com/wp-content/uploads/2021/11/small-world.jpg'
									/>
								</td>
								<td style={{ width: '50%', textAlign: 'start' }}>
									<p className='p-style'>Ph: 1-877-268-6458</p>
									<p className='p-style'>
										70 Grand Avenue, Suite 104, River Edge
									</p>
									<p className='p-style'>RIVER EDGE, NJ, 07661</p>
								</td>
							</tr>
						</table>
					</span>
				</p>
				<b
					style={{
						margin: 0,
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap',
					}}>
					TEST AGENCY ({agency})
				</b>
				<p
					style={{
						margin: 0,
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap',
					}}>
					560 Sylvan Ave, Acampo, CA, 07661
				</p>
				<p
					style={{
						margin: 0,
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap',
					}}>
					Agent of Choice Money Transfer, Inc.
				</p>
			</div>

			<div className='col-10' style={{ textAlign: 'center' }}>
				<p>Today&#39;s Date/Fecha de hoy: {new Date().toISOString().slice(0, 10)}</p>
				<h5>NOT A RECEIPT / NO ES UN RECIBO</h5>
				<h6>SENDER / REMITENTE</h6>
			</div>

			<div className='col-10' style={{ textAlign: 'center' }}>
				<table style={{ width: '100%' }}>
					<tr>
						<td style={{ width: '50%', textAlign: 'start' }}>Code / Codigo:</td>
						<td style={{ width: '50%', textAlign: 'start' }}>{sender.code}</td>
					</tr>
					<tr>
						<td style={{ width: '50%', textAlign: 'start' }}>Name / Nombre:</td>
						<td
							style={{
								width: '50%',
								textAlign: 'start',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								whiteSpace: 'nowrap',
							}}>
							{sender.name}
						</td>
					</tr>
					<tr>
						<td style={{ width: '50%', textAlign: 'start' }}>Address / Direccion :</td>
						<td
							style={{
								width: '50%',
								textAlign: 'start',
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								whiteSpace: 'nowrap',
							}}>
							{sender.address}
						</td>
					</tr>
					<tr>
						<td style={{ width: '50%', textAlign: 'start' }}>Country /Pais:</td>
						<td style={{ width: '50%', textAlign: 'start' }}>{sender.country}</td>
					</tr>
					<tr>
						<td style={{ width: '50%', textAlign: 'start' }}>Phone / Telefono:</td>
						<td style={{ width: '50%', textAlign: 'start' }}>{sender.phone1}</td>
					</tr>
				</table>
			</div>

			<div className='col-10' style={{ textAlign: 'center', marginTop: 10 }}>
				<h6>RECIPIENT / DESTINATARIO</h6>
			</div>

			<div className='col-10' style={{ textAlign: 'center', marginBottom: 20 }}>
				<table style={{ width: '100%' }}>
					<tr>
						<td style={{ width: '50%', textAlign: 'start' }}>Code / Codigo:</td>
						<td style={{ width: '50%', textAlign: 'start' }}>{recipient.code}</td>
					</tr>
					<tr>
						<td style={{ width: '50%', textAlign: 'start' }}>Name / Nombre:</td>
						<td style={{ width: '50%', textAlign: 'start' }}>{recipient.name}</td>
					</tr>
					<tr>
						<td style={{ width: '50%', textAlign: 'start' }}>Address / Direccion:</td>
						<td style={{ width: '50%', textAlign: 'start' }}>{recipient.address}</td>
					</tr>
					<tr>
						<td style={{ width: '50%', textAlign: 'start' }}>Country / Pais:</td>
						<td style={{ width: '50%', textAlign: 'start' }}>{recipient.country}</td>
					</tr>
					<tr>
						<td style={{ width: '50%', textAlign: 'start' }}>Phone / Telefono:</td>
						<td style={{ width: '50%', textAlign: 'start' }}>{recipient.phone1}</td>
					</tr>
					<tr>
						<td style={{ width: '50%', textAlign: 'start' }}>Bank / Banco:</td>
						<td style={{ width: '50%', textAlign: 'start' }}>{recipient.bankName}</td>
					</tr>
					<tr>
						<td style={{ width: '50%', textAlign: 'start' }}>Branch / Sucursal:</td>
						<td style={{ width: '50%', textAlign: 'start' }}>
							{invoiceInfo.bankBranch}
						</td>
					</tr>
					<tr>
						<td style={{ width: '50%', textAlign: 'start' }}>Account / Cuenta:</td>
						<td style={{ width: '50%', textAlign: 'start' }}>
							{recipient.bankAccount}
						</td>
					</tr>
				</table>
			</div>

			<div className='col-12' style={{ textAlign: 'center' }}>
				<table style={{ width: '100%' }}>
					<tr>
						<td style={{ width: '50%', textAlign: 'start' }}>
							Transfer Amount / Cantidad de Envio:
						</td>
						<td style={{ width: '50%', textAlign: 'end' }}>
							<p style={{ width: '50%', margin: 0 }}>${invoiceInfo.netAmount}</p>
						</td>
					</tr>
					<tr>
						<td style={{ width: '50%', textAlign: 'start' }}>
							Transfer Fees / Cargos por Envio:
						</td>
						<td style={{ width: '50%', textAlign: 'end' }}>
							<p style={{ width: '50%', margin: 0 }}>+${invoiceInfo.fees}</p>
						</td>
					</tr>
					<tr>
						<td style={{ width: '50%', textAlign: 'start' }}>
							Transfer Taxes / Impuestos de Envio:
						</td>
						<td style={{ width: '50%', textAlign: 'end' }}>
							<p style={{ width: '50%', margin: 0 }}>+${invoiceInfo.handling}</p>
							<hr style={{ margin: 0, width: '50%' }}></hr>
						</td>
					</tr>
					<tr>
						<td style={{ width: '50%', textAlign: 'start' }}>Total / Total:</td>
						<td style={{ width: '50%', textAlign: 'end' }}>
							<p style={{ width: '50%', margin: 0 }}>{invoiceInfo.total}</p>
						</td>
					</tr>
				</table>

				<table style={{ width: '100%', marginTop: 15, marginBottom: 15 }}>
					<tr>
						<td style={{ width: '50%', textAlign: 'start' }}>
							Exchange Rate / Tasa de Cambio:
						</td>
						<td style={{ width: '50%', textAlign: 'end' }}>
							<p style={{ width: '50%', margin: 0 }}>
								US$ 1.00 = {invoiceInfo.exchangeRate} {currencyDest}
							</p>
						</td>
					</tr>
				</table>

				<table style={{ width: '100%' }}>
					<tr>
						<td style={{ width: '50%', textAlign: 'start' }}>
							Transfer Amount / Cantidad de Envio:
						</td>
						<td style={{ width: '50%', textAlign: 'end' }}>
							<p style={{ width: '50%', margin: 0 }}>
								{invoiceInfo.totalToPay} {currencyDest}
							</p>
						</td>
					</tr>
					<tr>
						<td style={{ width: '50%', textAlign: 'start' }}>
							Other Fees / Otros Cargos por Envio:
						</td>
						<td style={{ width: '50%', textAlign: 'end' }}>
							<p style={{ width: '50%', margin: 0 }}>0.00 {currencyDest}</p>
							<hr style={{ margin: 0, width: '50%' }}></hr>
						</td>
					</tr>
					<tr>
						<td style={{ width: '50%', textAlign: 'start' }}>
							Total to Recipient / Total al Destinatario:
						</td>
						<td style={{ width: '50%', textAlign: 'end' }}>
							<p style={{ width: '50%', margin: 0 }}>
								{invoiceInfo.totalToPay} {currencyDest}
							</p>
						</td>
					</tr>
				</table>
			</div>

			<p style={{ marginTop: 10 }}>
				Recipient may receive less due to fees charged by the recipient&#39;s bank and
				foreign taxes. / El beneficiario puede recibir menos debido a las comisiones
				cobradas por el banco del beneficiario e impuestos extranjeros.
			</p>
		</div>
	);
};

const styles = {
	p: {
		margin: 0,
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
	},
};
