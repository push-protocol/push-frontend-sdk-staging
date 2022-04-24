// @ts-nocheck
import htmlTemplate from './htmlTemplate'
import cssTemplate from './cssTemplate'
import Constants from './constants'
import { getRootID, getFirstItemInArray, SDK_LOCAL_STORAGE } from './helpers'

/**
 * PRIVATE variables
 */

/** keep the config flat as possible  */
const __DEFAULT_CONFIG = {
	isInitialized: false,
	targetID: '', // MANDATORY
	appName: '', // MANDATORY
	user: '', // MANDATORY
	headerText: 'Notifications',
	viewOptions: {
		type: 'sidebar', // ['sidebar', 'modal']
		showUnreadIndicator: true,
		unreadIndicatorColor: '#cc1919',
		unreadIndicatorPosition: 'top-right',
		theme: 'light'
	},
};

// runtime config
const __CONFIG = {};

/**
 * PRIVATE methods
 */
function validateConfig(passedConfig) {
  if (!passedConfig.user) {
	console.error(`${EPNS_SDK_EMBED_NAMESPACE} - config.user not passed!`);
	return false;
  }
  if (!passedConfig.targetID) {
	console.error(`${EPNS_SDK_EMBED_NAMESPACE} - config.targetID not passed!`);
	return false;
  }
  if (!passedConfig.appName) {
	console.error(`${EPNS_SDK_EMBED_NAMESPACE} - config.appName not passed!`);
	return false;
  }
  return true;
}

function getClonedConfig(passedConfig) {
	const clonedConfig = {};
	const viewOptionsConfig = Object.assign({}, __DEFAULT_CONFIG.viewOptions , passedConfig.viewOptions);
	clonedConfig = Object.assign({}, __DEFAULT_CONFIG, passedConfig);
	clonedConfig.viewOptions = viewOptionsConfig;	
	return clonedConfig;
}

function hideEmbedView() {
	const rootID = getRootID(__CONFIG);
	const existingEmbedElements = document.querySelectorAll(`#${rootID}`);
	// remove any existing instances of the embedElement
	if (existingEmbedElements.length > 0) {
		for (let i = 0; i < existingEmbedElements.length; i ++) {
			document.querySelector('body')?.removeChild(existingEmbedElements[i])
		}
	}
}

function showEmbedView() {
	const sdkRef = this;
	const rootID = getRootID(__CONFIG);

	hideEmbedView.call(sdkRef);

	// set up the "embedViewElement"
	const embedViewElement = document.createElement('div');
	embedViewElement.id = rootID;
	embedViewElement.classList.add('epns-sdk-embed-modal', 'epns-sdk-embed-modal-open');
	embedViewElement.innerHTML = htmlTemplate(__CONFIG);

	document.querySelector('body').appendChild(embedViewElement);

	removeUnreadIndicatorElement.call(sdkRef);

	// When the user clicks anywhere outside of the modal, close it
	const overlayId = `#${rootID} .epns-sdk-embed-modal-overlay`;
	const overlayElement = document.querySelector(overlayId);

	overlayElement.onclick = function(event) {
		event.preventDefault();
		event.stopPropagation();
		hideEmbedView.call(sdkRef);
	}
}

function setUpEventHandlers() {
	const sdkRef = this;
	const triggerElement = document.querySelector(`#${__CONFIG.targetID}`);

	if (triggerElement && triggerElement.id === __CONFIG.targetID) {
		console.info(`${Constants.EPNS_SDK_EMBED_NAMESPACE} - click handler attached to #${__CONFIG.targetID}`);

		triggerElement.addEventListener('click', (clickEvent) => {
			clickEvent.preventDefault();
			clickEvent.stopPropagation();
			showEmbedView.call(sdkRef);
		});
	} else {
		console.error(`${EPNS_SDK_EMBED_NAMESPACE} - No trigger element ${__CONFIG.targetID} found!`)
	}
}

function removeEventHandlers() {
	const sdkRef = this;
	const triggerElement = document.querySelector(`#${__CONFIG.targetID}`);

	if (triggerElement && triggerElement.id === __CONFIG.targetID) {
		triggerElement.replaceWith(triggerElement.cloneNode(true));
	}
};

function publishToIFRAME(msgPayload) {
	const iframeElement = document.querySelector(`iframe#${Constants.EPNS_SDK_IFRAME_ID}`);
	
	try {
		iframeElement.contentWindow.postMessage(JSON.stringify(msgPayload), '*');
	} catch (err) {
		console.error(`${Constants.EPNS_SDK_EMBED_NAMESPACE} - APP to IFRAME publish error'`, err);
	}
}

function subscribeToIFRAME(evt) {
	const sdkRef = this;

	try {
		if (typeof evt.data !== 'string') return null;

		const publishedMsg = JSON.parse(evt.data);
		
		if (publishedMsg.channel === Constants.EPNS_SDK_CHANNEL) {
			console.info(`${Constants.EPNS_SDK_EMBED_NAMESPACE} - Received communication from the IFRAME: `, publishedMsg.topic);

			// When the Embed App is loaded.
			if (publishedMsg.topic === Constants.EPNS_SDK_CHANNEL_TOPIC_IFRAME_APP_LOADED) {
				const msgPayload = {
					msg: __CONFIG,
					channel: Constants.EPNS_SDK_CHANNEL,
					topic: Constants.EPNS_SDK_CHANNEL_TOPIC_SDK_CONFIG_INIT
				};

				publishToIFRAME.call(sdkRef, msgPayload);
			}

			// When the Embed App close button is clicked.
			if (publishedMsg.topic === Constants.EPNS_SDK_CHANNEL_TOPIC_IFRAME_APP_CLOSED) {
				hideEmbedView.call(sdkRef);
			}
		}
	} catch (err) {
		console.error(`${Constants.EPNS_SDK_EMBED_NAMESPACE} - IFRAME TO APP msg receiving error`, err)
	}
}

