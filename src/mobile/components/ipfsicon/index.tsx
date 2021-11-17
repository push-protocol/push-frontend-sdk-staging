import axios from 'axios';
import * as React from 'react';
import styled from 'styled-components/native';
import { extractIPFSHashFromImageURL } from '../../../utilities';

type IPFSIconType = {
    icon: string | undefined
};

const IPFSIcon: React.FC<IPFSIconType> = ({
    icon
}) => {
    const [imageInBase64, setImageInBase64] = React.useState('');

    // fetch and pin the icons using ipfs hash
    React.useEffect(() =>{
        // extract the IPFS image url from the url of the icon
        const {type, url: ipfsHash} = extractIPFSHashFromImageURL(icon);
        if(!ipfsHash) return;
        // fetch the image directly from ipfs
        if(type === "https"){
            axios.get(ipfsHash)
            .then(({data: res}) => {
                setImageInBase64(res.icon);
            })
            .catch((err) => {
                console.log(err);
            });
        }else{
            setImageInBase64(ipfsHash)
        }
    
    }, [icon]);

    if(!imageInBase64){
        return <></>
    }

    return (
        <StyledImage
            source={{uri : imageInBase64}}
        />
    )
};

const StyledImage = styled.Image`
    height: 20px;
    width: 20px;
    border-radius: 5px;
`;

export default IPFSIcon;
