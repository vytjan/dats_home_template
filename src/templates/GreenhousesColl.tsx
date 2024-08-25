import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
// import { Dropdown } from 'flowbite-react';
import dynamic from 'next/dynamic';
import LazyLoad from 'react-lazyload';

import { HeaderMenu } from './HeaderMenu';
import SignatureNFT from './SignatureNft';
import SortFilter from './SortField';
import { GreenhouseCoords } from '../../utils/types';
import { Meta } from '../layout/Meta';
import { Section } from '../layout/Section';
import {
  getAllMeta,
  uploadCurrentGreenhouseMeta,
  uploadGreenhouseCoordinates,
} from '../pages/api/nftApi';
import { GreenhouseContractAddress, AppConfig } from '../utils/AppConfig';
import Greenhouses from '../utils/artifacts/Greenhouses.json';

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
}[];

type SortStateTypes =
  | {
      name: string;
      type: number;
      unavailable: boolean;
    }
  | undefined;

const initialItems: MetadataItems = [
  {
    tokenId: 0,
    image: '0.jpg',
    name: 'Greenhouse',
    description: 'Description',
  },
];

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
    async function updateGreenhousesAndSetTotalNfts(dataArray: any[]) {
      await Promise.all(
        dataArray.map(async (item) => {
          await uploadCurrentGreenhouseMeta(item, 'gh');
          await uploadGreenhouseCoordinates(item);
        })
      );
    }

    async function loadNfts() {
      /* create a generic provider and query for unsold market items */
      const provider = new ethers.providers.JsonRpcProvider(
        'https://polygon-rpc.com/'
      );
      // const provider = new ethers.providers.JsonRpcProvider(node_url)
      const contract = new ethers.Contract(
        GreenhouseContractAddress,
        Greenhouses,
        provider
      );
      // get minted greenhouses number
      try {
        const minted = await contract.totalSupply.call();
        console.log(minted.toNumber());

        // here get the total number of metadata in the DB:
        // get the IDs o minted NFTs:  // Assuming the contract is ERC-721 and emits a Transfer event for minting
        const fromBlock = 58321322; // You might want to specify a more recent block to start from
        const toBlock = 'latest';
        const transferEventSignature = ethers.utils.id(
          'Transfer(address,address,uint256)'
        );
        const mintEvents = await contract.queryFilter(
          {
            topics: [
              transferEventSignature,
              ethers.utils.hexZeroPad(ethers.constants.AddressZero, 32), // Filter for transfers from 0x0 (minting)
            ],
          },
          fromBlock,
          toBlock
        );
        console.log(mintEvents);
        const mintedTokenIds = mintEvents.map((event) =>
          event.args!.tokenId.toNumber()
        );
        console.log(mintedTokenIds);

        const ipfsUrl =
          'https://daturians.mypinata.cloud/ipfs/QmQrV8HRGwJorcNaEFKrKmmdVtsDaKPVV1aZRAEfuXY9iz/';

        const items = mintedTokenIds.map((tokenId: number) => {
          const item = {
            tokenId,
            image: `${ipfsUrl}${tokenId}.png`,
            name: `Greenhouse #${tokenId}`,
            description: '',
          };
          return item;
        });
        return items;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        return initialItems;
      }
    }

    // get all tokenIds of already minted NFTs
    const promise = loadNfts();
    promise.then((data) => {
      // TODO only for the initial coordinates uploads once there will be a normal smart contract deployed
      // before loading metadata, check what's already in the metadata
      const promise00 = getAllMeta('gh');
      promise00.then((data00) => {
        console.log(data00.data);
        // if there is nothing in the DB:
        if (data00.data.length < 1) {
          const allMetadataTokenIds = data.map((item: any) => item.tokenId);
          const promise33 =
            updateGreenhousesAndSetTotalNfts(allMetadataTokenIds);
          promise33.then(() => {
            setTotalNfts(data);
            setNfts({ nftData: data, sortType: sortStates[0] });
            const promise2 = getAllMeta('ghcoords');
            promise2.then((data2) => {
              console.log(data2.data);
              setCoords(data2.data);
            });
          });
          // data.forEach((item) => {
          //   uploadCurrentGreenhouseMeta(item.tokenId, 'gh');
          //   uploadGreenhouseCoordinates(item.tokenId);
          // });
        } else {
          // const currentGhMetadata = await getAllMeta('gh');
          // Step 1: Extract Token IDs from currentGhMetadata
          const currentGhMetadataTokenIds = data00.data.map(
            (item: any) => item.tokenId
          );

          // Step 2: Filter data to find tokenIds not in currentGhMetadataTokenIds
          const tokenIdsNotInCurrentGhMetadata = data
            .filter((item) => !currentGhMetadataTokenIds.includes(item.tokenId))
            .map((item) => item.tokenId); // Extracting just the tokenId for the final result
          console.log(tokenIdsNotInCurrentGhMetadata);
          const promise44 = updateGreenhousesAndSetTotalNfts(
            tokenIdsNotInCurrentGhMetadata
          );
          promise44.then(() => {
            setTotalNfts(data);
            setNfts({ nftData: data, sortType: sortStates[0] });
            const promise2 = getAllMeta('ghcoords');
            promise2.then((data2) => {
              console.log(data2.data);
              setCoords(data2.data);
            });
          });
        }
      });
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
          {!totalNfts.length ||
          loadingScreen ||
          greenhousesCoords.length < 1 ? (
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
