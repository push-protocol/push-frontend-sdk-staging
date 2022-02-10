Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PropTypes = require('prop-types');
var styled = require('styled-components');
var moment = require('moment');
var axios = require('axios');
var HTMLReactParser = require('html-react-parser');

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

var React__namespace = /*#__PURE__*/_interopNamespace(React);
var PropTypes__namespace = /*#__PURE__*/_interopNamespace(PropTypes);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);
var moment__namespace = /*#__PURE__*/_interopNamespace(moment);
var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
var HTMLReactParser__default = /*#__PURE__*/_interopDefaultLegacy(HTMLReactParser);

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

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
        originalBody: notificationBody
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
        var _a = apiNotification.payload, _b = _a.data, _c = _b.acta, cta = _c === void 0 ? "" : _c, _d = _b.amsg, bigMessage = _d === void 0 ? "" : _d, _e = _b.asub, asub = _e === void 0 ? "" : _e, _f = _b.icon, icon = _f === void 0 ? "" : _f, _g = _b.url, url = _g === void 0 ? "" : _g, _h = _b.sid, sid = _h === void 0 ? "" : _h, _j = _b.app, app = _j === void 0 ? "" : _j, _k = _b.aimg, aimg = _k === void 0 ? "" : _k, _l = _a.notification, _m = _l.body, body = _m === void 0 ? "" : _m, _o = _l.title, title = _o === void 0 ? "" : _o;
        return {
            cta: cta,
            title: asub || title,
            message: bigMessage || body,
            icon: icon,
            url: url,
            sid: sid,
            app: app,
            image: aimg
        };
    });
}
var index = {
    extractTimeStamp: extractTimeStamp,
    parseApiResponse: parseApiResponse
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
        if (type === "http") {
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
    return (React__namespace.createElement("img", { style: { width: "100%" }, src: imageInBase64, alt: "" }));
};

var ImageOverlayItem = function (_a) {
    var imageOverlay = _a.imageOverlay, setImageOverlay = _a.setImageOverlay;
    var onCloseOverlay = function () {
        setImageOverlay('');
    };
    return (React__namespace.createElement(ImageWrapper, { onClick: onCloseOverlay, visible: Boolean(imageOverlay) },
        React__namespace.createElement("img", { src: imageOverlay, alt: "overlay full-screen" })));
};
var ImageWrapper = styled__default['default'].div(templateObject_1$2 || (templateObject_1$2 = __makeTemplateObject(["\n    height: 100vh;\n    width: 100vw;\n    background: rgba(0,0,0,0.75);\n    position: fixed;\n    top: 0;\n    left: 0;\n    justify-content: center;\n    align-items: center;\n    display: ", ";\n    z-index: 2;\n\n    img{\n        width: 80vw;\n        height: auto;\n        border-radius: 10px;\n    }\n"], ["\n    height: 100vh;\n    width: 100vw;\n    background: rgba(0,0,0,0.75);\n    position: fixed;\n    top: 0;\n    left: 0;\n    justify-content: center;\n    align-items: center;\n    display: ", ";\n    z-index: 2;\n\n    img{\n        width: 80vw;\n        height: auto;\n        border-radius: 10px;\n    }\n"])), function (props) { return props.visible ? 'flex' : 'none'; });
var templateObject_1$2;

/**
 * If you want to provide a custom regexp, this is the configuration to use.
 * -- For historical reasons, all regexps are processed as if they have the global flag set.
 * -- Use the nonExhaustiveModeMaxMatchCount property to match a limited number of matches.
 * Note: any additional keys/props are permitted, and will be returned as-is!
 * @typedef {Object} CustomParseShape
 * @property {RegExp} pattern
 * @property {number} [nonExhaustiveModeMaxMatchCount] Enables "non-exhaustive mode", where you can limit how many matches are found. -- Must be a positive integer or Infinity matches are permitted
 * @property {Function} [renderText] arbitrary function to rewrite the matched string into something else
 */
/**
 * Class to encapsulate the business logic of converting text into matches & props
 */
var TextExtraction = /** @class */ (function () {
    function TextExtraction(text, patterns) {
        this.text = text;
        this.patterns = patterns || [];
    }
    /**
     * Returns parts of the text with their own props
     * @public
     * @return {Object[]} - props for all the parts of the text
     */
    TextExtraction.prototype.parse = function () {
        var _this = this;
        var parsedTexts = [{ children: this.text }];
        this.patterns.forEach(function (pattern) {
            var newParts = [];
            var tmp = pattern.nonExhaustiveModeMaxMatchCount || 0;
            var numberOfMatchesPermitted = Math.min(Math.max(Number.isInteger(tmp) ? tmp : 0, 0) ||
                Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
            var currentMatches = 0;
            parsedTexts.forEach(function (parsedText) {
                // Only allow for now one parsing
                if (parsedText._matched) {
                    newParts.push(parsedText);
                    return;
                }
                var parts = [];
                var textLeft = parsedText.children;
                var indexOfMatchedString = 0;
                /** @type {RegExpExecArray} */
                var matches;
                // Global RegExps are stateful, this makes it start at 0 if reused
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec
                pattern.pattern.lastIndex = 0;
                while (textLeft && (matches = pattern.pattern.exec(textLeft))) {
                    var previousText = textLeft.substr(0, matches.index);
                    indexOfMatchedString = matches.index;
                    if (++currentMatches > numberOfMatchesPermitted) {
                        // Abort if we've exhausted our number of matches
                        break;
                    }
                    parts.push({ children: previousText });
                    parts.push(_this.getMatchedPart(pattern, matches[0], matches, indexOfMatchedString));
                    textLeft = textLeft.substr(matches.index + matches[0].length);
                    indexOfMatchedString += matches[0].length - 1;
                    // Global RegExps are stateful, this makes it operate on the "remainder" of the string
                    pattern.pattern.lastIndex = 0;
                }
                parts.push({ children: textLeft });
                newParts = newParts.concat(parts);
            });
            parsedTexts = newParts;
        });
        // Remove _matched key.
        parsedTexts.forEach(function (parsedText) { return delete parsedText._matched; });
        return parsedTexts.filter(function (t) { return !!t.children; });
    };
    // private
    /**
     * @protected
     * @param {ParseShape} matchedPattern - pattern configuration of the pattern used to match the text
     * @param {String} text - Text matching the pattern
     * @param {String[]} matches - Result of the RegExp.exec
     * @param {Integer} index - Index of the matched string in the whole string
     * @return {Object} props for the matched text
     */
    TextExtraction.prototype.getMatchedPart = function (matchedPattern, text, matches, index) {
        var props = {};
        Object.keys(matchedPattern).forEach(function (key) {
            if (key === 'pattern' ||
                key === 'renderText' ||
                key === 'nonExhaustiveModeMaxMatchCount') {
                return;
            }
            if (typeof matchedPattern[key] === 'function') {
                // Support onPress / onLongPress functions
                props[key] = function () { return matchedPattern[key](text, index); };
            }
            else {
                // Set a prop with an arbitrary name to the value in the match-config
                props[key] = matchedPattern[key];
            }
        });
        var children = text;
        if (matchedPattern.renderText &&
            typeof matchedPattern.renderText === 'function') {
            children = matchedPattern.renderText(text, matches);
        }
        return __assign(__assign({}, props), { children: children, _matched: true });
    };
    return TextExtraction;
}());

function renderStyles(matchingString) {
    // matches => ["[@michel:5455345]", "@michel", "5455345"]
    var pattern = /\[([^:]+):([^\]]+)\]/i;
    var match = matchingString.match(pattern);
    return "" + (match ? match[2] : "");
}
// -------- Define the required colors
var COLORS = {
    PRIMARY: 'rgba(27.0, 150.0, 227.0, 1.0)',
    LINKS: 'rgba(20.0, 126.0, 251.0, 1.0)',
    GRADIENT_PRIMARY: 'rgba(226.0, 8.0, 128.0, 1.0)',
    GRADIENT_SECONDARY: 'rgba(53.0, 197.0, 243.0, 1.0)',
    GRADIENT_THIRD: 'rgba(103.0, 76.0, 159.0, 1.0)',
    TRANSPARENT: 'transparent',
    WHITE: 'rgba(255.0, 255.0, 255.0, 1.0)',
    DARK_WHITE: 'rgba(255.0, 255.0, 255.0, 0.75)',
    MID_WHITE: 'rgba(255.0, 255.0, 255.0, 0.5)',
    LIGHT_WHITE: 'rgba(255.0, 255.0, 255.0, 0.25)',
    SLIGHTER_GRAY: 'rgba(250.0, 250.0, 250.0, 1)',
    SLIGHT_GRAY: 'rgba(231.0, 231.0, 231.0, 1)',
    LIGHT_GRAY: 'rgba(225.0, 225.0, 225.0, 1)',
    MID_GRAY: 'rgba(200.0, 200.0, 200.0, 1)',
    DARK_GRAY: 'rgba(160.0, 160.0, 160.0, 1)',
    DARKER_GRAY: 'rgba(100.0, 100.0, 100.0, 1)',
    LIGHT_BLACK_TRANS: 'rgba(0.0, 0.0, 0.0, 0.1)',
    SEMI_MID_BLACK_TRANS: 'rgba(0.0, 0.0, 0.0, 0.25)',
    MID_BLACK_TRANS: 'rgba(0.0, 0.0, 0.0, 0.5)',
    DARK_BLACK_TRANS: 'rgba(0.0, 0.0, 0.0, 0.75)',
    BLACK: 'rgba(0.0, 0.0, 0.0, 1.0)',
    CONFIRM: 'rgba(34.0, 139.0, 34.0, 1.0)',
    WARNING: 'rgba(255.0, 153.0, 0.0, 1.0)',
    SUBLIME_RED: 'rgba(237.0, 59.0, 72.0, 1.0)',
    BADGE_RED: 'rgba(208.0, 44.0, 30.0, 1.0)',
    LIGHT_MAROON: 'rgba(159.0, 0.0, 0.0, 1.0)',
    LIGHTER_MAROON: 'rgba(129.0, 0.0, 0.0, 1.0)',
};
// -------- Define the default styles for the framework
var styles = {
    // Styling
    container: {},
    name: {
        color: COLORS.SUBLIME_RED
    },
    username: {
        color: COLORS.GRADIENT_SECONDARY
    },
    text: {
        color: COLORS.BLACK
    },
    primary: {
        color: COLORS.GRADIENT_PRIMARY,
    },
    secondary: {
        color: COLORS.GRADIENT_SECONDARY,
    },
    third: {
        color: COLORS.GRADIENT_THIRD,
    },
    error: {
        color: COLORS.SUBLIME_RED,
    },
    white: {
        color: COLORS.WHITE,
    },
    midgray: {
        color: COLORS.MID_GRAY,
    },
    darkgray: {
        color: COLORS.DARK_GRAY,
    },
    darkergray: {
        color: COLORS.DARKER_GRAY,
    },
    link: {
        color: COLORS.GRADIENT_PRIMARY,
    },
    underline: {
        textDecorationLine: 'underline',
    },
    bold: {
        fontWeight: 'bold'
    },
    italics: {
        fontStyle: 'italic'
    },
    pointer: {
        cursor: 'pointer'
    }
};
// -------- Define the default patterns for the framework
var DEFAULT_PATTERNS = [
    {
        pattern: /\[(u):([^\]]+)\]/i,
        style: __assign(__assign(__assign(__assign(__assign({}, styles.primary), styles.bold), styles.italics), styles.underline), styles.pointer),
        renderText: renderStyles
    },
    {
        pattern: /\[(ub):([^\]]+)\]/i,
        style: __assign(__assign(__assign(__assign(__assign({}, styles.secondary), styles.bold), styles.italics), styles.underline), styles.pointer),
        renderText: renderStyles
    },
    {
        pattern: /\[(ut):([^\]]+)\]/i,
        style: __assign(__assign(__assign(__assign(__assign({}, styles.third), styles.bold), styles.italics), styles.underline), styles.pointer),
        renderText: renderStyles
    },
    {
        pattern: /\[(up):([^\]]+)\]/i,
        style: __assign(__assign(__assign(__assign({}, styles.primary), styles.italics), styles.underline), styles.pointer),
        renderText: renderStyles
    },
    {
        pattern: /\[(d):([^\]]+)\]/i,
        style: __assign(__assign({}, styles.primary), styles.bold),
        renderText: renderStyles
    },
    {
        pattern: /\[(s):([^\]]+)\]/i,
        style: __assign(__assign({}, styles.secondary), styles.bold),
        renderText: renderStyles
    },
    {
        pattern: /\[(t):([^\]]+)\]/i,
        style: __assign(__assign({}, styles.third), styles.bold),
        renderText: renderStyles
    },
    {
        pattern: /\[(e):([^\]]+)\]/i,
        style: __assign(__assign({}, styles.error), styles.bold),
        renderText: renderStyles
    },
    {
        pattern: /\[(b):([^\]]+)\]/i,
        style: styles.bold,
        renderText: renderStyles
    },
    {
        pattern: /\[(i):([^\]]+)\]/i,
        style: styles.italics,
        renderText: renderStyles
    },
    {
        pattern: /\[(bi):([^\]]+)\]/i,
        style: __assign(__assign({}, styles.bold), styles.italics),
        renderText: renderStyles
    },
    {
        pattern: /\[(w):([^\]]+)\]/i,
        style: styles.white,
        renderText: renderStyles
    },
    {
        pattern: /\[(wb):([^\]]+)\]/i,
        style: __assign(__assign({}, styles.white), styles.bold),
        renderText: renderStyles
    },
    {
        pattern: /\[(mg):([^\]]+)\]/i,
        style: styles.midgray,
        renderText: renderStyles
    },
    {
        pattern: /\[(dg):([^\]]+)\]/i,
        style: styles.darkgray,
        renderText: renderStyles
    },
    {
        pattern: /\[(ddg):([^\]]+)\]/i,
        style: styles.darkergray,
        renderText: renderStyles
    }
];

