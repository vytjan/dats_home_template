import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import LazyLoad from 'react-lazyload';

import { Meta } from '../layout/Meta';
import { Section } from '../layout/Section';
import { AppConfig, NftContractAddress } from '../utils/AppConfig';
import DaturiansNFT from '../utils/artifacts/Daturians.json';
import { HeaderMenu } from './HeaderMenu';
import NFT from './Nft';

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

const Collection = () => {
  const [totalNfts, setTotalNfts] = useState<MetadataItems>([]);
  const [nfts, setNfts] = useState<MetadataItems>([]);
  const [query, setQuery] = useState('');

  async function loadNfts() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider(
      'https://polygon-rpc.com/'
    );
    // const provider = new ethers.providers.JsonRpcProvider(node_url)
    const contract = new ethers.Contract(
      NftContractAddress,
      DaturiansNFT.abi,
      provider
    );
    // get minted number
    try {
      const minted = await contract.totalMinted.call();
      // const minted = 20;
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
      return items;
    } catch (err) {
      console.log(err);
      return initialItems;
    }
  }

  useEffect(() => {
    const promise = loadNfts();
    promise.then((data) => {
      setTotalNfts(data);

      // console.log(data);
      setNfts(data);
    });
  }, []);

  // whenever search value gets updated, we will update patience list
  useEffect(() => {
    const newNfts = totalNfts.filter((value) =>
      value.name.toLowerCase().includes(query.toLowerCase())
    );
    // console.log(newNfts);
    setNfts(newNfts);
  }, [query, totalNfts]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await e.preventDefault();
    const newNfts = totalNfts.filter((value) =>
      value.name.toLowerCase().includes(query.toLowerCase())
    );
    // console.log(newNfts);
    setNfts(newNfts);
  };

  const handleKeyUp = (event: any) => {
    // key code for enter
    if (event.keyCode === 13) {
      event.preventDefault();
      event.target.blur();
    }
  };

  return (
    <Section>
      <Meta
        title={AppConfig.collectionTitle}
        description={AppConfig.collectionDescription}
      />
      <HeaderMenu></HeaderMenu>
      <div className="flex justify-center">
        <div className="grid-cols-1 gap-5 max-auto px-3">
          <h1 className="text-3xl">{AppConfig.collectionTitle}</h1>
          {!totalNfts.length ? (
            <h1 className="px-20 py-10 text-2l font-semibold text-center">
              Loading Daturians NFT
            </h1>
          ) : (
            <>
              {nfts.length < 1 ? (
                <h1 className="px-20 py-10 text-3xl">
                  No Daturians match your search. Sorry...
                </h1>
              ) : (
                <div className="px-4" style={{ maxWidth: '1600px' }}>
                  <div>
                    <h3>Search by name:</h3>
                    <form onSubmit={handleSubmit} className="search rounded">
                      <input
                        placeholder="Search for Daturian ID"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyUp={handleKeyUp}
                      />
                    </form>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                    {nfts.map((nft, index) => (
                      <div className="widget-wrapper" key={index}>
                        <LazyLoad height={350} key={index}>
                          <NFT key={nft.tokenId} tokenId={nft.tokenId} />
                        </LazyLoad>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Section>
  );
};

export default Collection;
