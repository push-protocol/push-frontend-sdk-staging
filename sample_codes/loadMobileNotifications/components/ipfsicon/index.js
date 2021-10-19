import axios from 'axios';
import React from 'react';
import styled from 'styled-components/native';
import { extractIPFSHashFromImageURL } from './utilities';


const IPFSIcon = ({
    icon
}) => {
    const [imageInBase64, setImageInBase64] = React.useState('');
    // fetch and pin the icons using ipfs hash
    React.useEffect(() =>{
        // extract the IPFS image url from the url of the icon
        const ipfsHash = extractIPFSHashFromImageURL(icon);
        if(!ipfsHash) return;
        // fetch the image directly from ipfs
        axios.get(ipfsHash)
        .then(({data: res}) => {
            setImageInBase64(res.icon);
        })
        .catch((err) => {
            console.log(err);
        });
    
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
    height: 100%;
    width: 100%;
    border-radius: 5px;
`;

export default IPFSIcon;
