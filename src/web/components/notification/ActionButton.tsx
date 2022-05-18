import styled from "styled-components";

export type ButtonProps = {
  disabled?: boolean 
};

const ActionButton = styled.div<ButtonProps>`
  background: rgb(226, 8, 128);
  padding: 10px 20px;
  color: #fff;
  font-weight: 500;
  border-radius: 3px;
  cursor: ${(props) => props.disabled ? 'default' : 'pointer'};
  opacity: ${(props) => props.disabled ? '0.5' : '1'};
  transition: 300ms;
  margin-left: auto;
  &:hover {
    opacity: ${(props) => props.disabled ? '0.5' : '0.9'};
  }
`;

export default ActionButton;