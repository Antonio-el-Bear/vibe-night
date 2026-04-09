// VenueCard component implementation
// This fixes import errors in pages that expect a default export.
// Customize this component as needed for your UI.
import React from "react";

export default function VenueCard({ venue }) {
	if (!venue) return null;
	return (
		<div className="rounded-xl border p-4 mb-2">
			<h3 className="font-bold text-lg">{venue.name || "Venue"}</h3>
			{/* Add more venue details here as needed */}
		</div>
	);
}

// Detect if running in Node.js (SSR) or browser
const isNode = typeof window === 'undefined';
// Use a dummy storage object for SSR, otherwise use browser localStorage
const storage = isNode
	? { setItem: () => {}, getItem: () => null, removeItem: () => {} }
	: window.localStorage;

const toSnakeCase = (str) => {
	return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

const getAppParamValue = (paramName, { defaultValue = undefined, removeFromUrl = false } = {}) => {
	if (isNode) {
		return defaultValue;
	}
	// Use a single storageKey, not duplicate declarations
	const storageKey = `placeholder_${toSnakeCase(paramName)}`; // Updated key
	const urlParams = new URLSearchParams(window.location.search);
	const searchParam = urlParams.get(paramName);
	if (removeFromUrl) {
		urlParams.delete(paramName);
		const newUrl = `${window.location.pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ""}${window.location.hash}`;
		window.history.replaceState({}, document.title, newUrl);
	}
	if (searchParam) {
		storage.setItem(storageKey, searchParam);
		return searchParam;
	}
	if (defaultValue) {
		storage.setItem(storageKey, defaultValue);
		return defaultValue;
	}
	const storedValue = storage.getItem(storageKey);
	if (storedValue) {
		return storedValue;
	}
	return null;
}

const getAppParams = () => {
	if (getAppParamValue("clear_access_token") === 'true') {
		storage.removeItem('placeholder_access_token'); // TODO: Replace base44 storage and env usage with new logic
		storage.removeItem('token');
	}
	// Updated to use custom VITE_ variables instead of VITE_BASE44_
		return {
			appId: getAppParamValue("app_id", { defaultValue: import.meta.env.VITE_APP_ID }),
			token: getAppParamValue("access_token", { removeFromUrl: true }),
			fromUrl: getAppParamValue("from_url", { defaultValue: window.location.href }),
			functionsVersion: getAppParamValue("functions_version", { defaultValue: import.meta.env.VITE_FUNCTIONS_VERSION }),
			appBaseUrl: getAppParamValue("app_base_url", { defaultValue: import.meta.env.VITE_API_URL }),
		}
}


export const appParams = {
	...getAppParams()
}
