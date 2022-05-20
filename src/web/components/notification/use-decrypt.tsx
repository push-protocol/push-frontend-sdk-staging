import * as React from "react";

function useDecrypt(isSecret: boolean, initialValues : {
    notificationTitle?: string,
    parsedBody: string,
    cta?: string,
    image?: string
  }) {
    const [notifTitle, setNotifTitle] = React.useState(initialValues.notificationTitle);
    const [notifBody, setNotifBody] = React.useState(initialValues.parsedBody);
    const [notifCta, setNotifCta] = React.useState(initialValues.cta);
    const [notifImage, setNotifImage] = React.useState(initialValues.image);
    const [isSecretReveled, setIsSecretRevealed] = React.useState(false);

    const hideSecretAttributes = isSecret ? (
      isSecretReveled ? false : true
    ) : false;


    const setDecryptedValues = ({
        title,
        body,
        cta,
        image
    }: {
        title?: string,
        body: string,
        cta?: string,
        image?: string
    }) => {
        setNotifTitle(title);
        setNotifBody(body);
        setNotifCta(cta);
        setNotifImage(image);
    };
  
    return {
      notifTitle,
      notifBody,
      notifCta: hideSecretAttributes ? '' : notifCta,
      notifImage: hideSecretAttributes ? '' : notifImage,
      setDecryptedValues,
      isSecretReveled, setIsSecretRevealed
    };
  }

  export default useDecrypt;