/**
 * @description Contains utilities used to fetch data from an API or external source
 * @version 1.0
*/
const axios = require('axios')

const DEFAULT_INITIAL_PAGE = 1;
const DEFAULT_PAGE_SIZE  = 10;
const NOTIFICATIONS_URL = "https://backend-staging.epns.io/apis/feeds/get_feeds";


/**
 * Fetch paginated notifications for a user
 * @param {string} userAccount the account of the user in question
 * @param {number?} page the page we wish to fetch
 * @param {number} itemsPerPage the maximum number of items which should be present on the page
 * @returns 
 */
const fetchNotifications = async (
    userAccount: string,
    page = DEFAULT_INITIAL_PAGE,
    itemsPerPage = DEFAULT_PAGE_SIZE
) => {
    const body = {
        "user": userAccount,
        "page": page,
        "pageSize": itemsPerPage,
        "op":"read"
    };

    return axios.post(NOTIFICATIONS_URL, body)
    .then((response:any) => response.data)
    .catch((err: any) => {
        console.log(`
        ============== There was an error [epns-sdk -> loadNotifications] ============
        `, err);
    })
};


export default {
    fetchNotifications
}