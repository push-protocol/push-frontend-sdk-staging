// @ts-nocheck
import Constants from './constants'

export default function (config) {
	return `
        <div class="epns-sdk-embed-modal-overlay">
            <div class="epns-sdk-embed-modal-content">
                <iframe id="${Constants.EPNS_SDK_IFRAME_ID}" src="${Constants.EPNS_SDK_EMBED_APP_URL}"></iframe>
            </div>
        </div>
    `
}