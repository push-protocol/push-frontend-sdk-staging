---
title: Integrating EPNS Notifications in Mobile Applications
description: Integrate EPNS into Mobile Application
parent: N/A
tags:
  - EPNS
  - FrontEnd SDK
  - Notification
  - React native
  -
slug: EPNS-in-front-ends
contentType: guides
root: false
---
# Integrating EPNS in Frontend
**Level**: Beginner  
**Estimated Time**: 10 minuntes

## Learning Objectives

- Learn how to integrate the EPNS decentralized notification service into your React Frontend Dapp.
- Fetch and render all your notifications in a react application

## Pre-requisites

- Basic knowledge of React.

## Sections
- [Setting up the environment](#setup)
- [Fetching the notifications](#fetching-the-notifications)
- [Parsing the notifications](#parsing-the-notifications)
- [Rendering the notifications](#rendering-the-notifications)

## Setup

This project was bootstrapped with [react native CLI ](https://reactnative.dev/docs/environment-setup).
 
To install the frontend SDK package.
-  `npm install epns-frontend-sdk-staging`

Runs the app in the development mode.
The page will reload if you make edits.
You will also see any lint errors in the console.


## Fetching-The-Notifications
The first step is to import the required components from the react native section of the just installed package.
```javascript
import {
  NotificationItem,
  utils,
  api,
} from 'epns-frontend-sdk-staging/dist/native';
```

Then the next step is to define the required variables to make a request to fetch some notifications!
```javascript
// define the variables required to make a request
const walletAddress = "0x1234567890abcdcdefghijklmnopqrstuvwxyz123";
const pageNumber = 1;
const itemsPerPage = 20;
// define the variables required to make a request
```
And finally we make a request to fetch some notifications!
```javascript
//fetch the notifications
const fetchedNotifications = await api.fetchNotifications(walletAddress, itemsPerPage, pageNumber)
console.log(fetchedNotifications);
//fetch the notifications
```
**output**:
```
 {
	 "count":  5,
	 "results": [{
			"payload_id":  33724,
			"channel":  "0x34bdfafE0CE10FE1c4bb3a8A0699F312DecD43a2",
			"epoch":  "2021-09-21T11:31:13.000Z",
			"payload":  {
				"apns":  {
					"payload":  {
						"aps":  {
						"category":  "withappicon",
						"mutable-content":  1,
						"content-available":  1
					},	
				},
				"fcm_options": {
				"image":  "https://backend-staging.epns.io/cache/bafkreifib6dpdlvf2obmilzna3iwnqvfiiepylsqwlgcljyyzt7axpng5q.jpg"
				}
			},
			"data":  {
			"app":  "BTC Tracker",
			"sid":  "39499",
			"url":  "https://epns.io/btctracker",
			"acta":  "",
			"aimg":  "",
			"amsg":  "BTC at [d:$42,571.37]\n\nHourly Movement: [s:0.26%]\nDaily Movement: [t:-7.00%]\nWeekly Movement: [t:-5.95%][timestamp: 1632204001]",
			"asub":  "BTC Price Movement",
			"icon":  "https://backend-staging.epns.io/cache/bafkreifib6dpdlvf2obmilzna3iwnqvfiiepylsqwlgcljyyzt7axpng5q.jpg",
			"type":  "1",
			"epoch":  "1632223873",
			"appbot":  "0",
			"hidden":  "0",
			"secret":  ""
			},
			"android":  {
				"notification":  {
				"icon":  "@drawable/ic_stat_name",
				"color":  "#e20880",
				"image":  "https://backend-staging.epns.io/cache/bafkreifib6dpdlvf2obmilzna3iwnqvfiiepylsqwlgcljyyzt7axpng5q.jpg",
				"default_vibrate_timings":  true
				}
			},
			"notification":  {
			"body":  "\nHourly Movement: 0.26%\nDaily Movement: -7.00%\nWeekly Movement: -5.95%",
			"title":  "BTC Tracker - BTC at $42,571.37"
			}
		}
	 }]
 }l
```

## Parsing-The-Notifications

The next step is to parse the just fetched notifications, essentially convert the massive object we have you above into a more readable format.
```javascript
//parse the notification fetched
const parsedResponse = utils.parseApiResponse(fetchedNotifications);
console.log(parsedResponse);
//parse the notification fetched
```

**output**:
```javascript
[{
	cta: string,
	title: string,
	message:  string,
	icon: string,
	url: string,
	sid: string
}]
```
## Puting it all together
With all the previously explained steps, we can put it together to fetch the notifications, parse them, and then save it in a state variable.

```javascript
  const [notifications, setNotifications] = React.useState([]);
  React.useEffect(() => {
    // create state components to fetch all the notifications.
    // on page load, fetch all the notifications
    api
      .fetchNotifications(
        WALLET_ADDRESS,
        PAGINATION_PARAMS.itemsPerPage,
        PAGINATION_PARAMS.page,
      )
      .then(notificationsData => {
        const {count, results} = notificationsData || {};
        // console.log(`${count} notifications loaded:`, results);
        // parse the notifications into the required format
        const response = utils.parseApiResponse(results);
        console.log('Parsed response to:', response);
        // console.log({response});
        setNotifications(response);
      });
  }, []);
```


## Rendering-The-Notifications
Finally we proceed to render the object above as a notification using JSX
```javascript
    <View}>
      {notifications.map(oneNotification => {
        const {cta, title, message, app, icon, image} = oneNotification;

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
    </View>
```
 **output**:
 ![render notification output]([https://res.cloudinary.com/xand6r/image/upload/v1634632998/Screenshot_2021-10-19_at_09.27.44_wqvsia.png](https://res.cloudinary.com/xand6r/image/upload/v1634632998/Screenshot_2021-10-19_at_09.27.44_wqvsia.png))