var ParseMarkDown = function (props) {
    var _a = __assign({}, props), patterns = _a.patterns, remainder = __rest(_a, ["patterns"]);
    function getPatterns() {
        return DEFAULT_PATTERNS.concat(patterns);
    }
    function getParsedText() {
        if (!props.patterns) {
            return props.children;
        }
        if (typeof props.children !== 'string') {
            return props.children;
        }
        var textExtraction = new TextExtraction(props.children, getPatterns());
        return textExtraction.parse().map(function (props, index) {
            var style = props.style, children = props.children;
            return (React__namespace.createElement("span", __assign({ key: "parsedText-" + index, style: __assign({}, style) }, props.childrenProps), HTMLReactParser__default['default'](FormatBody(children))));
        });
    }
    return (React__namespace.createElement("div", __assign({}, remainder), getParsedText()));
};
// ================= Define default props
ParseMarkDown.propTypes = {
    patterns: PropTypes__namespace.array.isRequired,
};

var ParseMarkdownText = function (props) {
    var text = props.text, patterns = props.patterns;
    var actualPatters = patterns || [];
    return (React__namespace.createElement("div", null,
        React__namespace.createElement(ParseMarkDown, { patterns: actualPatters }, text)));
};

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

var StyledCircularLoader2 = styled__default['default'].div(templateObject_1$1 || (templateObject_1$1 = __makeTemplateObject(["\n    width: 20px;\n    height: 20px;\n    .lds-ring {\n        display: inline-block;\n        position: relative;\n        width: 20px;\n        height: 20px;\n    }\n    .lds-ring div {\n        box-sizing: border-box;\n        display: block;\n        position: absolute;\n        width: 20px;\n        height: 20px;\n        margin: 0px;\n        border: 2px solid ", ";\n        border-radius: 50%;\n        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n        border-color: ", " transparent transparent transparent;\n    }\n    .lds-ring div:nth-child(1) {\n        animation-delay: -0.45s;\n    }\n    .lds-ring div:nth-child(2) {\n        animation-delay: -0.3s;\n    }\n    .lds-ring div:nth-child(3) {\n        animation-delay: -0.15s;\n    }\n    @keyframes lds-ring {\n        0% {\n            transform: rotate(0deg);\n        }\n        100% {\n            transform: rotate(360deg);\n        }\n    }\n"], ["\n    width: 20px;\n    height: 20px;\n    .lds-ring {\n        display: inline-block;\n        position: relative;\n        width: 20px;\n        height: 20px;\n    }\n    .lds-ring div {\n        box-sizing: border-box;\n        display: block;\n        position: absolute;\n        width: 20px;\n        height: 20px;\n        margin: 0px;\n        border: 2px solid ", ";\n        border-radius: 50%;\n        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;\n        border-color: ", " transparent transparent transparent;\n    }\n    .lds-ring div:nth-child(1) {\n        animation-delay: -0.45s;\n    }\n    .lds-ring div:nth-child(2) {\n        animation-delay: -0.3s;\n    }\n    .lds-ring div:nth-child(3) {\n        animation-delay: -0.15s;\n    }\n    @keyframes lds-ring {\n        0% {\n            transform: rotate(0deg);\n        }\n        100% {\n            transform: rotate(360deg);\n        }\n    }\n"])), function (_a) {
    var color = _a.color;
    return color;
}, function (_a) {
    var color = _a.color;
    return color;
});
var CircularProgressSpinner = function (_a) {
    var _b = _a.color, color = _b === void 0 ? "#fff" : _b;
    return (React__namespace.createElement(StyledCircularLoader2, { color: color },
        React__namespace.createElement("div", { className: "lds-ring" },
            React__namespace.createElement("div", null),
            React__namespace.createElement("div", null),
            React__namespace.createElement("div", null),
            React__namespace.createElement("div", null))));
};
var Loader = React__namespace.memo(CircularProgressSpinner);
var templateObject_1$1;

