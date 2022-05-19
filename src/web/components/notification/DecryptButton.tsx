import * as React from "react";
import Loader from "../loader/loader";
import ActionButton from './styled/ActionButton';

export type DecryptButtonProps = {
  decryptFn: () => Promise<any>;
  isSecretReveled: boolean
};

const buttonText = {
  revealed: 'decrypted',
  notRevealed: 'decrypt'
}

const DecryptButton: React.FC<DecryptButtonProps> = ({
  decryptFn,
  isSecretReveled
}) => {
    const [isLoading, setIsLaoding] = React.useState(false);
    const btnText = isSecretReveled ? buttonText.revealed : buttonText.notRevealed;

    const onClickHandler = async (clickEvent: React.SyntheticEvent<HTMLElement>) => {
        clickEvent.preventDefault();
        clickEvent.stopPropagation();
    
        if (!decryptFn || isSecretReveled) return;

        try {
            setIsLaoding(true);
            await decryptFn();
        } finally { 
            setIsLaoding(false);
        }
      };

    return (
        <ActionButton disabled={isSecretReveled}
            onClick={onClickHandler}
        >
             {isLoading ? <Loader /> : btnText}
        </ActionButton>
    );
};

export default DecryptButton;