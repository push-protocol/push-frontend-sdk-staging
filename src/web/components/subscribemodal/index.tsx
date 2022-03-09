import * as React from "react";
import * as ReactUse from "react-use";
import styled from "styled-components";
import { LINKS } from './constants';

export type SubscribedModalProps = {
  onClose: () => void;
};
const SubscribedModal: React.FC<SubscribedModalProps> = ({ onClose }) => {
  const modalRef = React.useRef(null);
  // dummy function to help navigate to another page
  const goto = (url: any) => {
    window.open(url, "_blank");
  };

  // Form signer and contract connection
  ReactUse.useClickAway(modalRef, onClose);

  return (
    <Overlay className="overlay">
      <Modal className="modal" ref={modalRef}>
        <Item className="modal__heading">
          <CustomHeaderTwo>
            <CustomSpan style={{ marginRight: "10px" }}>Recieve</CustomSpan>
            <StyledSpan>Notifications</StyledSpan>
          </CustomHeaderTwo>
          <H3>
            Recieve notifications from <b>EPNS</b> via the following platforms.
          </H3>
        </Item>

        <Item className="modal__content">
          {LINKS.map((oneLink) => (
            <ItemLink onClick={() => goto(oneLink.link)}>
              {oneLink.text}
            </ItemLink>
          ))}
        </Item>
      </Modal>
    </Overlay>
  );
};

const ItemLink = styled.div`
  line-height: 1.7em;
  font-size: 1.1em;
  font-weight: 300;
  cursor: pointer;
  opacity: 0.8;
  transition: 300ms;
  text-decoration: underline 1px rgba(255, 255, 255, 0);
  width: fit-content;

  &:hover {
    text-decoration-color: black;
  }
`;
const CustomHeaderTwo = styled.h2`
  color: rgb(0, 0, 0);
  font-weight: 600;
  font-size: 2em;
  letter-spacing: 0.1em;
  line-height: 1.5em;
  text-transform: uppercase;
  margin: 20px 0px;
  padding: 0px;
  font-family: inherit;
  text-align: inherit;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  text-transform: capitalise;
`;

const CustomSpan = styled.span`
  flex: initial;
  align-self: auto;
  color: rgb(0, 0, 0);
  background: transparent;
  font-weight: 200;
  font-size: inherit;
  text-transform: inherit;
  margin: 0px;
  padding: 0px;
  letter-spacing: inherit;
  text-align: initial;
  position: initial;
  inset: auto;
  z-index: auto;
`;

const StyledSpan = styled(CustomSpan)`
  background: rgb(226, 8, 128);
  color: #fff;
  font-weight: 600;
  padding: 3px 8px;
`;

const H3 = styled.h3`
  color: rgb(0 0 0 / 0.5);
  font-weight: 300;
  font-size: 1em;
  text-transform: uppercase;
  margin: -15px 0px 20px 0px;
  padding: 0px;
  letter-spacing: 0.1em
    ";
    font-family: 'Source Sans Pro', Helvetica, sans-serif;
    text-align: inherit;
    max-width: initial";
`;

const Overlay = styled.div`
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.85);
  height: 100%;
  width: 100%;
  z-index: 1000;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
`;

const Modal = styled.div`
  padding: 20px 30px;
  background: white;
  text-align: left;
`;

export default SubscribedModal;
