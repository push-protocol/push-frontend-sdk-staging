import * as moment from 'moment';
import * as React from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet,
  Linking, Image, TouchableWithoutFeedback
} from 'react-native';

import YouTube from 'react-native-youtube';
import Video from 'react-native-video';
import Modal from 'react-native-modal';
import device from 'react-native-device-detection';

import IPFSIcon from '../ipfsicon';
import ParseText from '../parseText';
import { extractTimeStamp } from '../../../utilities/index';
import GLOBALS from '../../../utilities/globals';
import DownloadHelper from '../../../utilities/mediaHelper';
import config from '../../../config';

const ViewNotificationItem = ({
  notificationTitle = '',
  notificationBody = '',
  cta = '',
  app = '',
  icon = '',
  image = '',
}) => {
  const videoPlayerRef = React.useRef(null);
  const ctaEnabled = Boolean(cta);

  const {
    originalBody: parsedBody,
    timeStamp
} = extractTimeStamp(notificationBody);
console.log({
  parsedBody,
  timeStamp
})

  // store the image to be displayed in this state variable
  const [ isVisible, setIsVisible ] = React.useState(false);

  // Finally mark if the device is a tablet or a phone
  let contentInnerStyle = {};
  let contentImgStyle = {};
  let contentVidStyle = {};
  let contentMsgVidStyle = {};

  let contentBodyStyle = {};
  let containMode:any = 'contain';

  if (device.isTablet) {
    // Change the style to better suit tablet

    contentInnerStyle = {
      flexDirection: 'row',
      alignItems: 'center',
    };

    contentImgStyle = {
      width: '25%',
      aspectRatio: 1,
    };

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

  if(ctaEnabled){
    ctaStyles['borderColor'] = GLOBALS.COLORS.GRADIENT_SECONDARY;
    ctaStyles['borderWidth'] = 2;
    ctaStyles['borderRadius'] = GLOBALS.ADJUSTMENTS.FEED_ITEM_RADIUS;
  }

  // to check valid url
  const validURL = (str: string) => {
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

  const onPress = (url:string) => {
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
          <View style={[ contentInnerStyle]}>
            {image ?
              // if its an image then render this
              (!DownloadHelper.isMediaSupportedVideo(image) ? (
                <TouchableOpacity
                  onPress={e => {
                    e.stopPropagation();
                    setIsVisible(true);
                  }}
                  style={[styles.contentImg, contentImgStyle]}>
                  <Image
                    style={styles.image}
                    source={{uri: image}}
                    resizeMode={containMode}
                  />
                </TouchableOpacity>
              ) : // if its a youtube url, RENDER THIS
              DownloadHelper.isMediaYoutube(image) ? (
                <YouTube
                    videoId={DownloadHelper.getYoutubeID(image)}
                    apiKey={config.YOUTUBE_API_KEY}
                    play={false}
                    fullscreen={false}
                    loop={false}
                    controls={1}
                    style={styles.backgroundVideo}
                    />
              ) : (
                <View style={[styles.contentVid, contentVidStyle]}>
                  <View style={[styles.msgVid, contentMsgVidStyle]}>
                    <Video
                      resizeMode={containMode}
                      source={{uri: image}} // Can be a URL or a local file.
                      ref={videoPlayerRef} // Store reference
                      style={styles.backgroundVideo}
                      controls
                    />
                  </View>
                </View>
              )) : <Text></Text>}
            <View style={[styles.contentBody, contentBodyStyle]}>
              {!notificationTitle ? null : (
                <Text style={[styles.msgSub]}>{notificationTitle}</Text>
              )}
              <View style={styles.msg}>
                {/* The entire content of the main component */}
                <ParseText
                  title={
                    parsedBody
                    .replaceAll('\\n', '\n')
                    .replaceAll('/', '') || ""
                  }
                  fontSize={13}
                />
                {/* The entire content of the main component */}
              </View>

              {!timeStamp ? null : (
                <View style={styles.timestampOuter}>
                  <Text style={styles.timestamp}>
                    {moment
                      .utc(parseInt(timeStamp) * 1000)
                      .local()
                      .format('DD MMM YYYY | hh:mm A')}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
        {/* when an image is clicked on make it fulll screen */}
        <Modal animationIn="fadeIn"  animationOut="fadeOut" isVisible={isVisible}>
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
  }
});

export default ViewNotificationItem;
