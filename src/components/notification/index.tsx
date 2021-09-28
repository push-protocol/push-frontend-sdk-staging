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
    cta: string | undefined
};

type ContainerDataType = {
  cta?: string
}

// ================= Define base component
const ViewNotificationItem: React.FC<NotificationItemProps> = ({
    notificationTitle, notificationBody, cta
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
                <br></br>
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
    notificationTitle: PropTypes.string,
    notificationBody: PropTypes.string,
    cta: PropTypes.string,
};

ViewNotificationItem.defaultProps = {
  notificationTitle: "",
  notificationBody: "",
  cta: ""
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
  font-weight: 600;
  text-align: left;
`

const ChannelMeta = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 13px;
`

const ChannelMetaBox = styled.label`
  // margin: 0px 5px;
  color: #fff;
  font-weight: 600;
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
  }
`


// Export Default
export default ViewNotificationItem;
