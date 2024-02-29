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
import { InvoiceReponse } from '../../services/InvoiceServices';

interface InvoiceInformationProps {
	items: InvoiceReponse[];
}

export const ReceiptPos: React.FC<InvoiceInformationProps> = ({ items }) => {
	const [currencyListOrigin, setCurrencyListOrigin] = useState([]);
	const [currencyListDes, setCurrencyListDes] = useState([]);
	const [bankAccounts, setBankAccounts] = useState([]);

	const cellStyle = {
		padding: '5px',
		width: '16.66%',
	};

	const [PrintModal, setPrintModal] = useState<boolean>(false);
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
			{items.map((item, index) => (
				<table key={index} style={{ width: '220px', maxWidth: '220px' }}>
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
								<label style={{ display: 'block', fontSize: '10px' }}>
									70 Grand Avenue, Suite 104, River Edge, NJ 07661
								</label>
								<label style={{ display: 'block', fontSize: '10px' }}>
									Ph:1-877-268-6458
								</label>
							</td>
						</tr>
						<tr>
							<td>
								<label
									style={{
										display: 'block',
										fontSize: '10px',
										fontWeight: 'bold',
										textAlign: 'center',
										margin: '12px',
									}}>
									{item.agency}
								</label>
							</td>
						</tr>
						<tr>
							<td style={cellStyle} colSpan={3}>
								<label
									style={{
										display: 'block',
										fontSize: '10px',
										textAlign: 'center',
									}}>
									560 SYLVAN AVE ACAMPO, <br /> CA 07661 Tel: 212-268-9290 <br />
									Agent of Choice Money Transfer, Inc.
								</label>
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
								<label
									style={{
										display: 'block',
										fontSize: '10px',
										fontWeight: 'bold',
									}}>
									PIN NUMBER / NUMERO DE PIN:
								</label>
								<label
									style={{
										display: 'block',
										fontSize: '10px',
										fontWeight: 'bold',
										textAlign: 'center',
									}}>
									1007268191540
								</label>
								<label style={{ display: 'block', fontSize: '10px' }}>
									Today's Date / Fecha de hoy:
								</label>
								<label
									style={{
										display: 'block',
										fontSize: '10px',
										textAlign: 'center',
									}}>
									22/22/2024 07:56:00
								</label>
							</td>
						</tr>
						<tr>
							<td style={{ padding: '10px' }} colSpan={3}>
								<label
									style={{
										display: 'inline-block',
										fontSize: '10px',
										fontWeight: 'bold',
									}}>
									SENDER/REMITENTE:
								</label>
								<label
									style={{
										display: 'block',
										fontSize: '10px',
									}}>
									15084591
								</label>
								<label
									style={{
										display: 'block',
										fontSize: '10px',
									}}>
									TEST SWITZERLAND
								</label>
								<label
									style={{
										display: 'block',
										fontSize: '10px',
									}}>
									POST BOX 4485 NEW YORK
								</label>
								<label
									style={{
										display: 'block',
										fontSize: '10px',
									}}>
									ACAMPO NEW YORK 10108
								</label>
								<label
									style={{
										display: 'block',
										fontSize: '10px',
									}}>
									573173633489
								</label>
							</td>
						</tr>

						<tr>
							<td style={{ padding: '10px' }} colSpan={3}>
								<label
									style={{
										display: 'inline-block',
										fontSize: '10px',
										fontWeight: 'bold',
									}}>
									RECIPIENT/DESTINATARIO:
								</label>
								<label
									style={{
										display: 'block',
										fontSize: '10px',
									}}>
									TEST SWITZERLAND
								</label>
								<label
									style={{
										display: 'block',
										fontSize: '10px',
									}}>
									4255 #123
								</label>
								<label
									style={{
										display: 'block',
										fontSize: '10px',
									}}>
									ABEJORRAL
								</label>
								<label
									style={{
										display: 'block',
										fontSize: '10px',
									}}>
									COLOMBIA
								</label>
								<label
									style={{
										display: 'block',
										fontSize: '10px',
									}}>
									0985426954
								</label>
								<label
									style={{
										display: 'block',
										fontSize: '10px',
									}}>
									ISLAMI BANK BAN
								</label>
								<label
									style={{
										display: 'block',
										fontSize: '10px',
									}}>
									TR121416X10131516147891234
								</label>
								<label
									style={{
										display: 'block',
										fontSize: '10px',
										marginTop: '7px',
									}}>
									Payment Mode/Modo de pago: Acc deposit/ Dep. Cuenta
								</label>
							</td>
						</tr>

						<tr>
							<td style={cellStyle} colSpan={3}>
								<label
									style={{
										display: 'block',
										fontSize: '10px',
										fontWeight: 'bold',
									}}>
									PICK UP LOCATION/PUNTO DE PAGO:
								</label>

								<label
									style={{
										display: 'block',
										fontSize: '10px',
										marginTop: '5px',
									}}>
									BANCOLOMBIA ONLY DEPOSIT
								</label>
								<label
									style={{
										display: 'block',
										fontSize: '10px',
									}}>
									ONLY DEPOSIT TO OWN ACCOUNTS
								</label>
								<label
									style={{
										display: 'block',
										fontSize: '10px',
									}}>
									BOGOTA
								</label>
								<label
									style={{
										display: 'block',
										fontSize: '10px',
									}}>
									4090300, 0
								</label>
							</td>
						</tr>
						<tr>
							<td style={{ ...cellStyle, fontSize: '10px' }} colSpan={6}>
								<label
									style={{
										display: 'block',
										fontSize: '10px',
										fontWeight: 'bold',
									}}>
									Order/Orden:
								</label>
								<label
									style={{
										display: 'block',
										fontSize: '10px',
									}}>
									000001-12494
								</label>
								<label
									style={{
										display: 'block',
										fontSize: '10px',
										marginTop: '10px',
										textAlign: 'center',
									}}>
									Date available/Fecha disponible: 02/25/2024
								</label>
								<label
									style={{
										display: 'block',
										fontSize: '10px',
										marginTop: '10px',
										textAlign: 'center',
										fontWeight: 'bold',
									}}>
									*May be available sooner. Puede estar disponible antes
								</label>
							</td>
						</tr>

						<tr>
							<td style={{ padding: '5px' }} colSpan={3}>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
									}}>
									<label
										style={{
											display: 'inline-block',
											fontSize: '10px',
											marginRight: '20px',
										}}>
										Transfer Amount/Cantidad de Envio:
									</label>
									<label
										style={{
											display: 'inline-block',
											fontSize: '10px',
											textAlign: 'right',
										}}>
										$1.14
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
											fontSize: '10px',
											marginRight: '20px',
										}}>
										Transfer Fees/Cargos por Envio:
									</label>
									<label style={{ textAlign: 'right', fontSize: '10px' }}>
										+$5.00
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
											fontSize: '10px',
											marginRight: '20px',
										}}>
										Transfer Taxes/Impuesto de Envio:
									</label>
									<label
										style={{
											display: 'inline-block',
											fontSize: '10px',
											textAlign: 'right',
										}}>
										+$0.00
									</label>
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
									<label
										style={{
											display: 'inline-block',
											fontSize: '10px',
											marginRight: '20px',
										}}>
										Total/Total:
									</label>
									<label
										style={{
											display: 'inline-block',
											fontSize: '10px',
											textAlign: 'right',
										}}>
										$ 6.14
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
										marginBottom: 7,
									}}>
									<label
										style={{
											display: 'inline-block',
											fontSize: '10px',
											marginRight: '20px',
										}}>
										Exchange Rate/Tasa de Cambio:
									</label>
									<label
										style={{
											display: 'inline-block',
											fontSize: '10px',
											textAlign: 'right',
										}}>
										USD $1.00 = 874.60 NGN
									</label>
								</div>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										marginBottom: 7,
									}}>
									<label
										style={{
											display: 'inline-block',
											fontSize: '10px',
											marginRight: '20px',
										}}>
										Transfer Amount/Cantidad de Envio:
									</label>
									<label
										style={{
											display: 'inline-block',
											fontSize: '10px',
											textAlign: 'right',
										}}>
										997.04 NGN
									</label>
								</div>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										marginBottom: 7,
									}}>
									<label
										style={{
											display: 'inline-block',
											fontSize: '10px',
											marginRight: '20px',
										}}>
										Other Fees/Otros Cargos por Envio:
									</label>
									<label
										style={{
											display: 'inline-block',
											fontSize: '10px',
											textAlign: 'right',
										}}>
										-0 NGN
									</label>
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
									<label
										style={{
											display: 'inline-block',
											fontSize: '10px',
											marginRight: '20px',
										}}>
										Total to Recipient/Total al Destinatario
									</label>
									<label
										style={{
											display: 'inline-block',
											fontSize: '10px',
											textAlign: 'right',
										}}>
										997.04 NGN
									</label>
								</div>
							</td>
						</tr>

						<tr>
							<td style={cellStyle} colSpan={6}>
								<label
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
								</label>
								<label
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
									dentro de 180 días al 1-866-210-8002 o Smallworldsfs.com o
									envíelo por correo a 70 Grand Avenue, Suite 104, River Edge, NJ
									07661, o por correo electrónico a cs@smallworldfs.com. También
									puede contactarnos para obtener una explicación escrita de sus
									derechos. You can cancel for a full refund within 30 minutes of
									payment unless the funds have been picked up or deposited. Puede
									cancelar él envió y recibir un reembolso total dentro de 30
									minutos de haber realizado el pago, a no ser que los fondos
									hayan sido recogidos o depositados. Choice Money Transfer makes
									money from foreign currency exchange. Choice Money Transfer gana
									dinero con el cambio de moneda extranjera. For questions or
									complaints about Choice Money Transfer, Inc. d/b/a Small World
									Money Transfer contact: Para preguntas o presentar una queja
									sobre Choice Money Transfer, Inc. d/ b/a Small World Money
									Transfer, contacte a :
									<b>
										CALIFORNIA DEPARTMENT OF FINANCIAL PROTECTION AND INNOVATION
									</b>
									-Phone: 916-327-7585 / Toll Free: 1-866-275-2677 Web: The
									Department of Financial Protection and Innovation | Securing a
									fair and healthy financial services marketplace https://
									dfpi.ca.gov <b>CONSUMER FINANCIAL PROTECTION BUREAU</b>
									855-411-2372 855-729-2372 (TTY/TDD)
									consumerfinance.gov/sending-money <b>RIGHT TO REFUND:</b> You,
									the customer, are entitled to a refund of the money to be Send
									To Printer transmitted as the result of this agreement if Choice
									Money Transfer ("Choice") does not forward the money received
									from you within 10 days of the date of its receipt, or does not
									give instructions committing an equivalent amount of money to
									the person designated by you within 10 days of the date of the
									receipt of the funds from you unless otherwise instructed by
									you. If your instructions as to when the moneys shall be
									forwarded or transmitted are not complied with and the money has
									not yet been forwarded or transmitted, you have a right to a
									refund of your money. If you want a refund, you must mail or
									deliver your written request to Choice at 70 Grand Avenue, Suite
									104, River Edge, NJ 07661. If you do not receive your refund,
									you may be entitled to your money back plus a penalty of up to
									$1,000 and attorney’s fees pursuant to section 2102 of the
									California Financial Code. <b>DERECHO DE REEMBOLSO:</b> Usted,
									el cliente, tiene derecho a que se le reembolse el dinero que
									haya de ser transferido como consecuencia del presente contrato,
									en el supuesto de que Choice Money Transfer ("Choice") no
									proceda a enviar el dinero recibido de Ud. en el plazo de los 10
									días siguientes a la recepción de dicho dinero o en el supuesto
									de que no de instrucciones para la entrega de un importe
									equivalente a la persona designada por usted en el plazo de los
									10 dias siguientes a la recepcion de los fondos, salvo cuando
									medie instrucción en otro sentido por su parte. En caso de
									incumplimiento de las instrucciones relativas a la fecha de
									envió o transferencia del dinero, con el resultado de que el
									dinero no haya sido enviado o transferido, le asiste un derecho
									al reembolso de su dinero. Si quiere solicitar el reembolso,
									debe remitir o entregar una solicitud escrita a Choice, en la
									siguiente dirección: 70 Grand Avenue, Suite 104, River Edge, NJ
									07661. Si usted no recibe el reembolso, en virtud de lo
									dispuesto en el artículo 2102 del Código Financiero de
									California le asiste el derecho a recuperar su dinero, así como
									$1,000 USD en concepto de multa y los costos legales.
								</label>
								<div style={{ position: 'relative', marginTop: 60 }}>
									<hr
										style={{
											borderTop: '1px solid black',
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
											fontSize: '10px',
										}}>
										Customer signature/Firma cliente
									</label>
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
									<label
										style={{
											zIndex: 2,
											backgroundColor: 'white',
											padding: '0 10px',
											fontWeight: 'bold',
											fontSize: '10px',
										}}>
										Cashier signature/Firma Cajero
									</label>
								</div>
							</td>
						</tr>
						<tr>
							<td style={cellStyle} colSpan={3}>
								<label
									style={{
										display: 'block',
										fontSize: '10px',
									}}>
									To check invoice status please scan barCode/ Para revisar el
									estado de la orden, por favor escanear el codigo de barra
								</label>
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
			))}
		</>
	);
};
export default ReceiptPos;
