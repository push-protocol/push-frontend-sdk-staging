Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PropTypes = require('prop-types');
var styled = require('styled-components');
var moment = require('moment');
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
/**
 * @description parse and extract the timestamp from the body of the notification and remove the text from the body
 * @param notificationBody the text which would represent the body of the notification
 * @returns
 */
function extractTimeStamp(notificationBody) {
    var parsedBody = {
        notificationBody: FormatBody(notificationBody),
        timeStamp: "",
    };
    var matches = notificationBody.match(/\[timestamp:(.*?)\]/);
    if (matches) {
        parsedBody.timeStamp = matches[1];
        var textWithoutTimeStamp = notificationBody.replace(/ *\[timestamp:[^)]*\] */g, "");
        parsedBody.notificationBody = FormatBody(textWithoutTimeStamp);
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
        var _a = apiNotification.payload, _b = _a.data, cta = _b.acta, bigMessage = _b.amsg, icon = _b.icon, url = _b.url, sid = _b.sid, _c = _a.notification, body = _c.body, title = _c.title;
        return {
            cta: cta,
            title: title,
            message: bigMessage || body,
            icon: icon,
            url: url,
            sid: sid
        };
    });
}
var index = {
    extractTimeStamp: extractTimeStamp,
    parseApiResponse: parseApiResponse
};

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
    }
};
// -------- Define the default patterns for the framework
var DEFAULT_PATTERNS = [
    {
        pattern: /\[(u):([^\]]+)\]/i,
        style: __assign(__assign(__assign(__assign({}, styles.primary), styles.bold), styles.italics), styles.underline),
        renderText: renderStyles
    },
    {
        pattern: /\[(ub):([^\]]+)\]/i,
        style: __assign(__assign(__assign(__assign({}, styles.secondary), styles.bold), styles.italics), styles.underline),
        renderText: renderStyles
    },
    {
        pattern: /\[(ut):([^\]]+)\]/i,
        style: __assign(__assign(__assign(__assign({}, styles.third), styles.bold), styles.italics), styles.underline),
        renderText: renderStyles
    },
    {
        pattern: /\[(up):([^\]]+)\]/i,
        style: __assign(__assign(__assign({}, styles.primary), styles.italics), styles.underline),
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

