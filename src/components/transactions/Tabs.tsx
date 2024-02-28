import { FC } from 'react';
import Button from '../bootstrap/Button';

interface ITabsProps {
	onSelectTab: (tabId: number) => void;
	selectedTab: number;
	tabValidity: boolean[];
}

interface ITabsPropss {
	onSelectTab: (tabId: number) => void;
	selectedTab: number;
}

export const Tabs: FC<ITabsProps> = ({ onSelectTab, selectedTab, tabValidity }) => {
	const tabs = [
		{ id: 1, label: 'Sender Information' },
		{ id: 2, label: 'Recipient Information' },
		{ id: 3, label: 'Invoice' },
	];
	return (
		<div>
			{tabs.map((tab) => (
				<Button
					key={tab.id}
					color='primary'
					isLight
					onClick={() => onSelectTab(tab.id)}
					isDisable={!tabValidity[tab.id - 1]}
					isActive={tab.id === selectedTab ? true : false}>
					{tab.label}
				</Button>
			))}
		</div>
	);
};

export const Tabs2: FC<ITabsPropss> = ({ onSelectTab, selectedTab }) => {
	const tabs = [
		{ id: 1, label: 'Sender Information' },
		{ id: 2, label: 'Recipient Information' },
		{ id: 3, label: 'Invoice Information' },
		{ id: 4, label: 'Payment Information' },
	];

	return (
		<div>
			{tabs.map((tab) => (
				<Button
					key={tab.id}
					color='primary'
					isLight
					onClick={() => onSelectTab(tab.id)}
					isActive={tab.id === selectedTab ? true : false}>
					{tab.label}
				</Button>
			))}
		</div>
	);
};
