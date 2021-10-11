import { NotificationItem, utils, api } from "epns-frontend-sdk-staging";
import { useEffect, useState } from "react";
import "./App.css";

const WALLET_ADDRESS = "0x57c1D4dbFBc9F8cB77709493cc43eaA3CD505432";
const PAGINATION_PARAMS = {
  page: 1,
  itemsPerPage: 20,
};
const DEFAULT_NOTIFICATIONS = [
  {
    payload: {
      data: {
        app: "App Bot",
        sid: "22710",
        url: "https://epns.io/",
        acta: "",
        aimg: "https://backend-staging.epns.io/assets/epnsappbellturorial.jpg",
        // aimg: "https://www.w3schools.com/html/mov_bbb.mp4",
        // aimg: "https://www.youtube.com/watch?v=gUwXCt1qkBU",
        amsg: "The [d:Bell] on the [b:top right] keeps track of any incoming messages and will inform you about it.\n\nClicking on the [b:bell] will update your feed [i:(Alternatively, pull feed down to refresh)]",
        asub: "Ring the Bell",
        icon: "https://backend-staging.epns.io/cache/bafkreibzn4s6nfa4jwyuswkojxclec5nhvj3e4ac5cvamzc2ajznh7t77a.jpg",
        type: "1",
        // epoch: "1625139867",
        appbot: "1",
        hidden: "0",
        secret: "",
      },
      notification: {
        body: "",
      },
    },
  },
]

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
        const response = utils.parseApiResponse([DEFAULT_NOTIFICATIONS[0]])//,...results]);
        console.log("Parsed response to:", response);
        console.log({response});
        setNotifications(response);
      });
  }, []);

  return (
    <div className="App">
      <h2 className="App__header">EPNS Notifications</h2>
      {notifications.map((oneNotification) => {
        const { cta, title, message, app, icon, image } = oneNotification;
        console.log({
          image
        })
        // render the notification item
        return (
          <NotificationItem
            notificationTitle={title}
            notificationBody={message}
            cta={cta}
            app={app}
            icon={icon}
            image={image}
          />
        );
      })}
    </div>
  );
}

export default App;
