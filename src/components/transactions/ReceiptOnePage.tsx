import React from 'react';
import { SearchInvoice, Recipients } from '../../services/NewTransactionService';
import { Sender } from '../../services/TransactionsService';

interface InvoiceInformationProps {
	items: SearchInvoice | undefined;
	sender: Sender;
	recipient: Recipients;
}

export const ReceiptOnePage: React.FC<InvoiceInformationProps> = ({ items, recipient, sender }) => {
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

	return (
		<table border={1} style={{ height: 600 }}>
			<tbody>
				<tr>
					<td style={cellStyle} colSpan={3}>
						<img
							src='https://www.firstbanknigeria.com/wp-content/uploads/2021/11/small-world.jpg'
							alt='Descripción de la imagen'
							style={{ maxWidth: '50%', height: 'auto' }}
						/>
						<p style={{ display: 'block', fontSize: '11px' }}>
							Choice Money Transfer, Inc.
						</p>
						<p style={{ display: 'block', fontSize: '11px' }}>
							70 Grand Avenue, Suite 104, River Edge, NJ 07661
						</p>
						<p style={{ display: 'block', fontSize: '11px' }}>Ph:1-877-268-6458</p>
					</td>
					<td
						style={{
							...cellStyle,
							maxHeight: '90px',
						}}
						colSpan={2}>
						<div style={{ textAlign: 'right' }}>
							<img
								src='https://images.wikidexcdn.net/mwuploads/wikidex/f/f8/latest/20170224002115/C%C3%B3digo_QR_especial_Dhelmise.png'
								alt='Descripción de la imagen'
								style={{ maxWidth: '40%', height: 'auto' }}
							/>
							<button
								style={{
									textDecoration: 'underline',
									display: 'block',
									fontSize: '11px',
									border: 'none',
									background: 'none',
									cursor: 'pointer',
								}}
								onClick={handlePrint}>
								Sent to Printer
							</button>
							<p style={{ display: 'block', fontSize: '11px' }}>{items?.agency}</p>
							<p style={{ display: 'block', fontSize: '11px' }}>
								Agent of Choice Money Transfer, Inc
							</p>
						</div>
					</td>
				</tr>
				<tr>
					<td
						style={{
							fontWeight: 'bold',
							fontSize: '11px',
						}}>
						FOLIO/PIN: {items?.folio}
					</td>
					<td colSpan={8} style={{ textAlign: 'right', fontSize: '11px' }}>
						Date/Fecha: {items?.date}
					</td>
				</tr>
				<tr>
					<td style={cellStyle} colSpan={3}>
						<p
							style={{
								display: 'block',
								fontSize: '11px',
								textAlign: 'center',
								fontWeight: 'bold',
							}}>
							SENDER/REMITENTE
						</p>
						<p style={{ display: 'block', fontSize: '11px' }}>
							Name/Nombre: {sender.name}
						</p>
						<p style={{ display: 'block', fontSize: '11px' }}>
							Address/Direccion: {sender.address}
						</p>
						<p style={{ display: 'block', fontSize: '11px' }}>
							City/Ciudad: {sender.city}
						</p>
						<p style={{ display: 'block', fontSize: '11px' }}>
							State/Estado: {sender.state} Zip/Zona Postal: {sender.zipcode}
						</p>
						<p style={{ display: 'block', fontSize: '11px' }}>
							Phone/Telefono: {sender.phone1}
						</p>
					</td>
					<td style={cellStyle} colSpan={3}>
						<p
							style={{
								display: 'block',
								fontSize: '11px',
								textAlign: 'center',
								fontWeight: 'bold',
							}}>
							RECIPIENT/DESTINATARIO
						</p>
						<p style={{ display: 'block', fontSize: '11px' }}>
							Name/Nombre: {recipient.name}
						</p>
						<p style={{ display: 'block', fontSize: '11px' }}>
							Address/Direccion: {recipient.address}
						</p>
						<p style={{ display: 'block', fontSize: '11px' }}>
							City/Ciudad: {recipient.city}
						</p>
						<p style={{ display: 'block', fontSize: '11px' }}>
							State/Estado: {recipient.state} Country/Pais: {recipient.country}
						</p>
						<p style={{ display: 'block', fontSize: '11px' }}>
							Phone/Telefono: {recipient.phone1}
						</p>
					</td>
				</tr>
				<tr>
					<td style={{ border: '1px solid black', padding: '5px' }} colSpan={3}>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
							}}>
							<p
								style={{
									display: 'inline-block',
									fontSize: '11px',
									marginRight: '20px',
								}}>
								Transfer Amount/Cantidad de Envio:
							</p>
							<p
								style={{
									display: 'inline-block',
									fontSize: '11px',
									textAlign: 'right',
								}}>
								$ {items?.amount}
							</p>
						</div>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
							}}>
							<p
								style={{
									display: 'inline-block',
									fontSize: '11px',
									marginRight: '20px',
								}}>
								Transfer Fees/Cargos por Envio:
							</p>
							<p style={{ textAlign: 'right', fontSize: '11px' }}>+$ {items?.fee}</p>
						</div>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
							}}>
							<p
								style={{
									display: 'inline-block',
									fontSize: '11px',
									marginRight: '20px',
								}}>
								Transfer Taxes/Impuesto de Envio:
							</p>
							<p
								style={{
									display: 'inline-block',
									fontSize: '11px',
									textAlign: 'right',
								}}>
								+$ {items?.handling}
							</p>
						</div>
					</td>
					<td style={cellStyle} colSpan={3}>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
							}}>
							<p
								style={{
									display: 'inline-block',
									fontSize: '11px',
									marginRight: '20px',
								}}>
								Exchange Rate/Tasa de Cambio:
							</p>
							<p
								style={{
									display: 'inline-block',
									fontSize: '11px',
									textAlign: 'right',
								}}>
								{items?.curOrigin} $1.00 = {items?.exchangeRate}{' '}
								{items?.curDestination}
							</p>
						</div>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
							}}>
							<p
								style={{
									display: 'inline-block',
									fontSize: '11px',
									marginRight: '20px',
								}}>
								Transfer Amount/Cantidad de Envio:
							</p>
							<p
								style={{
									display: 'inline-block',
									fontSize: '11px',
									textAlign: 'right',
								}}>
								{items?.totalReceived} {items?.curDestination}
							</p>
						</div>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
							}}>
							<p
								style={{
									display: 'inline-block',
									fontSize: '11px',
									marginRight: '20px',
								}}>
								Other Fees/Otros Cargos por Envio:
							</p>
							<p
								style={{
									display: 'inline-block',
									fontSize: '11px',
									textAlign: 'right',
								}}>
								{items?.fixCustomer} {items?.curDestination}
							</p>
						</div>
					</td>
				</tr>
				<tr>
					<td style={cellStyle} colSpan={3}>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
							}}>
							<p
								style={{
									display: 'inline-block',
									fontSize: '11px',
									marginRight: '20px',
								}}>
								Total/Total:
							</p>
							<p
								style={{
									display: 'inline-block',
									fontSize: '11px',
									textAlign: 'right',
								}}>
								$ {items?.total}
							</p>
						</div>
					</td>
					<td style={cellStyle} colSpan={3}>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
							}}>
							<p
								style={{
									display: 'inline-block',
									fontSize: '11px',
									marginRight: '20px',
								}}>
								Total to Recipient/Total al Destinatario
							</p>
							<p
								style={{
									display: 'inline-block',
									fontSize: '11px',
									textAlign: 'right',
								}}>
								{items?.totalReceived} {items?.curDestination}
							</p>
						</div>
					</td>
				</tr>
				<tr>
					<td style={cellStyle} colSpan={3}>
						<p
							style={{
								display: 'block',
								fontSize: '11px',
								textAlign: 'center',
								fontWeight: 'bold',
							}}>
							PICK UP LOCATION/PUNTO DE PAGO
						</p>
						<div
							style={{
								display: 'flex',
							}}>
							<p
								style={{
									display: 'inline-block',
									fontSize: '11px',
									marginRight: '10px',
								}}>
								Delivery Method/Metodo de Pago:
							</p>
							<p
								style={{
									display: 'inline-block',
									fontSize: '11px',
									textAlign: 'left',
								}}>
								{items?.paymentMode}
							</p>
						</div>
						<div
							style={{
								display: 'flex',
							}}>
							<p
								style={{
									display: 'inline-block',
									fontSize: '11px',
									marginRight: '10px',
								}}>
								Branch/Oficina: {items?.bankBranch}
							</p>
						</div>
						<div
							style={{
								display: 'flex',
							}}>
							<p
								style={{
									display: 'inline-block',
									fontSize: '11px',
									marginRight: '10px',
								}}>
								Address/Direccion:
							</p>
							<p
								style={{
									display: 'inline-block',
									fontSize: '11px',
									textAlign: 'left',
								}}>
								{items?.bankAddress}
							</p>
						</div>
						<div
							style={{
								display: 'flex',
							}}>
							<p
								style={{
									display: 'inline-block',
									fontSize: '11px',
									marginRight: '10px',
								}}>
								Phone/Telefono:
							</p>
							<p
								style={{
									display: 'inline-block',
									fontSize: '11px',
									textAlign: 'right',
								}}>
								0000
							</p>
						</div>
						<div
							style={{
								display: 'flex',
							}}>
							<p
								style={{
									display: 'inline-block',
									fontSize: '11px',
									marginRight: '10px',
								}}>
								Account#/Cuenta#:
							</p>
							<p
								style={{
									display: 'inline-block',
									fontSize: '11px',
									textAlign: 'left',
								}}>
								{items?.bankAccountNumber}
							</p>
						</div>
						<div
							style={{
								display: 'flex',
							}}>
							<p
								style={{
									display: 'inline-block',
									fontSize: '11px',
									marginRight: '10px',
								}}>
								Bank:
							</p>
							<p
								style={{
									display: 'inline-block',
									fontSize: '11px',
									textAlign: 'left',
								}}>
								{items?.bankName}
							</p>
						</div>
					</td>
					<td style={{ ...cellStyle, fontSize: '11px' }} colSpan={3}>
						Recipient may receive less due to fees charged by the recipient's bank and
						foreign taxes. / El beneficiario podria recibir menos dinero debido a las
						comisiones cobradas por el banco del beneficiario e impuestos extranjeros.
					</td>
				</tr>
				<tr>
					<td style={{ ...cellStyle, fontSize: '11px' }} colSpan={6}>
						RECEIPT / RECIBO: {items?.code}
					</td>
				</tr>
				<tr>
					<td style={{ ...cellStyle, fontSize: '11px' }} colSpan={6}>
						Date Available/Fecha Disponible: {items?.dateValid} (May be available
						sooner./Puede estar disponible antes.)
					</td>
				</tr>
				<tr>
					<td style={{ ...cellStyle, height: '130px' }} colSpan={6}>
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								gap: '80px',
								marginTop: '60px',
							}}>
							<div style={{ position: 'relative' }}>
								<hr
									style={{
										borderTop: '1px solid black',
										position: 'absolute',
										width: '100%',
										bottom: 20,
										zIndex: 1,
									}}
								/>
								<p
									style={{
										zIndex: 2,
										backgroundColor: 'white',
										padding: '0 10px',
										fontWeight: 'bold',
										fontSize: '11px',
									}}>
									Cashier signature/Firma Cajero
								</p>
							</div>
							<div style={{ position: 'relative' }}>
								<hr
									style={{
										borderTop: '1px solid black',
										position: 'absolute',
										width: '100%',
										bottom: 20,
										zIndex: 1,
									}}
								/>
								<p
									style={{
										zIndex: 2,
										backgroundColor: 'white',
										padding: '0 10px',
										fontWeight: 'bold',
										fontSize: '11px',
									}}>
									Cashier signature/Firma Cajero
								</p>
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<td style={cellStyle} colSpan={6}>
						<p
							style={{
								alignItems: 'center',
								textAlign: 'center',
								fontWeight: 'bold',
								display: 'block',
								fontSize: '9px',
							}}>
							Authorized Agent/Agente Autorizado <br />
							TEST AGENCY ({items?.agency})
							<br /> 560 SYLVAN AVE LAKE RONKONKOMA, NY 83672
							<br /> Ph/Tel: 212-268-9290
						</p>
					</td>
				</tr>
				<tr>
					<td style={cellStyle} colSpan={6}>
						<p
							style={{
								display: 'inline-block',
								fontSize: '9px',
								textAlign: 'left',
								marginTop: '5px',
							}}>
							You have a right to dispute errors in your transactions. If you think
							there is an error, contact us within 180 days at 1-877-268-6458 or
							www.smallworldsfs.com/en/contact-us or send by mail to 70 Grand Ave.,
							Suite 104, River Edge, NJ 07661 or email to cs@smallworldsfs.com. You
							can also contact us for a written explanation of your rights. Usted
							tiene el derecho de discutir errores en su transacción. Si cree que hay
							un error, contáctenos dentro de 180 dias al 1-877-268-6458 o
							www.smallworldsfs.com o envíelo por correo a 70 Grand Ave., Suite 104,
							River Edge, NJ 07661 o por correo electrónico a cs@smallworldfs.com.
							También puede contactarnos para obtener una explicación escrita de sus
							derechos.
						</p>
						<p
							style={{
								display: 'inline-block',
								fontSize: '9px',
								textAlign: 'left',
								marginTop: '10px',
							}}>
							You can cancel for a full refund within 30 minutes of payment unless the
							funds have been picked up or deposited. Puede cancelar él envió y
							recibir un reembolso total dentro de 30 minutos de haber realizado el
							pago, a no ser que los fondos hayan sido recogidos o depositados
						</p>
						<p
							style={{
								display: 'inline-block',
								fontSize: '9px',
								textAlign: 'left',
								marginTop: '10px',
							}}>
							Choice Money Transfer makes money from foreign currency exchange. Choice
							Money Transfer gana dinero con el cambio de moneda extranjera.
						</p>
						<p
							style={{
								display: 'inline-block',
								fontSize: '9px',
								textAlign: 'left',
								marginTop: '10px',
							}}>
							For questions or complaints about Choice Money Transfer, Inc. d/b/a
							Small World Money Transfer contact: Para preguntas o presentar una queja
							sobre Choice Money Transfer, Inc. d/b/a Small World Money Transfer,
							contacte a:
						</p>
						<p
							style={{
								display: 'inline-block',
								fontSize: '9px',
								textAlign: 'left',
								marginTop: '5px',
							}}>
							<b>NEW YORK DEPARTMENT OF FINANCIAL SERVICES</b> <br />
							Toll free: 1-800-342-3736 <br />
							Web.: https://dfs.ny.gov
						</p>
						<br />
						<p
							style={{
								display: 'inline-block',
								fontSize: '9px',
								textAlign: 'left',
								marginTop: '5px',
							}}>
							<b>CONSUMER FINANCIAL PROTECTION BUREAU</b> <br />
							855-411-2372 <br />
							855-729-2372 (TTY/TDD)
							<br />
							consumerfinance.gov/sending-money
						</p>
					</td>
				</tr>
			</tbody>
		</table>
	);
};
export default ReceiptOnePage;
