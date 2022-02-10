/**
 * Contains all the constants required in order to sign transactions using EIP 712
 */
declare const _default: {
    ACTION_TYPES: {
        subscribe: {
            Subscribe: {
                name: string;
                type: string;
            }[];
        };
        unsubscribe: {
            Unsubscribe: {
                name: string;
                type: string;
            }[];
        };
    };
};
export default _default;
