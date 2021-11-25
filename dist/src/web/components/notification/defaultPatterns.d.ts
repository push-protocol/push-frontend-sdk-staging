/**
 * This file contains the default styles for the patters to be used in the application
*/
declare function renderStyles(matchingString: string): string;
declare const DEFAULT_PATTERNS: ({
    pattern: RegExp;
    style: {
        fontWeight: string;
    };
    renderText: typeof renderStyles;
} | {
    pattern: RegExp;
    style: {
        fontStyle: string;
    };
    renderText: typeof renderStyles;
} | {
    pattern: RegExp;
    style: {
        color: string;
    };
    renderText: typeof renderStyles;
})[];
export default DEFAULT_PATTERNS;
