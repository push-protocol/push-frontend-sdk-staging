declare const MediaHelper: {
    validURL: (str: string | undefined) => boolean;
    getSaveFileName: (fileURL: string, useTempLocation: string) => string;
    isMediaSupportedVideo: (fileURL: string | undefined) => string | boolean | undefined;
    isMediaExternalEmbed: (fileURL: string) => string;
    isMediaYoutube: (fileURL: string) => string;
    getYoutubeID: (fileURL: string) => string | false;
};
export default MediaHelper;
