import { CustomParseShape } from '../customParser.types';
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
declare class TextExtraction {
    /**
     * @param {String} text - Text to be parsed
     * @param {CustomParseShape[]} patterns - Patterns to be used when parsed,
     *                                 any extra attributes, will be returned from parse()
     */
    text: string;
    patterns: CustomParseShape[];
    constructor(text: string, patterns: CustomParseShape[]);
    /**
     * Returns parts of the text with their own props
     * @public
     * @return {Object[]} - props for all the parts of the text
     */
    parse(): any;
    /**
     * @protected
     * @param {ParseShape} matchedPattern - pattern configuration of the pattern used to match the text
     * @param {String} text - Text matching the pattern
     * @param {String[]} matches - Result of the RegExp.exec
     * @param {Integer} index - Index of the matched string in the whole string
     * @return {Object} props for the matched text
     */
    getMatchedPart(matchedPattern: CustomParseShape, text: string, matches: [string], index: number): {
        children: string;
        _matched: boolean;
    };
}
export default TextExtraction;
