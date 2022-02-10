import { DEFAULT_NOTIFICATIONS } from "./data";
import {
  NotificationItem,
  utils,
  api,
  channels,
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
const BASE_URL = "https://backend-prod.epns.io/apis";
const CHANNEL_ADDRESS = "0xe56f1D3EDFFF1f25855aEF744caFE7991c224FFF";

function App() {
  const { library, active, account, chainId } = useWeb3React();

  // create state components to fetch all the notifications.
  // notification details
  const [notifications, setNotifications] = useState([]);
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
        // console.log({ unparsed: results });
        // const response = utils.parseApiResponse(results);
        // console.log("Parsed response to:", response);
        // console.log({ parsed: response });
        setNotifications(response);
      });
  }, [active]);
  // notification details

  // channel details
  const [channel, setChannel] = useState(null);
  // load channel details on start
  useEffect(() => {
    // on page load, fetch channel details
    channels.getChannelByAddress(CHANNEL_ADDRESS, BASE_URL).then((data) => {
      setChannel(data);
    });
  }, []);

  console.log(channel);

  return (
    <div className="App">
      {/* define the header */}
      <h2 className="App__header">
        <span> EPNS Playground </span>
        <ConnectButton />
      </h2>
      {/* define the header */}

      {active ? (
        <>
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
                    channels.optIn(
                      library.getSigner(account),
                      channel.addr,
                      chainId,
                      account,
                      BASE_URL
                    );
                  }}
                  className="subscribebutton"
                >
                  subscribe
                </div>
              </div>
            </div>
          )}
          {/* section for channels */}

          {/* section for notifications */}
          <div>
            <h3>Notifications</h3>
            {notifications.map((oneNotification, i) => {
              const { cta, title, message, app, icon, image, url } =
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
