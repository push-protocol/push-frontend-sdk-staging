Object.defineProperty(exports, '__esModule', { value: true });

var moment = require('moment');
var React = require('react');
var reactNative = require('react-native');
var YouTube = require('react-native-youtube');
var Video = require('react-native-video');
var Modal = require('react-native-modal');
var device = require('react-native-device-detection');
var axios = require('axios');
var styled = require('styled-components/native');
var ParsedText = require('react-native-parsed-text');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () {
                        return e[k];
                    }
                });
            }
        });
    }
    n['default'] = e;
    return Object.freeze(n);
}

var moment__namespace = /*#__PURE__*/_interopNamespace(moment);
var React__namespace = /*#__PURE__*/_interopNamespace(React);
var YouTube__default = /*#__PURE__*/_interopDefaultLegacy(YouTube);
var Video__default = /*#__PURE__*/_interopDefaultLegacy(Video);
var Modal__default = /*#__PURE__*/_interopDefaultLegacy(Modal);
var device__default = /*#__PURE__*/_interopDefaultLegacy(device);
var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);
var ParsedText__default = /*#__PURE__*/_interopDefaultLegacy(ParsedText);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

/**
 * @description Parse the contents of the markdown version of the notification body
 * @param message the notification body we wish to parse
 * @returns
 */
var FormatBody = function (message) {
    // firstly replace all new line content of the text with <br />
    // in order to parse it as HTML i.e "\n\n" => "<br /><br />"
    var parsedNewLine = message.replace(/\n/g, "<br />");
    // remove leading slashes from text i.e \alex => alex
    var removedLeadingSlash = parsedNewLine.replace(/^\\/g, "");
    return removedLeadingSlash;
};

/**
 * @description Contains a set of utilities to abstract several code
 * @version 1.0
 */
var IPFS_BASE_URL = "https://ipfs.io/ipfs/";
/**
 * @description extract the ipfs HASH from the name of an image i.e www.xyz.com/abc/ipfshash.jpg => ipfshash
 * @param notificationBody
 * @returns the ipfs hash extracted from the image name
 */
function extractIPFSHashFromImageURL(imageURL) {
    if (!imageURL)
        return { type: "http", url: "" };
    if (imageURL.includes("ipfs"))
        return { type: "ipfs", url: imageURL };
    if (imageURL.includes("base64"))
        return { type: "base64", url: imageURL };
    var match = imageURL.match(/(\w+).jpg/);
    var output = match ? "" + IPFS_BASE_URL + match[1] : "";
    return { type: "http", url: output };
}
/**
 * @description parse and extract the timestamp from the body of the notification and remove the text from the body
 * @param notificationBody the text which would represent the body of the notification
 * @returns
 */
function extractTimeStamp(notificationBody) {
    var parsedBody = {
        notificationBody: FormatBody(notificationBody),
        timeStamp: "",
        originalBody: notificationBody,
    };
    var matches = notificationBody.match(/\[timestamp:(.*?)\]/);
    if (matches) {
        parsedBody.timeStamp = matches[1];
        var textWithoutTimeStamp = notificationBody.replace(/ *\[timestamp:[^)]*\] */g, "");
        parsedBody.notificationBody = FormatBody(textWithoutTimeStamp);
        parsedBody.originalBody = textWithoutTimeStamp;
    }
    return parsedBody;
}
/**
 * @description parse the response gotten from the API
 * @param {ApiNotificationType[]} response
 * @returns {ParsedResponseType[]}
 */
function parseApiResponse(response) {
    return response.map(function (apiNotification) {
        var _a = apiNotification.payload, _b = _a.data, _c = _b.acta, cta = _c === void 0 ? "" : _c, _d = _b.amsg, bigMessage = _d === void 0 ? "" : _d, _e = _b.asub, asub = _e === void 0 ? "" : _e, _f = _b.icon, icon = _f === void 0 ? "" : _f, _g = _b.url, url = _g === void 0 ? "" : _g, _h = _b.sid, sid = _h === void 0 ? "" : _h, _j = _b.app, app = _j === void 0 ? "" : _j, _k = _b.aimg, aimg = _k === void 0 ? "" : _k, _l = _a.notification, _m = _l.body, body = _m === void 0 ? "" : _m, _o = _l.title, title = _o === void 0 ? "" : _o, blockchain = apiNotification.blockchain;
        return {
            cta: cta,
            title: asub || title,
            message: bigMessage || body,
            icon: icon,
            url: url,
            sid: sid,
            app: app,
            image: aimg,
            blockchain: blockchain,
        };
    });
}
var index = {
    extractTimeStamp: extractTimeStamp,
    parseApiResponse: parseApiResponse,
};

