/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

import {
  NotificationItem,
  utils,
  api,
} from '@epnsproject/backend-sdk-staging/dist/native';
const WALLET_ADDRESS = '0x57c1D4dbFBc9F8cB77709493cc43eaA3CD505432';
const PAGINATION_PARAMS = {
  page: 1,
  itemsPerPage: 20,
};

const NotificationSection = () => {
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
        const response = utils.parseApiResponse([...results]);
        console.log('Parsed response to:', response);
        // console.log({response});
        setNotifications(response);
      })
      .catch((err) => {
        console.log(err)
      })
  }, []);

  return (
    <View style={styles.sectionContainer}>
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
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View>
          {/* render the notification items */}
          <NotificationSection />
          {/* render the notification items */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// basic styling
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
