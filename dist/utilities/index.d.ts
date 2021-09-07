import { ApiNotificationType, ParsedResponseType } from "../types/notification";
/**
 * @description parse and extract the timestamp from the body of the notification and remove the text from the body
 * @param notificationBody the text which would represent the body of the notification
 * @returns
 */
export declare function extractTimeStamp(notificationBody: string): {
    notificationBody: string;
    timeStamp: string;
};
/**
 * @description parse the response gotten from the API
 * @param {ApiNotificationType[]} response
 * @returns {ParsedResponseType[]}
 */
export declare function parseApiResponse(response: ApiNotificationType[]): ParsedResponseType[];
declare const _default: {
    extractTimeStamp: typeof extractTimeStamp;
    parseApiResponse: typeof parseApiResponse;
};
export default _default;
