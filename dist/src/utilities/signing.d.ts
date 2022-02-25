/**
 * Contains all the utility functions required in order to sign transactions using EIP 712
 */
import { channelActionType } from "../types/signing";
/**
 * A function used to get the domain information in order to sign messages using EIP 712 standard
 * @param chainId The id of the current chain, this would be used to get the right contract to use as well
 * @param verifyingContractAddress the address which we need to use to verify along with the domain information, defaults to communicator address, but can be specified for special purposes
 */
export declare function getDomainInformation(chainId: number, verifyingContractAddress: string | undefined): {
    name: string;
    chainId: number;
    verifyingContract: string;
};
/**
 * Get the right message to sign as regards to subscribing and unsubscribing to a message, depending on the action
 * @param channelAddress
 * @param userAddress
 * @param action
 * @returns
 */
export declare function getSubscriptionMessage(channelAddress: string, userAddress: string, action: channelActionType): {
    [x: string]: string;
    channel: string;
    action: channelActionType;
};
/**
 * Main function used to sign a message using EIP712
 * @param signer A signer object which is capable of signing transactions
 * @param domain Domain information required to sign transations
 * @param type type information required to sign transactions
 * @param message the message we wish to sign
 * @returns
 */
export declare function signMessage(signer: any, domain: any, type: any, message: any): any;
