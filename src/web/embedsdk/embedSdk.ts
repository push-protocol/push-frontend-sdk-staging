// @ts-nocheck
import htmlTemplate from './htmlTemplate'
import cssTemplate from './cssTemplate'
import Constants from './constants'
import { getRootID, getLocalStorage, setLocalStorage, getFirstItemInArray } from './helpers'


const EmbedSDK = {
	/**
	 * DEFAULT config options, to be overriden by the client dApp
	 */
	config: {
		isInitialized: false,
		isFrameVisible: false,
		targetID: 'epns-sdk-trigger-id',
		appName: 'appName',
		viewOptions: {
			headerText: 'Notifications',
			type: 'sidebar',
			showUnreadIndicator: false,
			unreadIndicatorColor: '#cc1919',
			unreadIndicatorPosition: 'top-right',
			theme: 'light'
		},
		user: '0xD8634C39BBFd4033c0d3289C4515275102423681' // "0xD8634C39BBFd4033c0d3289C4515275102423681";
	},
	/**
     * Call this function when your APP intializes
     */
	init(options: any) {
		if (!this.config.isInitialized) {
			this.config = options;
			this.config.isInitialized = true;
			this.setUpWidget();
			this.insertCSS();
			this.handleUnreadNotifications();
			console.info('[EPNS-SDK] CONFIG set', this.config);
		}
	},
	setUpWidget() {
		const sdkRef = this;
		/**
		 * Add stuff needed after the page has loaded
		 */
		if (document.readyState === 'complete') {
            sdkRef.setUpEventHandlers();
		} else {
			window.addEventListener('load', () => {
				sdkRef.setUpEventHandlers();
			})
		}
		/**
		 * MESSAGE pub/sub
		 */
		window.addEventListener('message',
			(evt) => {
				try {
					if (typeof evt.data === 'string') {
						const publishedMessage = JSON.parse(evt.data)
						if (publishedMessage && publishedMessage.msgCode === Constants.EPNS_SDK_IFRAME_TO_PARENT_MSG) {
							/**
							* Add different cases for sub here
							*/
							console.info('Received communication from the IFRAME: ', publishedMessage);

							if (publishedMessage.msgType === 'IFRAME_APP_LOADED') {
								sdkRef.publishMessageToIFRAME({
									msg: sdkRef.config,
									msgCode: 'EPNS_SDK_PARENT_TO_IFRAME_MSG',
									msgType: 'SDK_CONFIG_INIT'
								});
							}

							if (publishedMessage.msgType === 'IFRAME_APP_CLOSE') {
								sdkRef.hideEmbedView();
							}
						}
					}
				} catch (err) {
					console.error('something went wrong parsing IFRAME message to the APP.', err)
				}
			},
			false
		);
	},
	setUpEventHandlers() {
		const sdkRef = this;
		const triggerElement = document.querySelector(`#${sdkRef.config.targetID}`);

		if (triggerElement && triggerElement.id === sdkRef.config.targetID) {
			console.info(`[EPNS-SDK - click handler attached to the #${sdkRef.config.targetID} ]`);
			triggerElement.addEventListener('click', (clickEvent) => {
				clickEvent.preventDefault()
				clickEvent.stopPropagation()
				sdkRef.showEmbedView()
			})
		} else {
			console.error(`Did not find the trigger element ${sdkRef.config.targetID}`)
		}
	},
	hideEmbedView() {
		const rootID = getRootID(this.config)
		const embedViewElement = document.querySelector(`#${rootID}`)

		if (embedViewElement) {
			document.querySelector('body')?.removeChild(embedViewElement)
		}
	},
	showEmbedView() {
		const sdkRef = this
		const rootID = getRootID(sdkRef.config)
		const embedViewElement = document.createElement('div')

		// set up the Element props
		embedViewElement.id = rootID;
		embedViewElement.classList.add('epns-sdk-embed-modal', 'epns-sdk-embed-modal-open');
		embedViewElement.innerHTML = htmlTemplate(sdkRef.config);

		document.querySelector('body').appendChild(embedViewElement);

		sdkRef.removeUnreadIndicatorElement();

		// When the user clicks anywhere outside of the modal, close it
		const overlayId = `#${rootID} .epns-sdk-embed-modal-overlay`;
		const overlayElement = document.querySelector(overlayId);

		overlayElement.onclick = function(event) {
			event.preventDefault();
			event.stopPropagation();
			sdkRef.hideEmbedView();
		}
	},
	publishMessageToIFRAME({ msg, msgType, msgCode }) {
		// pass the sdkConfig to the IFRAME
		const iframeElement = document.querySelector(`iframe#${Constants.EPNS_SDK_IFRAME_ID}`);
		try {
			iframeElement.contentWindow.postMessage(
				JSON.stringify({ msgCode, msgType, msg })
				,'*'
			);
		} catch (err) {
			console.error('[EPNS-SDK] - issue publishing message to IFRAME')
		}
	},
	insertCSS() {
		const rootID = getRootID(this.config)
		const styleTagId = `${Constants.EPNS_SDK_STYLE_TAG_ID_PREFIX}${rootID}`

		let CSSElement = document.querySelector(
			`style#${styleTagId}`
		)
		if (!CSSElement) {
			const styleEl = document.createElement('style')
			styleEl.id = `${styleTagId}`
			CSSElement = styleEl
		}

		CSSElement.innerHTML = cssTemplate(this.config)
        
		document.querySelector('head').appendChild(CSSElement)
	},
	handleUnreadNotifications() {
		const sdkRef = this;
	
		// Unread notifications
		if (sdkRef.config.viewOptions.showUnreadIndicator) {
			sdkRef.refreshUnreadCount();
		} else {
			sdkRef.removeUnreadIndicatorElement();
		}
	},
	async refreshUnreadCount() {
		const sdkRef = this;
		let count = 0;
		const rootID = getRootID(this.config);
		const LS_KEY = `${Constants.EPNS_SDK_LOCAL_STORAGE_PREFIX}${rootID}_LAST_NOTIFICATIONS`;

		let lastNotifications = await getLocalStorage(LS_KEY);		
		let latestNotifications = await sdkRef.getUnreadNotifications();

		latestNotifications = latestNotifications.map((notif) => notif.payload_id);

		console.log({ lastNotifications, latestNotifications })

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

		setLocalStorage(LS_KEY, latestNotifications);

		if (count > 0) {
			sdkRef.addUnreadIndicatorElement(count > 9 ? '9+' : count);
		} else {
			sdkRef.removeUnreadIndicatorElement();
		}
	},
	async getUnreadNotifications() {
		const sdkRef = this;
		const user = sdkRef.config.user;

		// call the API here
		try {
			const response = await fetch(Constants.EPNS_SDK_EMBED_API_URL, {
				// Adding method type
				method: "POST",
				// Adding body or contents to send
				body: JSON.stringify({
					"user": user,
					"page": 1,
					"pageSize": 10,
					"op": "read"
				}),
				// Adding headers to the request
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
			console.error(`[EPNS_SDK_EMBED] - error while calling ${Constants.EPNS_SDK_EMBED_API_URL}`);
			return [];
		}
	},
	addUnreadIndicatorElement(count) {
		this.removeUnreadIndicatorElement();
		const throbber = document.createElement('div')

		throbber.classList.add(
		  'epns-sdk-unread-indicator',
		  `epns-sdk-appname-${this.config.appName}`,
		  this.config.viewOptions.unreadIndicatorPosition
		)

		throbber.innerText = count;

		if (document.querySelector(`#${this.config.targetID}`)) {
		  document.querySelector(`#${this.config.targetID}`).appendChild(throbber)
		}
	},
	removeUnreadIndicatorElement() {
		if (
		  document.querySelector(`#${this.config.targetID}`) &&
		  document
			.querySelector(`#${this.config.targetID}`)
			.querySelector(
			  `.epns-sdk-unread-indicator.epns-sdk-appname-${this.config.appName}`
			)
		) {
		  document
			.querySelector(`#${this.config.targetID}`)
			.removeChild(
			  document
				.querySelector(`#${this.config.targetID}`)
				.querySelector(
				  `.epns-sdk-unread-indicator.epns-sdk-appname-${this.config.appName}`
				)
			)
		}
	},
	cleanUp() {

	}
}

export default EmbedSDK