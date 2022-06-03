import * as React from "react";
import * as PropTypes from "prop-types";
import styled from "styled-components";
import * as moment from "moment";

import IPFSIcon from "../ipfsicon";
import ImageOverlayComponent from "../overlay";
import ParseMarkdownText from "../parsetext";
import MediaHelper from "../../../utilities/mediaHelper";
import Loader from "../loader/loader";
import { extractTimeStamp } from "../../../utilities/index";
import ChainDetails from "./chain";

import ActionButton from "./styled/ActionButton";
import { useDecrypt, DecryptButton } from "./decrypt";

// ================= Define types
type chainNameType = "ETH_TEST_KOVAN" | "POLYGON_TEST_MUMBAI" | "ETH_MAINNET" | "POLYGON_MAINNET" | "THE_GRAPH" | undefined;

export type NotificationItemProps = {
  notificationTitle: string | undefined;
  notificationBody: string | undefined;
  cta: string | undefined;
  app: string | undefined;
  icon: string | undefined;
  image: string | undefined;
  url: string | undefined;
  isSpam: boolean | undefined;
  subscribeFn: any;
  isSubscribedFn: any;
  theme: string | undefined;
  chainName: chainNameType;
  isSecret: boolean;
  decryptFn: () => Promise<{ title: string, body: string, cta: string, image: string }>
};

type ContainerDataType = {
  cta?: boolean;
  timestamp?: string;
};

type MetaDataType = {
  hidden?: Boolean;
};

// ================= Define base component
const ViewNotificationItem: React.FC<NotificationItemProps> = ({
  notificationTitle,
  notificationBody,
  cta,
  app,
  icon,
  image,
  url,
  isSpam, //for rendering the spam conterpart of the notification component
  isSubscribedFn, //A function for getting if a user is subscribed to the channel in question
  subscribeFn, //A function for subscribing to the spam channel
  theme, //for specifying light and dark theme
  chainName,
  isSecret,
  decryptFn,
}) => {
  const { notificationBody: parsedBody, timeStamp } = extractTimeStamp(
    notificationBody || ""
  );

  const {
    notifTitle, notifBody, notifCta, notifImage,
    setDecryptedValues,
    isSecretRevealed,
  } = useDecrypt(isSecret, { notificationTitle, parsedBody, cta, image });

  // store the image to be displayed in this state variable
  const [imageOverlay, setImageOverlay] = React.useState("");
  const [subscribeLoading, setSubscribeLoading] = React.useState(false);
  const [isSubscribed, setIsSubscribed] = React.useState(true); //use this to confirm if this is s

  // console.log({
  //   chainName,
  //   rightIcon,
  //   ai: ChainImages['CHAIN_ICONS']
  // })

  const gotToCTA = (e: any) => {
    e.stopPropagation();
    if (!MediaHelper.validURL(notifCta)) return;
    window.open(notifCta, "_blank");
  };

  const goToURL = (e: any) => {
    e.stopPropagation();
    window.open(url, "_blank");
  };

  /**
   * A function which wraps around the function to subscribe a user to a channel
   * @returns
   */
  const onSubscribe = async (clickEvent: React.SyntheticEvent<HTMLElement>) => {
    clickEvent.preventDefault();
    clickEvent.stopPropagation();

    if (!subscribeFn) return;
    try {
      setSubscribeLoading(true);
      await subscribeFn();
      setIsSubscribed(true);
    } finally {
      setSubscribeLoading(false);
    }
  };

  const onDecrypt = async () => {
    try {
      const decryptedPayload = await decryptFn();
      // to check if always both title, body are present
      if (decryptedPayload) {
        setDecryptedValues(decryptedPayload);
      }
    } catch (e) {
    } finally {
    }
  };

  React.useEffect(() => {
    if (!isSpam || !isSubscribedFn) return;
    isSubscribedFn().then((res: any) => {
      setIsSubscribed(Boolean(res));
    });
  }, [isSubscribedFn, isSpam]);

  if (isSubscribed && isSpam) return <></>;

  // render
  return (
    <Container
      timestamp={timeStamp}
      cta={MediaHelper.validURL(notifCta)}
      onClick={gotToCTA}
      theme={theme}
    >
      {/* header that only pops up on small devices */}
      <MobileHeader onClick={goToURL} theme={theme}>
        <HeaderButton>
          <ImageContainer theme={theme}>
            <IPFSIcon icon={icon} />
          </ImageContainer>
          {app}
        </HeaderButton>
        {chainName && ChainDetails[chainName] ? (
          <BlockchainContainer>
            <NetworkDetails>
              <DelieveredViaText>DELIVERED VIA</DelieveredViaText>
              <NetworkName>{ChainDetails[chainName].label}</NetworkName>
            </NetworkDetails>
            <HeaderImg>{ChainDetails[chainName].icon}</HeaderImg>
          </BlockchainContainer>
        ) : null}
        {/* {
         isPoly?
       
        :
        <HeaderImg src="https://backend-kovan.epns.io/assets/ethereum.org.ico" alt=""/>
       } */}
      </MobileHeader>
      {/* header that only pops up on small devices */}

      {/* content of the component */}
      <ContentSection>
        {/* section for media content */}
        {notifImage &&
          // if its an image then render this
          (!MediaHelper.isMediaSupportedVideo(notifImage) ? (
            <MobileImage
              style={{ cursor: "pointer" }}
              onClick={() => setImageOverlay(notifImage || "")}
            >
              <img src={notifImage} alt="" />
            </MobileImage>
          ) : // if its a youtube url, RENDER THIS
          MediaHelper.isMediaYoutube(notifImage) ? (
            <MobileImage>
              <iframe
                id="ytplayer"
                width="640"
                allow="fullscreen;"
                height="360"
                src={MediaHelper.isMediaExternalEmbed(notifImage)}
              ></iframe>
            </MobileImage>
          ) : (
            // if its aN MP4 url, RENDER THIS
            <MobileImage>
              <video width="360" height="100%" controls>
                <source src={notifImage} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </MobileImage>
          ))}
        {/* section for media content */}

        {/* section for text content */}
        <ChannelDetailsWrapper>
          <ChannelTitle>
            <ChannelTitleLink theme={theme}>{notifTitle}</ChannelTitleLink>
          </ChannelTitle>
          <ChannelDesc>
            <ChannelDescLabel theme={theme}>
              <ParseMarkdownText text={notifBody} />
            </ChannelDescLabel>
          </ChannelDesc>
        </ChannelDetailsWrapper>
        {/* section for text content */}

        <ButtonGroup>
          {/* include a channel opt into */}
          {isSpam && (
            <ActionButton onClick={onSubscribe}>
              {subscribeLoading ? <Loader /> : "opt-in"}
            </ActionButton>
          )}
          {/* include a channel opt into */}

          {isSecret ? (
            <DecryptButton decryptFn={onDecrypt} isSecretRevealed={isSecretRevealed} />
            ): null}
        </ButtonGroup>
      </ContentSection>
      {/* content of the component */}

      {/* meta data of the component */}
        {isSecret || timeStamp ? <PoolContainer>
          {isSecret ? <SecretIconContainer><SecretIcon /></SecretIconContainer>: null}
          <ChannelMeta hidden={!timeStamp}>
            <PoolShare theme={theme}>
              {timeStamp
                ? moment
                    .utc(parseInt(timeStamp) * 1000)
                    .local()
                    .format("DD MMM YYYY | hh:mm A")
                : "N/A"}
            </PoolShare>
          </ChannelMeta>
        </PoolContainer> : null}
      {/* meta data of the component */}

      {/* add image overlay for full screen images */}
      <ImageOverlayComponent
        imageOverlay={imageOverlay}
        setImageOverlay={setImageOverlay}
      />
      {/* add image overlay for full screen images */}
    </Container>
  );
};

