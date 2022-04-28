

## About

  

This module is used to parse notifications from [EPNS](http://www.epns.io/). It Provides an abstraction layer
  

It is written in typescript and requires node v10.0.0 or higher.

Most features will work with nodejs v6.0.0 and higher but using older versions than v10.0.0 is not recommended.

## There are two ways which the SDK can be installed

### Installation for General usage
In order to install this SDK on your existing web application or mobile application. If you want to use the SDK in your dapp or mobile application, this is the installation method to use.

It can be installed as an npm package via the following command.

`npm install @epnsproject/epns-frontend-sdk-staging`
  
  
### Installation for SDK Development
If as a developer, you feel the need to add more features to the frontend SDK, and wish to see your changes to the SDK's code immediately reflected, the following steps are for you.
In order to install, test and develop the SDK *locally*, the following steps are required to set it up for testing with a react application you have previously set up. 
```javascript
- git clone https://github.com/ethereum-push-notification-service/epns-frontend-sdk-staging.git

- cd epns-frontend-sdk-staging // navigate to the project's directory

- npm install // to install all the packages

- npm start //to build the project and watch out for changes

- npm link // in order to test and be made available locally
// since we intend to test the functionality, we will assume that another react application is running which wants to leverage the components from the framework

- npm `link relative_path_to_react_application`/node_modules/react
  
- cd `relative_path_to_react_application`

- npm link epns-frontend-sdk
// then the library can be imported as normally would if installed using npm or yarn
```
More information on the local testing and development of NPM packages can be found [here]('https://blog.logrocket.com/the-complete-guide-to-publishing-a-react-package-to-npm/")

 
## Usage

  The SDK comprises of three modules majorly, which are: 
  - Fetching the notifications from EPNS backend.
  - Parsing the fetched notifications.
  - Rendering the parsed notification on mobile and on web.

It is done this way in order to seperate the different layers from each other.

### Fetching and parsing notifications from the api
#### A more comprehensive demo can be located at  `src/sample_codes/loadNotifications`.
```javascript
import { api, utils } from "@epnsproject/epns-frontend-sdk-staging";

// define the variables required to make a request
const walletAddress = "0x1234567890abcdcdefghijklmnopqrstuvwxyz123";
const pageNumber = 1;
const itemsPerPage = 20;
// define the variables required to make a request

//fetch the notifications
const fetchedNotifications = await api.fetchNotifications(walletAddress, itemsPerPage, pageNumber)
console.log({fetchedNotifications]);
//fetch the notifications


//parse the notification fetched
const parsedResponse = utils.parseApiResponse(fetchedNotifications);
console.log(parsedResponse);
//parse the notification fetched

```

### Rendering the parsed notification on the web
```javascript

import { NotificationItem } from  "@epnsproject/epns-frontend-sdk-staging";

// This is used to render the text present in a notification body as a JSX element

	<NotificationItem
		notificationTitle={parsedResponse.title}
		notificationBody={parsedResponse.message}
		cta={parsedResponse.cta}
		app={parsedResponse.app}
		icon={parsedResponse.icon}
		image={parsedResponse.image}
	/>
 ```
 
 ![Web app render](https://res.cloudinary.com/xand6r/image/upload/v1632235676/Screenshot_2021-09-21_at_15.44.49_s6vfta.png)
 
 ### Rendering the parsed notification on a react native mobile application.
 ```javascript
 import { NotificationItem} from  '@epnsproject/epns-frontend-sdk-staging/dist/native';
 
	<NotificationItem
			notificationTitle={parsedResponse.title}
			notificationBody={parsedResponse.message}
			cta={parsedResponse.cta}
			app={parsedResponse.app}
			icon={parsedResponse.icon}
			image={parsedResponse.image}
	/>
 ```

 ![Mobile app render](https://res.cloudinary.com/xand6r/image/upload/v1634473272/Screenshot_2021-10-17_at_13.20.49_ig1j3y.png)

## Channel methods

### In order to implement signing, we take advantage of [EIP-712](https://eips.ethereum.org/EIPS/eip-712), more details on the `signer` parameter can be found [here](https://eips.ethereum.org/EIPS/eip-712), you can also take a look at our working [example](https://github.com/ethereum-push-notification-service/epns-frontend-sdk-staging/blob/main/sample_codes/loadNotifications/src/App.js)
```javascript
import { channels } from  "@epnsproject/frontend-sdk-staging";

//get channel basic info
const details = await channels.getChannelByAddress(CHANNEL_ADDRESS)

//check if user is subscribed to channel
const isSubscribed = channels.isUserSubscribed(account, CHANNEL_ADDRESS)

//opt into a channel
channels.optIn(
	signer,
	channelAddress,
	chainId,
	userAccount,
	{
		onSuccess: () =>  // do something after a successfull subscription, like bring up a modal or a notification
	}
);

//opt out of a channel
channels.optOut(
	signer,
	channelAddress,
	chainId,
	userAccount,
	{
		onSuccess: () =>  // do something after a successfull unsubscription, like bring up a modal or a notification
	}
);
```

### Using the `onsubscription` modal
This is a modal that can be used to come up immediately after a channel has been subscribed to, its main purpose is to notify the subscriber that they have several options of recieving notifications from EPNS

![image](https://res.cloudinary.com/xand6r/image/upload/v1647710351/Screenshot_2022-03-19_at_18.16.48_i40rra.png)
```Javascript
import {
  OnSubscribeModal,
} from "@epnsproject/frontend-sdk-staging";
const [modalOpen, setModalOpen] = useState(false);

return (
    {modalOpen && <OnSubscribeModal onClose={() => setModalOpen(false)} />}
)
```
### Customising the onSubscribe modal
![image](https://res.cloudinary.com/xand6r/image/upload/v1647710738/Screenshot_2022-03-19_at_18.25.08_tmo2ch.png)

- Editing the entire modal itself can be done via adding styles to the `modal` class
- Editing the heading section can be done via adding styles to the `modal__heading` class
- Editing the body/content section can be done via adding styles to the `modal__content` class

##### However if you wish to create your own modal from scratch and just need the assets needed to make a similar modal.

```Javascript
import {
  LINKS,
} from "@epnsproject/frontend-sdk-staging/dist/src/web/components/subscribemodal/constants";
```

Sample of how the data looks like
![data](https://res.cloudinary.com/xand6r/image/upload/v1647711029/Screenshot_2022-03-19_at_18.30.13_vdfsea.png)
Using this data, you can proceed to create your own modals


## Markdown Reference

#### This section contains the several markdown formats available and how to use them. They can be viewed live by running the react application in `src/sample_codes/parseNotificationMarkdown`.

![Interactive markdown parser](https://res.cloudinary.com/xand6r/image/upload/v1632236024/Screenshot_2021-09-21_at_15.53.29_p0lptf.png)


| Markdown  | Styling Effect | Use case
|---|--|--|
| \n | New line | For Segregation
| [u: textcontent] | Underlined, Red Colored Text | For URLs
| [d: textcontent] | EPNS Primary colored Text | For colored text
| [s: textcontent] | EPNS Secondary colored Text | For colored text
| [t: textcontent] | EPNS Tetiary colored Text | For colored text
| [e: textcontent] | EPNS Secondary colored Text | For colored text
| [w: textcontent] | White colored Text | For colored text
| [mg: textcontent] | Medium grey colored Text | For colored text
| [dg: textcontent] | Dark grey colored Text | For colored text
| [b: textcontent] | Bold Text | For Emphasis
| [i: textcontent] | Italics Text | For Emphasis
| [bi: textcontent] | Bold and Italics Text | For Emphasis



## Usage Guide when integrating `EmbedSDK` from scratch in a client dApp
For using the `EmbedSDK` in your app, you can first (*skip this if already installed!*)



    yarn add @epnsproject/frontend-sdk-staging

then, In `App.js` of your App entry point


    import { EmbedSDK } from "@epnsproject/frontend-sdk-staging";


add in HTML/JSX the below HTML tag -


    <button id="sdk-trigger-id">trigger button</button>

or any component with the ID ***sdk-trigger-id*** 

***Make sure the ID you give to the "button" is same as that of the targetID you pass to the init() below*** 

After the wallet connect happens in your app flow trigger the below code snippet.

**Note:** You have to have the wallet connected with an account to execute the below code because internally the SDK calls the EPNS `get_feeds()` API which needs the account address. You will see notifications if you have opted-in to a channel using [EPNS](https://staging-app.epns.io/)

```
  useEffect(() => {
    if (account) { // 'your connected wallet address'
      EmbedSDK.init({
        headerText: 'Hello DeFi', // optional
        targetID: 'sdk-trigger-id', // mandatory
        appName: 'consumerApp', // mandatory
        user: account, // mandatory
        viewOptions: {
            type: 'sidebar', // optional [default: 'sidebar', 'modal']
            showUnreadIndicator: true, // optional
            unreadIndicatorColor: '#cc1919',
            unreadIndicatorPosition: 'bottom-right',
        },
        theme: 'light',
        onOpen: () => {
          console.log('-> client dApp onOpen callback');
        },
        onClose: () => {
          console.log('-> client dApp onClose callback');
        }
      });
    }

    return () => {
      EmbedSDK.cleanup();
    };
  }, []);
```
**Init Config Options**

| option | type | mandatory | remarks |
| ------ | ------ | ------ | ------ |
| targetID | string | yes | can be any string but has to match the ID given to the trigger button in the HTML/JSX |
| appName | string | yes | your app name e.g. - 'appName'  |
| user | string | yes | public wallet address e.g. - '0x1434A7882cDD877B458Df5b83c993e9571c65813' |
| viewOptions.type | string | no | default 'sidebar', can give 'modal'  |
| viewOptions.showUnreadIndicator | boolean | no | will show the unread indicator  |
| viewOptions.unreadIndicatorColor | string | no | color for the unread indicator e.g. - '#cc1919'  |
| viewOptions.unreadIndicatorPosition | string | no | default is 'top-right', other possible options - 'top-left', 'bottom-left', 'bottom-right'  |
| headerText | string | no | any header text  |
| theme | string | no | default is 'light', can give 'dark'  |
| onOpen | function | no | callback you want to trigger when the modal/sidebar opens  |
| onClose | function | no | callback you want to trigger when the modal/sidebar closes  |
