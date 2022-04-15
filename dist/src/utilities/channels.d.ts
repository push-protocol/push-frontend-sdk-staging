/**
 * A function to get channel information basics from the backend
 * @param channelAddress
 * @param baseApiUrl
 */
declare function getChannelByAddress(channelAddress: string, baseApiUrl?: string, page?: number, pageSize?: number): Promise<any>;
/**
 * Function to obtain all the addresses subscribed to a channel
 * @param channelAddress the address of the channel
 * @param userAddress
 */
declare function getSubscribers(channelAddress: string, baseApiUrl?: string): Promise<any>;
declare function isUserSubscribed(userAddress: string, channelAddress: string, baseApiUrl?: string): Promise<any>;
/**
 * A function used to opt a user into a channel
 * @param signer A signer instance which is capable of signing transactions
 * @param channelAddress The address of the channel which we wish to subscribe to
 * @param userAddress The address of the user opting into the channel
 * @param chainId The chain on which we wish to subscribe on
 * @param verifyingContractAddress (optional) The address of the communicator contract to be used, defaults to EPNS_COMM_CONTRACT
 */
declare function optIn(signer: any, channelAddress: string, chainId: number, userAddress: string, { baseApiUrl, verifyingContractAddress, onSuccess }?: {
    baseApiUrl?: string | undefined;
    verifyingContractAddress?: string | undefined;
    onSuccess?: (() => "success") | undefined;
}): Promise<{
    status: string;
    message: any;
}>;
/**
 * A function used to opt a user into a channel
 * @param signer A signer instance which is capable of signing transactions
 * @param channelAddress The address of the channel which we wish to subscribe to
 * @param userAddress The address of the user opting into the channel
 * @param chainId The chain on which we wish to subscribe on
 * @param verifyingContractAddress (optional) The address of the communicator contract to be used, defaults to EPNS_COMM_CONTRACT
 */
declare function optOut(signer: any, channelAddress: string, chainId: number, userAddress: string, { baseApiUrl, verifyingContractAddress, onSuccess }?: {
    baseApiUrl?: string | undefined;
    verifyingContractAddress?: string | undefined;
    onSuccess?: (() => "success") | undefined;
}): Promise<{
    status: string;
    message: any;
}>;
declare const _default: {
    getChannelByAddress: typeof getChannelByAddress;
    optIn: typeof optIn;
    optOut: typeof optOut;
    getSubscribers: typeof getSubscribers;
    isUserSubscribed: typeof isUserSubscribed;
};
export default _default;
