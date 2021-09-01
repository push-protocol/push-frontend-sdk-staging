/**
 * @description Contains a set of utilities to abstract several code
 * @version 1.0
*/
import FormatBody from "./parseMessage";

/**
 * @description parse and extract the timestamp from the body of the notification and remove the text from the body
 * @param notificationBody the text which would represent the body of the notification
 * @returns 
 */
export function extractTimeStamp(notificationBody:string):{ notificationBody: string, timeStamp: string} {
    let parsedBody = {
        notificationBody: FormatBody(notificationBody),
        timeStamp: "",
    };
    const matches = notificationBody.match(/\[timestamp:(.*?)\]/);
    if (matches) {
        parsedBody.timeStamp = matches[1];
        const textWithoutTimeStamp = notificationBody.replace(/ *\[timestamp:[^)]*\] */g, "");
        parsedBody.notificationBody = FormatBody(textWithoutTimeStamp);
    }
    return parsedBody;
};


export default {
    extractTimeStamp
}