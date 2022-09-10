import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import LazyLoad from 'react-lazyload';

import { Meta } from '../layout/Meta';
import { Section } from '../layout/Section';
import { AppConfig, NftContractAddress } from '../utils/AppConfig';
import DaturiansNFT from '../utils/artifacts/Daturians.json';
import { HeaderMenu } from './HeaderMenu';
import NFT from './Nft';
import 'flowbite';

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
          <h1 className="text-3xl text-center">{AppConfig.collectionTitle}</h1>
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
                <div style={{ maxWidth: '1600px' }}>
                  <div className="sort-field">
                  <h2 className="daturians-collection">{AppConfig.collectionTitle}</h2>
                    <form onSubmit={handleSubmit} className="search rounded">
                      <input
                        placeholder="Search for Daturian ID"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyUp={handleKeyUp}
                      />
                    </form>
                  {/* sort */}
                    <button id="dropdownDefault" data-dropdown-toggle="dropdown" class="text-white bg-dark hover:bg-green font-medium rounded-lg text-xs px-4 py-2.5 text-center inline-flex items-center" type="button">Sort <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                    <div id="dropdown" class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                        <ul class="py-1 text-sm text-gray-700" aria-labelledby="dropdownDefault">
                          <li>
                            <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:text-blue">Top rank</a>
                          </li>
                          <li>
                            <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:text-blue">Bottom rank</a>
                          </li>
                          <li>
                            <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:text-blue">Newest</a>
                          </li>
                          <li>
                            <a href="#" class="block py-2 px-4 hover:bg-gray-100 dark:hover:text-blue">Oldest</a>
                          </li>
                        </ul>
                    </div>
                  </div>
                  <div className="attributes-filter">
                {/* location */}
                    <button id="dropdownRadioBgHoverButton" data-dropdown-toggle="dropdownRadioBgHover" class="text-blue bg-primary-100 hover:bg-green font-medium rounded-lg text-xs px-4 py-2.5 text-center inline-flex items-center" type="button">Location <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                    <div id="dropdownRadioBgHover" class="hidden z-10 w-48 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                        <ul class="p-3 space-y-1 text-sm text-gray-700" aria-labelledby="dropdownRadioBgHoverButton">
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-4" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-4" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Dobi desert</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input checked id="default-radio-5" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-5" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Member City</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Ruins of Old Member City</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Sibyl Park</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Chillden</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">S.E.E.D</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Sibyl</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Dronia</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Pompadronia</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Pompa</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Herbarium</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Fanghorn</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Darkhorn</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Faustenburg</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">X12SPA-TF</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Satellites of Datura</label>
                            </div>
                          </li>
                        </ul>
                    </div>
                  {/* family */}
                    <button id="dropdownRadioBgHoverButton" data-dropdown-toggle="dropdownRadioBgHover" class="text-blue bg-primary-100 hover:bg-green font-medium rounded-lg text-xs px-4 py-2.5 text-center inline-flex items-center" type="button">Family <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                    <div id="dropdownRadioBgHover" class="hidden z-10 w-48 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                        <ul class="p-3 space-y-1 text-sm text-gray-700" aria-labelledby="dropdownRadioBgHoverButton">
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-4" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-4" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">The Juzephinos Family</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input checked id="default-radio-5" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-5" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Greatoldsmartens Dynasty</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">The NewWavers Clan</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">The Milksalots Tribe</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">The OpenDudes Syndicate</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">The Millenialums</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">The Gonnacatchers Mob</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">The Kingstons Ring</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Le Cool Familia</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">The Order of Ozarksons</label>
                            </div>
                          </li>
                        </ul>
                    </div>
                  {/* occupation */}
                    <button id="dropdownRadioBgHoverButton" data-dropdown-toggle="dropdownRadioBgHover" class="text-blue bg-primary-100 hover:bg-green font-medium rounded-lg text-xs px-4 py-2.5 text-center inline-flex items-center" type="button">Occupation <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                    <div id="dropdownRadioBgHover" class="hidden z-10 w-48 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                        <ul class="p-3 space-y-1 text-sm text-gray-700" aria-labelledby="dropdownRadioBgHoverButton">
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-4" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-4" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Seed thief</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input checked id="default-radio-5" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-5" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Entertainer</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Architect</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Space Explorer</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Solar urticariatus</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Pilot</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Dew collector</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Ear removal specialist</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Secret keeper</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Astronaut</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">A revert-me-backer</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Insectologist</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Leaf Roller</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Puzzler</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Transponster</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Animalogist</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Storyteller</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Bullshit removal specialist</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Oracle</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Curling master</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Councilmember</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Antique collector</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Artist</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Shampoo thief</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Gardener</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Boulanger</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Coffee grinder</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Dreamer</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Tailor</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Student</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Accountant</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Grafitti artist</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Comedian</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Bard</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">City keeper</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Undecided</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Gondolier</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Rebel</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Scientist</label>
                            </div>
                          </li>
                        </ul>
                    </div>
                  {/* genetics */}
                    <button id="dropdownRadioBgHoverButton" data-dropdown-toggle="dropdownRadioBgHover" class="text-blue bg-primary-100 hover:bg-green font-medium rounded-lg text-xs px-4 py-2.5 text-center inline-flex items-center" type="button">Genetics <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                    <div id="dropdownRadioBgHover" class="hidden z-10 w-48 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                        <ul class="p-3 space-y-1 text-sm text-gray-700" aria-labelledby="dropdownRadioBgHoverButton">
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-4" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-4" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">The Juzephinos Family mark</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input checked id="default-radio-5" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-5" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Bigfoots</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">The Iron Wolf Tribe</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Leafers</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Azul</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Explorers</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Liberal</label>
                            </div>
                          </li>
                        </ul>
                    </div>
                  {/* health */}
                    <button id="dropdownRadioBgHoverButton" data-dropdown-toggle="dropdownRadioBgHover" class="text-blue bg-primary-100 hover:bg-green font-medium rounded-lg text-xs px-4 py-2.5 text-center inline-flex items-center" type="button">Health <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                    <div id="dropdownRadioBgHover" class="hidden z-10 w-48 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                        <ul class="p-3 space-y-1 text-sm text-gray-700" aria-labelledby="dropdownRadioBgHoverButton">
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-4" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-4" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">0-20</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input checked id="default-radio-5" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-5" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">20-40</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">40-60</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">60-80</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-6" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-6" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">80-100</label>
                            </div>
                          </li>
                        </ul>
                    </div>
                  {/* eyes */}
                    <button id="dropdownRadioHelperButton" data-dropdown-toggle="dropdownRadioHelper" class="text-blue bg-primary-100 hover:bg-green font-medium rounded-lg text-xs px-4 py-2.5 text-center inline-flex items-center" type="button">Eyes <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                    <div id="dropdownRadioHelper" class="hidden z-10 w-60 bg-white rounded divide-y divide-gray-100 shadow">
                        <ul class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioHelperButton">
                          <li>
                            <div class="flex p-2 rounded hover:bg-gray-100">
                              <div class="flex items-center h-5">
                                  <input id="helper-radio-4" name="helper-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                              </div>
                              <div class="ml-2 text-xs">
                                  <label for="helper-radio-4" class="font-medium text-gray-900">
                                    <div>Cyclops</div>
                                    <p id="helper-radio-text-4" class="text-xs font-normal text-gray-500">Able to see the future</p>
                                  </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="flex p-2 rounded hover:bg-gray-100">
                              <div class="flex items-center h-5">
                                  <input id="helper-radio-5" name="helper-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                              </div>
                              <div class="ml-2 text-sm">
                                  <label for="helper-radio-5" class="font-medium text-gray-900">
                                    <div>Cuegle</div>
                                    <p id="helper-radio-text-5" class="text-xs font-normal text-gray-500">Able to see your sins</p>
                                  </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="flex p-2 rounded hover:bg-gray-100">
                              <div class="flex items-center h-5">
                                  <input id="helper-radio-6" name="helper-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                              </div>
                              <div class="ml-2 text-sm">
                                  <label for="helper-radio-6" class="font-medium text-gray-900">
                                    <div>Pumpkin</div>
                                    <p id="helper-radio-text-6" class="text-xs font-normal text-gray-500">Bakes pies better than your grandma</p>
                                  </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="flex p-2 rounded hover:bg-gray-100">
                              <div class="flex items-center h-5">
                                  <input id="helper-radio-6" name="helper-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                              </div>
                              <div class="ml-2 text-sm">
                                  <label for="helper-radio-6" class="font-medium text-gray-900">
                                    <div>Sleepy</div>
                                    <p id="helper-radio-text-6" class="text-xs font-normal text-gray-500">Makes dreams come true</p>
                                  </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="flex p-2 rounded hover:bg-gray-100">
                              <div class="flex items-center h-5">
                                  <input id="helper-radio-6" name="helper-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                              </div>
                              <div class="ml-2 text-sm">
                                  <label for="helper-radio-6" class="font-medium text-gray-900">
                                    <div>Bunny</div>
                                    <p id="helper-radio-text-6" class="text-xs font-normal text-gray-500">Can turn itself into a carrot</p>
                                  </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="flex p-2 rounded hover:bg-gray-100">
                              <div class="flex items-center h-5">
                                  <input id="helper-radio-6" name="helper-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                              </div>
                              <div class="ml-2 text-sm">
                                  <label for="helper-radio-6" class="font-medium text-gray-900">
                                    <div>Demon</div>
                                    <p id="helper-radio-text-6" class="text-xs font-normal text-gray-500">Can set anyone on fire</p>
                                  </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="flex p-2 rounded hover:bg-gray-100">
                              <div class="flex items-center h-5">
                                  <input id="helper-radio-6" name="helper-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                              </div>
                              <div class="ml-2 text-sm">
                                  <label for="helper-radio-6" class="font-medium text-gray-900">
                                    <div>Chill</div>
                                    <p id="helper-radio-text-6" class="text-xs font-normal text-gray-500">Can automatically stream chillhop at will</p>
                                  </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="flex p-2 rounded hover:bg-gray-100">
                              <div class="flex items-center h-5">
                                  <input id="helper-radio-6" name="helper-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                              </div>
                              <div class="ml-2 text-sm">
                                  <label for="helper-radio-6" class="font-medium text-gray-900">
                                    <div>Tired</div>
                                    <p id="helper-radio-text-6" class="text-xs font-normal text-gray-500">Soaks up energy</p>
                                  </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="flex p-2 rounded hover:bg-gray-100">
                              <div class="flex items-center h-5">
                                  <input id="helper-radio-6" name="helper-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                              </div>
                              <div class="ml-2 text-sm">
                                  <label for="helper-radio-6" class="font-medium text-gray-900">
                                    <div>Angry</div>
                                    <p id="helper-radio-text-6" class="text-xs font-normal text-gray-500">Can provoke a fight</p>
                                  </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="flex p-2 rounded hover:bg-gray-100">
                              <div class="flex items-center h-5">
                                  <input id="helper-radio-6" name="helper-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                              </div>
                              <div class="ml-2 text-sm">
                                  <label for="helper-radio-6" class="font-medium text-gray-900">
                                    <div>Balloon</div>
                                    <p id="helper-radio-text-6" class="text-xs font-normal text-gray-500">Can inflate itself</p>
                                  </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="flex p-2 rounded hover:bg-gray-100">
                              <div class="flex items-center h-5">
                                  <input id="helper-radio-6" name="helper-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                              </div>
                              <div class="ml-2 text-sm">
                                  <label for="helper-radio-6" class="font-medium text-gray-900">
                                    <div>Teardrop</div>
                                    <p id="helper-radio-text-6" class="text-xs font-normal text-gray-500">Turns tears into wine</p>
                                  </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="flex p-2 rounded hover:bg-gray-100">
                              <div class="flex items-center h-5">
                                  <input id="helper-radio-6" name="helper-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                              </div>
                              <div class="ml-2 text-sm">
                                  <label for="helper-radio-6" class="font-medium text-gray-900">
                                    <div>Out</div>
                                    <p id="helper-radio-text-6" class="text-xs font-normal text-gray-500">Makes you wonder around without purpose</p>
                                  </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="flex p-2 rounded hover:bg-gray-100">
                              <div class="flex items-center h-5">
                                  <input id="helper-radio-6" name="helper-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                              </div>
                              <div class="ml-2 text-sm">
                                  <label for="helper-radio-6" class="font-medium text-gray-900">
                                    <div>Hmm</div>
                                    <p id="helper-radio-text-6" class="text-xs font-normal text-gray-500">Inflicts philosophical damage</p>
                                  </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="flex p-2 rounded hover:bg-gray-100">
                              <div class="flex items-center h-5">
                                  <input id="helper-radio-6" name="helper-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                              </div>
                              <div class="ml-2 text-sm">
                                  <label for="helper-radio-6" class="font-medium text-gray-900">
                                    <div>What</div>
                                    <p id="helper-radio-text-6" class="text-xs font-normal text-gray-500">Can make flora talk</p>
                                  </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="flex p-2 rounded hover:bg-gray-100">
                              <div class="flex items-center h-5">
                                  <input id="helper-radio-6" name="helper-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                              </div>
                              <div class="ml-2 text-sm">
                                  <label for="helper-radio-6" class="font-medium text-gray-900">
                                    <div>Pretty</div>
                                    <p id="helper-radio-text-6" class="text-xs font-normal text-gray-500">Able to turn everything to gold</p>
                                  </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="flex p-2 rounded hover:bg-gray-100">
                              <div class="flex items-center h-5">
                                  <input id="helper-radio-6" name="helper-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                              </div>
                              <div class="ml-2 text-sm">
                                  <label for="helper-radio-6" class="font-medium text-gray-900">
                                    <div>Joy</div>
                                    <p id="helper-radio-text-6" class="text-xs font-normal text-gray-500">Makes mushrooms sing</p>
                                  </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="flex p-2 rounded hover:bg-gray-100">
                              <div class="flex items-center h-5">
                                  <input id="helper-radio-6" name="helper-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                              </div>
                              <div class="ml-2 text-sm">
                                  <label for="helper-radio-6" class="font-medium text-gray-900">
                                    <div>Happy</div>
                                    <p id="helper-radio-text-6" class="text-xs font-normal text-gray-500">Can see your biggest dreams</p>
                                  </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="flex p-2 rounded hover:bg-gray-100">
                              <div class="flex items-center h-5">
                                  <input id="helper-radio-6" name="helper-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                              </div>
                              <div class="ml-2 text-sm">
                                  <label for="helper-radio-6" class="font-medium text-gray-900">
                                    <div>Java</div>
                                    <p id="helper-radio-text-6" class="text-xs font-normal text-gray-500">Can create paralel universes</p>
                                  </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="flex p-2 rounded hover:bg-gray-100">
                              <div class="flex items-center h-5">
                                  <input id="helper-radio-6" name="helper-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                              </div>
                              <div class="ml-2 text-sm">
                                  <label for="helper-radio-6" class="font-medium text-gray-900">
                                    <div>Joker</div>
                                    <p id="helper-radio-text-6" class="text-xs font-normal text-gray-500">Can make anyone laugh till they cry</p>
                                  </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="flex p-2 rounded hover:bg-gray-100">
                              <div class="flex items-center h-5">
                                  <input id="helper-radio-6" name="helper-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                              </div>
                              <div class="ml-2 text-sm">
                                  <label for="helper-radio-6" class="font-medium text-gray-900">
                                    <div>Monocle</div>
                                    <p id="helper-radio-text-6" class="text-xs font-normal text-gray-500">Is able to timetravel</p>
                                  </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="flex p-2 rounded hover:bg-gray-100">
                              <div class="flex items-center h-5">
                                  <input id="helper-radio-6" name="helper-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                              </div>
                              <div class="ml-2 text-sm">
                                  <label for="helper-radio-6" class="font-medium text-gray-900">
                                    <div>Glasses</div>
                                    <p id="helper-radio-text-6" class="text-xs font-normal text-gray-500">Can see through objects</p>
                                  </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="flex p-2 rounded hover:bg-gray-100">
                              <div class="flex items-center h-5">
                                  <input id="helper-radio-6" name="helper-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                              </div>
                              <div class="ml-2 text-sm">
                                  <label for="helper-radio-6" class="font-medium text-gray-900">
                                    <div>Glasses_star</div>
                                    <p id="helper-radio-text-6" class="text-xs font-normal text-gray-500">Can make anyone fall in love</p>
                                  </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="flex p-2 rounded hover:bg-gray-100">
                              <div class="flex items-center h-5">
                                  <input id="helper-radio-6" name="helper-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                              </div>
                              <div class="ml-2 text-sm">
                                  <label for="helper-radio-6" class="font-medium text-gray-900">
                                    <div>Sleeping_mask</div>
                                    <p id="helper-radio-text-6" class="text-xs font-normal text-gray-500">Is able to live both in dreams and the real world</p>
                                  </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="flex p-2 rounded hover:bg-gray-100">
                              <div class="flex items-center h-5">
                                  <input id="helper-radio-6" name="helper-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                              </div>
                              <div class="ml-2 text-sm">
                                  <label for="helper-radio-6" class="font-medium text-gray-900">
                                    <div>Pirate</div>
                                    <p id="helper-radio-text-6" class="text-xs font-normal text-gray-500">Is able to see the souls of lost Daturians</p>
                                  </label>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div class="flex p-2 rounded hover:bg-gray-100">
                              <div class="flex items-center h-5">
                                  <input id="helper-radio-6" name="helper-radio" type="radio" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"/>
                              </div>
                              <div class="ml-2 text-sm">
                                  <label for="helper-radio-6" class="font-medium text-gray-900">
                                    <div>Goggles</div>
                                    <p id="helper-radio-text-6" class="text-xs font-normal text-gray-500">Can create a snow storm</p>
                                  </label>
                              </div>
                            </div>
                          </li>
                        </ul>
                    </div>
                  {/* faction */}
                    <button id="dropdownRadioBgHoverButton" data-dropdown-toggle="dropdownRadioBgHover" class="text-blue bg-primary-100 hover:bg-green font-medium rounded-lg text-xs px-4 py-2.5 text-center inline-flex items-center" type="button">Faction <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                    <div id="dropdownRadioBgHover" class="hidden z-10 w-48 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                        <ul class="p-3 space-y-1 text-sm text-gray-700" aria-labelledby="dropdownRadioBgHoverButton">
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-4" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-4" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Natural</label>
                            </div>
                          </li>
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input checked id="default-radio-5" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-5" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Tech</label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    {/* flowers */}
                      <button id="dropdownRadioBgHoverButton" data-dropdown-toggle="dropdownRadioBgHover" class="text-blue bg-primary-100 hover:bg-green font-medium rounded-lg text-xs px-4 py-2.5 text-center inline-flex items-center" type="button">Flowers <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                      <div id="dropdownRadioBgHover" class="hidden z-10 w-48 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                        <ul class="p-3 space-y-1 text-sm text-gray-700" aria-labelledby="dropdownRadioBgHoverButton">
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-4" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-4" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Natural</label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    {/* accessories */}
                      <button id="dropdownRadioBgHoverButton" data-dropdown-toggle="dropdownRadioBgHover" class="text-blue bg-primary-100 hover:bg-green font-medium rounded-lg text-xs px-4 py-2.5 text-center inline-flex items-center" type="button">Accessories <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                      <div id="dropdownRadioBgHover" class="hidden z-10 w-48 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                        <ul class="p-3 space-y-1 text-sm text-gray-700" aria-labelledby="dropdownRadioBgHoverButton">
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-4" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-4" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Natural</label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    {/* type */}
                      <button id="dropdownRadioBgHoverButton" data-dropdown-toggle="dropdownRadioBgHover" class="text-blue bg-primary-100 hover:bg-green font-medium rounded-lg text-xs px-4 py-2.5 text-center inline-flex items-center" type="button">Type <svg class="ml-2 w-4 h-4" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
                      <div id="dropdownRadioBgHover" class="hidden z-10 w-48 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                        <ul class="p-3 space-y-1 text-sm text-gray-700" aria-labelledby="dropdownRadioBgHoverButton">
                          <li>
                            <div class="flex items-center p-2 rounded hover:bg-gray-100">
                                <input id="default-radio-4" type="radio" value="" name="default-radio" class="w-4 h-4 text-blue-600 bg-gray-100"/>
                                <label for="default-radio-4" class="ml-2 w-full text-sm font-medium text-gray-900 rounded">Natural</label>
                            </div>
                          </li>
                        </ul>
                      </div>
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
