/**
 * @description Contains utilities used to fetch data from an API or external source
 * @version 1.0
*/
<<<<<<< HEAD
import axios from 'axios';
import config from '../config';

const DEFAULT_INITIAL_PAGE = 1;
const DEFAULT_PAGE_SIZE  = 10;
const NOTIFICATIONS_URL = config.NOTIFICATIONS_API;
=======
const axios = require('axios')

const DEFAULT_INITIAL_PAGE = 1;
const DEFAULT_PAGE_SIZE  = 10;
const NOTIFICATIONS_URL = "https://backend-staging.epns.io/apis/feeds/get_feeds";

>>>>>>> ef7ab3a (include api based functions into sdk)

/**
 * Fetch paginated notifications for a user
 * @param {string} userAccount the account of the user in question
 * @param {number?} page the page we wish to fetch
 * @param {number} itemsPerPage the maximum number of items which should be present on the page
 * @returns 
 */
const fetchNotifications = async (
    userAccount: string,
<<<<<<< HEAD
    itemsPerPage = DEFAULT_PAGE_SIZE,
    page = DEFAULT_INITIAL_PAGE
=======
    page = DEFAULT_INITIAL_PAGE,
    itemsPerPage = DEFAULT_PAGE_SIZE
>>>>>>> ef7ab3a (include api based functions into sdk)
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
<<<<<<< HEAD
        `, err);
=======
        `, err.message);
>>>>>>> ef7ab3a (include api based functions into sdk)
    })
};


export default {
    fetchNotifications
}