// ================= Define base component
var ViewNotificationItem = function (_a) {
    var notificationTitle = _a.notificationTitle, notificationBody = _a.notificationBody, cta = _a.cta, app = _a.app, icon = _a.icon, image = _a.image, url = _a.url, isSpam = _a.isSpam, //for rendering the spam conterpart of the notification component
    isSubscribedFn = _a.isSubscribedFn, //A function for getting if a user is subscribed to the channel in question
    subscribeFn = _a.subscribeFn;
    var _b = extractTimeStamp(notificationBody || ""), parsedBody = _b.notificationBody, timeStamp = _b.timeStamp;
    var gotToCTA = function (e) {
        e.stopPropagation();
        if (!MediaHelper.validURL(cta))
            return;
        window.open(cta, "_blank");
    };
    var goToURL = function (e) {
        e.stopPropagation();
        window.open(url, "_blank");
    };
    // store the image to be displayed in this state variable
    var _c = React__namespace.useState(""), imageOverlay = _c[0], setImageOverlay = _c[1];
    var _d = React__namespace.useState(false), subscribeLoading = _d[0], setSubscribeLoading = _d[1];
    var _e = React__namespace.useState(true), isSubscribed = _e[0], setIsSubscribed = _e[1]; //use this to confirm if this is s
    /**
     * A function which wraps around the function to subscribe a user to a channel
     * @returns
     */
    var onSubscribe = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!subscribeFn)
                        return [2 /*return*/];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 3, 4]);
                    setSubscribeLoading(true);
                    return [4 /*yield*/, subscribeFn()];
                case 2:
                    _a.sent();
                    setIsSubscribed(true);
                    return [3 /*break*/, 4];
                case 3:
                    setSubscribeLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    React__namespace.useEffect(function () {
        if (!isSpam || !isSubscribedFn)
            return;
        isSubscribedFn().then(function (res) {
            setIsSubscribed(Boolean(res));
        });
    }, [isSubscribedFn, isSpam]);
    if (isSubscribed && isSpam)
        return React__namespace.createElement(React__namespace.Fragment, null);
    // render
    return (React__namespace.createElement(Container, { timestamp: timeStamp, cta: MediaHelper.validURL(cta), onClick: gotToCTA },
        React__namespace.createElement(MobileHeader, { onClick: goToURL },
            React__namespace.createElement(HeaderButton, null,
                React__namespace.createElement(ImageContainer, null,
                    React__namespace.createElement(IPFSIcon, { icon: icon })),
                app)),
        React__namespace.createElement(ContentSection, null,
            image &&
                // if its an image then render this
                (!MediaHelper.isMediaSupportedVideo(image) ? (React__namespace.createElement(MobileImage, { style: { cursor: "pointer" }, onClick: function () { return setImageOverlay(image || ""); } },
                    React__namespace.createElement("img", { src: image, alt: "" }))) : // if its a youtube url, RENDER THIS
                    MediaHelper.isMediaYoutube(image) ? (React__namespace.createElement(MobileImage, null,
                        React__namespace.createElement("iframe", { id: "ytplayer", width: "640", allow: "fullscreen;", height: "360", src: MediaHelper.isMediaExternalEmbed(image) }))) : (
                    // if its aN MP4 url, RENDER THIS
                    React__namespace.createElement(MobileImage, null,
                        React__namespace.createElement("video", { width: "360", height: "100%", controls: true },
                            React__namespace.createElement("source", { src: image, type: "video/mp4" }),
                            "Your browser does not support the video tag.")))),
            React__namespace.createElement(ChannelDetailsWrapper, null,
                React__namespace.createElement(ChannelTitle, null,
                    React__namespace.createElement(ChannelTitleLink, null, notificationTitle)),
                React__namespace.createElement(ChannelDesc, null,
                    React__namespace.createElement(ChannelDescLabel, null,
                        React__namespace.createElement(ParseMarkdownText, { text: parsedBody })))),
            isSpam && (React__namespace.createElement(SpamButton, { onClick: onSubscribe }, subscribeLoading ? React__namespace.createElement(Loader, null) : "opt-in"))),
        React__namespace.createElement(ChannelMeta, { hidden: !timeStamp },
            React__namespace.createElement(React__namespace.Fragment, null,
                React__namespace.createElement(Pool, null,
                    React__namespace.createElement(PoolShare, null, timeStamp
                        ? moment__namespace
                            .utc(parseInt(timeStamp) * 1000)
                            .local()
                            .format("DD MMM YYYY | hh:mm A")
                        : "N/A")))),
        React__namespace.createElement(ImageOverlayItem, { imageOverlay: imageOverlay, setImageOverlay: setImageOverlay })));
};
// ================= Define default props
ViewNotificationItem.propTypes = {
    notificationBody: PropTypes__namespace.string,
    notificationTitle: PropTypes__namespace.string,
    cta: PropTypes__namespace.string,
    image: PropTypes__namespace.string,
    app: PropTypes__namespace.string,
    url: PropTypes__namespace.string,
    isSpam: PropTypes__namespace.bool,
    subscribeFn: PropTypes__namespace.func,
    isSubscribedFn: PropTypes__namespace.func
};
ViewNotificationItem.defaultProps = {
    notificationTitle: "",
    notificationBody: "",
    cta: "",
    app: "",
    image: "",
    url: "",
    isSpam: false,
    subscribeFn: null,
    isSubscribedFn: null
};
// ================= Define styled components
var MD_BREAKPOINT = "50050px"; //set an arbitrarily large number because we no longer use this breakpoint
var SM_BREAKPOINT = "900px";
var ContentSection = styled__default['default'].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: block;\n  @media (min-width: ", ") {\n    margin-top: 5px;\n    align-items: center;\n    display: flex;\n    flex-direction: row;\n    gap: 20px;\n  }\n"], ["\n  display: block;\n  @media (min-width: ", ") {\n    margin-top: 5px;\n    align-items: center;\n    display: flex;\n    flex-direction: row;\n    gap: 20px;\n  }\n"])), SM_BREAKPOINT);
var MobileImage = styled__default['default'].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  @media (min-width: ", ") {\n    width: 220px;\n    height: 200px;\n    img,\n    iframe,\n    video {\n      width: 100% !important;\n      height: 100% !important;\n      width: 100%;\n      object-fit: cover;\n      border-radius: 10px;\n      border: 0;\n    }\n  }\n  @media (max-width: ", ") {\n    display: block;\n    img,\n    iframe,\n    video {\n      border: 0;\n      width: calc(100% + 42px) !important;\n      margin-left: -20px;\n      // margin-right: -40px;\n      margin-top: -12px;\n      margin-bottom: 5px;\n    }\n  }\n"], ["\n  @media (min-width: ", ") {\n    width: 220px;\n    height: 200px;\n    img,\n    iframe,\n    video {\n      width: 100% !important;\n      height: 100% !important;\n      width: 100%;\n      object-fit: cover;\n      border-radius: 10px;\n      border: 0;\n    }\n  }\n  @media (max-width: ", ") {\n    display: block;\n    img,\n    iframe,\n    video {\n      border: 0;\n      width: calc(100% + 42px) !important;\n      margin-left: -20px;\n      // margin-right: -40px;\n      margin-top: -12px;\n      margin-bottom: 5px;\n    }\n  }\n"])), SM_BREAKPOINT, SM_BREAKPOINT);
var ImageContainer = styled__default['default'].span(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  background: rgba(231, 231, 231, 1);\n  height: 24px;\n  width: 24px;\n  display: inline-block;\n  margin-right: 10px;\n  border-radius: 5px;\n"], ["\n  background: rgba(231, 231, 231, 1);\n  height: 24px;\n  width: 24px;\n  display: inline-block;\n  margin-right: 10px;\n  border-radius: 5px;\n"])));
var ChannelDetailsWrapper = styled__default['default'].div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  //   align-self: center;\n"], ["\n  //   align-self: center;\n"])));
var Container = styled__default['default'].div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  position: relative;\n  overflow: hidden;\n  font-family: \"Source Sans Pro\", Arial, sans-serif;\n  flex: 1;\n  display: flex;\n  flex-wrap: wrap;\n  border: ", ";\n  cursor: ", ";\n\n  background: #fff;\n  border-radius: 10px;\n\n  margin: 15px 0px;\n  justify-content: center;\n  padding: 20px;\n\n  justify-content: space-between;\n\n  @media (max-width: ", ") {\n    flex-direction: column;\n    padding-top: 48px;\n    padding-bottom: ", ";\n  }\n"], ["\n  position: relative;\n  overflow: hidden;\n  font-family: \"Source Sans Pro\", Arial, sans-serif;\n  flex: 1;\n  display: flex;\n  flex-wrap: wrap;\n  border: ", ";\n  cursor: ", ";\n\n  background: #fff;\n  border-radius: 10px;\n\n  margin: 15px 0px;\n  justify-content: center;\n  padding: 20px;\n\n  justify-content: space-between;\n\n  @media (max-width: ", ") {\n    flex-direction: column;\n    padding-top: 48px;\n    padding-bottom: ", ";\n  }\n"])), function (props) {
    return props.cta
        ? "0.5px solid #35C5F3"
        : "1px solid rgba(231.0, 231.0, 231.0, 1);";
}, function (props) { return (props.cta ? "pointer" : ""); }, MD_BREAKPOINT, function (props) { return (props.timestamp ? "40px" : "22px"); });
var MobileHeader = styled__default['default'].div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  display: none;\n  @media (max-width: ", ") {\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    padding: 6px 20px;\n    font-size: 14px;\n    border-bottom: 1px solid rgba(231, 231, 231, 1);\n    color: grey;\n    background: rgba(250, 250, 250, 1);\n    border-top-left-radius: 10px;\n    border-top-right-radius: 10px;\n    text-align: left;\n  }\n"], ["\n  display: none;\n  @media (max-width: ", ") {\n    cursor: pointer;\n    display: flex;\n    align-items: center;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    padding: 6px 20px;\n    font-size: 14px;\n    border-bottom: 1px solid rgba(231, 231, 231, 1);\n    color: grey;\n    background: rgba(250, 250, 250, 1);\n    border-top-left-radius: 10px;\n    border-top-right-radius: 10px;\n    text-align: left;\n  }\n"])), MD_BREAKPOINT);
var HeaderButton = styled__default['default'].div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n"], ["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n"])));
var ChannelTitle = styled__default['default'].div(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  text-align: left;\n  margin-bottom: 10px;\n"], ["\n  text-align: left;\n  margin-bottom: 10px;\n"])));
var ChannelTitleLink = styled__default['default'].a(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  text-decoration: none;\n  color: #e20880;\n  font-size: 18px;\n  font-weight: 600;\n\n  @media (max-width: ", ") {\n    font-weight: 300;\n    color: rgba(0, 0, 0, 0.5);\n  }\n"], ["\n  text-decoration: none;\n  color: #e20880;\n  font-size: 18px;\n  font-weight: 600;\n\n  @media (max-width: ", ") {\n    font-weight: 300;\n    color: rgba(0, 0, 0, 0.5);\n  }\n"])), MD_BREAKPOINT);
var ChannelDesc = styled__default['default'].div(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  line-height: 20px;\n  flex: 1;\n  display: flex;\n  font-size: 14px;\n  color: rgba(0, 0, 0, 0.75);\n  font-weight: 400;\n  flex-direction: column;\n"], ["\n  line-height: 20px;\n  flex: 1;\n  display: flex;\n  font-size: 14px;\n  color: rgba(0, 0, 0, 0.75);\n  font-weight: 400;\n  flex-direction: column;\n"])));
var ChannelDescLabel = styled__default['default'].label(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n  flex: 1;\n  margin: 0px;\n  // font-weight: 600;\n  text-align: left;\n"], ["\n  flex: 1;\n  margin: 0px;\n  // font-weight: 600;\n  text-align: left;\n"])));
var ChannelMeta = styled__default['default'].div(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n  display: ", ";\n  flex-direction: row;\n  font-size: 13px;\n"], ["\n  display: ", ";\n  flex-direction: row;\n  font-size: 13px;\n"])), function (props) { return (props.hidden ? "none" : "flex"); });
var ChannelMetaBox = styled__default['default'].label(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n  color: #fff;\n  // font-weight: 600;\n  padding: 10px;\n  border-radius: 10px;\n  font-size: 12px;\n  align-self: flex-end;\n"], ["\n  color: #fff;\n  // font-weight: 600;\n  padding: 10px;\n  border-radius: 10px;\n  font-size: 12px;\n  align-self: flex-end;\n"])));
var Pool = styled__default['default'].div(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n  margin: 0px 10px;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n"], ["\n  margin: 0px 10px;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n"])));
var PoolShare = styled__default['default'](ChannelMetaBox)(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n  background: #674c9f;\n  @media (max-width: ", ") {\n    position: absolute;\n    bottom: 0;\n    right: 0;\n    border-radius: 0;\n    border-radius: 8px 0;\n    color: grey;\n    background: rgba(250, 250, 250, 1);\n    border-top: 1px solid rgba(231, 231, 231, 1);\n    border-left: 1px solid rgba(231, 231, 231, 1);\n    padding: 5px 10px;\n  }\n"], ["\n  background: #674c9f;\n  @media (max-width: ", ") {\n    position: absolute;\n    bottom: 0;\n    right: 0;\n    border-radius: 0;\n    border-radius: 8px 0;\n    color: grey;\n    background: rgba(250, 250, 250, 1);\n    border-top: 1px solid rgba(231, 231, 231, 1);\n    border-left: 1px solid rgba(231, 231, 231, 1);\n    padding: 5px 10px;\n  }\n"])), MD_BREAKPOINT);
var SpamButton = styled__default['default'].div(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n  background: rgb(226, 8, 128);\n  padding: 10px 20px;\n  color: white;\n  border-radius: 3px;\n  cursor: pointer;\n  transition: 300ms;\n  margin-left: auto;\n  &:hover {\n    opacity: 0.9;\n  }\n"], ["\n  background: rgb(226, 8, 128);\n  padding: 10px 20px;\n  color: white;\n  border-radius: 3px;\n  cursor: pointer;\n  transition: 300ms;\n  margin-left: auto;\n  &:hover {\n    opacity: 0.9;\n  }\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16;

var config = {
    BASE_URL: "https://backend-kovan.epns.io/apis",
    YOUTUBE_API_KEY: "AIzaSyBrzkFPyNmVDFzGY7dKz2HocUO4m-ni-Fc",
    EPNS_CORE_CONTRACT: "0x97D7c5f14B8fe94Ef2b4bA589379f5Ec992197dA",
    EPNS_COMMUNICATOR_CONTRACT: "0xb3971BCef2D791bc4027BbfedFb47319A4AAaaAa",
};

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
    return {
        channel: channelAddress,
        subscriber: userAddress,
        action: action,
    };
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
function getChannelByAddress(channelAddress, baseApiUrl) {
    if (baseApiUrl === void 0) { baseApiUrl = config.BASE_URL; }
    return __awaiter(this, void 0, void 0, function () {
        var body;
        return __generator(this, function (_a) {
            body = {
                query: channelAddress,
                op: "read",
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
/**
 * A function used to opt a user into a channel
 * @param signer A signer instance which is capable of signing transactions
 * @param channelAddress The address of the channel which we wish to subscribe to
 * @param userAddress The address of the user opting into the channel
 * @param chainId The chain on which we wish to subscribe on
 * @param verifyingContractAddress (optional) The address of the communicator contract to be used, defaults to EPNS_COMM_CONTRACT
 */
function optIn(signer, channelAddress, chainId, userAddress, baseApiUrl, verifyingContractAddress) {
    if (baseApiUrl === void 0) { baseApiUrl = config.BASE_URL; }
    if (verifyingContractAddress === void 0) { verifyingContractAddress = config.EPNS_COMMUNICATOR_CONTRACT; }
    return __awaiter(this, void 0, void 0, function () {
        var domainInformation, typeInformation, messageInformation, signature, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    domainInformation = getDomainInformation(chainId, verifyingContractAddress);
                    typeInformation = signingConstants.ACTION_TYPES["subscribe"];
                    messageInformation = getSubscriptionMessage(channelAddress, userAddress, "Subscribe");
                    return [4 /*yield*/, signer._signTypedData(domainInformation, typeInformation, messageInformation)];
                case 1:
                    signature = _a.sent();
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
                    _a.sent();
                    return [2 /*return*/, { status: "error", message: "sucesfully opted into channel" }];
                case 3:
                    err_1 = _a.sent();
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
function optOut(signer, chainId, channelAddress, userAddress, baseApiUrl, verifyingContractAddress) {
    if (baseApiUrl === void 0) { baseApiUrl = config.BASE_URL; }
    if (verifyingContractAddress === void 0) { verifyingContractAddress = config.EPNS_COMMUNICATOR_CONTRACT; }
    return __awaiter(this, void 0, void 0, function () {
        var domainInformation, typeInformation, messageInformation, signature, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    domainInformation = getDomainInformation(chainId, verifyingContractAddress);
                    typeInformation = signingConstants.ACTION_TYPES["unsubscribe"];
                    messageInformation = getSubscriptionMessage(channelAddress, userAddress, "Unsubscribe");
                    return [4 /*yield*/, signer._signTypedData(domainInformation, typeInformation, messageInformation)];
                case 1:
                    signature = _a.sent();
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
                    _a.sent();
                    return [2 /*return*/, { status: "error", message: "sucesfully opted into channel" }];
                case 3:
                    err_2 = _a.sent();
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
    getSubscribers: getSubscribers
};

exports.NotificationItem = ViewNotificationItem;
exports.ParseText = ParseMarkdownText;
exports.api = api;
exports.channels = channels;
exports.utils = index;
//# sourceMappingURL=index.js.map
