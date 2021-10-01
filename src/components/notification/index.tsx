import * as React from 'react';
import * as PropTypes from "prop-types";
import styled from 'styled-components';
import * as moment from 'moment';

// import ParseMD from '../parsetext';

import { extractTimeStamp } from '../../utilities/index';
import ParseMarkdownText from '../parsetext';

// ================= Define types
export type NotificationItemProps = {
    notificationTitle: string,
    notificationBody: string,
    cta: string | undefined,
    app: string | undefined,
    icon: string
};

type ContainerDataType = {
  cta?: string
}

// ================= Define base component
const ViewNotificationItem: React.FC<NotificationItemProps> = ({
    notificationTitle, notificationBody, cta, app,
    icon
}) => {

    const {
        notificationBody: parsedBody,
        timeStamp
    } = extractTimeStamp(notificationBody);

    const gotToCTA = () => {
      if(!cta) return;
      window.open(cta, "_blank");
    };

  // render
  return (
    <Container cta={cta} onClick={gotToCTA}>
      <MobileHeader>
        <img src={icon} alt="" />
        {app}
      </MobileHeader>
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
        <ChannelMeta>
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
    notificationTitle: PropTypes.string.isRequired,
    notificationBody: PropTypes.string.isRequired,
    cta: PropTypes.string,
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

const ChannelDetailsWrapper = styled.div`
//   align-self: center;
`;

const Container = styled.div<ContainerDataType>`
  position: relative;
  font-family: "Source Sans Pro",Arial,sans-serif;
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  border: ${(props) => props.cta ? "0.5px solid #35C5F3": "1px solid rgb(237, 237, 237);"};
  cursor: ${(props) => props.cta ? "pointer": ""};

  background: #fff;
  border-radius: 10px;

  margin: 15px 0px;
  justify-content: center;
  padding: 20px;

  justify-content: space-between;

  @media (max-width: ${MD_BREAKPOINT}){
    flex-direction: column;
    padding-top: 40px;
  }
`;

const MobileHeader = styled.div`
  display: none;
  @media (max-width: ${MD_BREAKPOINT}){
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding: 5px 20px;
    font-size: 14px;
    border-bottom: 1px solid rgb(237,237,237);
    color: grey;
    background: rgb(241 241 241);
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
  font-weight: 550;
  color: #e20880;
  font-size: 18px;

  @media (max-width: ${MD_BREAKPOINT}){
    color: grey;
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

const ChannelMeta = styled.div`
  display: flex;
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
    background: rgb(241 241 241);
    padding: 5px 10px;
  }
`


// Export Default
export default ViewNotificationItem;
