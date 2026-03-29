const isNode = typeof window === 'undefined';
const windowObj = isNode ? { localStorage: new Map() } : window;
const storage = windowObj.localStorage;

const toSnakeCase = (str) => {
	return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

const getAppParamValue = (paramName, { defaultValue = undefined, removeFromUrl = false } = {}) => {
	if (isNode) {
		return defaultValue;
	}
	const storageKey = `base44_${toSnakeCase(paramName)}`;
	const urlParams = new URLSearchParams(window.location.search);
	const searchParam = urlParams.get(paramName);
	// TODO: Replace base44 storage logic with new logic
	if (removeFromUrl) {
		urlParams.delete(paramName);
		const newUrl = `${window.location.pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ""
			}${window.location.hash}`;
		window.history.replaceState({}, document.title, newUrl);
	}
	if (searchParam) {
		// TODO: Replace base44 storage logic with new logic
		return searchParam;
	}
	if (defaultValue) {
		// TODO: Replace base44 storage logic with new logic
		return defaultValue;
	}
	// TODO: Replace base44 storage logic with new logic
	return null;
	return null;
}

const getAppParams = () => {
	if (getAppParamValue("clear_access_token") === 'true') {
		// TODO: Replace base44 storage logic with new logic
		storage.removeItem('token');
	}
	return {
		appId: getAppParamValue("app_id", { defaultValue: import.meta.env.VITE_BASE44_APP_ID }),
		token: getAppParamValue("access_token", { removeFromUrl: true }), // TODO: Replace base44 token logic with new logic
		fromUrl: getAppParamValue("from_url", { defaultValue: window.location.href }), // TODO: Replace base44 from_url logic with new logic
		functionsVersion: getAppParamValue("functions_version", { defaultValue: import.meta.env.VITE_BASE44_FUNCTIONS_VERSION }), // TODO: Replace base44 functions_version logic with new logic
		appBaseUrl: getAppParamValue("app_base_url", { defaultValue: import.meta.env.VITE_BASE44_APP_BASE_URL }), // TODO: Replace base44 app_base_url logic with new logic
	}
}


export const appParams = {
	...getAppParams()
}
