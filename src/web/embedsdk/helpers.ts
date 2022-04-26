// @ts-nocheck
import Constants from './constants'

function toUpper(str = '') {
	return str.toUpperCase()
}

export function getRootID(config) {
	if (config.appName) {
		return `${Constants.EPNS_SDK_EMBED_VIEW_ROOT}_${toUpper(config.appName)}`
	}
	return `${Constants.EPNS_SDK_EMBED_VIEW_ROOT}_DEFAULT_APPNAME`
}

export const SDK_LOCAL_STORAGE = {
	async getLocalStorage(key) {
		const lsKey = `${Constants.EPNS_SDK_EMBED_LOCAL_STORAGE_PREFIX}${key}`;
		const lsValue = window.localStorage.getItem(lsKey);
		try {
		  return JSON.parse(lsValue);
		} catch (err) {
		  console.warn(`${Constants.EPNS_SDK_EMBED_NAMESPACE} - Local Storage READ issue`);
		  return '';
		}
	  },
	  setLocalStorage(key, value) {
		const lsKey = `${Constants.EPNS_SDK_EMBED_LOCAL_STORAGE_PREFIX}${key}`;
		window.localStorage.setItem(lsKey, JSON.stringify(value));
	  }
};

export function getFirstItemInArray(arr) {
	if (Array.isArray(arr)) {
		const [firstItem] = arr;
		return firstItem;
	} 
	return null;
}