function setUpWidget() {
	const sdkRef = this;
	
	// Add event handler to the trigger button 
	if (document.readyState === 'complete') {
		setUpEventHandlers.call(sdkRef);
	} else {
		window.addEventListener('load', () => {
			setUpEventHandlers.call(sdkRef);
		})
	}
	
	// attach IFRAME subscription
	window.addEventListener('message', subscribeToIFRAME.bind(sdkRef), false);
}

function insertCSS() {
	const sdkRef = this;
	const rootID = getRootID(__CONFIG)
	const styleTagId = `${Constants.EPNS_SDK_STYLE_TAG_ID_PREFIX}${rootID}`

	let CSSElement = document.querySelector(
		`style#${styleTagId}`
	)
	if (!CSSElement) {
		const styleEl = document.createElement('style')
		styleEl.id = `${styleTagId}`
		CSSElement = styleEl
	}

	CSSElement.innerHTML = cssTemplate(__CONFIG)
	document.querySelector('head').appendChild(CSSElement)
}

function handleUnreadNotifications() {
	const sdkRef = this;

	// Unread notifications
	if (__CONFIG.viewOptions.showUnreadIndicator) {
		refreshUnreadCount.call(sdkRef);
	} else {
		removeUnreadIndicatorElement.call(sdkRef);
	}
}

async function refreshUnreadCount() {
	const sdkRef = this;

	let count = 0;
	const rootID = getRootID(__CONFIG);
	const LS_KEY = `${Constants.EPNS_SDK_LOCAL_STORAGE_PREFIX}${rootID}_LAST_NOTIFICATIONS`;

	let lastNotifications = await SDK_LOCAL_STORAGE.getLocalStorage(LS_KEY);		
	let latestNotifications = await getUnreadNotifications.call(sdkRef);

	latestNotifications = latestNotifications.map((notif) => notif.payload_id);

	const lastNotification = getFirstItemInArray(lastNotifications);

	if (lastNotification) {
		const indexOfID = latestNotifications.indexOf(lastNotification);
		if (indexOfID !== -1) { // present
			let latestNotificationsUnread = latestNotifications.slice(0, indexOfID);
			count = latestNotificationsUnread.length;
		}
	} else {
		count = latestNotifications.length;
	}

	SDK_LOCAL_STORAGE.setLocalStorage(LS_KEY, latestNotifications);

	if (count > 0) {
		addUnreadIndicatorElement.call(sdkRef, count > 9 ? '9+' : count);
	} else {
		removeUnreadIndicatorElement.call(sdkRef);
	}
}

async function getUnreadNotifications() {
	const sdkRef = this;

	// call the API here
	try {
		const response = await fetch(Constants.EPNS_SDK_EMBED_API_URL, {
			method: "POST",
			body: JSON.stringify({
				"user": __CONFIG.user,
				"page": 1,
				"pageSize": 10,
				"op": "read"
			}),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		});

		if (response.ok) {
			const json = await response.json();
			return json.results || [];
		  } else {
			return [];
		  }

	} catch (error) {
		console.error(`${EPNS_SDK_EMBED_NAMESPACE} - API Error ${Constants.EPNS_SDK_EMBED_API_URL}`, error);
		return [];
	}
}

function addUnreadIndicatorElement(count) {
	const sdkRef = this;

	removeUnreadIndicatorElement.call(sdkRef);
	const throbber = document.createElement('div')

	throbber.classList.add(
	  'epns-sdk-unread-indicator',
	  `epns-sdk-appname-${__CONFIG.appName}`,
	  __CONFIG.viewOptions.unreadIndicatorPosition
	)

	throbber.innerText = count;

	if (document.querySelector(`#${__CONFIG.targetID}`)) {
	  document.querySelector(`#${__CONFIG.targetID}`).appendChild(throbber)
	}
}

function removeUnreadIndicatorElement() {
	if (
	  document.querySelector(`#${__CONFIG.targetID}`) &&
	  document
		.querySelector(`#${__CONFIG.targetID}`)
		.querySelector(
		  `.epns-sdk-unread-indicator.epns-sdk-appname-${__CONFIG.appName}`
		)
	) {
	  document
		.querySelector(`#${__CONFIG.targetID}`)
		.removeChild(
		  document
			.querySelector(`#${__CONFIG.targetID}`)
			.querySelector(
			  `.epns-sdk-unread-indicator.epns-sdk-appname-${__CONFIG.appName}`
			)
		)
	}
}


const EmbedSDK = {
	init(options) {
		const sdkRef = this;

		if (!__CONFIG.isInitialized) {
			if (!validateConfig(options)) {
				return false;
			}

			__CONFIG = getClonedConfig(options);
			__CONFIG.isInitialized = true;

			setUpWidget.call(sdkRef);
			insertCSS.call(sdkRef);
			handleUnreadNotifications.call(sdkRef);
			console.info(`${Constants.EPNS_SDK_EMBED_NAMESPACE} - CONFIG set`, __CONFIG);
		}
	},
	cleanup() {
		const sdkRef = this;
		if (__CONFIG.isInitialized) {
			hideEmbedView.call(sdkRef);
			removeEventHandlers.call(sdkRef);
			window.removeEventListener('message', subscribeToIFRAME.bind(sdkRef), false);
		}
		__CONFIG = {};

		console.info(`${Constants.EPNS_SDK_EMBED_NAMESPACE} - cleanup called`);
	}
};

export default EmbedSDK