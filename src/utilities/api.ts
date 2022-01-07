/**
 * @description Contains utilities used to fetch data from an API or external source
 * @version 1.0
*/
import axios from 'axios';
import config from '../config';

const DEFAULT_INITIAL_PAGE = 1;
const DEFAULT_PAGE_SIZE  = 10;
const API_BASE_URL = config.BASE_URL;


/**
 * 
 */
const fetchSpamNotifications = async (
    userAccount: string,
    itemsPerPage = DEFAULT_PAGE_SIZE,
    page = DEFAULT_INITIAL_PAGE,
    baseApiUrl = API_BASE_URL,
) => {
    const body = {
        "user": userAccount,
        "page": page,
        "pageSize": itemsPerPage,
        "op":"read"
    };

    return axios.post(`${baseApiUrl}/feeds/get_spam_feeds`, body)
    .then((response:any) => response.data)
    .catch((err: any) => {
        console.log(`
        ============== There was an error [epns-sdk -> loadNotifications] ============
        `, err);
    })
}
/**
 * Fetch paginated notifications for a user
 * @param {string} userAccount the account of the user in question
 * @param {number?} page the page we wish to fetch
 * @param {number} itemsPerPage the maximum number of items which should be present on the page
 * @returns 
 */
const fetchNotifications = async (
    userAccount: string,
    itemsPerPage = DEFAULT_PAGE_SIZE,
    page = DEFAULT_INITIAL_PAGE,
    baseApiUrl = API_BASE_URL,
) => {
    const body = {
        "user": userAccount,
        "page": page,
        "pageSize": itemsPerPage,
        "op":"read"
    };

    return axios.post(`${baseApiUrl}/feeds/get_feeds`, body)
    .then((response:any) => response.data)
    .catch((err: any) => {
        console.log(`
        ============== There was an error [epns-sdk -> loadNotifications] ============
        `, err);
    })
};


export default {
    fetchNotifications,
    fetchSpamNotifications
}