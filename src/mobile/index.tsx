/**
 * Import all of the packages we wish to export
 */
//  import NotificationItem, { NotificationItemProps } from './components/notification/index';
 import IPFSIcon from './components/ipfsicon';
 import utils from '../utilities';
 import api from '../utilities/api';
 import { ApiNotificationType as apiNotificationType, ParsedResponseType as parsedResponseType } from '../types/notification';
 
 // export the interfaces used
 export interface ApiNotificationType extends apiNotificationType{}
 export interface ParsedResponseType extends parsedResponseType{}
 
 /**
  * Export all of the public components
  */
 export {
//    NotificationItem,
//    NotificationItemProps,
   IPFSIcon,
   utils,
   api
 };
 