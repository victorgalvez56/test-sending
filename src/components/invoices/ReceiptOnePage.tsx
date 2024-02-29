import React, { useState } from 'react';
import { InvoiceReponse } from '../../services/InvoiceServices';
import { SearchInvoice } from '../../services/NewTransactionService';

interface InvoiceInformationProps {
	items: InvoiceReponse[];
}

export const ReceiptOnePage: React.FC<InvoiceInformationProps> = ({ items }) => {
	const [currencyListOrigin, setCurrencyListOrigin] = useState([]);
	const [currencyListDes, setCurrencyListDes] = useState([]);
	const [bankAccounts, setBankAccounts] = useState([]);

	const [PrintModal, setPrintModal] = useState<boolean>(false);
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
		<>
			{items.map((item, index) => (
				<table key={index} border={1} style={{ height: 600 }}>
					<tbody>
						<tr>
							<td style={cellStyle} colSpan={3}>
								<img
									src='https://www.firstbanknigeria.com/wp-content/uploads/2021/11/small-world.jpg'
									alt='Descripción de la imagen'
									style={{ maxWidth: '50%', height: 'auto' }}
								/>
								<label style={{ display: 'block', fontSize: '11px' }}>
									Choice Money Transfer, Inc.
								</label>
								<label style={{ display: 'block', fontSize: '11px' }}>
									70 Grand Avenue, Suite 104, River Edge, NJ 07661
								</label>
								<label style={{ display: 'block', fontSize: '11px' }}>
									{' '}
									Ph:1-877-268-6458
								</label>
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
									<label style={{ display: 'block', fontSize: '11px' }}>
										{item.agency}
									</label>
									<label style={{ display: 'block', fontSize: '11px' }}>
										Agent of Choice Money Transfer, Inc
									</label>
								</div>
							</td>
						</tr>
						<tr>
							<td
								style={{
									fontWeight: 'bold',
									fontSize: '11px',
								}}>
								FOLIO/PIN: 1202530394
							</td>
							<td colSpan={8} style={{ textAlign: 'right', fontSize: '11px' }}>
								Date/Fecha: 2/5/2024 16:53:00
							</td>
						</tr>
						<tr>
							<td style={cellStyle} colSpan={3}>
								<label
									style={{
										display: 'block',
										fontSize: '11px',
										textAlign: 'center',
										fontWeight: 'bold',
									}}>
									SENDER/REMITENTE
								</label>
								<label style={{ display: 'block', fontSize: '11px' }}>
									Name/Nombre: NIGERIA TESTING
								</label>
								<label style={{ display: 'block', fontSize: '11px' }}>
									Address/Direccion: UBAOLE 43
								</label>
								<label style={{ display: 'block', fontSize: '11px' }}>
									City/Ciudad: VICTORVILLE
								</label>
								<label style={{ display: 'block', fontSize: '11px' }}>
									State/Estado: CALIFORNIA Zip/Zona Postal: 25655
								</label>
								<label style={{ display: 'block', fontSize: '11px' }}>
									Phone/Telefono: 7897654323
								</label>
							</td>
							<td style={cellStyle} colSpan={3}>
								<label
									style={{
										display: 'block',
										fontSize: '11px',
										textAlign: 'center',
										fontWeight: 'bold',
									}}>
									RECIPIENT/DESTINATARIO
								</label>
								<label style={{ display: 'block', fontSize: '11px' }}>
									Name/Nombre: NIGERIA NAIRA TESTING
								</label>
								<label style={{ display: 'block', fontSize: '11px' }}>
									Address/Direccion: TEST TEST
								</label>
								<label style={{ display: 'block', fontSize: '11px' }}>
									City/Ciudad: ABA
								</label>
								<label style={{ display: 'block', fontSize: '11px' }}>
									State/Estado: NIGERIA Country/Pais: NIGERIA
								</label>
								<label style={{ display: 'block', fontSize: '11px' }}>
									Phone/Telefono: 077655444
								</label>
							</td>
						</tr>
						<tr>
							<td style={{ border: '1px solid black', padding: '5px' }} colSpan={3}>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
									}}>
									<label
										style={{
											display: 'inline-block',
											fontSize: '11px',
											marginRight: '20px',
										}}>
										Transfer Amount/Cantidad de Envio:
									</label>
									<label
										style={{
											display: 'inline-block',
											fontSize: '11px',
											textAlign: 'right',
										}}>
										$ 1.14
									</label>
								</div>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
									}}>
									<label
										style={{
											display: 'inline-block',
											fontSize: '11px',
											marginRight: '20px',
										}}>
										Transfer Fees/Cargos por Envio:
									</label>
									<label style={{ textAlign: 'right', fontSize: '11px' }}>
										+$ 5.00
									</label>
								</div>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
									}}>
									<label
										style={{
											display: 'inline-block',
											fontSize: '11px',
											marginRight: '20px',
										}}>
										Transfer Taxes/Impuesto de Envio:
									</label>
									<label
										style={{
											display: 'inline-block',
											fontSize: '11px',
											textAlign: 'right',
										}}>
										+$ 0.00
									</label>
								</div>
							</td>
							<td style={cellStyle} colSpan={3}>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
									}}>
									<label
										style={{
											display: 'inline-block',
											fontSize: '11px',
											marginRight: '20px',
										}}>
										Exchange Rate/Tasa de Cambio:
									</label>
									<label
										style={{
											display: 'inline-block',
											fontSize: '11px',
											textAlign: 'right',
										}}>
										USD $1.00 = 874.60 NGN
									</label>
								</div>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
									}}>
									<label
										style={{
											display: 'inline-block',
											fontSize: '11px',
											marginRight: '20px',
										}}>
										Transfer Amount/Cantidad de Envio:
									</label>
									<label
										style={{
											display: 'inline-block',
											fontSize: '11px',
											textAlign: 'right',
										}}>
										997.04 NGN
									</label>
								</div>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
									}}>
									<label
										style={{
											display: 'inline-block',
											fontSize: '11px',
											marginRight: '20px',
										}}>
										Other Fees/Otros Cargos por Envio:
									</label>
									<label
										style={{
											display: 'inline-block',
											fontSize: '11px',
											textAlign: 'right',
										}}>
										-0 NGN
									</label>
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
									<label
										style={{
											display: 'inline-block',
											fontSize: '11px',
											marginRight: '20px',
										}}>
										Total/Total:
									</label>
									<label
										style={{
											display: 'inline-block',
											fontSize: '11px',
											textAlign: 'right',
										}}>
										$ 6.14
									</label>
								</div>
							</td>
							<td style={cellStyle} colSpan={3}>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
									}}>
									<label
										style={{
											display: 'inline-block',
											fontSize: '11px',
											marginRight: '20px',
										}}>
										Total to Recipient/Total al Destinatario
									</label>
									<label
										style={{
											display: 'inline-block',
											fontSize: '11px',
											textAlign: 'right',
										}}>
										997.04 NGN
									</label>
								</div>
							</td>
						</tr>
						<tr>
							<td style={cellStyle} colSpan={3}>
								<label
									style={{
										display: 'block',
										fontSize: '11px',
										textAlign: 'center',
										fontWeight: 'bold',
									}}>
									PICK UP LOCATION/PUNTO DE PAGO
								</label>
								<div
									style={{
										display: 'flex',
									}}>
									<label
										style={{
											display: 'inline-block',
											fontSize: '11px',
											marginRight: '10px',
										}}>
										Delivery Method/Metodo de Pago:
									</label>
									<label
										style={{
											display: 'inline-block',
											fontSize: '11px',
											textAlign: 'left',
										}}>
										Acc deposit/Dep. Cuenta
									</label>
								</div>
								<div
									style={{
										display: 'flex',
									}}>
									<label
										style={{
											display: 'inline-block',
											fontSize: '11px',
											marginRight: '10px',
										}}>
										Branch/Oficina: test FIRST APPLE DEPOSIT-PICK UP
										ANYWHERE-NIGERIAI - UNITED BANK FOR AFRICA - FIRST APPLE**
									</label>
								</div>
								<div
									style={{
										display: 'flex',
									}}>
									<label
										style={{
											display: 'inline-block',
											fontSize: '11px',
											marginRight: '10px',
										}}>
										Address/Direccion:
									</label>
									<label
										style={{
											display: 'inline-block',
											fontSize: '11px',
											textAlign: 'left',
										}}>
										DEPOSIT TO UNITED BANK FOR AFRICA
									</label>
								</div>
								<div
									style={{
										display: 'flex',
									}}>
									<label
										style={{
											display: 'inline-block',
											fontSize: '11px',
											marginRight: '10px',
										}}>
										Phone/Telefono:
									</label>
									<label
										style={{
											display: 'inline-block',
											fontSize: '11px',
											textAlign: 'right',
										}}>
										0000
									</label>
								</div>
								<div
									style={{
										display: 'flex',
									}}>
									<label
										style={{
											display: 'inline-block',
											fontSize: '11px',
											marginRight: '10px',
										}}>
										Account#/Cuenta#:
									</label>
									<label
										style={{
											display: 'inline-block',
											fontSize: '11px',
											textAlign: 'left',
										}}>
										1223456789098764X
									</label>
								</div>
								<div
									style={{
										display: 'flex',
									}}>
									<label
										style={{
											display: 'inline-block',
											fontSize: '11px',
											marginRight: '10px',
										}}>
										Bank:
									</label>
									<label
										style={{
											display: 'inline-block',
											fontSize: '11px',
											textAlign: 'left',
										}}>
										UNITED BANK FOR AFRICA
									</label>
								</div>
							</td>
							<td style={{ ...cellStyle, fontSize: '11px' }} colSpan={3}>
								Recipient may receive less due to fees charged by the recipient's
								bank and foreign taxes. / El beneficiario podria recibir menos
								dinero debido a las comisiones cobradas por el banco del
								beneficiario e impuestos extranjeros.
							</td>
						</tr>
						<tr>
							<td style={{ ...cellStyle, fontSize: '11px' }} colSpan={6}>
								RECEIPT / RECIBO: 000001-12460
							</td>
						</tr>
						<tr>
							<td style={{ ...cellStyle, fontSize: '11px' }} colSpan={6}>
								Date Available/Fecha Disponible: 02/08/2024 (May be available
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
										<label
											style={{
												zIndex: 2,
												backgroundColor: 'white',
												padding: '0 10px',
												fontWeight: 'bold',
												fontSize: '11px',
											}}>
											Cashier signature/Firma Cajero
										</label>
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
										<label
											style={{
												zIndex: 2,
												backgroundColor: 'white',
												padding: '0 10px',
												fontWeight: 'bold',
												fontSize: '11px',
											}}>
											Cashier signature/Firma Cajero
										</label>
									</div>
								</div>
							</td>
						</tr>
						<tr>
							<td style={cellStyle} colSpan={6}>
								<label
									style={{
										alignItems: 'center',
										textAlign: 'center',
										fontWeight: 'bold',
										display: 'block',
										fontSize: '9px',
									}}>
									Authorized Agent/Agente Autorizado <br />
									TEST AGENCY (000001)
									<br /> 560 SYLVAN AVE LAKE RONKONKOMA, NY 83672
									<br /> Ph/Tel: 212-268-9290
								</label>
							</td>
						</tr>
						<tr>
							<td style={cellStyle} colSpan={6}>
								<label
									style={{
										display: 'inline-block',
										fontSize: '9px',
										textAlign: 'left',
										marginTop: '5px',
									}}>
									You have a right to dispute errors in your transactions. If you
									think there is an error, contact us within 180 days at
									1-877-268-6458 or www.smallworldsfs.com/en/contact-us or send by
									mail to 70 Grand Ave., Suite 104, River Edge, NJ 07661 or email
									to cs@smallworldsfs.com. You can also contact us for a written
									explanation of your rights. Usted tiene el derecho de discutir
									errores en su transacción. Si cree que hay un error, contáctenos
									dentro de 180 dias al 1-877-268-6458 o www.smallworldsfs.com o
									envíelo por correo a 70 Grand Ave., Suite 104, River Edge, NJ
									07661 o por correo electrónico a cs@smallworldfs.com. También
									puede contactarnos para obtener una explicación escrita de sus
									derechos.
								</label>
								<label
									style={{
										display: 'inline-block',
										fontSize: '9px',
										textAlign: 'left',
										marginTop: '10px',
									}}>
									You can cancel for a full refund within 30 minutes of payment
									unless the funds have been picked up or deposited. Puede
									cancelar él envió y recibir un reembolso total dentro de 30
									minutos de haber realizado el pago, a no ser que los fondos
									hayan sido recogidos o depositados
								</label>
								<label
									style={{
										display: 'inline-block',
										fontSize: '9px',
										textAlign: 'left',
										marginTop: '10px',
									}}>
									Choice Money Transfer makes money from foreign currency
									exchange. Choice Money Transfer gana dinero con el cambio de
									moneda extranjera.
								</label>
								<label
									style={{
										display: 'inline-block',
										fontSize: '9px',
										textAlign: 'left',
										marginTop: '10px',
									}}>
									For questions or complaints about Choice Money Transfer, Inc.
									d/b/a Small World Money Transfer contact: Para preguntas o
									presentar una queja sobre Choice Money Transfer, Inc. d/b/a
									Small World Money Transfer, contacte a:
								</label>
								<label
									style={{
										display: 'inline-block',
										fontSize: '9px',
										textAlign: 'left',
										marginTop: '5px',
									}}>
									<b>NEW YORK DEPARTMENT OF FINANCIAL SERVICES</b> <br />
									Toll free: 1-800-342-3736 <br />
									Web.: https://dfs.ny.gov
								</label>
								<br />
								<label
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
								</label>
							</td>
						</tr>
					</tbody>
				</table>
			))}
		</>
	);
};
export default ReceiptOnePage;
