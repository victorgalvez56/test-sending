import i18n from '../i18n';

export enum HttpMethod {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

export type ErrorHanlder = (error: string) => void;
export type FetchResponse = {
	code: string;
	description: string;
	statusCode?: number;
};

export async function myFetch<T extends FetchResponse | any>(
	endpoint: string,
	pay: string,
	resultHandler: (response: T) => void,
	errorHandler: ErrorHanlder,
	method = HttpMethod.POST,
	aditionalHeaders?: { [key: string]: string },
) {
	const parse = pay !== '' ? JSON.parse(pay) : JSON.parse('{}');
	const payload = { ...parse };
	const url = process.env.REACT_APP_API + endpoint;
	const body = method !== HttpMethod.GET ? { body: JSON.stringify(payload) } : {};

	const request = {
		method: method,
		headers: {
			'Content-Type': 'application/json',
			...aditionalHeaders,
			'Accept-Language': i18n.language === 'en' ? 'en-US' : 'es-MX',
		},
		...body,
	};

	return fetch(url, request)
		.then(async (response) => {
			if (response.status >= 400) {
				throw new Error(await response.json().then((e) => e.error.message));
			}
			return response.json();
		})
		.then((data: T) => {
			resultHandler(data);
		})
		.catch((error: Error) => {
			errorHandler(JSON.stringify(error.message));
		});
}
