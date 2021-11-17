import { ApiNotificationType, ParsedResponseType } from "../types/notification";
/**
 * @description extract the ipfs HASH from the name of an image i.e www.xyz.com/abc/ipfshash.jpg => ipfshash
 * @param notificationBody
 * @returns the ipfs hash extracted from the image name
 */
export declare function extractIPFSHashFromImageURL(imageURL: string | undefined): string;
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
