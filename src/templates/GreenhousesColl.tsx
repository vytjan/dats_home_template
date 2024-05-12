import { useEffect, useState } from 'react';

// import { ethers } from 'ethers';
// import { Dropdown } from 'flowbite-react';
import dynamic from 'next/dynamic';
import LazyLoad from 'react-lazyload';

import { GreenhouseCoords } from '../../utils/types';
import { Meta } from '../layout/Meta';
import { Section } from '../layout/Section';
import { getAllMeta } from '../pages/api/nftApi';
import { AppConfig } from '../utils/AppConfig';
// import Daturians4Ukraine from '../utils/artifacts/Daturians4Ukraine.json';
import { HeaderMenu } from './HeaderMenu';
import SignatureNFT from './SignatureNft';
import SortFilter from './SortField';

// import { uploadMockCoordinates } from '../pages/api/nftApi';
// import { match } from 'assert';
// import e from 'express';
// import image from 'next/image';
// import { title } from 'process';
// import { AppConfig } from 'aws-sdk';

type MetadataItems = {
  tokenId: number;
  image: string;
  name: string;
  description: string;
  // data: string;
  // coords: { tokenId: number; name: string; coordinates: {x: number, y: number} };
}[];

type SortStateTypes =
  | {
      name: string;
      type: number;
      unavailable: boolean;
    }
  | undefined;

// const initialItems: MetadataItems = [
//   {
//     tokenId: 0,
//     image: '0.jpg',
//     name: 'Daturian',
//     description: 'Daturian description',
//     // data: '',
//     // score: { score: 0, rank: 0, tokenId: '0' },
//   },
// ];

const DaturaMapContainer = dynamic(() => import('./DaturaMapContainer'), {
  ssr: false,
});

const sortStates = [
  // { name: 'Top rank', type: 0, unavailable: false },
  // { name: 'Bottom rank', type: 1, unavailable: false },
  { name: 'Newest', type: 0, unavailable: false },
  { name: 'Oldest', type: 1, unavailable: false },
];

// const scores = [{ score: 0, tokenId: 0, rank: 0 }];

