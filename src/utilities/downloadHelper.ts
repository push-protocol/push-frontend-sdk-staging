​​// Download Helper Function
const DownloadHelper = {

  // To get Save File Name
  getSaveFileName: function(fileURL: string, useTempLocation: string) {
    // Remove all http, https protocols first
    fileURL = fileURL.replace(/(^\w+:|^)\/\//, '');
​
    // /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi
    // Remove all special characters
    fileURL = fileURL.replace(/[`~!@#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi, '');
​
    // Remove all but 250 characters
    if (fileURL.length > 250) {
      fileURL = fileURL.substr(-250);
    }
​
    if (useTempLocation) {
      return fileURL+ '.temp';
    }
    else {
      return fileURL;
    }
  },
  // Determine if media is supported video
  isMediaSupportedVideo: function(fileURL:string | undefined) {
    if(!fileURL) return;
    // check if media external embed first
    const mediaURL = DownloadHelper.isMediaExternalEmbed(fileURL);
    if (mediaURL) {
      return mediaURL;
    }
    else {
      // check if mp4 extension
      if (fileURL.split('.').pop() === "mp4") {
        return true;
      }
    }
​
    // if all else fail
    return false;
  },
  // check if media is external embed, like youtube, soundcloud, etc
  isMediaExternalEmbed: function(fileURL: string) {
    return (DownloadHelper.isMediaYoutube(fileURL));
  },
  // Determine if youtube
  isMediaYoutube: function(fileURL : string) {
    if (fileURL != undefined || fileURL != '') {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        var match = fileURL.match(regExp);
        if (match && match[2].length == 11) {
          // embed url
          const embedURL = 'https://www.youtube.com/embed/' + match[2] + '?autoplay=1&enablejsapi=1';
          return embedURL;
        }
    }
    return "";
  },
  // Get youtube id
  getYoutubeID: function(fileURL: string) {
    if (fileURL != undefined || fileURL != '') {
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        var match = fileURL.match(regExp);
        if (match && match[2].length == 11) {
          return match[2];
        }
    }
​
    return false;
  }
}
​
export default DownloadHelper;

