import { useEffect, useState } from 'react';

import {
  trackWindowScroll,
  CommonProps,
} from 'react-lazy-load-image-component';

import { getQueryMetadata } from '../pages/api/nftApi';
import NFT from './Nft';
import SearchBox from './SearchNfts';

export type MetadataItems = {
  tokenId: string;
  image: string;
  name: string;
  description: string;
  data: string;
}[];

const initialItems: MetadataItems = [
  {
    tokenId: '0',
    image: '0.jpg',
    name: 'Daturian',
    description: 'Daturian description',
    data: '',
  },
];

// export default function Home({scrollPosition}) {
const Collection = (props: CommonProps) => {
  const [totalNfts, setTotalNfts] = useState<MetadataItems>([]);
  const [nfts, setNfts] = useState<MetadataItems>([]);
  const [query, setQuery] = useState('');
  // const [loadingState, setLoadingState] = useState('not-loaded');

  const { scrollPosition } = props;

  async function loadNfts() {
    /* create a generic provider and query for unsold market items */
    // const provider = new ethers.providers.JsonRpcProvider(
    //   'https://polygon-rpc.com/'
    // );
    // const provider = new ethers.providers.JsonRpcProvider(node_url)
    // const contract = new ethers.Contract(
    //   NftContractAddress,
    //   DaturiansNFT.abi,
    //   provider
    // );
    // get minted number
    try {
      // const minted = await contract.totalMinted.call();
      const minted = 20;
      const tempDataArray = Array.from({ length: minted }, (_x, i) => i + 1);
      const items = tempDataArray.map((i: any) => {
        const item = {
          tokenId: i,
          image: `${i.toString()}.png`,
          name: `Daturian #${i.toString()}`,
          description: '',
          data: '',
        };

        return item;
      });
      // console.log(items);
      return items;
      // setLoadingState('loaded');
    } catch (err) {
      console.log(err);
      return initialItems;
    }
  }

  useEffect(() => {
    const promise = loadNfts();
    // console.log(currItems);
    // console.log(items[13])
    promise.then((data) => {
      setTotalNfts(data);
      console.log(data);
      data.map((nft) => {
        console.log(nft);
        return null;
      });
      // const array = Array.from(Array(3), () => (MetaDataItems[]))
      setNfts(data);
      console.log(nfts);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await e.preventDefault();
    const res = getQueryMetadata(query, totalNfts);
    setNfts(res);
  };

  if (!totalNfts.length)
    return (
      <h1 className="px-20 py-10 text-2l font-semibold text-center">
        Loading Daturians NFT
      </h1>
    );
  if (nfts.length < 1)
    return (
      <h1 className="px-20 py-10 text-3xl">No Daturians match your search</h1>
    );
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <SearchBox
          handleSubmit={handleSubmit}
          query={query}
          setQuery={setQuery}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft) => (
            <NFT key={nft.tokenId} scrollPosition={scrollPosition} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default trackWindowScroll(Collection);
