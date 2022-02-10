/**
 * Contains channels related functions
 */
import { getDomainInformation, getSubscriptionMessage } from "./signing";
import signingConstants from "../constants/signing";
import config from "../config";
import axios from "axios";

/**
 * A function to get channel information basics from the backend
 * @param channelAddress
 * @param baseApiUrl
 */
async function getChannelByAddress(
  channelAddress: string,
  baseApiUrl = config.BASE_URL
) {
  const body = {
    query: channelAddress,
    op: "read",
  };
  return axios
    .post(`${baseApiUrl}/channels/search`, body)
    .then((response: any) => response.data?.channels?.[0] || null)
    .catch((err: any) => {
      console.log(
        `
        ============== There was an error [epns-sdk -> loadNotifications] ============
        `,
        err
      );
    });
}

/**
 * A function used to opt a user into a channel
 * @param signer A signer instance which is capable of signing transactions
 * @param channelAddress The address of the channel which we wish to subscribe to
 * @param userAddress The address of the user opting into the channel
 * @param chainId The chain on which we wish to subscribe on
 * @param verifyingContractAddress (optional) The address of the communicator contract to be used, defaults to EPNS_COMM_CONTRACT
 */
async function optIn(
  signer: any,
  channelAddress: string,
  chainId: number,
  userAddress: string,
  baseApiUrl = config.BASE_URL,
  verifyingContractAddress = config.EPNS_COMMUNICATOR_CONTRACT,
) {
    try{
        // get domain information
        const domainInformation = getDomainInformation(
          chainId,
          verifyingContractAddress
        );
        // get type information
        const typeInformation = signingConstants.ACTION_TYPES["subscribe"];
        // get message
        const messageInformation = getSubscriptionMessage(
          channelAddress,
          userAddress,
          "Subscribe"
        );
        // sign message
        const signature = await signer._signTypedData(
          domainInformation,
          typeInformation,
          messageInformation
        );
        // make request to backend to validate
        await axios.post(`${baseApiUrl}/channels/subscribe_offchain`, {
          signature,
          message: messageInformation,
          op: "write",
          chainId,
          contractAddress: verifyingContractAddress,
        });
      
        return {status: "error", message: "sucesfully opted into channel"};
    }catch(err){
        return {status: "error" , message: err.message}
    }
}

/**
 * A function used to opt a user into a channel
 * @param signer A signer instance which is capable of signing transactions
 * @param channelAddress The address of the channel which we wish to subscribe to
 * @param userAddress The address of the user opting into the channel
 * @param chainId The chain on which we wish to subscribe on
 * @param verifyingContractAddress (optional) The address of the communicator contract to be used, defaults to EPNS_COMM_CONTRACT
 */
async function optOut(
  signer: any,
  chainId: number,
  channelAddress: string,
  userAddress: string,
  baseApiUrl = config.BASE_URL,
  verifyingContractAddress = config.EPNS_COMMUNICATOR_CONTRACT,
) {
    try{
        // get domain information
        const domainInformation = getDomainInformation(
          chainId,
          verifyingContractAddress
        );
        // get type information
        const typeInformation = signingConstants.ACTION_TYPES["unsubscribe"];
        // get message
        const messageInformation = getSubscriptionMessage(
          channelAddress,
          userAddress,
          "Unsubscribe"
        );
        // sign message
        const signature = await signer._signTypedData(
          domainInformation,
          typeInformation,
          messageInformation
        );
        // make request to backend to validate
        await axios.post(`${baseApiUrl}/channels/unsubscribe_offchain`, {
          signature,
          message: messageInformation,
          op: "write",
          chainId,
          contractAddress: verifyingContractAddress,
        });
      
        return {status: "error", message: "sucesfully opted into channel"};
    }catch(err){
        return {status: "error" , message: err.message}
    }
}

export default {
  getChannelByAddress,
  optIn,
  optOut
};