var IPFSIcon = function (_a) {
    var icon = _a.icon;
    var _b = React__namespace.useState(''), imageInBase64 = _b[0], setImageInBase64 = _b[1];
    // fetch and pin the icons using ipfs hash
    React__namespace.useEffect(function () {
        // extract the IPFS image url from the url of the icon
        var _a = extractIPFSHashFromImageURL(icon), type = _a.type, ipfsHash = _a.url;
        if (!ipfsHash)
            return;
        // fetch the image directly from ipfs
        if (type === "https") {
            axios__default['default'].get(ipfsHash)
                .then(function (_a) {
                var res = _a.data;
                setImageInBase64(res.icon);
            })
                .catch(function (err) {
                console.log(err);
            });
        }
        else {
            setImageInBase64(ipfsHash);
        }
    }, [icon]);
    if (!imageInBase64) {
        return React__namespace.createElement(React__namespace.Fragment, null);
    }
    return (React__namespace.createElement(StyledImage, { source: { uri: imageInBase64 } }));
};
var StyledImage = styled__default['default'].Image(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    height: 20px;\n    width: 20px;\n    border-radius: 5px;\n"], ["\n    height: 20px;\n    width: 20px;\n    border-radius: 5px;\n"])));
var templateObject_1;

/**
 * Global constants to be used for styling and the mobile portion of the sdk
 */
var GLOBALS = {
    LINKS: {
        APPBOT_NAME: "App Bot",
        APP_WEBSITE: "https://epns.io",
    },
    ADJUSTMENTS: {
        SCREEN_GAP_HORIZONTAL: 10,
        SCREEN_GAP_VERTICAL: 10,
        DEFAULT_BIG_RADIUS: 10,
        DEFAULT_MID_RADIUS: 8,
        FEED_ITEM_RADIUS: 8,
    },
    COLORS: {
        PRIMARY: "rgba(27.0, 150.0, 227.0, 1.0)",
        LINKS: "rgba(20.0, 126.0, 251.0, 1.0)",
        GRADIENT_PRIMARY: "rgba(226.0, 8.0, 128.0, 1.0)",
        GRADIENT_SECONDARY: "rgba(53.0, 197.0, 243.0, 1.0)",
        GRADIENT_THIRD: "rgba(103.0, 76.0, 159.0, 1.0)",
        TRANSPARENT: "transparent",
        WHITE: "rgba(255.0, 255.0, 255.0, 1.0)",
        DARK_WHITE: "rgba(255.0, 255.0, 255.0, 0.75)",
        MID_WHITE: "rgba(255.0, 255.0, 255.0, 0.5)",
        LIGHT_WHITE: "rgba(255.0, 255.0, 255.0, 0.25)",
        SLIGHTER_GRAY: "rgba(250.0, 250.0, 250.0, 1)",
        SLIGHT_GRAY: "rgba(231.0, 231.0, 231.0, 1)",
        LIGHT_GRAY: "rgba(225.0, 225.0, 225.0, 1)",
        MID_GRAY: "rgba(200.0, 200.0, 200.0, 1)",
        DARK_GRAY: "rgba(160.0, 160.0, 160.0, 1)",
        DARKER_GRAY: "rgba(100.0, 100.0, 100.0, 1)",
        LIGHT_BLACK_TRANS: "rgba(0.0, 0.0, 0.0, 0.1)",
        SEMI_MID_BLACK_TRANS: "rgba(0.0, 0.0, 0.0, 0.25)",
        MID_BLACK_TRANS: "rgba(0.0, 0.0, 0.0, 0.5)",
        DARK_BLACK_TRANS: "rgba(0.0, 0.0, 0.0, 0.75)",
        BLACK: "rgba(0.0, 0.0, 0.0, 1.0)",
        CONFIRM: "rgba(34.0, 139.0, 34.0, 1.0)",
        WARNING: "rgba(255.0, 153.0, 0.0, 1.0)",
        SUBLIME_RED: "rgba(237.0, 59.0, 72.0, 1.0)",
        BADGE_RED: "rgba(208.0, 44.0, 30.0, 1.0)",
        LIGHT_MAROON: "rgba(159.0, 0.0, 0.0, 1.0)",
        LIGHTER_MAROON: "rgba(129.0, 0.0, 0.0, 1.0)",
    },
};

var CalendarEvents = /** @class */ (function (_super) {
    __extends(CalendarEvents, _super);
    // Constructor
    function CalendarEvents(props) {
        return _super.call(this, props) || this;
    }
    // Component Mounted
    CalendarEvents.prototype.componentDidMount = function () {
    };
    CalendarEvents.prototype.handleUrlPress = function (matchingString, matchIndex /*: number*/) {
        var pattern = /\[([^:]+):([^\]]+)\]/i;
        var match = matchingString.match(pattern) || [];
        var midComponent = "" + match[2];
        var url = midComponent.substr(midComponent.indexOf('||') + 2);
        reactNative.Linking.openURL(url);
    };
    CalendarEvents.prototype.handleAppSettings = function () {
        if (reactNative.Platform.OS === 'ios') {
            reactNative.Linking.openURL('app-settings:');
        }
    };
    CalendarEvents.prototype.renderStyles = function (matchingString, matches) {
        // matches => ["[@michel:5455345]", "@michel", "5455345"]
        var pattern = /\[([^:]+):([^\]]+)\]/i;
        var match = matchingString.match(pattern) || [];
        return "" + match[2];
    };
    CalendarEvents.prototype.renderThreeStyles = function (matchingString, matches) {
        // matches => ["[@michel:5455345]", "@michel", "5455345"]
        var pattern = /\[([^:]+):([^\]]+)\]/i;
        var match = matchingString.match(pattern) || [];
        var midComponent = "" + match[2];
        var midText = midComponent.substr(0, midComponent.indexOf('||'));
        return midText;
    };
    // RENDER
    CalendarEvents.prototype.render = function () {
        var _a = this.props, style = _a.style, title = _a.title, fontSize = _a.fontSize, textStyle = _a.textStyle;
        var TextUpdatedStyle = {
            fontSize: fontSize
        };
        var parseSettings = [
            {
                pattern: /\[(u):([^\]]+)\]/i,
                style: [styles$1.primary, styles$1.bold, styles$1.italics, styles$1.underline],
                onPress: this.handleUrlPress,
                renderText: this.renderThreeStyles
            },
            {
                pattern: /\[(ub):([^\]]+)\]/i,
                style: [styles$1.secondary, styles$1.bold, styles$1.italics, styles$1.underline],
                onPress: this.handleUrlPress,
                renderText: this.renderThreeStyles
            },
            {
                pattern: /\[(ut):([^\]]+)\]/i,
                style: [styles$1.third, styles$1.bold, styles$1.italics, styles$1.underline],
                onPress: this.handleUrlPress,
                renderText: this.renderThreeStyles
            },
            {
                pattern: /\[(up):([^\]]+)\]/i,
                style: [styles$1.primary, styles$1.italics, styles$1.underline],
                onPress: this.handleUrlPress,
                renderText: this.renderThreeStyles
            },
            {
                pattern: /\[(d):([^\]]+)\]/i,
                style: [styles$1.primary, styles$1.bold],
                renderText: this.renderStyles
            },
            {
                pattern: /\[(s):([^\]]+)\]/i,
                style: [styles$1.secondary, styles$1.bold],
                renderText: this.renderStyles
            },
            {
                pattern: /\[(t):([^\]]+)\]/i,
                style: [styles$1.third, styles$1.bold],
                renderText: this.renderStyles
            },
            {
                pattern: /\[(e):([^\]]+)\]/i,
                style: [styles$1.error, styles$1.bold],
                renderText: this.renderStyles
            },
            {
                pattern: /\[(b):([^\]]+)\]/i,
                style: styles$1.bold,
                renderText: this.renderStyles
            },
            {
                pattern: /\[(i):([^\]]+)\]/i,
                style: styles$1.italics,
                renderText: this.renderStyles
            },
            {
                pattern: /\[(bi):([^\]]+)\]/i,
                style: [styles$1.bold, styles$1.italics],
                renderText: this.renderStyles
            },
            {
                pattern: /\[(w):([^\]]+)\]/i,
                style: [styles$1.white],
                renderText: this.renderStyles
            },
            {
                pattern: /\[(wb):([^\]]+)\]/i,
                style: [styles$1.white, styles$1.bold],
                renderText: this.renderStyles
            },
            {
                pattern: /\[(mg):([^\]]+)\]/i,
                style: [styles$1.midgray],
                renderText: this.renderStyles
            },
            {
                pattern: /\[(dg):([^\]]+)\]/i,
                style: [styles$1.darkgray],
                renderText: this.renderStyles
            },
            {
                pattern: /\[(ddg):([^\]]+)\]/i,
                style: [styles$1.darkergray],
                renderText: this.renderStyles
            },
        ];
        if (reactNative.Platform.OS === 'ios') {
            parseSettings.push({
                pattern: /\[(appsettings):([^\]]+)\]/i,
                style: [styles$1.link, styles$1.bold, styles$1.italics, styles$1.underline],
                onPress: this.handleAppSettings,
                renderText: this.renderStyles
            });
        }
        else if (reactNative.Platform.OS === 'android') {
            parseSettings.push({
                pattern: /\[(appsettings):([^\]]+)\]/i,
                style: [styles$1.bold],
                renderText: this.renderStyles
            });
        }
        return (React__namespace.createElement(reactNative.View, { style: [styles$1.container, style] },
            React__namespace.createElement(ParsedText__default['default'], { style: [styles$1.text, TextUpdatedStyle, textStyle], parse: parseSettings, childrenProps: { allowFontScaling: false } }, title)));
    };
    return CalendarEvents;
}(React__namespace.Component));
// Styling
var styles$1 = reactNative.StyleSheet.create({
    container: {},
    name: {
        color: GLOBALS.COLORS.SUBLIME_RED
    },
    username: {
        color: GLOBALS.COLORS.GRADIENT_SECONDARY
    },
    text: {
        color: GLOBALS.COLORS.BLACK
    },
    primary: {
        color: GLOBALS.COLORS.GRADIENT_PRIMARY,
    },
    secondary: {
        color: GLOBALS.COLORS.GRADIENT_SECONDARY,
    },
    third: {
        color: GLOBALS.COLORS.GRADIENT_THIRD,
    },
    error: {
        color: GLOBALS.COLORS.SUBLIME_RED,
    },
    white: {
        color: GLOBALS.COLORS.WHITE,
    },
    midgray: {
        color: GLOBALS.COLORS.MID_GRAY,
    },
    darkgray: {
        color: GLOBALS.COLORS.DARK_GRAY,
    },
    darkergray: {
        color: GLOBALS.COLORS.DARKER_GRAY,
    },
    link: {
        color: GLOBALS.COLORS.GRADIENT_PRIMARY,
    },
    underline: {
        textDecorationLine: 'underline',
    },
    bold: {
        fontWeight: 'bold'
    },
    italics: {
        fontStyle: 'italic'
    }
});

