import * as React from 'react';
import * as PropTypes from "prop-types";
import styled from 'styled-components';
import * as moment from 'moment';

// import ParseMD from '../parsetext';

import { extractTimeStamp } from '../../utilities/index';
import ParseMarkdownText from '../parsetext';

// ================= Define types
export type NotificationItemProps = {
    notificationTitle: string | undefined,
    notificationBody: string | undefined,
    cta: string | undefined,
    app: string | undefined,
    icon: string | undefined,
    image: string | undefined
};

type ContainerDataType = {
  cta?: string
}

type MetaDataType = {
  hidden?: Boolean
}

// ================= Define base component
const ViewNotificationItem: React.FC<NotificationItemProps> = ({
    notificationTitle,
    notificationBody,
    cta,
    app,
    icon,
    image
}) => {

    const {
        notificationBody: parsedBody,
        timeStamp
    } = extractTimeStamp(notificationBody || "");

    const gotToCTA = () => {
      if(!cta) return;
      window.open(cta, "_blank");
    };

  // render
  return (
    <Container cta={cta} onClick={gotToCTA}>
      <MobileHeader>
        <ImageContainer>
          <img src={icon} alt="" />
        </ImageContainer>
        {app}
      </MobileHeader>
      <MobileImage>
        <img src={image} alt="" />
      </MobileImage>
      <ChannelDetailsWrapper>
          <ChannelTitle>
              <ChannelTitleLink>{notificationTitle}</ChannelTitleLink>
          </ChannelTitle>
          <ChannelDesc>
              <ChannelDescLabel>
              <ParseMarkdownText text={parsedBody}/>
              </ChannelDescLabel>
          </ChannelDesc>
        </ChannelDetailsWrapper>
        <ChannelMeta hidden={!timeStamp}>
            <>
              <Pool>
                <PoolShare>
                { timeStamp? moment
                    .utc(parseInt(timeStamp) * 1000)
                    .local()
                    .format("DD MMM YYYY | hh:mm A"): "N/A"
                }
                </PoolShare>
              </Pool>
            </>
        </ChannelMeta>
    </Container>
  );
}

// ================= Define default props
ViewNotificationItem.propTypes = {
  notificationBody: PropTypes.string,
  notificationTitle: PropTypes.string,
  cta: PropTypes.string,
  image: PropTypes.string,
  app: PropTypes.string
};

ViewNotificationItem.defaultProps = {
  notificationTitle: "",
  notificationBody: "",
  cta: "",
  app: ""
}

// ================= Define styled components
const MD_BREAKPOINT = "856px";

const MobileImage = styled.div`
  img{
    width: calc(100% + 40px);
    margin-left: -40px;
    margin-right: -40px;
    margin-top: -10px;
    margin-bottom: 10px;
  }
`;
const ImageContainer = styled.span`
  background: rgba(231.0, 231.0, 231.0, 1);
  height: 24px;
  width: 24px;
  display: inline-block;
  margin-right: 10px;
  border-radius: 5px;
`;

const ChannelDetailsWrapper = styled.div`
//   align-self: center;
`;

const Container = styled.div<ContainerDataType>`
  position: relative;
  font-family: "Source Sans Pro",Arial,sans-serif;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  border: ${(props) => props.cta ? "0.5px solid #35C5F3": "1px solid rgba(231.0, 231.0, 231.0, 1);"};
  cursor: ${(props) => props.cta ? "pointer": ""};

  background: #fff;
  border-radius: 10px;

  margin: 15px 0px;
  justify-content: center;
  padding: 20px;

  justify-content: space-between;

  @media (max-width: ${MD_BREAKPOINT}){
    flex-direction: column;
    padding-top: 45px;
    padding-bottom: 40px;
  }
`;

const MobileHeader = styled.div`
  display: none;
  @media (max-width: ${MD_BREAKPOINT}){
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 5px 20px;
    font-size: 14px;
    border-bottom: 1px solid rgba(231.0, 231.0, 231.0, 1);
    color: grey;
    background: rgba(250.0, 250.0, 250.0, 1);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    text-align: left;
  }

`;

const ChannelTitle = styled.div`
  text-align: left;
  margin-bottom: 10px
`

const ChannelTitleLink = styled.a`
  text-decoration: none;
  color: #e20880;
  font-size: 18px;

  @media (max-width: ${MD_BREAKPOINT}){
    color: rgba(0.0, 0.0, 0.0, 0.5);
  }
`

const ChannelDesc = styled.div`
  line-height: 20px;
  flex: 1;
  display: flex;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.75);
  font-weight: 400;
  flex-direction: column;
`

const ChannelDescLabel = styled.label`
  flex: 1;
  margin: 0px 5px;
  // font-weight: 600;
  text-align: left;
`

const ChannelMeta = styled.div<MetaDataType>`
  display: ${(props) => props.hidden ? "none" : "flex"};
  flex-direction: row;
  font-size: 13px;
`

const ChannelMetaBox = styled.label`
  color: #fff;
  // font-weight: 600;
  padding: 10px;
  border-radius: 10px;
  font-size: 12px;
  align-self: flex-end;
`

const Pool = styled.div`
  margin: 0px 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const PoolShare = styled(ChannelMetaBox)`
  background: #674c9f;
  @media (max-width: ${MD_BREAKPOINT}){
    position: absolute;
    bottom: 0;
    right: 0;
    border-radius: 0;
    border-radius: 8px 0;
    color: grey;
    background: rgba(250.0, 250.0, 250.0, 1);
    border-top: 1px solid rgba(231.0, 231.0, 231.0, 1);
    border-left: 1px solid rgba(231.0, 231.0, 231.0, 1);
    padding: 5px 10px;
  }
`


// Export Default
export default ViewNotificationItem;