// ================= Define default props
ViewNotificationItem.propTypes = {
  notificationBody: PropTypes.string,
  notificationTitle: PropTypes.string,
  cta: PropTypes.string,
  image: PropTypes.string,
  app: PropTypes.string,
  url: PropTypes.string,
  isSpam: PropTypes.bool,
  subscribeFn: PropTypes.func,
  isSubscribedFn: PropTypes.func,
  theme: PropTypes.string,
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
  isSubscribedFn: null,
  theme: "light",
};

// ================= Define styled components
const MD_BREAKPOINT = "50050px"; //set an arbitrarily large number because we no longer use this breakpoint
const SM_BREAKPOINT = "900px";

const ContentSection = styled.div`
  display: block;
  padding: 20px 20px 30px;
  @media (min-width: ${SM_BREAKPOINT}) {
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 20px;
    justify-content: space-between;
    padding: 20px;
  }
`;

const BlockchainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;
const NetworkDetails = styled.div`
  text-align: right;
  @media (max-width: ${SM_BREAKPOINT}) {
    display: none;
  }
`;
const DelieveredViaText = styled.div`
  font-size: 1rem;
  opacity: 20%;
`;
const NetworkName = styled.div`
  font-size: 0.875rem;
  opacity: 40%;
`;

const HeaderImg = styled.div`
  svg {
    width: 32px;
    height: 32px;
  }
  @media (max-width: ${SM_BREAKPOINT}) {
    svg {
      width: 28px;
      height: 28px;
    }
  }
`;

