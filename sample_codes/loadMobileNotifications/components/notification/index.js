import moment from 'moment';
import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Image,
  LogBox,
  YellowBox,
  TouchableWithoutFeedback
} from 'react-native';
import Video from 'react-native-video';
import YouTube from 'react-native-youtube';
import Modal from 'react-native-modal';

import Device from 'react-native-device-detection';

import IPFSIcon from '../ipfsicon';
import ParseText from '../parseText';

import GLOBALS from '../utilities/globals';
import DownloadHelper from '../utilities/mediaHelper';
const images = [
  {
    source: {
      uri: 'https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg',
    },
  },
];
const ViewNotificationItem = ({
  notificationTitle = '',
  notificationBody = '',
  cta = '',
  app = '',
  icon = '',
  timestamp = '',
  image = '',
}) => {
  const videoPlayerRef = React.useRef(null);
  const ctaEnabled = Boolean(cta);
  const [isVisible, setIsVisible] = React.useState(false);

  // Finally mark if the device is a tablet or a phone
  let contentInnerStyle = {};
  let contentImgStyle = {};
  let contentMsgImgStyle = {};
  let contentVidStyle = {};
  let contentMsgVidStyle = {};
  let bgVidStyle = {};
  let contentBodyStyle = {};
  let containMode = 'contain';

  console.log(Device)

  if (true) {
    // Change the style to better suit tablet

    contentInnerStyle = {
      flexDirection: 'row',
      alignItems: 'center',
    };

    contentImgStyle = {
      width: '25%',
      aspectRatio: 1,
      borderRadius: 10,
      paddingRight: 20,
    };

    contentYoutubeStyle = {
      width: '25%',
      aspectRatio: 1,
      borderRadius: 10,
      paddingRight: 20,
      margin: 20,
      marginRight: 10
    }

    contentMsgImgStyle = {
      margin: 20,
      marginRight: 5,
      borderRadius: 10,
      borderWidth: 0,
    };

    contentVidStyle = {
      width: '25%',
      aspectRatio: 1,
      margin: 20,
      marginRight: 10
    }

    contentMsgVidStyle = {
      width: '100%',
    }
    
    bgVidStyle = {
      borderRadius: 10,
    }

    contentBodyStyle = {
      flex: 1,
    };

    containMode = 'cover';
  }

  const ctaStyles = {
    borderColor: GLOBALS.COLORS.SLIGHT_GRAY,
    backgroundColor: GLOBALS.COLORS.GRADIENT_SECONDARY,
    borderWidth: 1,
  };

  if (ctaEnabled) {
    ctaStyles['borderColor'] = GLOBALS.COLORS.GRADIENT_SECONDARY;
    ctaStyles['borderWidth'] = 2;
    ctaStyles['borderRadius'] = GLOBALS.ADJUSTMENTS.FEED_ITEM_RADIUS;
  }

  // to check valid url
  const validURL = str => {
    var pattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i',
    ); // fragment locator
    return !!pattern.test(str);
  };

  const onPress = url => {
    if (validURL(url) || 1) {
      // console.log("OPENING URL ", url);
      // Bypassing the check so that custom app domains can be opened
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        }
      });
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={() => onPress(cta)}
      disabled={!ctaEnabled}>
      <View style={[styles.inner, ctaStyles]}>
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.appLink]}
            // disabled={!item.url || item.url === '' ? true : false}>
          >
            <View style={[styles.appicon]}>
              <IPFSIcon icon={icon} />
            </View>
            <Text style={styles.apptext} numberOfLines={1}>
              {app}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={[styles.contentInner, contentInnerStyle]}>
            {image ? (
              // if its an image then render this
              !DownloadHelper.isMediaSupportedVideo(image) ? (
                <TouchableOpacity
                  onPress={e => {
                    e.stopPropagation();
                    setIsVisible(true);
                  }}
                  style={[styles.contentImg, contentImgStyle]}>
                  <Image
                    style={[styles.image, contentMsgImgStyle]}
                    source={{uri: image}}
                    resizeMode={containMode}
                  />
                </TouchableOpacity>
              ) : // if its a youtube url, RENDER THIS
              DownloadHelper.isMediaYoutube(image) ? (
                <YouTube
                  videoId={DownloadHelper.getYoutubeID(image)}
                  apiKey=""
                  play={false}
                  fullscreen={false}
                  loop={false}
                  controls={1}
                  style={[styles.backgroundVideo, contentYoutubeStyle]}
                />
              ) : (
                <View style={[styles.contentVid, contentVidStyle]}>
                  <View style={[styles.msgVid, contentMsgVidStyle]}>
                    <Video
                      resizeMode={containMode}
                      source={{uri: image}} // Can be a URL or a local file.
                      ref={videoPlayerRef} // Store reference
                      style={[styles.backgroundVideo, bgVidStyle]}
                      controls
                    />
                  </View>
                </View>
              )
            ) : (
              <Text></Text>
            )}
            <View style={[styles.contentBody, contentBodyStyle]}>
              {!notificationTitle ? null : (
                <Text style={[styles.msgSub]}>{notificationTitle}</Text>
              )}
              <View style={styles.msg}>
                {/* The entire content of the main component */}
                <ParseText
                  title={notificationBody
                    .replaceAll('\\n', '\n')
                    .replaceAll('/', '')
                  }
                  fontSize={13}
                />
                {/* The entire content of the main component */}
              </View>

              {!timestamp ? null : (
                <View style={styles.timestampOuter}>
                  <Text style={styles.timestamp}>
                    {moment
                      .utc(parseInt(timestamp) * 1000)
                      .local()
                      .format('DD MMM YYYY | hh:mm A')}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
        {/* header that only pops up on small devices */}
        {/* header that only pops up on small devices */}
        {/* when an image is clicked on make it fulll screen */}
        <Modal isVisible={isVisible} animationIn="fadeIn"  animationOut="fadeOut">
            <TouchableWithoutFeedback onPress={()=> setIsVisible(false)}>
                <Image
                style={styles.overlayImage}
                source={{uri: image}}
                />
            </TouchableWithoutFeedback>
        </Modal>
        {/* when an image is clicked on make it fulll screen */}
      </View>
    </TouchableOpacity>
  );
};