const GreenhousesCollection = () => {
  const [totalNfts, setTotalNfts] = useState<MetadataItems>([]);
  const [nfts, setNfts] = useState<{
    nftData: MetadataItems;
    sortType: SortStateTypes;
  }>({
    nftData: [],
    sortType: sortStates[0],
  });
  const [greenhousesCoords, setCoords] = useState<GreenhouseCoords>([]);
  const [query, setQuery] = useState('');
  const [loadingScreen, setLoadingScreen] = useState(false);

  const setSortCallback = (value: {
    name: string;
    type: number;
    unavailable: boolean;
  }) => {
    setNfts({ ...nfts, sortType: value });
  };

  useEffect(() => {
    async function loadNfts() {
      // /* create a generic provider and query for unsold market items */
      // const provider = new ethers.providers.JsonRpcProvider(
      //   'https://polygon-rpc.com/'
      // );
      // // const provider = new ethers.providers.JsonRpcProvider(node_url)
      // const contract = new ethers.Contract(
      //   UkraineContractAddress,
      //   Daturians4Ukraine.abi,
      //   provider
      // );
      // // get minted number
      // try {
      //   const minted = await contract.totalMinted.call();
      const ipfsUrl =
        'https://daturians.mypinata.cloud/ipfs/QmXvkY7vQPJki59k5oyueQTNxG9bCb1HCSt2GZkwx3MiEz/';

      //   const tempDataArray = Array.from({ length: minted }, (_x, i) => i + 1);
      //   const items = tempDataArray.map((i: any) => {
      //     const item = {
      //       tokenId: i,
      //       image: `${ipfsUrl + String(i)}.png`,
      //       name: `Greenhouse #${i.toString()}`,
      //       description: '',
      //     };

      //     return item;
      //   });
      //   return items;
      // } catch (err) {
      //   // eslint-disable-next-line no-console
      //   console.log(err);
      //   return initialItems;
      // }
      const tempDataArray = Array.from({ length: 100 }, (_x, i) => i + 1);
      const items = tempDataArray.map((i: any) => {
        const item = {
          tokenId: i,
          image: `${ipfsUrl + String(i)}.png`,
          name: `Greenhouse #${i.toString()}`,
          description: '',
        };
        return item;
      });
      return items;
    }
    // load the coordinates from the db/upload them
    async function loadCoords() {
      const coords = await getAllMeta('ghcoords');
      return coords;
    }
    const promise = loadNfts();
    promise.then((data) => {
      // TODO only for the initial coordinates uploads once there will be a normal smart contract deployed
      // data.forEach(item => {
      //   uploadMockCoordinates(item.tokenId);
      // });
      // const newData = addScores(data);

      setTotalNfts(data);
      setNfts({ nftData: data, sortType: sortStates[0] });
      const promise2 = loadCoords();
      promise2.then((data2) => {
        console.log(data2.data);
        setCoords(data2.data);
      });
      // setCurrDispNumber(nfts.nftData.length);

      // only load if there are not uploaded jsons:
      // if (data[0].length < data[2]) {
      // const promise2 = loadNewMeta();
      // promise2.then((data2) => {
      //   setTotalNfts(data2.data);
      //   setNfts(data2.data);
      //   // console.log('load new metadata happened');
      // });
      // }
    });
  }, []);

  // whenever search value gets updated, we will update nfts list
  useEffect(() => {
    const newNfts = totalNfts.filter((value) =>
      value.name.toLowerCase().includes(query.toLowerCase())
    );
    // console.log(newNfts);
    // map again the scores:
    // const newData = addScores(newNfts);
    // console.log('search effect');
    setNfts({ ...nfts, nftData: newNfts });
    // setCurrDispNumber(nfts.nftData.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, totalNfts]);

  // // whenever sort value is updated, change order
  useEffect(() => {
    function sortNfts(sort_type: {
      name: string;
      type: number;
      unavailable: boolean;
    }) {
      // console.log(sort_type.type);
      // const oldNfts = JSON.parse(JSON.stringify(nfts));
      let newNfts: MetadataItems = [];
      const oldNfts = nfts.nftData;
      // console.log(sort_type);
      // if top rank
      // if (sort_type.type === 0) {
      //   newNfts = oldNfts.sort((a, b) =>
      //     a.score.score > b.score.score ? -1 : 1
      //   );
      // }
      // if bottom rank
      // if (sort_type.type === 1) {
      //   newNfts = oldNfts.sort((a, b) =>
      //     a.score.score > b.score.score ? 1 : -1
      //   );
      // }
      // if newest
      if (sort_type.type === 0) {
        newNfts = oldNfts.sort((a, b) => (a.tokenId > b.tokenId ? -1 : 1));
      }
      // if oldest
      if (sort_type.type === 1) {
        // console.log('sort 3');
        newNfts = oldNfts.sort((a, b) => (a.tokenId > b.tokenId ? 1 : -1));
      }
      return newNfts;
    }

    // @ts-ignore
    setLoadingScreen(true);
    const promise = sortNfts(nfts.sortType!);
    // promise.then((data) => {
    // const sortedNfts = data;
    const sortedNfts = promise;
    setNfts({ ...nfts, nftData: [...sortedNfts] });
    setLoadingScreen(false);
    // });
    // const newNfts2 = addScores(newNfts2)
    // setNfts(sortedNfts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nfts.sortType, totalNfts]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await e.preventDefault();
    const newNfts = totalNfts.filter((value) =>
      value.name.toLowerCase().includes(query.toLowerCase())
    );
    // console.log(newNfts);
    // const newNfts2 = addScores(newNfts);
    setNfts({ ...nfts, nftData: newNfts });
    // setCurrDispNumber(nfts.nftData.length);
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
        title={AppConfig.greenhouseCollTitle}
        description={AppConfig.greenhousesCollDescription}
      />
      <HeaderMenu></HeaderMenu>
      <div className="flex justify-center">
        <div className="grid-cols-1 gap-5 max-auto px-3">
          {!greenhousesCoords.length ? (
            <h1 className="px-20 py-10 text-2l font-semibold text-center">
              Loading
            </h1>
          ) : (
            <div className=" content-gallery rounded-xl overflow-hidden lg:col-span-3 sm:col-span-4 datura-map">
              <DaturaMapContainer
                greenhouses={greenhousesCoords}
                currentGreenhouse={null}
              />
            </div>
          )}
          <h1 className="text-3xl text-center pt-3.5">
            {AppConfig.greenhouseCollTitle}
          </h1>
          <div className="attributes-filter grid sm:grid-cols-5 md:grid-cols-3 gap-1">
            <div className="search-field sm:grid-cols-5 md:grid-cols-3 gap-1">
              <form
                onSubmit={handleSubmit}
                className="search rounded col-span-4"
              >
                <input
                  className="bg-secondary-100 shadow-md"
                  placeholder="Search for Greenhouse ID"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyUp={handleKeyUp}
                />
              </form>
            </div>
            <div className="sort-field">
              <h2>Total: {nfts.nftData.length}</h2>
              <SortFilter
                // @ts-ignore
                sortType={nfts.sortType}
                setSortType={setSortCallback}
                sortStates={sortStates}
              ></SortFilter>
            </div>
          </div>
          {!totalNfts.length || loadingScreen ? (
            <h1 className="px-20 py-10 text-2l font-semibold text-center">
              Loading
            </h1>
          ) : (
            <>
              {nfts.nftData.length < 1 ? (
                <h1 className="px-20 py-10 text-3xl">
                  No Greenhouses match your search. Sorry...
                </h1>
              ) : (
                <div>
                  <div className="grid grid-cols-5">
                    <div className="grid col-span-5 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                      {nfts.nftData.map((nft, index) => (
                        <div className="widget-wrapper" key={index}>
                          <LazyLoad height={350} key={index}>
                            <SignatureNFT
                              key={nft.tokenId.toString()}
                              tokenId={nft.tokenId}
                              image={nft.image}
                              collection_url="single_greenhouse_nft"
                            />
                          </LazyLoad>
                        </div>
                      ))}
                    </div>
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

export default GreenhousesCollection;
