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

export async function getLocalStorage(key) {
  const lsValue = window.localStorage.getItem(key);
  try {
	return JSON.parse(lsValue);
  } catch (err) {
	console.warn('[EPNS-SDK] - local storage read issue');
	return '';
  }
}

export function setLocalStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getFirstItemInArray(arr) {
	if (Array.isArray(arr)) {
		const [firstItem] = arr;
		return firstItem;
	} 
	return null;
}