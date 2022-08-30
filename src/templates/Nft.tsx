import axios from 'axios';
import Link from 'next/link';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

export type MetadataItems = {
  tokenId: number;
  image: string;
  name: string;
  description: string;
  data: string;
}[];

const getSingleNFT = async (tokenId: number, scrollPosition: any) => {
  const ipfsGateway = 'https://daturians.mypinata.cloud/ipfs/';
  /*
   *  map over items returned from smart contract and format
   *  them as well as fetch their token metadata
   */
  const ipfsUrl =
    'https://daturians.mypinata.cloud/ipfs/QmWeRSySd3RJ9BhoRHzpDsu8PjjNnGYhWwHn44BKDpgvJG/';
  const currentUrl = `${ipfsUrl + String(tokenId)}.json`;
  const meta = await axios.get(currentUrl);
  const imgUri = meta.data.image.replace('ipfs://', ipfsGateway);
  const item = {
    tokenId,
    image: imgUri,
    name: meta.data.name,
    description: meta.data.description,
    data: meta.data,
  };

  if (!imgUri) {
    return null;
  }

  const altText = `${String(tokenId)}.png`;
  //   const nftUrl = baseUri + nftId + '.png';

  return (
    <Link href={`/single_nft/${tokenId}`}>
      <a>
        <LazyLoadImage
          alt={altText}
          effect="opacity"
          scrollPosition={scrollPosition}
          src={imgUri}
        />
        <div className="p-4">
          <p style={{ height: '35px' }} className="text-base font-semibold">
            {item.name}
          </p>
        </div>
      </a>
    </Link>
  );
};

const NFT = (values: any, scrollPosition: any) => {
  // console.log(value);
  const nftIcon = getSingleNFT(values.tokenId, scrollPosition);

  return <div className="content rounded-xl overflow-hidden">{nftIcon}</div>;
};

export default NFT;