// Download Helper Function
var MediaHelper = {
    // validate a CTA
    validURL: function (str) {
        if (!str)
            return false;
        var pattern = new RegExp("^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\S*)?$", "i"); // fragment locator
        return !!pattern.test(str);
    },
    // To get Save File Name
    getSaveFileName: function (fileURL, useTempLocation) {
        // Remove all http, https protocols first
        fileURL = fileURL.replace(/(^\w+:|^)\/\//, '');
        // /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi
        // Remove all special characters
        fileURL = fileURL.replace(/[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '');
        // Remove all but 250 characters
        if (fileURL.length > 250) {
            fileURL = fileURL.substr(-250);
        }
        if (useTempLocation) {
            return fileURL + '.temp';
        }
        else {
            return fileURL;
        }
    },
    // Determine if media is supported video
    isMediaSupportedVideo: function (fileURL) {
        if (!fileURL)
            return;
        // check if media external embed first
        var mediaURL = MediaHelper.isMediaExternalEmbed(fileURL);
        if (mediaURL) {
            return mediaURL;
        }
        else {
            // check if mp4 extension
            if (fileURL.split('.').pop() === "mp4") {
                return true;
            }
        }
        // if all else fail
        return false;
    },
    // check if media is external embed, like youtube, soundcloud, etc
    isMediaExternalEmbed: function (fileURL) {
        return (MediaHelper.isMediaYoutube(fileURL));
    },
    // Determine if youtube
    isMediaYoutube: function (fileURL) {
        if (fileURL != undefined || fileURL != '') {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            var match = fileURL.match(regExp);
            if (match && match[2].length == 11) {
                // embed url
                var embedURL = 'https://www.youtube.com/embed/' + match[2] + '?autoplay=0&enablejsapi=1';
                return embedURL;
            }
        }
        return "";
    },
    // Get youtube id
    getYoutubeID: function (fileURL) {
        if (fileURL != undefined || fileURL != '') {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
            var match = fileURL.match(regExp);
            if (match && match[2].length == 11) {
                return match[2];
            }
        }
        return "";
    }
};

var config = {
    "BASE_URL": "https://backend-kovan.epns.io/apis",
    "YOUTUBE_API_KEY": "AIzaSyBrzkFPyNmVDFzGY7dKz2HocUO4m-ni-Fc",
    "EPNS_CORE_CONTRACT": "0x97D7c5f14B8fe94Ef2b4bA589379f5Ec992197dA",
    "EPNS_COMMUNICATOR_CONTRACT": "0x87da9Af1899ad477C67FeA31ce89c1d2435c77DC"
};

var ViewNotificationItem = function (_a) {
    var _b = _a.notificationTitle, notificationTitle = _b === void 0 ? '' : _b, _c = _a.notificationBody, notificationBody = _c === void 0 ? '' : _c, _d = _a.cta, cta = _d === void 0 ? '' : _d, _e = _a.app, app = _e === void 0 ? '' : _e, _f = _a.icon, icon = _f === void 0 ? '' : _f, _g = _a.image, image = _g === void 0 ? '' : _g, _h = _a.url, url = _h === void 0 ? '' : _h;
    var videoPlayerRef = React__namespace.useRef(null);
    var ctaEnabled = Boolean(cta);
    var _j = extractTimeStamp(notificationBody || ''), parsedBody = _j.originalBody, timeStamp = _j.timeStamp;
    // store the image to be displayed in this state variable
    var _k = React__namespace.useState(false), isVisible = _k[0], setIsVisible = _k[1];
    // Finally mark if the device is a tablet or a phone
    var contentInnerStyle = {};
    var contentImgStyle = {};
    var contentMsgImgStyle = {};
    var contentVidStyle = {};
    var contentMsgVidStyle = {};
    var bgVidStyle = {};
    var contentYoutubeStyle = {};
    var contentBodyStyle = {};
    var containMode = 'contain';
    if (device__default['default'].isTablet) {
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
        contentMsgImgStyle = {
            margin: 20,
            marginRight: 5,
            borderRadius: 10,
            borderWidth: 0,
        };
        contentYoutubeStyle = {
            width: '25%',
            aspectRatio: 1,
            borderRadius: 10,
            paddingRight: 20,
            margin: 20,
            marginRight: 10
        };
        contentVidStyle = {
            width: '25%',
            aspectRatio: 1,
            margin: 20,
            marginRight: 10
        };
        contentBodyStyle = {
            flex: 1,
        };
        contentMsgVidStyle = {
            width: '100%',
        };
        bgVidStyle = {
            borderRadius: 10,
        };
        containMode = 'cover';
    }
    var ctaStyles = {
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
    var validURL = function (str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    };
    var onPress = function (url) {
        if (validURL(url) || 1) {
            // console.log("OPENING URL ", url);
            // Bypassing the check so that custom app domains can be opened
            reactNative.Linking.canOpenURL(url).then(function (supported) {
                if (supported) {
                    reactNative.Linking.openURL(url);
                }
            });
        }
    };
    return (React__namespace.createElement(reactNative.TouchableOpacity, { style: [styles.container], onPress: function () { return onPress(cta); }, disabled: !ctaEnabled },
        React__namespace.createElement(reactNative.View, { style: [styles.inner, ctaStyles] },
            React__namespace.createElement(reactNative.View, { style: styles.header },
                React__namespace.createElement(reactNative.TouchableOpacity, { style: [styles.appLink], disabled: !url, onPress: function () { console.log(url); onPress(url); } },
                    React__namespace.createElement(reactNative.View, { style: [styles.appicon] },
                        React__namespace.createElement(IPFSIcon, { icon: icon })),
                    React__namespace.createElement(reactNative.Text, { style: styles.apptext, numberOfLines: 1 }, app))),
            React__namespace.createElement(reactNative.View, { style: styles.content },
                React__namespace.createElement(reactNative.View, { style: [contentInnerStyle] },
                    image ?
                        // if its an image then render this
                        (!MediaHelper.isMediaSupportedVideo(image) ? (React__namespace.createElement(reactNative.TouchableOpacity, { onPress: function (e) {
                                e.stopPropagation();
                                setIsVisible(true);
                            }, style: [styles.contentImg, contentImgStyle] },
                            React__namespace.createElement(reactNative.Image, { style: [styles.image, contentMsgImgStyle], source: { uri: image }, resizeMode: containMode }))) : // if its a youtube url, RENDER THIS
                            MediaHelper.isMediaYoutube(image) ? (React__namespace.createElement(YouTube__default['default'], { videoId: MediaHelper.getYoutubeID(image), apiKey: config.YOUTUBE_API_KEY, play: false, fullscreen: false, loop: false, controls: 1, style: [styles.backgroundVideo, contentYoutubeStyle] })) : (React__namespace.createElement(reactNative.View, { style: [styles.contentVid, contentVidStyle] },
                                React__namespace.createElement(reactNative.View, { style: [styles.msgVid, contentMsgVidStyle] },
                                    React__namespace.createElement(Video__default['default'], { resizeMode: containMode, source: { uri: image }, ref: videoPlayerRef, style: [styles.backgroundVideo, bgVidStyle], controls: true }))))) : React__namespace.createElement(React__namespace.Fragment, null),
                    React__namespace.createElement(reactNative.View, { style: [styles.contentBody, contentBodyStyle] },
                        !notificationTitle ? null : (React__namespace.createElement(reactNative.Text, { style: [styles.msgSub] }, notificationTitle)),
                        React__namespace.createElement(reactNative.View, { style: styles.msg },
                            React__namespace.createElement(CalendarEvents, { title: parsedBody
                                    .replaceAll('\\n', '\n')
                                    .replaceAll('/', '') || "", fontSize: 13 })),
                        !timeStamp ? null : (React__namespace.createElement(reactNative.View, { style: styles.timestampOuter },
                            React__namespace.createElement(reactNative.Text, { style: styles.timestamp }, moment__namespace
                                .utc(parseInt(timeStamp) * 1000)
                                .local()
                                .format('DD MMM YYYY | hh:mm A'))))))),
            React__namespace.createElement(Modal__default['default'], { animationIn: "fadeIn", animationOut: "fadeOut", isVisible: isVisible },
                React__namespace.createElement(reactNative.TouchableWithoutFeedback, { onPress: function () { return setIsVisible(false); } },
                    React__namespace.createElement(reactNative.Image, { style: styles.overlayImage, source: { uri: image } }))))));
};
// ================= Define styled components
// / Styling
var styles = reactNative.StyleSheet.create({
    backgroundVideo: {
        position: 'relative',
        width: '100%',
        aspectRatio: 1,
        top: 0,
        bottom: 0,
        right: 0,
    },
    container: {
        marginVertical: 15,
        marginHorizontal: 20
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

var DEFAULT_INITIAL_PAGE = 1;
var DEFAULT_PAGE_SIZE = 10;
var API_BASE_URL = config.BASE_URL;
/**
 * Endpoint to get spam notifications for a particular user
 * @param {string} userAccount the account of the user in question
 * @param {number?} page the page we wish to fetch
 * @param {number?} itemsPerPage the maximum number of items which should be present on the page
 * @param {string?} baseApiUrl the base URL to be used, optional but could be used to connect to custom backend
 * @returns
 */
var fetchSpamNotifications = function (userAccount, itemsPerPage, page, baseApiUrl) {
    if (itemsPerPage === void 0) { itemsPerPage = DEFAULT_PAGE_SIZE; }
    if (page === void 0) { page = DEFAULT_INITIAL_PAGE; }
    if (baseApiUrl === void 0) { baseApiUrl = API_BASE_URL; }
    return __awaiter(void 0, void 0, void 0, function () {
        var body;
        return __generator(this, function (_a) {
            body = {
                "user": userAccount,
                "page": page,
                "pageSize": itemsPerPage,
                "op": "read"
            };
            return [2 /*return*/, axios__default['default'].post(baseApiUrl + "/feeds/get_spam_feeds", body)
                    .then(function (response) { return response.data; })
                    .catch(function (err) {
                    console.log("\n        ============== There was an error [epns-sdk -> loadNotifications] ============\n        ", err);
                })];
        });
    });
};
/**
 * Fetch paginated notifications for a user
 * @param {string} userAccount the account of the user in question
 * @param {number?} page the page we wish to fetch
 * @param {number} itemsPerPage the maximum number of items which should be present on the page
 * @param {string?} baseApiUrl the base URL to be used, optional but could be used to connect to custom backend
 * @returns
 */
var fetchNotifications = function (userAccount, itemsPerPage, page, baseApiUrl) {
    if (itemsPerPage === void 0) { itemsPerPage = DEFAULT_PAGE_SIZE; }
    if (page === void 0) { page = DEFAULT_INITIAL_PAGE; }
    if (baseApiUrl === void 0) { baseApiUrl = API_BASE_URL; }
    return __awaiter(void 0, void 0, void 0, function () {
        var body;
        return __generator(this, function (_a) {
            body = {
                "user": userAccount,
                "page": page,
                "pageSize": itemsPerPage,
                "op": "read"
            };
            return [2 /*return*/, axios__default['default'].post(baseApiUrl + "/feeds/get_feeds", body)
                    .then(function (response) { return response.data; })
                    .catch(function (err) {
                    console.log("\n        ============== There was an error [epns-sdk -> loadNotifications] ============\n        ", err);
                })];
        });
    });
};
var api = {
    fetchNotifications: fetchNotifications,
    fetchSpamNotifications: fetchSpamNotifications
};

/**
 * Contains all the utility functions required in order to sign transactions using EIP 712
 */
/**
 * A function used to get the domain information in order to sign messages using EIP 712 standard
 * @param chainId The id of the current chain, this would be used to get the right contract to use as well
 * @param verifyingContractAddress the address which we need to use to verify along with the domain information, defaults to communicator address, but can be specified for special purposes
 */
function getDomainInformation(chainId, verifyingContractAddress) {
    return {
        name: "EPNS COMM V1",
        chainId: chainId,
        verifyingContract: verifyingContractAddress || config.EPNS_COMMUNICATOR_CONTRACT,
    };
}
/**
 * Get the right message to sign as regards to subscribing and unsubscribing to a message, depending on the action
 * @param channelAddress
 * @param userAddress
 * @param action
 * @returns
 */
function getSubscriptionMessage(channelAddress, userAddress, action) {
    var _a;
    return _a = {
            channel: channelAddress
        },
        _a[action == "Unsubscribe" ? "unsubscriber" : "subscriber"] = userAddress,
        _a.action = action,
        _a;
}

/**
 * Contains all the constants required in order to sign transactions using EIP 712
 */
var signingConstants = {
    // The several types of actions and their corresponding types
    //  which we can take, when it comes to signing messages
    ACTION_TYPES: {
        // the type to be used for the subscribe action to a channel
        subscribe: {
            Subscribe: [
                { name: "channel", type: "address" },
                { name: "subscriber", type: "address" },
                { name: "action", type: "string" },
            ],
        },
        // the type to be used for the unsubscribe action to a channel
        unsubscribe: {
            Unsubscribe: [
                { name: "channel", type: "address" },
                { name: "unsubscriber", type: "address" },
                { name: "action", type: "string" },
            ],
        },
    },
};

/**
 * A function to get channel information basics from the backend
 * @param channelAddress
 * @param baseApiUrl
 */
function getChannelByAddress(channelAddress, baseApiUrl, page, pageSize) {
    if (baseApiUrl === void 0) { baseApiUrl = config.BASE_URL; }
    if (page === void 0) { page = 1; }
    if (pageSize === void 0) { pageSize = 10; }
    return __awaiter(this, void 0, void 0, function () {
        var body;
        return __generator(this, function (_a) {
            body = {
                query: channelAddress,
                op: "read",
                page: page,
                pageSize: pageSize
            };
            return [2 /*return*/, axios__default['default']
                    .post(baseApiUrl + "/channels/search", body)
                    .then(function (response) { var _a, _b; return ((_b = (_a = response.data) === null || _a === void 0 ? void 0 : _a.channels) === null || _b === void 0 ? void 0 : _b[0]) || null; })
                    .catch(function (err) {
                    console.log("\n        ============== There was an error [epns-sdk -> loadNotifications] ============\n        ", err);
                })];
        });
    });
}
/**
 * Function to obtain all the addresses subscribed to a channel
 * @param channelAddress the address of the channel
 * @param userAddress
 */
function getSubscribers(channelAddress, baseApiUrl) {
    if (baseApiUrl === void 0) { baseApiUrl = config.BASE_URL; }
    return __awaiter(this, void 0, void 0, function () {
        var subscribers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios__default['default'].post(baseApiUrl + "/channels/get_subscribers", {
                        channel: channelAddress,
                        op: "read",
                    })];
                case 1:
                    subscribers = (_a.sent()).data.subscribers;
                    return [2 /*return*/, subscribers];
            }
        });
    });
}
function isUserSubscribed(userAddress, channelAddress, baseApiUrl) {
    if (baseApiUrl === void 0) { baseApiUrl = config.BASE_URL; }
    return __awaiter(this, void 0, void 0, function () {
        var channelSubscribers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getSubscribers(channelAddress, baseApiUrl)];
                case 1:
                    channelSubscribers = (_a.sent());
                    return [2 /*return*/, channelSubscribers.map(function (a) { return a.toLowerCase(); }).includes(userAddress.toLowerCase())];
            }
        });
    });
}
/**
 * A function used to opt a user into a channel
 * @param signer A signer instance which is capable of signing transactions
 * @param channelAddress The address of the channel which we wish to subscribe to
 * @param userAddress The address of the user opting into the channel
 * @param chainId The chain on which we wish to subscribe on
 * @param verifyingContractAddress (optional) The address of the communicator contract to be used, defaults to EPNS_COMM_CONTRACT
 */
