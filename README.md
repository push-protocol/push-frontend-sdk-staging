# Frontend SDK

  
  

## About

  

This module is used to parse notifications from [EPNS](http://www.epns.io/). It Provides an abstraction layer
  

It is written in typescript and requires node v10.0.0 or higher.

Most features will work with nodejs v6.0.0 and higher but using older versions than v10.0.0 is anot recommended.

  
## Installation
In order to install and test the SDK locally, the following steps are required to set it up. 
```javascript
- git clone https://github.com/ethereum-push-notification-service/epns-frontend-sdk-staging.git

- cd epns-frontend-sdk-staging // navigate to the project's directory

- yarn install // to install all the packages

- yarn start //to build the project and watch out for changes

- yarn link // in order to test and be made available locally
// since we intend to test the functionality, we will assume that another react application is running which wants to leverage the components from the framework

- yarn link path_to_sandbox_project/node_modules/react
-  
- cd path_to_sandbox_project
-
- yarn link epns-frontend-sdk
// then the library can be imported as normally would if installed using npm or yarn
```
More information on the local testing of NPM packages can be found [here]('https://blog.logrocket.com/the-complete-guide-to-publishing-a-react-package-to-npm/")

 
## Usage

  The SDK comprises of three modules majorly, which are: 
  - Fetching the notifications from the backend.
  - Parsing the fetched notifications.
  - Rendering the parsed notification.

It is done this way in order to seperate the different layers from each other.

### Fetching and parsing notifications from the api
#### A more comprehensive demo can be located at  `src/sample_codes/loadNotifications`.
```javascript
import { api, utils } from "epns-frontend-sdk-staging-local";

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


```javascript

import { NotificationItem } from  "epns-frontend-sdk";

// This is used to render the text present in a notification body as a JSX element

<NotificationItem
	notificationTitle="ETH Tracker - ETH at $3,235.16"
	notificationBody="\[d:Summary & Latest Balance]\n---------\n\n[➕] [d:ETH: ] [b:2.961] [t:ETH] [[dg:+-0.000 ETH]][timestamp: 1630069200]"
/>
 ```
 
 ![DEMO image](https://res.cloudinary.com/xand6r/image/upload/v1632235676/Screenshot_2021-09-21_at_15.44.49_s6vfta.png)
 
 
## Markdown Reference
### This section contains the several markdown formats available and how to use them. They can be viewed live by running the react application in `src/sample_codes/parseNotificationMarkdown`.

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