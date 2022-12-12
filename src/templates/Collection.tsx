// import console from 'console';

import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
// import { Dropdown } from 'flowbite-react';
import LazyLoad from 'react-lazyload';

import { Meta } from '../layout/Meta';
import { Section } from '../layout/Section';
import { getMetadataById, getAllMeta } from '../pages/api/nftApi';
import { AppConfig, NftContractAddress } from '../utils/AppConfig';
import DaturiansNFT from '../utils/artifacts/Daturians.json';
import { HeaderMenu } from './HeaderMenu';
import NFT from './Nft';
import SortFilter from './SortField';

export type MetadataItems = {
  tokenId: number;
  image: String;
  name: String;
  description: String;
  data: {
    id: Number;
    name: String;
    description: String;
    image: String;
    edition: Number;
    attributes: [
      {
        trait_type: String;
        value: String;
        display_type: String;
      }
    ];
    extras: [
      {
        trait_type: String;
        value: String;
      }
    ];
  };
}[];

const sortStates = [
  { name: 'Top rank', type: 0, unavailable: true },
  { name: 'Bottom rank', type: 1, unavailable: true },
  { name: 'Newest', type: 2, unavailable: false },
  { name: 'Oldest', type: 3, unavailable: false },
];

const initialItems: MetadataItems = [
  {
    tokenId: 0,
    image: '0.jpg',
    name: 'Daturian',
    description: 'Daturian description',
    data: {
      id: 0,
      name: 'Daturian',
      description: 'Daturian description',
      image: '0.jpg',
      edition: 0,
      attributes: [
        {
          trait_type: 'a',
          value: 'b',
          display_type: 'c',
        },
      ],
      extras: [
        {
          trait_type: 'a',
          value: 'b',
        },
      ],
    },
  },
];