function optIn(signer, channelAddress, chainId, userAddress, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.baseApiUrl, baseApiUrl = _c === void 0 ? config.BASE_URL : _c, _d = _b.verifyingContractAddress, verifyingContractAddress = _d === void 0 ? config.EPNS_COMMUNICATOR_CONTRACT : _d, _e = _b.onSuccess, onSuccess = _e === void 0 ? function () { return "success"; } : _e;
    return __awaiter(this, void 0, void 0, function () {
        var domainInformation, typeInformation, messageInformation, signature, err_1;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _f.trys.push([0, 3, , 4]);
                    domainInformation = getDomainInformation(chainId, verifyingContractAddress);
                    typeInformation = signingConstants.ACTION_TYPES["subscribe"];
                    messageInformation = getSubscriptionMessage(channelAddress, userAddress, "Subscribe");
                    return [4 /*yield*/, signer._signTypedData(domainInformation, typeInformation, messageInformation)];
                case 1:
                    signature = _f.sent();
                    // make request to backend to validate
                    return [4 /*yield*/, axios__default['default'].post(baseApiUrl + "/channels/subscribe_offchain", {
                            signature: signature,
                            message: messageInformation,
                            op: "write",
                            chainId: chainId,
                            contractAddress: verifyingContractAddress,
                        })];
                case 2:
                    // make request to backend to validate
                    _f.sent();
                    onSuccess(); // run the onsucess function
                    return [2 /*return*/, { status: "success", message: "sucesfully opted into channel" }];
                case 3:
                    err_1 = _f.sent();
                    return [2 /*return*/, { status: "error", message: err_1.message }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * A function used to opt a user into a channel
 * @param signer A signer instance which is capable of signing transactions
 * @param channelAddress The address of the channel which we wish to subscribe to
 * @param userAddress The address of the user opting into the channel
 * @param chainId The chain on which we wish to subscribe on
 * @param verifyingContractAddress (optional) The address of the communicator contract to be used, defaults to EPNS_COMM_CONTRACT
 */
function optOut(signer, channelAddress, chainId, userAddress, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.baseApiUrl, baseApiUrl = _c === void 0 ? config.BASE_URL : _c, _d = _b.verifyingContractAddress, verifyingContractAddress = _d === void 0 ? config.EPNS_COMMUNICATOR_CONTRACT : _d, _e = _b.onSuccess, onSuccess = _e === void 0 ? function () { return "success"; } : _e;
    return __awaiter(this, void 0, void 0, function () {
        var domainInformation, typeInformation, messageInformation, signature, err_2;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _f.trys.push([0, 3, , 4]);
                    domainInformation = getDomainInformation(chainId, verifyingContractAddress);
                    typeInformation = signingConstants.ACTION_TYPES["unsubscribe"];
                    console.log({
                        typeInformation: typeInformation
                    });
                    messageInformation = getSubscriptionMessage(channelAddress, userAddress, "Unsubscribe");
                    console.log({
                        messageInformation: messageInformation
                    });
                    return [4 /*yield*/, signer._signTypedData(domainInformation, typeInformation, messageInformation)];
                case 1:
                    signature = _f.sent();
                    console.log({
                        signature: signature
                    });
                    // make request to backend to validate
                    return [4 /*yield*/, axios__default['default'].post(baseApiUrl + "/channels/unsubscribe_offchain", {
                            signature: signature,
                            message: messageInformation,
                            op: "write",
                            chainId: chainId,
                            contractAddress: verifyingContractAddress,
                        })];
                case 2:
                    // make request to backend to validate
                    _f.sent();
                    onSuccess(); // run the onsucess function
                    return [2 /*return*/, { status: "success", message: "sucesfully opted into channel" }];
                case 3:
                    err_2 = _f.sent();
                    return [2 /*return*/, { status: "error", message: err_2.message }];
                case 4: return [2 /*return*/];
            }
        });
    });
}
var channels = {
    getChannelByAddress: getChannelByAddress,
    optIn: optIn,
    optOut: optOut,
    getSubscribers: getSubscribers,
    isUserSubscribed: isUserSubscribed
};

exports.NotificationItem = ViewNotificationItem;
exports.api = api;
exports.channels = channels;
exports.utils = index;
//# sourceMappingURL=native.js.map
