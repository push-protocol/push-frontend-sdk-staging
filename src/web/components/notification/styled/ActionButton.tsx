import styled from "styled-components";

export type ButtonProps = {
  disabled?: boolean,
  bgColor?: string,
  color?: string
};

const SM_BREAKPOINT = "900px";

const ActionButton = styled.button<ButtonProps>`
  all: unset;
  background: ${(props) => props.bgColor || 'rgb(226, 8, 128)'};
  color: ${(props) => props.color || '#fff'};
  padding: 6px 18px;
  font-weight: 500;
  border-radius: 3px;
  cursor: ${(props) => props.disabled ? 'default' : 'pointer'};
  opacity: ${(props) => props.disabled ? '0.5' : '1'};
  transition: 300ms;
  margin-left: auto;
  &:hover {
    opacity: ${(props) => props.disabled ? '0.5' : '0.9'};
  }

  @media (max-width: ${SM_BREAKPOINT}) {
    padding: 6px 12px;
    font-size: 14px;
  }
`;

export default ActionButton;