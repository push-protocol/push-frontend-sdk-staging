const IPFS_BASE_URL = "https://ipfs.io/ipfs/";

export function extractIPFSHashFromImageURL(imageURL){
    if(!imageURL) return "";
    const match = imageURL.match(/(\w+).jpg/);
    return match ? `${IPFS_BASE_URL}${match[1]}` : ""
};