const Collection = () => {
  const [totalNfts, setTotalNfts] = useState<MetadataItems>([]);
  const [nfts, setNfts] = useState<MetadataItems>([]);
  const [query, setQuery] = useState('');
  const [sortType, setSortType] = useState(sortStates[2]);

  const getFilterValues = (filterName: String) => {
    // Extract the nested arrays from the filtered array
    const extractedArrays = totalNfts.map(
      (parentObject) => parentObject.data.attributes
    );

    const flattenedArray = extractedArrays.flat();

    // Filter the parent array by a value in the nested array
    const filteredArray = flattenedArray.filter(
      (parentObject) => parentObject.trait_type === filterName
    );

    // // Use Array.filter() and Set to return only the unique values
    const distinctValues = Array.from(
      new Set(filteredArray.map((object) => object.value))
    );
    console.log(distinctValues);
  };

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
      const allMeta = await getAllMeta();
      // setNfts(allMeta.data);
      // console.log(allMeta.data);
      return [allMeta.data, contract, minted];
    } catch (err) {
      console.log(err);
      return initialItems;
    }
  }

  async function loadNewMeta(contract: any, minted: number) {
    const allMeta = await getAllMeta();
    const tempDataArray = Array.from(
      { length: minted - allMeta.data.length + 1 },
      (_v, k) => k + allMeta.data.length
    );

    console.log(allMeta.data.length);
    Promise.all(
      tempDataArray.map(async (i) => {
        // console.log(i);
        const data = await getMetadataById(i.toString(), contract, minted);
        console.log(data);
      })
    );
    return allMeta;
  }

  useEffect(() => {
    const promise = loadNfts();
    promise.then((data) => {
      // setTotalNfts(data[0]);

      console.log(data[0]);
      // const sorted = sortNfts(sortType.type);
      setTotalNfts(data[0]);
      setNfts(data[0]);
      console.log(totalNfts);
      getFilterValues('Type');
      // getFilterValues('Faction');

      // only load if there are not uploaded jsons:
      if (data[0].length < data[2]) {
        const promise2 = loadNewMeta(data[1], data[2]);
        promise2.then((data2) => {
          // console.log('totalNfts and data2', totalNfts.length, data2.length);
          // if (totalNfts.length < data2.data.length) {
          // const sorted = sortNfts(sortType.type);
          setTotalNfts(data2.data);
          setNfts(data2.data);
          console.log('load new metadata happened');
          // }
          // console.log(data2.data);

          // console.log(data2);
        });
      }
    });
  }, [totalNfts]);

  // whenever search value gets updated, we will update patience list
  useEffect(() => {
    const newNfts = totalNfts.filter((value) =>
      value.name.toLowerCase().includes(query.toLowerCase())
    );
    // console.log(newNfts);
    setNfts(newNfts);
  }, [query, totalNfts]);

  // whenever sort value is updated, change order
  useEffect(() => {
    // getFilterValues('Type');
    const sortNfts = (sort_type: number) => {
      let newNfts: MetadataItems = [];
      // if newest
      if (sort_type === 2) {
        newNfts = nfts.sort((n1, n2) => {
          if (n1.tokenId > n2.tokenId) {
            return 1;
          }
          if (n1.tokenId < n2.tokenId) {
            return -1;
          }

          return 0;
        });
      }
      // if oldest
      if (sort_type === 3) {
        newNfts = nfts.sort((n1, n2) => {
          if (n1.tokenId > n2.tokenId) {
            return -1;
          }
          if (n1.tokenId < n2.tokenId) {
            return 1;
          }
          return 0;
        });
      }
      return newNfts;
    };
    // @ts-ignore
    const sortedNfts = sortNfts(sortType.type);

    setNfts(sortedNfts);
    // console.log(nfts);
    // console.log(totalNfts);
  }, [sortType, nfts, totalNfts]);

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
          <h1 className="text-3xl text-center">{AppConfig.collectionTitle}</h1>
          <div className="attributes-filter">
            <div className="search-field sm:grid-cols-5 md:grid-cols-3 gap-1">
              <h2 className="search-text">{`Search:`}</h2>
              <form
                onSubmit={handleSubmit}
                className="search rounded col-span-4"
              >
                <input
                  placeholder="Search for Daturian ID"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyUp={handleKeyUp}
                />
              </form>
            </div>
            <div className="sort-field">
              <SortFilter
                // @ts-ignore
                sortType={sortType}
                setSortType={setSortType}
                sortStates={sortStates}
              ></SortFilter>
              {/* <div>
                <GenericFilter
                  filterType={}
                  setFilterType={}
                  filterStates={}
                ></GenericFilter>
              </div> */}
            </div>
          </div>
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
                <div>
                  <div className="all-filters">
                    <div className="attributes-filter">
                      {/* location */}
                      <button
                        id="dropdownRadioBgHoverButton"
                        data-dropdown-toggle="dropdownRadioBgHover"
                        className="text-blue bg-primary-100 hover:bg-green font-medium rounded-lg text-xs px-4 py-2.5 text-center inline-flex items-center"
                        type="button"
                      >
                        Location{' '}
                        <svg
                          className="ml-2 w-4 h-4"
                          aria-hidden="true"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </button>
                      <div
                        id="dropdownRadioBgHover"
                        className="hidden z-10 w-48 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                      >
                        <ul
                          className="p-3 space-y-1 text-sm text-gray-700"
                          aria-labelledby="dropdownRadioBgHoverButton"
                        >
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-4"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-4"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Dobi desert
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                // checked
                                id="default-radio-5"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-5"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Member City
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Ruins of Old Member City
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Sibyl Park
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Chillden
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                S.E.E.D
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Sibyl
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Dronia
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Pompadronia
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Pompa
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Herbarium
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Fanghorn
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Darkhorn
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Faustenburg
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                X12SPA-TF
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Satellites of Datura
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                      {/* family */}
                      <button
                        id="dropdownRadioBgHoverButton"
                        data-dropdown-toggle="dropdownRadioBgHover"
                        className="text-blue bg-primary-100 hover:bg-green font-medium rounded-lg text-xs px-4 py-2.5 text-center inline-flex items-center"
                        type="button"
                      >
                        Family{' '}
                        <svg
                          className="ml-2 w-4 h-4"
                          aria-hidden="true"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </button>
                      <div
                        id="dropdownRadioBgHover"
                        className="hidden z-10 w-48 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                      >
                        <ul
                          className="p-3 space-y-1 text-sm text-gray-700"
                          aria-labelledby="dropdownRadioBgHoverButton"
                        >
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-4"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-4"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                The Juzephinos Family
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                // checked
                                id="default-radio-5"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-5"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Greatoldsmartens Dynasty
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                The NewWavers Clan
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                The Milksalots Tribe
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                The OpenDudes Syndicate
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                The Millenialums
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                The Gonnacatchers Mob
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                The Kingstons Ring
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Le Cool Familia
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                The Order of Ozarksons
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                      {/* occupation */}
                      <button
                        id="dropdownRadioBgHoverButton"
                        data-dropdown-toggle="dropdownRadioBgHover"
                        className="text-blue bg-primary-100 hover:bg-green font-medium rounded-lg text-xs px-4 py-2.5 text-center inline-flex items-center"
                        type="button"
                      >
                        Occupation{' '}
                        <svg
                          className="ml-2 w-4 h-4"
                          aria-hidden="true"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </button>
                      <div
                        id="dropdownRadioBgHover"
                        className="hidden z-10 w-48 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                      >
                        <ul
                          className="p-3 space-y-1 text-sm text-gray-700"
                          aria-labelledby="dropdownRadioBgHoverButton"
                        >
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-4"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-4"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Seed thief
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                // checked
                                id="default-radio-5"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-5"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Entertainer
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Architect
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Space Explorer
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Solar urticariatus
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Pilot
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Dew collector
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Ear removal specialist
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Secret keeper
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Astronaut
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                A revert-me-backer
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Insectologist
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Leaf Roller
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Puzzler
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Transponster
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Animalogist
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Storyteller
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Bullshit removal specialist
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Oracle
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Curling master
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Councilmember
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Antique collector
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Artist
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Shampoo thief
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Gardener
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Boulanger
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Coffee grinder
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Dreamer
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Tailor
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Student
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Accountant
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Grafitti artist
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Comedian
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Bard
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                City keeper
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Undecided
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Gondolier
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Rebel
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Scientist
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                      {/* genetics */}
                      <button
                        id="dropdownRadioBgHoverButton"
                        data-dropdown-toggle="dropdownRadioBgHover"
                        className="text-blue bg-primary-100 hover:bg-green font-medium rounded-lg text-xs px-4 py-2.5 text-center inline-flex items-center"
                        type="button"
                      >
                        Genetics{' '}
                        <svg
                          className="ml-2 w-4 h-4"
                          aria-hidden="true"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </button>
                      <div
                        id="dropdownRadioBgHover"
                        className="hidden z-10 w-48 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                      >
                        <ul
                          className="p-3 space-y-1 text-sm text-gray-700"
                          aria-labelledby="dropdownRadioBgHoverButton"
                        >
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-4"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-4"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                The Juzephinos Family mark
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                // checked
                                id="default-radio-5"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-5"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Bigfoots
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                The Iron Wolf Tribe
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Leafers
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Azul
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Explorers
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Liberal
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                      {/* health */}
                      <button
                        id="dropdownRadioBgHoverButton"
                        data-dropdown-toggle="dropdownRadioBgHover"
                        className="text-blue bg-primary-100 hover:bg-green font-medium rounded-lg text-xs px-4 py-2.5 text-center inline-flex items-center"
                        type="button"
                      >
                        Health{' '}
                        <svg
                          className="ml-2 w-4 h-4"
                          aria-hidden="true"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </button>
                      <div
                        id="dropdownRadioBgHover"
                        className="hidden z-10 w-48 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                      >
                        <ul
                          className="p-3 space-y-1 text-sm text-gray-700"
                          aria-labelledby="dropdownRadioBgHoverButton"
                        >
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-4"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-4"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                0-20
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                // checked
                                id="default-radio-5"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-5"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                20-40
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                40-60
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                60-80
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-6"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-6"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                80-100
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                      {/* eyes */}
                      <button
                        id="dropdownRadioHelperButton"
                        data-dropdown-toggle="dropdownRadioHelper"
                        className="text-blue bg-primary-100 hover:bg-green font-medium rounded-lg text-xs px-4 py-2.5 text-center inline-flex items-center"
                        type="button"
                      >
                        Eyes{' '}
                        <svg
                          className="ml-2 w-4 h-4"
                          aria-hidden="true"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </button>
                      <div
                        id="dropdownRadioHelper"
                        className="hidden z-10 w-60 bg-white rounded divide-y divide-gray-100 shadow"
                      >
                        <ul
                          className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdownRadioHelperButton"
                        >
                          <li>
                            <div className="flex p-2 rounded hover:bg-gray-100">
                              <div className="flex items-center h-5">
                                <input
                                  id="helper-radio-4"
                                  name="helper-radio"
                                  type="radio"
                                  value=""
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                />
                              </div>
                              <div className="ml-2 text-xs">
                                <label
                                  htmlFor="helper-radio-4"
                                  className="font-medium text-gray-900"
                                >
                                  <div>Cyclops</div>
                                  <p
                                    id="helper-radio-text-4"
                                    className="text-xs font-normal text-gray-500"
                                  >
                                    Able to see the future
                                  </p>
                                </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="flex p-2 rounded hover:bg-gray-100">
                              <div className="flex items-center h-5">
                                <input
                                  id="helper-radio-5"
                                  name="helper-radio"
                                  type="radio"
                                  value=""
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                />
                              </div>
                              <div className="ml-2 text-sm">
                                <label
                                  htmlFor="helper-radio-5"
                                  className="font-medium text-gray-900"
                                >
                                  <div>Cuegle</div>
                                  <p
                                    id="helper-radio-text-5"
                                    className="text-xs font-normal text-gray-500"
                                  >
                                    Able to see your sins
                                  </p>
                                </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="flex p-2 rounded hover:bg-gray-100">
                              <div className="flex items-center h-5">
                                <input
                                  id="helper-radio-6"
                                  name="helper-radio"
                                  type="radio"
                                  value=""
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                />
                              </div>
                              <div className="ml-2 text-sm">
                                <label
                                  htmlFor="helper-radio-6"
                                  className="font-medium text-gray-900"
                                >
                                  <div>Pumpkin</div>
                                  <p
                                    id="helper-radio-text-6"
                                    className="text-xs font-normal text-gray-500"
                                  >
                                    Bakes pies better than your grandma
                                  </p>
                                </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="flex p-2 rounded hover:bg-gray-100">
                              <div className="flex items-center h-5">
                                <input
                                  id="helper-radio-6"
                                  name="helper-radio"
                                  type="radio"
                                  value=""
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                />
                              </div>
                              <div className="ml-2 text-sm">
                                <label
                                  htmlFor="helper-radio-6"
                                  className="font-medium text-gray-900"
                                >
                                  <div>Sleepy</div>
                                  <p
                                    id="helper-radio-text-6"
                                    className="text-xs font-normal text-gray-500"
                                  >
                                    Makes dreams come true
                                  </p>
                                </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="flex p-2 rounded hover:bg-gray-100">
                              <div className="flex items-center h-5">
                                <input
                                  id="helper-radio-6"
                                  name="helper-radio"
                                  type="radio"
                                  value=""
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                />
                              </div>
                              <div className="ml-2 text-sm">
                                <label
                                  htmlFor="helper-radio-6"
                                  className="font-medium text-gray-900"
                                >
                                  <div>Bunny</div>
                                  <p
                                    id="helper-radio-text-6"
                                    className="text-xs font-normal text-gray-500"
                                  >
                                    Can turn itself into a carrot
                                  </p>
                                </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="flex p-2 rounded hover:bg-gray-100">
                              <div className="flex items-center h-5">
                                <input
                                  id="helper-radio-6"
                                  name="helper-radio"
                                  type="radio"
                                  value=""
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                />
                              </div>
                              <div className="ml-2 text-sm">
                                <label
                                  htmlFor="helper-radio-6"
                                  className="font-medium text-gray-900"
                                >
                                  <div>Demon</div>
                                  <p
                                    id="helper-radio-text-6"
                                    className="text-xs font-normal text-gray-500"
                                  >
                                    Can set anyone on fire
                                  </p>
                                </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="flex p-2 rounded hover:bg-gray-100">
                              <div className="flex items-center h-5">
                                <input
                                  id="helper-radio-6"
                                  name="helper-radio"
                                  type="radio"
                                  value=""
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                />
                              </div>
                              <div className="ml-2 text-sm">
                                <label
                                  htmlFor="helper-radio-6"
                                  className="font-medium text-gray-900"
                                >
                                  <div>Chill</div>
                                  <p
                                    id="helper-radio-text-6"
                                    className="text-xs font-normal text-gray-500"
                                  >
                                    Can automatically stream chillhop at will
                                  </p>
                                </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="flex p-2 rounded hover:bg-gray-100">
                              <div className="flex items-center h-5">
                                <input
                                  id="helper-radio-6"
                                  name="helper-radio"
                                  type="radio"
                                  value=""
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                />
                              </div>
                              <div className="ml-2 text-sm">
                                <label
                                  htmlFor="helper-radio-6"
                                  className="font-medium text-gray-900"
                                >
                                  <div>Tired</div>
                                  <p
                                    id="helper-radio-text-6"
                                    className="text-xs font-normal text-gray-500"
                                  >
                                    Soaks up energy
                                  </p>
                                </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="flex p-2 rounded hover:bg-gray-100">
                              <div className="flex items-center h-5">
                                <input
                                  id="helper-radio-6"
                                  name="helper-radio"
                                  type="radio"
                                  value=""
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                />
                              </div>
                              <div className="ml-2 text-sm">
                                <label
                                  htmlFor="helper-radio-6"
                                  className="font-medium text-gray-900"
                                >
                                  <div>Angry</div>
                                  <p
                                    id="helper-radio-text-6"
                                    className="text-xs font-normal text-gray-500"
                                  >
                                    Can provoke a fight
                                  </p>
                                </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="flex p-2 rounded hover:bg-gray-100">
                              <div className="flex items-center h-5">
                                <input
                                  id="helper-radio-6"
                                  name="helper-radio"
                                  type="radio"
                                  value=""
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                />
                              </div>
                              <div className="ml-2 text-sm">
                                <label
                                  htmlFor="helper-radio-6"
                                  className="font-medium text-gray-900"
                                >
                                  <div>Balloon</div>
                                  <p
                                    id="helper-radio-text-6"
                                    className="text-xs font-normal text-gray-500"
                                  >
                                    Can inflate itself
                                  </p>
                                </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="flex p-2 rounded hover:bg-gray-100">
                              <div className="flex items-center h-5">
                                <input
                                  id="helper-radio-6"
                                  name="helper-radio"
                                  type="radio"
                                  value=""
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                />
                              </div>
                              <div className="ml-2 text-sm">
                                <label
                                  htmlFor="helper-radio-6"
                                  className="font-medium text-gray-900"
                                >
                                  <div>Teardrop</div>
                                  <p
                                    id="helper-radio-text-6"
                                    className="text-xs font-normal text-gray-500"
                                  >
                                    Turns tears into wine
                                  </p>
                                </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="flex p-2 rounded hover:bg-gray-100">
                              <div className="flex items-center h-5">
                                <input
                                  id="helper-radio-6"
                                  name="helper-radio"
                                  type="radio"
                                  value=""
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                />
                              </div>
                              <div className="ml-2 text-sm">
                                <label
                                  htmlFor="helper-radio-6"
                                  className="font-medium text-gray-900"
                                >
                                  <div>Out</div>
                                  <p
                                    id="helper-radio-text-6"
                                    className="text-xs font-normal text-gray-500"
                                  >
                                    Makes you wonder around without purpose
                                  </p>
                                </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="flex p-2 rounded hover:bg-gray-100">
                              <div className="flex items-center h-5">
                                <input
                                  id="helper-radio-6"
                                  name="helper-radio"
                                  type="radio"
                                  value=""
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                />
                              </div>
                              <div className="ml-2 text-sm">
                                <label
                                  htmlFor="helper-radio-6"
                                  className="font-medium text-gray-900"
                                >
                                  <div>Hmm</div>
                                  <p
                                    id="helper-radio-text-6"
                                    className="text-xs font-normal text-gray-500"
                                  >
                                    Inflicts philosophical damage
                                  </p>
                                </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="flex p-2 rounded hover:bg-gray-100">
                              <div className="flex items-center h-5">
                                <input
                                  id="helper-radio-6"
                                  name="helper-radio"
                                  type="radio"
                                  value=""
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                />
                              </div>
                              <div className="ml-2 text-sm">
                                <label
                                  htmlFor="helper-radio-6"
                                  className="font-medium text-gray-900"
                                >
                                  <div>What</div>
                                  <p
                                    id="helper-radio-text-6"
                                    className="text-xs font-normal text-gray-500"
                                  >
                                    Can make flora talk
                                  </p>
                                </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="flex p-2 rounded hover:bg-gray-100">
                              <div className="flex items-center h-5">
                                <input
                                  id="helper-radio-6"
                                  name="helper-radio"
                                  type="radio"
                                  value=""
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                />
                              </div>
                              <div className="ml-2 text-sm">
                                <label
                                  htmlFor="helper-radio-6"
                                  className="font-medium text-gray-900"
                                >
                                  <div>Pretty</div>
                                  <p
                                    id="helper-radio-text-6"
                                    className="text-xs font-normal text-gray-500"
                                  >
                                    Able to turn everything to gold
                                  </p>
                                </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="flex p-2 rounded hover:bg-gray-100">
                              <div className="flex items-center h-5">
                                <input
                                  id="helper-radio-6"
                                  name="helper-radio"
                                  type="radio"
                                  value=""
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                />
                              </div>
                              <div className="ml-2 text-sm">
                                <label
                                  htmlFor="helper-radio-6"
                                  className="font-medium text-gray-900"
                                >
                                  <div>Joy</div>
                                  <p
                                    id="helper-radio-text-6"
                                    className="text-xs font-normal text-gray-500"
                                  >
                                    Makes mushrooms sing
                                  </p>
                                </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="flex p-2 rounded hover:bg-gray-100">
                              <div className="flex items-center h-5">
                                <input
                                  id="helper-radio-6"
                                  name="helper-radio"
                                  type="radio"
                                  value=""
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                />
                              </div>
                              <div className="ml-2 text-sm">
                                <label
                                  htmlFor="helper-radio-6"
                                  className="font-medium text-gray-900"
                                >
                                  <div>Happy</div>
                                  <p
                                    id="helper-radio-text-6"
                                    className="text-xs font-normal text-gray-500"
                                  >
                                    Can see your biggest dreams
                                  </p>
                                </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="flex p-2 rounded hover:bg-gray-100">
                              <div className="flex items-center h-5">
                                <input
                                  id="helper-radio-6"
                                  name="helper-radio"
                                  type="radio"
                                  value=""
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                />
                              </div>
                              <div className="ml-2 text-sm">
                                <label
                                  htmlFor="helper-radio-6"
                                  className="font-medium text-gray-900"
                                >
                                  <div>Java</div>
                                  <p
                                    id="helper-radio-text-6"
                                    className="text-xs font-normal text-gray-500"
                                  >
                                    Can create paralel universes
                                  </p>
                                </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="flex p-2 rounded hover:bg-gray-100">
                              <div className="flex items-center h-5">
                                <input
                                  id="helper-radio-6"
                                  name="helper-radio"
                                  type="radio"
                                  value=""
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                />
                              </div>
                              <div className="ml-2 text-sm">
                                <label
                                  htmlFor="helper-radio-6"
                                  className="font-medium text-gray-900"
                                >
                                  <div>Joker</div>
                                  <p
                                    id="helper-radio-text-6"
                                    className="text-xs font-normal text-gray-500"
                                  >
                                    Can make anyone laugh till they cry
                                  </p>
                                </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="flex p-2 rounded hover:bg-gray-100">
                              <div className="flex items-center h-5">
                                <input
                                  id="helper-radio-6"
                                  name="helper-radio"
                                  type="radio"
                                  value=""
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                />
                              </div>
                              <div className="ml-2 text-sm">
                                <label
                                  htmlFor="helper-radio-6"
                                  className="font-medium text-gray-900"
                                >
                                  <div>Monocle</div>
                                  <p
                                    id="helper-radio-text-6"
                                    className="text-xs font-normal text-gray-500"
                                  >
                                    Is able to timetravel
                                  </p>
                                </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="flex p-2 rounded hover:bg-gray-100">
                              <div className="flex items-center h-5">
                                <input
                                  id="helper-radio-6"
                                  name="helper-radio"
                                  type="radio"
                                  value=""
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                />
                              </div>
                              <div className="ml-2 text-sm">
                                <label
                                  htmlFor="helper-radio-6"
                                  className="font-medium text-gray-900"
                                >
                                  <div>Glasses</div>
                                  <p
                                    id="helper-radio-text-6"
                                    className="text-xs font-normal text-gray-500"
                                  >
                                    Can see through objects
                                  </p>
                                </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="flex p-2 rounded hover:bg-gray-100">
                              <div className="flex items-center h-5">
                                <input
                                  id="helper-radio-6"
                                  name="helper-radio"
                                  type="radio"
                                  value=""
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                />
                              </div>
                              <div className="ml-2 text-sm">
                                <label
                                  htmlFor="helper-radio-6"
                                  className="font-medium text-gray-900"
                                >
                                  <div>Glasses_star</div>
                                  <p
                                    id="helper-radio-text-6"
                                    className="text-xs font-normal text-gray-500"
                                  >
                                    Can make anyone fall in love
                                  </p>
                                </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="flex p-2 rounded hover:bg-gray-100">
                              <div className="flex items-center h-5">
                                <input
                                  id="helper-radio-6"
                                  name="helper-radio"
                                  type="radio"
                                  value=""
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                />
                              </div>
                              <div className="ml-2 text-sm">
                                <label
                                  htmlFor="helper-radio-6"
                                  className="font-medium text-gray-900"
                                >
                                  <div>Sleeping_mask</div>
                                  <p
                                    id="helper-radio-text-6"
                                    className="text-xs font-normal text-gray-500"
                                  >
                                    Is able to live both in dreams and the real
                                    world
                                  </p>
                                </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="flex p-2 rounded hover:bg-gray-100">
                              <div className="flex items-center h-5">
                                <input
                                  id="helper-radio-6"
                                  name="helper-radio"
                                  type="radio"
                                  value=""
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                />
                              </div>
                              <div className="ml-2 text-sm">
                                <label
                                  htmlFor="helper-radio-6"
                                  className="font-medium text-gray-900"
                                >
                                  <div>Pirate</div>
                                  <p
                                    id="helper-radio-text-6"
                                    className="text-xs font-normal text-gray-500"
                                  >
                                    Is able to see the souls of lost Daturians
                                  </p>
                                </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="flex p-2 rounded hover:bg-gray-100">
                              <div className="flex items-center h-5">
                                <input
                                  id="helper-radio-6"
                                  name="helper-radio"
                                  type="radio"
                                  value=""
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                />
                              </div>
                              <div className="ml-2 text-sm">
                                <label
                                  htmlFor="helper-radio-6"
                                  className="font-medium text-gray-900"
                                >
                                  <div>Goggles</div>
                                  <p
                                    id="helper-radio-text-6"
                                    className="text-xs font-normal text-gray-500"
                                  >
                                    Can create a snow storm
                                  </p>
                                </label>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      {/* faction */}
                      <button
                        id="dropdownRadioBgHoverButton"
                        data-dropdown-toggle="dropdownRadioBgHover"
                        className="text-blue bg-primary-100 hover:bg-green font-medium rounded-lg text-xs px-4 py-2.5 text-center inline-flex items-center"
                        type="button"
                      >
                        Faction{' '}
                        <svg
                          className="ml-2 w-4 h-4"
                          aria-hidden="true"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </button>
                      <div
                        id="dropdownRadioBgHover"
                        className="hidden z-10 w-48 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                      >
                        <ul
                          className="p-3 space-y-1 text-sm text-gray-700"
                          aria-labelledby="dropdownRadioBgHoverButton"
                        >
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-4"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-4"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Natural
                              </label>
                            </div>
                          </li>
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                // checked
                                id="default-radio-5"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-5"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Tech
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                      {/* flowers */}
                      <button
                        id="dropdownRadioBgHoverButton"
                        data-dropdown-toggle="dropdownRadioBgHover"
                        className="text-blue bg-primary-100 hover:bg-green font-medium rounded-lg text-xs px-4 py-2.5 text-center inline-flex items-center"
                        type="button"
                      >
                        Flowers{' '}
                        <svg
                          className="ml-2 w-4 h-4"
                          aria-hidden="true"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </button>
                      <div
                        id="dropdownRadioBgHover"
                        className="hidden z-10 w-48 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                      >
                        <ul
                          className="p-3 space-y-1 text-sm text-gray-700"
                          aria-labelledby="dropdownRadioBgHoverButton"
                        >
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-4"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-4"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Natural
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                      {/* accessories */}
                      <button
                        id="dropdownRadioBgHoverButton"
                        data-dropdown-toggle="dropdownRadioBgHover"
                        className="text-blue bg-primary-100 hover:bg-green font-medium rounded-lg text-xs px-4 py-2.5 text-center inline-flex items-center"
                        type="button"
                      >
                        Accessories{' '}
                        <svg
                          className="ml-2 w-4 h-4"
                          aria-hidden="true"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </button>
                      <div
                        id="dropdownRadioBgHover"
                        className="hidden z-10 w-48 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                      >
                        <ul
                          className="p-3 space-y-1 text-sm text-gray-700"
                          aria-labelledby="dropdownRadioBgHoverButton"
                        >
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-4"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-4"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Natural
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                      {/* type */}
                      <button
                        id="dropdownRadioBgHoverButton"
                        data-dropdown-toggle="dropdownRadioBgHover"
                        className="text-blue bg-primary-100 hover:bg-green font-medium rounded-lg text-xs px-4 py-2.5 text-center inline-flex items-center"
                        type="button"
                      >
                        Type{' '}
                        <svg
                          className="ml-2 w-4 h-4"
                          aria-hidden="true"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </button>
                      <div
                        id="dropdownRadioBgHover"
                        className="hidden z-10 w-48 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                      >
                        <ul
                          className="p-3 space-y-1 text-sm text-gray-700"
                          aria-labelledby="dropdownRadioBgHoverButton"
                        >
                          <li>
                            <div className="flex items-center p-2 rounded hover:bg-gray-100">
                              <input
                                id="default-radio-4"
                                type="radio"
                                value=""
                                name="default-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100"
                              />
                              <label
                                htmlFor="default-radio-4"
                                className="ml-2 w-full text-sm font-medium text-gray-900 rounded"
                              >
                                Natural
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                    {nfts.map((nft, index) => (
                      <div className="widget-wrapper" key={index}>
                        <LazyLoad height={350} key={index}>
                          <NFT
                            key={nft.tokenId.toString()}
                            tokenId={nft.tokenId}
                          />
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