// ================= Define base component
var ViewNotificationItem = function (_a) {
    var notificationTitle = _a.notificationTitle, notificationBody = _a.notificationBody, cta = _a.cta;
    var _b = extractTimeStamp(notificationBody), parsedBody = _b.notificationBody, timeStamp = _b.timeStamp;
    var gotToCTA = function () {
        if (!cta)
            return;
        window.open(cta, "_blank");
    };
    // render
    return (React__namespace.createElement(Container, { cta: cta, onClick: gotToCTA },
        React__namespace.createElement(ChannelDetailsWrapper, null,
            React__namespace.createElement(ChannelTitle, null,
                React__namespace.createElement(ChannelTitleLink, null, notificationTitle)),
            React__namespace.createElement(ChannelDesc, null,
                React__namespace.createElement(ChannelDescLabel, null,
                    React__namespace.createElement(ParseMarkdownText, { text: parsedBody })))),
        React__namespace.createElement(ChannelMeta, null,
            React__namespace.createElement(React__namespace.Fragment, null,
                React__namespace.createElement(Pool, null,
                    React__namespace.createElement("br", null),
                    React__namespace.createElement(PoolShare, null, timeStamp ? moment__namespace
                        .utc(parseInt(timeStamp) * 1000)
                        .local()
                        .format("DD MMM YYYY | hh:mm A") : "N/A"))))));
};
// ================= Define default props
ViewNotificationItem.propTypes = {
    notificationTitle: PropTypes__namespace.string.isRequired,
    notificationBody: PropTypes__namespace.string.isRequired,
    cta: PropTypes__namespace.string
};
ViewNotificationItem.defaultProps = {
    cta: ""
};
// ================= Define styled components
var MD_BREAKPOINT = "856px";
var ChannelDetailsWrapper = styled__default['default'].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n//   align-self: center;\n"], ["\n//   align-self: center;\n"])));
var Container = styled__default['default'].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: relative;\n  font-family: \"Source Sans Pro\",Arial,sans-serif;\n  flex: 1;\n  display: flex;\n  flex-wrap: wrap;\n  border: ", ";\n  cursor: ", ";\n\n  background: #fff;\n  border-radius: 10px;\n\n  margin: 15px 0px;\n  justify-content: center;\n  padding: 20px;\n\n  justify-content: space-between;\n\n  @media (max-width: ", "){\n    flex-direction: column;\n  }\n"], ["\n  position: relative;\n  font-family: \"Source Sans Pro\",Arial,sans-serif;\n  flex: 1;\n  display: flex;\n  flex-wrap: wrap;\n  border: ", ";\n  cursor: ", ";\n\n  background: #fff;\n  border-radius: 10px;\n\n  margin: 15px 0px;\n  justify-content: center;\n  padding: 20px;\n\n  justify-content: space-between;\n\n  @media (max-width: ", "){\n    flex-direction: column;\n  }\n"])), function (props) { return props.cta ? "0.5px solid #35C5F3" : "1px solid rgb(237, 237, 237);"; }, function (props) { return props.cta ? "pointer" : ""; }, MD_BREAKPOINT);
var ChannelTitle = styled__default['default'].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  text-align: left;\n  margin-bottom: 10px\n"], ["\n  text-align: left;\n  margin-bottom: 10px\n"])));
var ChannelTitleLink = styled__default['default'].a(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  text-decoration: none;\n  font-weight: 550;\n  color: #e20880;\n  font-size: 18px;\n"], ["\n  text-decoration: none;\n  font-weight: 550;\n  color: #e20880;\n  font-size: 18px;\n"])));
var ChannelDesc = styled__default['default'].div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  line-height: 20px;\n  flex: 1;\n  display: flex;\n  font-size: 14px;\n  color: rgba(0, 0, 0, 0.75);\n  font-weight: 400;\n  flex-direction: column;\n"], ["\n  line-height: 20px;\n  flex: 1;\n  display: flex;\n  font-size: 14px;\n  color: rgba(0, 0, 0, 0.75);\n  font-weight: 400;\n  flex-direction: column;\n"])));
var ChannelDescLabel = styled__default['default'].label(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  flex: 1;\n  margin: 0px 5px;\n  font-weight: 600;\n  text-align: left;\n"], ["\n  flex: 1;\n  margin: 0px 5px;\n  font-weight: 600;\n  text-align: left;\n"])));
var ChannelMeta = styled__default['default'].div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: row;\n  font-size: 13px;\n"], ["\n  display: flex;\n  flex-direction: row;\n  font-size: 13px;\n"])));
var ChannelMetaBox = styled__default['default'].label(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  // margin: 0px 5px;\n  color: #fff;\n  font-weight: 600;\n  padding: 10px;\n  border-radius: 10px;\n  font-size: 12px;\n  align-self: flex-end;\n"], ["\n  // margin: 0px 5px;\n  color: #fff;\n  font-weight: 600;\n  padding: 10px;\n  border-radius: 10px;\n  font-size: 12px;\n  align-self: flex-end;\n"])));
var Pool = styled__default['default'].div(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  margin: 0px 10px;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n"], ["\n  margin: 0px 10px;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n"])));
var PoolShare = styled__default['default'](ChannelMetaBox)(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n  background: #674c9f;\n  @media (max-width: ", "){\n    position: absolute;\n    bottom: 0;\n    right: 0;\n    border-radius: 0;\n  }\n"], ["\n  background: #674c9f;\n  @media (max-width: ", "){\n    position: absolute;\n    bottom: 0;\n    right: 0;\n    border-radius: 0;\n  }\n"
    // Export Default
])), MD_BREAKPOINT);
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;

/**
 * @description Contains utilities used to fetch data from an API or external source
 * @version 1.0
*/
var axios = require('axios');
var DEFAULT_INITIAL_PAGE = 1;
var DEFAULT_PAGE_SIZE = 10;
var NOTIFICATIONS_URL = "https://backend-staging.epns.io/apis/feeds/get_feeds";
/**
 * Fetch paginated notifications for a user
 * @param {string} userAccount the account of the user in question
 * @param {number?} page the page we wish to fetch
 * @param {number} itemsPerPage the maximum number of items which should be present on the page
 * @returns
 */
var fetchNotifications = function (userAccount, page, itemsPerPage) {
    if (page === void 0) { page = DEFAULT_INITIAL_PAGE; }
    if (itemsPerPage === void 0) { itemsPerPage = DEFAULT_PAGE_SIZE; }
    return __awaiter(void 0, void 0, void 0, function () {
        var body;
        return __generator(this, function (_a) {
            body = {
                "user": userAccount,
                "page": page,
                "pageSize": itemsPerPage,
                "op": "read"
            };
            return [2 /*return*/, axios.post(NOTIFICATIONS_URL, body)
                    .then(function (response) { return response.data; })
                    .catch(function (err) {
                    console.log("\n        ============== There was an error [epns-sdk -> loadNotifications] ============\n        ", err.message);
                })];
        });
    });
};
var api = {
    fetchNotifications: fetchNotifications
};

exports.NotificationItem = ViewNotificationItem;
exports.ParseText = ParseMarkdownText;
exports.api = api;
exports.utils = index;
//# sourceMappingURL=index.js.map
