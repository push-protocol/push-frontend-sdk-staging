/**
 * @description parse and extract the timestamp from the body of the notification and remove the text from the body
 * @param notificationBody the text which would represent the body of the notification
 * @returns
 */
export declare function extractTimeStamp(notificationBody: string): {
    notificationBody: string;
    timeStamp: string;
};
declare const _default: {
    extractTimeStamp: typeof extractTimeStamp;
};
export default _default;