// ================= Define styled components
// / Styling
const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'yellow',
    height: '100%',
    width: '100%',
  },
  backgroundVideo: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
    top: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    width: '100%',
    marginVertical: 15,
  },
  inner: {
    margin: 1,
    overflow: 'hidden',
    borderRadius: GLOBALS.ADJUSTMENTS.FEED_ITEM_RADIUS,
  },
  header: {
    width: '100%',
    paddingVertical: 7,
    paddingHorizontal: 10,
    backgroundColor: GLOBALS.COLORS.SLIGHTER_GRAY,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: GLOBALS.COLORS.SLIGHT_GRAY,
  },
  appInfo: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'red',
  },
  appLink: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  appicon: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    height: 24,
    aspectRatio: 1,
    marginRight: 5,
    overflow: 'hidden',
    backgroundColor: GLOBALS.COLORS.SLIGHT_GRAY,
  },
  apptext: {
    marginRight: 10,
    marginLeft: 5,
    fontSize: 12,
    color: GLOBALS.COLORS.MID_BLACK_TRANS,
    fontWeight: '300',
  },
  appsecret: {
    width: 16,
    height: 16,
    borderRadius: 16,
  },
  content: {
    backgroundColor: GLOBALS.COLORS.WHITE,
  },
  contentLoader: {
    margin: 20,
  },
  contentVid: {
    width: '100%',
  },
  msgVid: {
    borderColor: GLOBALS.COLORS.SLIGHT_GRAY,
    backgroundColor: GLOBALS.COLORS.SLIGHTER_GRAY,
    borderBottomWidth: 1,
  },
  contentImg: {
    width: '100%',
    aspectRatio: 2,
  },
  msgImg: {
    borderColor: GLOBALS.COLORS.SLIGHT_GRAY,
    backgroundColor: GLOBALS.COLORS.SLIGHTER_GRAY,
    borderBottomWidth: 1,
    resizeMode: 'contain',
  },
  contentBody: {
    paddingHorizontal: 15,
  },
  msgSub: {
    fontSize: 16,
    fontWeight: '300',
    color: GLOBALS.COLORS.MID_BLACK_TRANS,
    paddingVertical: 10,
  },
  msg: {
    paddingTop: 5,
    paddingBottom: 20,
  },
  timestampOuter: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginRight: -20,
    borderTopLeftRadius: 5,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: GLOBALS.COLORS.SLIGHT_GRAY,
    overflow: 'hidden',

    backgroundColor: GLOBALS.COLORS.SLIGHTER_GRAY,
  },
  timestamp: {
    fontWeight: '300',
    fontSize: 12,

    color: GLOBALS.COLORS.MID_BLACK_TRANS,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  overlayImage: {
    flex: 1,
    resizeMode: 'contain',
    borderRadius: 20,
    overflow: 'hidden',
    width: "100%",
height: "100%",
  }
});

export default ViewNotificationItem;
