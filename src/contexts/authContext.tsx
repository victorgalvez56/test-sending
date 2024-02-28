import React, { createContext, FC, ReactNode, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export interface User {
	identityCode: number;
	agency: string;
	name: string;
	login: string;
	password: string;
	status: string;
	secLevel: string;
	company: string;
	changePassword: string;
	datePwdUpdated: string;
	daysToChangePwd: number;
	email: string;
	countryBorn: string;
	distributorUser: number;
	doddFrankAcceptance: string;
	pinCode: number;
	mobile: string;
	email1: string;
	textPin: string;
	requereEmailValidation: boolean;
	fraudAwarenessAcceptance: string;
	fraudPreventionAcceptance: string;
	checkProcessingTokenDate: string;
	checkProcessingToken: string;
	checkProcessingTokenUsed: boolean;
	learnerId: string;
	checkLearningPath: boolean;
	useDoubleAuth: boolean;
	doubleAuthType: string;
	learningPassesLeft: number;
	inactivationDate: string;
	learningStatusToSent?: boolean;
	language: string;
	fname: string;
	lname: string;
	creationDate: string;
	litmosUpdated: boolean;
	toUpdateInLearningSystem: boolean;
	rights: string;
	learnerIdBackup: string;
	learningSkipsUsed: number;
	incomingChannelReleasePin: number;
	learnerIdTest: string;
	postTransactionValidationPin: string;
	mobilePhoneAuthorized: boolean;
	validateGeolocation: boolean;
	useGoogleAuth: boolean;
	googleAuthConfirm: boolean;
	googleAuthSecretKey: string;
	dualAuthType: string;
	requireDualAuth: string;
	tempPinCode: string;
	prefix: string;
	doubleAuthAttempts: number;
	faLoginTime: string;
	deleted: boolean;
	deletedBySystemUser: number;
	deletedByAgencyUser: number;
	learningLanguage: string;
	learningLanguagePreferred: string;
	lastLoginTime: string;
	assignedToAgency: boolean;
	deletionDate: string;
	appId: number;
	idUsr: string;
	usrType: string;
}

export interface Token {
	key: string;
}
export interface IAuthContextProps {
	setUser: React.Dispatch<React.SetStateAction<{} | User>>;
	user: Partial<User>;
}
const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

interface IAuthContextProviderProps {
	children: ReactNode;
}
export const AuthContextProvider: FC<IAuthContextProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | {}>({});

	const value = useMemo(
		() => ({
			user,
			setUser,
		}),
		[user],
	);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
AuthContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AuthContext;
