import React from 'react';
import { SearchInvoice, Recipients } from '../../services/NewTransactionService';
import { Sender } from '../../services/TransactionsService';

interface InvoiceInformationProps {
	items: SearchInvoice | undefined;
	sender: Sender;
	recipient: Recipients;
}

export const ReceiptPos: React.FC<InvoiceInformationProps> = ({ items,sender,recipient }) => {
	const cellStyle = {
		padding: '5px',
		width: '16.66%',
	};

	const handlePrint = () => {
		const content = document.getElementById('modalContent');
		if (content) {
			const printWindow = window.open('', '_blank');
			if (printWindow) {
				printWindow.document.write(`
					<!DOCTYPE html>
					<html lang="en">
					<head>
						<meta charset="UTF-8">
						<meta name="viewport" content="width=device-width, initial-scale=1.0">
						<title>Print</title>
						<style>
							@media print {
								body {
									margin: 0;
									padding: 0;
								}
								.print-content {
									width: 100mm;
									height: 100mm;
									position: absolute;
									top: 10mm; 
									left: 10mm;
								}
							}
						</style>
					</head>
					<body>
						<div class="print-content">
							${content.innerHTML}
						</div>
					</body>
					</html>
				`);
				printWindow.document.close();
				printWindow.print();
			}
		}
	};

	return (
		<>
			<table style={{ width: '220px', maxWidth: '220px' }}>
				<tbody>
					<tr>
						<td
							style={{
								...cellStyle,
								textAlign: 'center',
								borderBottom: '1px solid black',
							}}
							colSpan={3}>
							<img
								src='https://www.firstbanknigeria.com/wp-content/uploads/2021/10/small-world.jpg'
								alt='Descripción de la imagen'
								style={{
									maxWidth: '40%',
									height: 'auto',
									textAlign: 'center',
								}}
							/>
							<p style={{ display: 'block', fontSize: '10px' }}>
								70 Grand Avenue, Suite 104, River Edge, NJ 07661
							</p>
							<p style={{ display: 'block', fontSize: '10px' }}>Ph:1-877-268-6458</p>
						</td>
					</tr>
					<tr>
						<td>
							<p
								style={{
									display: 'block',
									fontSize: '10px',
									fontWeight: 'bold',
									textAlign: 'center',
									margin: '12px',
								}}>
								{items?.agency}
							</p>
						</td>
					</tr>
					<tr>
						<td style={cellStyle} colSpan={3}>
							<p
								style={{
									display: 'block',
									fontSize: '10px',
									textAlign: 'center',
								}}>
								560 SYLVAN AVE ACAMPO, <br /> CA 07661 Tel: 212-268-9290 <br />
								Agent of Choice Money Transfer, Inc.
							</p>
							<button
								style={{
									textDecoration: 'underline',
									display: 'block',
									fontSize: '10px',
									border: 'none',
									background: 'none',
									cursor: 'pointer',
									textAlign: 'center',
									margin: 10,
								}}
								onClick={handlePrint}>
								Sent to Printer
							</button>
							<p
								style={{
									display: 'block',
									fontSize: '10px',
									fontWeight: 'bold',
								}}>
								PIN NUMBER / NUMERO DE PIN:
							</p>
							<p
								style={{
									display: 'block',
									fontSize: '10px',
									fontWeight: 'bold',
									textAlign: 'center',
								}}>
								{items?.folio}
							</p>
							<p style={{ display: 'block', fontSize: '10px' }}>
								Today's Date / Fecha de hoy:
							</p>
							<p
								style={{
									display: 'block',
									fontSize: '10px',
									textAlign: 'center',
								}}>
								{items?.date}
							</p>
						</td>
					</tr>
					<tr>
						<td style={{ padding: '10px' }} colSpan={3}>
							<p
								style={{
									display: 'inline-block',
									fontSize: '10px',
									fontWeight: 'bold',
								}}>
								SENDER/REMITENTE:
							</p>
							<p
								style={{
									display: 'block',
									fontSize: '10px',
								}}>
								{sender.numberId}
							</p>
							<p
								style={{
									display: 'block',
									fontSize: '10px',
								}}>
								{sender.name}
							</p>
							<p
								style={{
									display: 'block',
									fontSize: '10px',
								}}>
								{sender.address}
							</p>
							<p
								style={{
									display: 'block',
									fontSize: '10px',
								}}>
								{sender.city} {sender.state} {sender.zipcode}
							</p>
							<p
								style={{
									display: 'block',
									fontSize: '10px',
								}}>
								{sender.phone1}
							</p>
						</td>
					</tr>

					<tr>
						<td style={{ padding: '10px' }} colSpan={3}>
							<p
								style={{
									display: 'inline-block',
									fontSize: '10px',
									fontWeight: 'bold',
								}}>
								RECIPIENT/DESTINATARIO:
							</p>
							<p
								style={{
									display: 'block',
									fontSize: '10px',
								}}>
								{recipient.name}
							</p>
							<p
								style={{
									display: 'block',
									fontSize: '10px',
								}}>
								{recipient.identityCode}
							</p>
							<p
								style={{
									display: 'block',
									fontSize: '10px',
								}}>
								{recipient.city}
							</p>
							<p
								style={{
									display: 'block',
									fontSize: '10px',
								}}>
								{recipient.country}
							</p>
							<p
								style={{
									display: 'block',
									fontSize: '10px',
								}}>
								{recipient.country}
							</p>
							<p
								style={{
									display: 'block',
									fontSize: '10px',
								}}>
								{recipient.bankName}
							</p>
							<p
								style={{
									display: 'block',
									fontSize: '10px',
								}}>
								{recipient.accountNumber}
							</p>
							<p
								style={{
									display: 'block',
									fontSize: '10px',
									marginTop: '7px',
								}}>
								Payment Mode/Modo de pago: {items?.paymentMode}
							</p>
						</td>
					</tr>

					<tr>
						<td style={cellStyle} colSpan={3}>
							<p
								style={{
									display: 'block',
									fontSize: '10px',
									fontWeight: 'bold',
								}}>
								PICK UP LOCATION/PUNTO DE PAGO:
							</p>

							<p
								style={{
									display: 'block',
									fontSize: '10px',
									marginTop: '5px',
								}}>
								{items?.bankBranch}
							</p>
							<p
								style={{
									display: 'block',
									fontSize: '10px',
								}}>
								{items?.paymentMode}
							</p>
							<p
								style={{
									display: 'block',
									fontSize: '10px',
								}}>
								{items?.cityDestination}
							</p>
							<p
								style={{
									display: 'block',
									fontSize: '10px',
								}}>
								4090300, 0
							</p>
						</td>
					</tr>
					<tr>
						<td style={{ ...cellStyle, fontSize: '10px' }} colSpan={6}>
							<p
								style={{
									display: 'block',
									fontSize: '10px',
									fontWeight: 'bold',
								}}>
								Order/Orden:
							</p>
							<p
								style={{
									display: 'block',
									fontSize: '10px',
								}}>
								{items?.code}
							</p>
							<p
								style={{
									display: 'block',
									fontSize: '10px',
									marginTop: '10px',
									textAlign: 'center',
								}}>
								Date available/Fecha disponible: {items?.dateValid}
							</p>
							<p
								style={{
									display: 'block',
									fontSize: '10px',
									marginTop: '10px',
									textAlign: 'center',
									fontWeight: 'bold',
								}}>
								*May be available sooner. Puede estar disponible antes
							</p>
						</td>
					</tr>

					<tr>
						<td style={{ padding: '5px' }} colSpan={3}>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
								}}>
								<p
									style={{
										display: 'inline-block',
										fontSize: '10px',
										marginRight: '20px',
									}}>
									Transfer Amount/Cantidad de Envio:
								</p>
								<p
									style={{
										display: 'inline-block',
										fontSize: '10px',
										textAlign: 'right',
									}}>
									${items?.amount}
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
										fontSize: '10px',
										marginRight: '20px',
									}}>
									Transfer Fees/Cargos por Envio:
								</p>
								<p style={{ textAlign: 'right', fontSize: '10px' }}>+${items?.fee}</p>
							</div>

							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
								}}>
								<p
									style={{
										display: 'inline-block',
										fontSize: '10px',
										marginRight: '20px',
									}}>
									Transfer Taxes/Impuesto de Envio:
								</p>
								<p
									style={{
										display: 'inline-block',
										fontSize: '10px',
										textAlign: 'right',
									}}>
									+${items?.handling}
								</p>
							</div>
							<div
								style={{
									borderBottom: '1px solid black',
									marginBottom: 5,
									marginTop: 5,
								}}
							/>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
								}}>
								<p
									style={{
										display: 'inline-block',
										fontSize: '10px',
										marginRight: '20px',
									}}>
									Total/Total:
								</p>
								<p
									style={{
										display: 'inline-block',
										fontSize: '10px',
										textAlign: 'right',
									}}>
									$ {items?.total}
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
									marginBottom: 7,
								}}>
								<p
									style={{
										display: 'inline-block',
										fontSize: '10px',
										marginRight: '20px',
									}}>
									Exchange Rate/Tasa de Cambio:
								</p>
								<p
									style={{
										display: 'inline-block',
										fontSize: '10px',
										textAlign: 'right',
									}}>
									{items?.curOrigin} $1.00 = {items?.exchangeRate} {items?.curDestination}
								</p>
							</div>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									marginBottom: 7,
								}}>
								<p
									style={{
										display: 'inline-block',
										fontSize: '10px',
										marginRight: '20px',
									}}>
									Transfer Amount/Cantidad de Envio:
								</p>
								<p
									style={{
										display: 'inline-block',
										fontSize: '10px',
										textAlign: 'right',
									}}>
									{items?.totalReceived} {items?.curDestination}
								</p>
							</div>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
									marginBottom: 7,
								}}>
								<p
									style={{
										display: 'inline-block',
										fontSize: '10px',
										marginRight: '20px',
									}}>
									Other Fees/Otros Cargos por Envio:
								</p>
								<p
									style={{
										display: 'inline-block',
										fontSize: '10px',
										textAlign: 'right',
									}}>
									{items?.fixCustomer} {items?.curDestination}
								</p>
							</div>
							<div
								style={{
									borderBottom: '1px solid black',
									marginBottom: 5,
									marginTop: 5,
								}}
							/>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-between',
								}}>
								<p
									style={{
										display: 'inline-block',
										fontSize: '10px',
										marginRight: '20px',
									}}>
									Total to Recipient/Total al Destinatario
								</p>
								<p
									style={{
										display: 'inline-block',
										fontSize: '10px',
										textAlign: 'right',
									}}>
									{items?.totalReceived} {items?.curDestination}
								</p>
							</div>
						</td>
					</tr>

					<tr>
						<td style={cellStyle} colSpan={6}>
							<p
								style={{
									display: 'inline-block',
									fontSize: '9px',
									textAlign: 'justify',
									marginTop: '5px',
								}}>
								Recipient may receive less due to fees charged by the recipients
								bank and foreign taxes. / El beneficiario podria recibir menos
								dinero debido a las comisiones cobradas por el banco del
								beneficiario e impuestos extranjeros
							</p>
							<p
								style={{
									display: 'inline-block',
									fontSize: '9px',
									marginTop: '10px',
									textAlign: 'justify',
								}}>
								You have a right to dispute errors in your transactions. If you
								think there is an error, contact us within 180 days at
								1-877-268-6458 or Smallworldsfs.com or send by mail to 70 Grand
								Avenue, Suite 104, River Edge, NJ 07661, or email to
								cs@smallworldsfs.com. You can also contact us for a written
								explanation of your rights. Usted tiene el derecho de discutir
								errores en su transacción. Si cree que hay un error, contáctenos
								dentro de 180 días al 1-866-210-8002 o Smallworldsfs.com o envíelo
								por correo a 70 Grand Avenue, Suite 104, River Edge, NJ 07661, o por
								correo electrónico a cs@smallworldfs.com. También puede contactarnos
								para obtener una explicación escrita de sus derechos. You can cancel
								for a full refund within 30 minutes of payment unless the funds have
								been picked up or deposited. Puede cancelar él envió y recibir un
								reembolso total dentro de 30 minutos de haber realizado el pago, a
								no ser que los fondos hayan sido recogidos o depositados. Choice
								Money Transfer makes money from foreign currency exchange. Choice
								Money Transfer gana dinero con el cambio de moneda extranjera. For
								questions or complaints about Choice Money Transfer, Inc. d/b/a
								Small World Money Transfer contact: Para preguntas o presentar una
								queja sobre Choice Money Transfer, Inc. d/ b/a Small World Money
								Transfer, contacte a :
								<b>CALIFORNIA DEPARTMENT OF FINANCIAL PROTECTION AND INNOVATION</b>
								-Phone: 916-327-7585 / Toll Free: 1-866-275-2677 Web: The Department
								of Financial Protection and Innovation | Securing a fair and healthy
								financial services marketplace https:// dfpi.ca.gov{' '}
								<b>CONSUMER FINANCIAL PROTECTION BUREAU</b>
								855-411-2372 855-729-2372 (TTY/TDD)
								consumerfinance.gov/sending-money <b>RIGHT TO REFUND:</b> You, the
								customer, are entitled to a refund of the money to be Send To
								Printer transmitted as the result of this agreement if Choice Money
								Transfer ("Choice") does not forward the money received from you
								within 10 days of the date of its receipt, or does not give
								instructions committing an equivalent amount of money to the person
								designated by you within 10 days of the date of the receipt of the
								funds from you unless otherwise instructed by you. If your
								instructions as to when the moneys shall be forwarded or transmitted
								are not complied with and the money has not yet been forwarded or
								transmitted, you have a right to a refund of your money. If you want
								a refund, you must mail or deliver your written request to Choice at
								70 Grand Avenue, Suite 104, River Edge, NJ 07661. If you do not
								receive your refund, you may be entitled to your money back plus a
								penalty of up to $1,000 and attorney’s fees pursuant to section 2102
								of the California Financial Code. <b>DERECHO DE REEMBOLSO:</b>{' '}
								Usted, el cliente, tiene derecho a que se le reembolse el dinero que
								haya de ser transferido como consecuencia del presente contrato, en
								el supuesto de que Choice Money Transfer ("Choice") no proceda a
								enviar el dinero recibido de Ud. en el plazo de los 10 días
								siguientes a la recepción de dicho dinero o en el supuesto de que no
								de instrucciones para la entrega de un importe equivalente a la
								persona designada por usted en el plazo de los 10 dias siguientes a
								la recepcion de los fondos, salvo cuando medie instrucción en otro
								sentido por su parte. En caso de incumplimiento de las instrucciones
								relativas a la fecha de envió o transferencia del dinero, con el
								resultado de que el dinero no haya sido enviado o transferido, le
								asiste un derecho al reembolso de su dinero. Si quiere solicitar el
								reembolso, debe remitir o entregar una solicitud escrita a Choice,
								en la siguiente dirección: 70 Grand Avenue, Suite 104, River Edge,
								NJ 07661. Si usted no recibe el reembolso, en virtud de lo dispuesto
								en el artículo 2102 del Código Financiero de California le asiste el
								derecho a recuperar su dinero, así como $1,000 USD en concepto de
								multa y los costos legales.
							</p>
							<div style={{ position: 'relative', marginTop: 60 }}>
								<hr
									style={{
										borderTop: '1px solid black',
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
										fontSize: '10px',
									}}>
									Customer signature/Firma cliente
								</p>
							</div>
							<div style={{ position: 'relative', marginTop: 60 }}>
								<hr
									style={{
										borderTop: '1px solid black',
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
										fontSize: '10px',
									}}>
									Cashier signature/Firma Cajero
								</p>
							</div>
						</td>
					</tr>
					<tr>
						<td style={cellStyle} colSpan={3}>
							<p
								style={{
									display: 'block',
									fontSize: '10px',
								}}>
								To check invoice status please scan barCode/ Para revisar el estado
								de la orden, por favor escanear el codigo de barra
							</p>
							<img
								src='https://images.wikidexcdn.net/mwuploads/wikidex/f/f8/latest/20170224002115/C%C3%B3digo_QR_especial_Dhelmise.png'
								alt='Descripción de la imagen'
								style={{
									maxWidth: '70%',
									height: 'auto',
									justifyContent: 'center',
									textAlign: 'center',
								}}
							/>
						</td>
					</tr>
				</tbody>
			</table>
		</>
	);
};
export default ReceiptPos;
