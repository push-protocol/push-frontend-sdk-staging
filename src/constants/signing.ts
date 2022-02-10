/**
 * Contains all the constants required in order to sign transactions using EIP 712
 */

export default {
  // The several types of actions and their corresponding types
  //  which we can take, when it comes to signing messages
  ACTION_TYPES: {
    // the type to be used for the subscribe action to a channel
    subscribe: {
      Subscribe: [
        { name: "channel", type: "address" },
        { name: "subscriber", type: "address" },
        { name: "action", type: "string" },
      ],
    },
    // the type to be used for the unsubscribe action to a channel
    unsubscribe: {
      Unsubscribe: [
        { name: "channel", type: "address" },
        { name: "unsubscriber", type: "address" },
        { name: "action", type: "string" },
      ],
    },
  },
};
