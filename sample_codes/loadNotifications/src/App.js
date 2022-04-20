import { DEFAULT_NOTIFICATIONS } from "./data";
import {
  OnSubscribeModal,
  NotificationItem,
  utils,
  api,
  channels,
  EmbedSDK
} from "@epnsproject/frontend-sdk-staging";
import { useEffect, useState } from "react";
import "./App.scss";
import ConnectButton from "./components/connect";
import { useWeb3React } from "@web3-react/core";

const WALLET_ADDRESS = "0x57c1D4dbFBc9F8cB77709493cc43eaA3CD505432";
const PAGINATION_PARAMS = {
  page: 1,
  itemsPerPage: 20,
};
const BASE_URL = "https://backend-kovan.epns.io/apis";
const CHANNEL_ADDRESS = "0x94c3016ef3e503774630fC71F59B8Da9f7D470B7";

function App() {
  const { library, active, account, chainId } = useWeb3React();

  // create state components to fetch all the notifications.
  // notification details
  const [notifications, setNotifications] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);

  /**
   * Fetch notifications for the user
   */
  useEffect(() => {
    if (!active) return;
    // on page load, fetch all the notifications
    api
      .fetchNotifications(
        account,
        PAGINATION_PARAMS.itemsPerPage,
        PAGINATION_PARAMS.page,
        BASE_URL
      )
      .then((notificationsData) => {
        const { count, results } = notificationsData || {};
        // console.log(`${count} notifications loaded:`, results);
        // parse the notifications into the required format
        const response = utils.parseApiResponse([
          ...results,
          ...DEFAULT_NOTIFICATIONS,
        ]);
        console.log({ unparsed: results });
        // const response = utils.parseApiResponse(results);
        // console.log("Parsed response to:", response);
        console.log({ parsed: response });
        setNotifications(response);
      });
  }, [active]);
  // notification details

  // channel details
  const [channel, setChannel] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  // load channel details on start
  useEffect(() => {
    if (!account) return;
    // on page load, fetch channel details
    channels.getChannelByAddress(CHANNEL_ADDRESS, BASE_URL).then((data) => {
      setChannel(data);
    });
    // fetch if user is subscribed to channel
    channels.isUserSubscribed(account, CHANNEL_ADDRESS).then((res) => {
      console.log(res);
      setIsSubscribed(res);
    });
  }, [account]);

  useEffect(() => {
    if (account && active) {
      EmbedSDK.init({
        headerText: 'Hello DeFi', // optional
        targetID: 'sdk-trigger-id', // mandatory
        appName: 'consumerApp', // mandatory
        user: account, // mandatory
        viewOptions: {
          type: 'sidebar', // optional [default: 'sidebar', 'modal']
          showUnreadIndicator: true, // optional
          unreadIndicatorColor: '#cc1919',
          unreadIndicatorPosition: 'top-right',
        },
        theme: 'light',
      });
    }

}, [account, active]);

  return (
    <div className="App">
      {modalOpen && <OnSubscribeModal onClose={() => setModalOpen(false)} />}
      {/* define the header */}
      <h2 className="App__header">
        <span> EPNS Playground </span>
        <ConnectButton />
      </h2>
      {/* define the header */}

      {active ? (
        <>
          {/* section for Embed SDK */}
          <div style={{ backgroundColor: '#fff', padding: 20, display: 'flex' }}>
            <button id="sdk-trigger-id" style={{ cursor: 'pointer' }}>trigger SDK button</button>
          </div>
          

          {/* section for channels */}
          {channel && (
            <div>
              <h3>Channel</h3>
              <div className="sample__channel">
                <div>
                  <img src={channel.icon} className="channel__image" />
                  <h2>{channel.name}</h2>
                </div>
                <div
                  onClick={() => {
                    isSubscribed
                      ? channels.optOut(
                          library.getSigner(account),
                          channel.addr,
                          chainId,
                          account,
                          {baseApiUrl: BASE_URL}
                        )
                      : channels.optIn(
                          library.getSigner(account),
                          channel.addr,
                          chainId,
                          account,
                          {baseApiUrl: BASE_URL, onSuccess: () => setModalOpen(true)}
                        );
                  }}
                  className="subscribebutton"
                >
                  {isSubscribed ? "unsubscribe" : "subscribe"}
                </div>
              </div>
            </div>
          )}
          {/* section for channels */}

          {/* section for notifications */}
          <div>
            <h3>Notifications</h3>
            {notifications.map((oneNotification, i) => {
              const { cta, title, message, app, icon, image, url, blockchain } =
                oneNotification;

              // render the notification item
              return (
                <NotificationItem
                  key={i}
                  notificationTitle={title}
                  notificationBody={message}
                  cta={cta}
                  app={app}
                  icon={icon}
                  image={image}
                  url={url}
                  // optional parameters for rendering spambox
                  isSpam={i == notifications.length - 1}
                  subscribeFn={async () => alert("yayy")}
                  isSubscribedFn={async () => false}
                  theme={"dark"}
                  chainName={blockchain}
                />
              );
            })}
          </div>
          {/* section for notifications */}
        </>
      ) : (
        <p>Please connect to your wallet to proceed</p>
      )}
    </div>
  );
}

export default App;
