import {
  NotificationItem,
  utils,
  api,
} from "epns-frontend-sdk-staging";
import { useEffect, useState } from "react";
import "./App.css";

const WALLET_ADDRESS = "0x57c1D4dbFBc9F8cB77709493cc43eaA3CD505432";
const PAGINATION_PARAMS = {
  page: 1,
  itemsPerPage: 20,
};

function App() {
  // create state components to fetch all the notifications.
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // on page load, fetch all the notifications
    api
      .fetchNotifications(
        WALLET_ADDRESS,
        PAGINATION_PARAMS.itemsPerPage,
        PAGINATION_PARAMS.page
      )
      .then((notificationsData) => {
        const { count, results } = notificationsData;
        console.log(`${count} notifications loaded:`, results);
        // parse the notifications into the required format
        const response = utils.parseApiResponse(results);
        console.log("Parsed response to:", response);
        setNotifications(response);
      });
  }, []);

  return (
    <div className="App">
      <h2 className="App__header">
          EPNS Notifications
      </h2>
      {notifications.map((oneNotification) => {
        const { cta, title, message, app, icon } = oneNotification;
        // render the notification item
        return (
          <NotificationItem
            notificationTitle={title}
            notificationBody={message}
            cta={cta}
            app={app}
            icon={icon}
          />
        );
      })}
    </div>
  );
}

export default App;