const MobileImage = styled.div`
  @media (min-width: ${SM_BREAKPOINT}) {
    width: 220px;
    height: 200px;
    img,
    iframe,
    video {
      width: 100% !important;
      height: 100% !important;
      width: 100%;
      object-fit: cover;
      border-radius: 10px;
      border: 0;
    }
  }
  @media (max-width: ${SM_BREAKPOINT}) {
    display: block;
    img,
    iframe,
    video {
      border: 0;
      max-width: calc(100% + 42px) !important;
      margin-left: -21px;
      // margin-right: -40px;
      margin-top: -12px;
      margin-bottom: 5px;
    }
  }
`;
const ImageContainer = styled.span`
  background: ${(props) => (props.theme === "light" ? "#ededed" : "#444")};
  height: 32px;
  width: 32px;
  display: inline-block;
  margin-right: 10px;
  border-radius: 5px;
  @media (max-width: ${SM_BREAKPOINT}) {
    width: 28px;
    height: 28px;
  }
  @media (max-width: ${SM_BREAKPOINT}) {
    width: 28px;
    height: 28px;
  }
`;

const ChannelDetailsWrapper = styled.div`
  //   align-self: center;
`;

const Container = styled.div<ContainerDataType>`
  position: relative;
  font-family: "Source Sans Pro", Arial, sans-serif;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  border: ${(props) =>
    props.cta
      ? "0.5px solid #35C5F3"
      : props.theme === "light"
      ? "1px solid rgba(231.0, 231.0, 231.0, 1);"
      : "1px solid #444"};
  cursor: ${(props) => (props.cta ? "pointer" : "")};

  background: ${(props) => (props.theme === "light" ? "#fff" : "#000")};
  border-radius: 10px;

  margin: 15px 0px;
  justify-content: center;

  justify-content: space-between;

  @media (max-width: ${MD_BREAKPOINT}) {
    flex-direction: column;
  }
`;

const MobileHeader = styled.div`
  display: none;
  @media (min-width: ${SM_BREAKPOINT}) {
    font-size: 1rem;
  }
  @media (max-width: ${MD_BREAKPOINT}) {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    font-size: 14px;
    font-weight: 700;
    border-bottom: ${(props) =>
      props.theme === "light" ? "1px solid #ededed" : "1px solid #444"};
    color: #808080;
    background: ${(props) => (props.theme === "light" ? "#fafafa" : "#222")};
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    text-align: left;
  }
  @media (max-width: ${SM_BREAKPOINT}) {
    padding: 12px;
  }
`;

const HeaderButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
`;

const ChannelTitle = styled.div`
  text-align: left;
  margin-bottom: 10px;
`;

const ChannelTitleLink = styled.a`
  text-decoration: none;
  color: #e20880;
  font-size: 18px;
  font-weight: 600;

  @media (max-width: ${MD_BREAKPOINT}) {
    font-weight: 300;
    color: ${(props) =>
      props.theme === "light" ? "rgba(0, 0, 0, 0.5)" : "#808080"};
  }
`;

const ChannelDesc = styled.div`
  line-height: 20px;
  flex: 1;
  display: flex;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.75);
  font-weight: 400;
  flex-direction: column;
`;

const ChannelDescLabel = styled.label`
  color: ${(props) => (props.theme === "light" ? "#000" : "#fff")};
  flex: 1;
  margin: 0px;
  // font-weight: 600;
  text-align: left;
`;

const ChannelMeta = styled.div<MetaDataType>`
  display: ${(props) => (props.hidden ? "none" : "flex")};
  flex-direction: row;
  font-size: 13px;
`;

const ChannelMetaBox = styled.label`
  color: #fff;
  // font-weight: 600;
  padding: 10px;
  border-radius: 10px;
  font-size: 12px;
  align-self: flex-end;
`;

const PoolContainer = styled.div`
  display: flex;
  align-items: end;
  justify-content: flex-end;
`;

const SecretIconContainer = styled.div`
  padding: 0 15px 15px 0;
  @media (max-width: ${SM_BREAKPOINT}) {
    padding: 0 12px 12px 0;
  }
`;

const SecretIcon = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: linear-gradient(
    135deg,
    #e20880 12.5%,
    #674c9f 49.89%,
    #35c5f3 87.5%
  );
`

const PoolShare = styled(ChannelMetaBox)`
  background: ${(props) => (props.theme === "light" ? "#674c9f" : "#414141")};
  @media (max-width: ${MD_BREAKPOINT}) {
    border-radius: 8px 0px 8px 0px;
    color: #808080;
    font-weight: 700;
    background: ${(props) =>
      props.theme === "light" ? "rgba(250, 250, 250, 1)" : "#222"};
    border: ${(props) =>
      props.theme === "light" ? "1px solid #ededed" : "1px solid #444"};
    padding: 15px;
    @media (max-width: ${SM_BREAKPOINT}) {
      padding: 12px;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
`;

// Export Default
export default ViewNotificationItem;
