import { DEFAULT_NOTIFICATIONS } from './data';
import { NotificationItem, utils, api } from "@epnsproject/frontend-sdk-staging";
import { useEffect, useState } from "react";
import ConnectButton from "./components/connect";
import "./App.css";

const WALLET_ADDRESS = "0x57c1D4dbFBc9F8cB77709493cc43eaA3CD505432";
const PAGINATION_PARAMS = {
  page: 1,
  itemsPerPage: 20,
};
const BASE_URL = "https://backend-kovan.epns.io/apis/"

function App() {
  // create state components to fetch all the notifications.
  const [notifications, setNotifications] = useState([]);

  // useEffect(() => {
  //   // on page load, fetch all the notifications
  //   api
  //     .fetchNotifications(
  //       WALLET_ADDRESS,
  //       PAGINATION_PARAMS.itemsPerPage,
  //       PAGINATION_PARAMS.page,
  //       BASE_URL
  //     )
  //     .then((notificationsData) => {
  //       const { count, results } = notificationsData || {};
  //       console.log(`${count} notifications loaded:`, results);
  //       // parse the notifications into the required format
  //       const response = utils.parseApiResponse([...DEFAULT_NOTIFICATIONS, ...results]);
  //       console.log({unparsed: results});
  //       // const response = utils.parseApiResponse(results);
  //       console.log("Parsed response to:", response);
  //       console.log({parsed: response});
  //       setNotifications(response);
  //     });
  // }, []);

  return (
    <div className="App">
      <h2 className="App__header">
        <span> EPNS Notifications </span>
        <ConnectButton />
      </h2>
      {notifications.map((oneNotification,i) => {
        const { cta, title, message, app, icon, image, url } = oneNotification;

        // render the notification item
        return (
          <NotificationItem
            notificationTitle={title}
            notificationBody={message}
            cta={cta}
            app={app}
            icon={icon}
            image={image}
            url={url}
            isSpam={!Boolean(i)}
            subscribeFn={async () => alert('yayy')}
            isSubscribedFn={async () => false}
          />
        );
      })}
    </div>
  );
}

export default App;
