/**
 * Import all of the packages we wish to export
 */
import NotificationItem, { NotificationItemProps } from './components/notification/index';
import OnSubscribeModal from './components/subscribemodal';
import ParseText from './components/parsetext';
import utils from '../utilities';
import api from '../utilities/api';
import channels from  "../utilities/channels";
import { ApiNotificationType as apiNotificationType, ParsedResponseType as parsedResponseType } from '../types/notification';

// export the interfaces used
export interface ApiNotificationType extends apiNotificationType{}
export interface ParsedResponseType extends parsedResponseType{}

/**
 * Export all of the public components
 */
export {
  NotificationItem,
  OnSubscribeModal,
  NotificationItemProps,
  ParseText,
  utils,
  api,
  channels
};
