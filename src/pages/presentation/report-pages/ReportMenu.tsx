import { useContext } from 'react';

import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { demoPagesMenu } from '../../../menu';
import useDarkMode from '../../../hooks/useDarkMode';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import AuthContext from '../../../contexts/authContext';
import Icon from '../../../components/icon/Icon';
import { Link } from 'react-router-dom';

const ReportIndex = () => {
	const { darkModeStatus } = useDarkMode();
	const { user } = useContext(AuthContext);

	return (
		<PageWrapper title={demoPagesMenu.editPages.subMenu.editInCanvas.text}>
			<Page container='fluid'>
				<div className='row h-100'>
					<div className='col-12'>
						<Card stretch={true}>
							<CardHeader borderSize={1}>
								<CardLabel icon='LibraryBooks' iconColor='info'>
									<CardTitle>Reports</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody className='table-responsive' isScrollable={true}>
								<div className='row mt-5'>
									<div className='col-md-2'>
										<div className='d-flex flex-column align-items-center mb-0'>
											<Link to={'../ReportDetail'}>
												<Icon
													icon='LibraryBooks'
													className='mb-0 text-info h1'
													size='5x'
												/>
											</Link>
											<p className='mt-2 mb-0'>
												Report Transactions Detailed
											</p>
										</div>
									</div>

									<div className='col-md-2'>
										<div className='d-flex flex-column align-items-center mb-0'>
											<Link to={'../ReportSummarized'}>
												<Icon
													icon='LibraryBooks'
													className='mb-0 text-info h1'
													size='5x'
												/>
											</Link>
											<p
												className='mt-2 mb-0 text-center'
												style={{ maxWidth: '150px' }}>
												Report Transactions Summarized
											</p>
										</div>
									</div>

									<div className='col-md-2'>
										<div className='d-flex flex-column align-items-center mb-0'>
											<Link to={'../ReportByCountry'}>
												<Icon
													icon='LibraryBooks'
													className='mb-0 text-info h1'
													size='5x'
												/>
											</Link>
											<p
												className='mt-2 mb-0 text-center'
												style={{ maxWidth: '150px' }}>
												Report Transactions by Country
											</p>
										</div>
									</div>

									<div className='col-md-2'>
										<div className='d-flex flex-column align-items-center mb-0'>
											<Link to={'../ReportFormat1'}>
												<Icon
													icon='LibraryBooks'
													className='mb-0 text-info h1'
													size='5x'
												/>
											</Link>
											<p className='mt-2 mb-0'>Report Statement Format 1</p>
										</div>
									</div>

									<div className='col-md-2'>
										<div className='d-flex flex-column align-items-center mb-0'>
											<Link to={'../ReportSender'}>
												<Icon
													icon='LibraryBooks'
													className='mb-0 text-info h1'
													size='5x'
												/>
											</Link>
											<p className='mt-2 mb-0'>Report Sender Segregation</p>
										</div>
									</div>

									<div className='col-md-2'>
										<div className='d-flex flex-column align-items-center mb-0'>
											<Link to={'../ReportBill'}>
												<Icon
													icon='LibraryBooks'
													className='mb-0 text-info h1'
													size='5x'
												/>
											</Link>
											<p className='mt-2 mb-0'>Bill Payment Report</p>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default ReportIndex;
