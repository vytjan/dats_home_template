import { useEffect, useState } from 'react';

import axios from 'axios';
import Link from 'next/link';
import 'react-lazy-load-image-component/src/effects/opacity.css';

export type MetadataItem = {
  tokenId: string;
  image: string;
  name: string;
  description: string;
  data: string;
};

export type INFTProps = {
  tokenId: string;
};

const NFT = (props: INFTProps) => {
  const [currNft, setCurrNft] = useState<MetadataItem>();
  const getSingleNFTMeta = async (tokenId: string) => {
    const ipfsGateway = 'https://daturians.mypinata.cloud/ipfs/';
    /*
     *  map over items returned from smart contract and format
     *  them as well as fetch their token metadata
     */
    const ipfsUrl =
      'https://daturians.mypinata.cloud/ipfs/QmWeRSySd3RJ9BhoRHzpDsu8PjjNnGYhWwHn44BKDpgvJG/';
    const currentUrl = `${ipfsUrl + String(tokenId)}.json`;
    try {
      const meta = await axios.get(currentUrl);
      const imgUri = meta.data.image.replace('ipfs://', ipfsGateway);
      const item = {
        tokenId,
        image: imgUri,
        name: meta.data.name,
        description: meta.data.description,
        data: meta.data,
      };
      return item;
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  // let nftIcon = null;

  useEffect(() => {
    // console.log(props.tokenId);
    const promise = getSingleNFTMeta(props.tokenId);
    promise.then((meta2) => {
      // console.log(meta2);
      if (meta2 !== null) {
        setCurrNft(meta2);
      }
    });
    // console.log(id);
    // codes using router.query
  }, []);

  // console.log(value);
  // const nftIcon = getSingleNFT(values.tokenId, scrollPosition);

  if (currNft !== undefined) {
    // const nftIcon = getSingleNFTMeta(currNft);
    return (
      <div className="content rounded-xl overflow-hidden">
        <Link href={`/gallery/single_nft/${currNft.tokenId}`}>
          <a>
            <img
              alt={currNft.image}
              src={currNft.image!}
              height="350"
              width="350"
            ></img>
            <div className="p-4">
              <p style={{ height: '35px' }} className="text-base font-semibold">
                {currNft.name}
              </p>
            </div>
          </a>
        </Link>
      </div>
    );
  }
  return (
    <div className="content rounded-xl overflow-hidden">
      <div className="single-nft-placeholder">
        <h2>Loading</h2>
      </div>
    </div>
  );
};

export default NFT;
