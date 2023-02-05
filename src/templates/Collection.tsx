import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
// import { Dropdown } from 'flowbite-react';
import LazyLoad from 'react-lazyload';

import { Meta } from '../layout/Meta';
import { Section } from '../layout/Section';
import { getFilteredMeta } from '../pages/api/filterApi';
import { AppConfig, NftContractAddress } from '../utils/AppConfig';
import DaturiansNFT from '../utils/artifacts/Daturians.json';
import { HeaderMenu } from './HeaderMenu';
import NFT from './Nft';
import SortFilter from './SortField';

type MetadataItems = {
  tokenId: number;
  image: string;
  name: string;
  description: string;
  // data: string;
  score: { score: number; rank: number; tokenId: string };
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
    name: 'Daturian',
    description: 'Daturian description',
    // data: '',
    score: { score: 0, rank: 0, tokenId: '0' },
  },
];

const sortStates = [
  { name: 'Top rank', type: 0, unavailable: false },
  { name: 'Bottom rank', type: 1, unavailable: false },
  { name: 'Newest', type: 2, unavailable: false },
  { name: 'Oldest', type: 3, unavailable: false },
];

// const filterTypeValues = [{ name: '', type: 0 }];

// const filterLocationValues = [{ name: '', type: 0 }];

// const filterFamilyValues = [{ name: '', type: 0 }];

// const filterOccupationValues = [{ name: '', type: 0 }];

// const filterEyesValues = [{ name: '', type: 0 }];

// const filterFactionValues = [{ name: '', type: 0 }];

// const filterFlowersValues = [{ name: '', type: 0 }];

// const filterAccessoriesValues = [{ name: '', type: 0 }];

// const filterGeneticsValues = [{ name: '', type: 0 }];

let scores = [{ score: 0, tokenId: 0, rank: 0 }];

const Collection = () => {
  const [totalNfts, setTotalNfts] = useState<MetadataItems>([]);
  const [nfts, setNfts] = useState<{
    nftData: MetadataItems;
    sortType: SortStateTypes;
  }>({
    nftData: [],
    sortType: sortStates[0],
  });
  const [query, setQuery] = useState('');
  // const [sortType, setSortType] = useState(sortStates[2]);
  // const [filterType, setFilterType] = useState([filterTypeValues[0]?.name]);
  // const [filterFamily, setFilterFamily] = useState([
  //   filterFamilyValues[0]?.name,
  // ]);
  // const [filterOccupation, setFilterOccupation] = useState([
  //   filterOccupationValues[0]?.name,
  // ]);
  // const [filterFaction, setFilterFaction] = useState([
  //   filterFactionValues[0]?.name,
  // ]);
  // const [filterFlowers, setFilterFlowers] = useState([
  //   filterFlowersValues[0]?.name,
  // ]);
  // const [filterAccessories, setFilterAccessories] = useState([
  //   filterAccessoriesValues[0]?.name,
  // ]);
  // const [filterGenetics, setFilterGenetics] = useState([
  //   filterGeneticsValues[0]?.name,
  // ]);
  // const [filterLocation, setFilterLocation] = useState([
  //   filterLocationValues[0]?.name,
  // ]);
  // const [filterEyes, setFilterEyes] = useState([filterEyesValues[0]?.name]);
  // const [currDispNumber, setCurrDispNumber] = useState(0);
  const [loadingScreen, setLoadingScreen] = useState(false);

  const setSortCallback = (value: {
    name: string;
    type: number;
    unavailable: boolean;
  }) => {
    setNfts({ ...nfts, sortType: value });
  };

  function addScores(nftData: MetadataItems) {
    const newNfts = nftData.map((item: any) => {
      item.score = scores.find((obj) => {
        return obj.tokenId === item.tokenId;
      });
      // ?.index;
      // });
      return item;
    });
    console.log(newNfts);
    return newNfts;
  }

  useEffect(() => {
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
        const scoresRes = await getFilteredMeta(`sort=desc&limit=${minted}`);
        const newScores = scoresRes.data;
        const newScoresSorted = newScores.sort((a: any, b: any) =>
          a.score > b.score ? -1 : 1
        );
        scores = newScoresSorted.map((item: any, index: any) => ({
          rank: index + 1,
          score: parseFloat(item.score.toFixed(2)),
          tokenId: item.tokenId,
          // ...item,
        }));
        console.log(scores);
        // const minted = 20;
        const ipfsUrl =
          'https://daturians.mypinata.cloud/ipfs/Qmc6GR4znHrxpFKCWDYkn8eeLgGHahKBA7VT4PTc5xENcH/';

        const tempDataArray = Array.from({ length: minted }, (_x, i) => i + 1);
        const items = tempDataArray.map((i: any) => {
          const item = {
            tokenId: i,
            image: `${ipfsUrl + String(i)}.png`,
            // image: `${i.toString()}.png`,
            name: `Daturian #${i.toString()}`,
            description: '',
            score: { score: 0, rank: 0, tokenId: '0' },
            // score: scores[i].score,
          };

          return item;
        });
        return items;
      } catch (err) {
        console.log(err);
        return initialItems;
      }
    }
    const promise = loadNfts();
    promise.then((data) => {
      const newData = addScores(data);

      setTotalNfts(newData);
      setNfts({ nftData: newData, sortType: sortStates[2] });
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

  // useEffect(() => {
  //   const promise3 = getFilteredMeta('filterName=Type&distinct=true');
  //   promise3.then((data2) => {
  //     const newItems = data2.data.map(
  //       (obj: { _id: { value: string } }, index: number) => {
  //         return {
  //           type: index,
  //           // eslint-disable-next-line no-underscore-dangle
  //           name: obj._id.value,
  //         };
  //       }
  //     );
  //     // console.log(newItems);
  //     filterTypeValues = newItems;
  //   });
  //   const promise4 = getFilteredMeta('filterName=Location&distinct=true');
  //   promise4.then((data3) => {
  //     const newItems = data3.data.map(
  //       (obj: { _id: { value: string } }, index: number) => {
  //         return {
  //           type: index,
  //           // eslint-disable-next-line no-underscore-dangle
  //           name: obj._id.value,
  //         };
  //       }
  //     );
  //     // console.log(newItems);
  //     filterLocationValues = newItems;
  //   });
  //   const promise5 = getFilteredMeta('filterName=Family&distinct=true');
  //   promise5.then((data3) => {
  //     const newItems = data3.data.map(
  //       (obj: { _id: { value: string } }, index: number) => {
  //         return {
  //           type: index,
  //           // eslint-disable-next-line no-underscore-dangle
  //           name: obj._id.value,
  //         };
  //       }
  //     );
  //     // console.log(newItems);
  //     filterFamilyValues = newItems;
  //   });
  //   const promise6 = getFilteredMeta('filterName=Occupation&distinct=true');
  //   promise6.then((data3) => {
  //     const newItems = data3.data.map(
  //       (obj: { _id: { value: string } }, index: number) => {
  //         return {
  //           type: index,
  //           // eslint-disable-next-line no-underscore-dangle
  //           name: obj._id.value,
  //         };
  //       }
  //     );
  //     // console.log(newItems);
  //     filterOccupationValues = newItems;
  //   });
  //   const promise7 = getFilteredMeta('filterName=Eyes&distinct=true');
  //   promise7.then((data4) => {
  //     const newItems = data4.data.map(
  //       (obj: { _id: { value: string } }, index: number) => {
  //         return {
  //           type: index,
  //           // eslint-disable-next-line no-underscore-dangle
  //           name: obj._id.value,
  //         };
  //       }
  //     );
  //     // console.log(newItems);
  //     filterEyesValues = newItems;
  //   });
  //   const promise8 = getFilteredMeta('filterName=Faction&distinct=true');
  //   promise8.then((data4) => {
  //     const newItems = data4.data.map(
  //       (obj: { _id: { value: string } }, index: number) => {
  //         return {
  //           type: index,
  //           // eslint-disable-next-line no-underscore-dangle
  //           name: obj._id.value,
  //         };
  //       }
  //     );
  //     // console.log(newItems);
  //     filterFactionValues = newItems;
  //   });
  //   const promise9 = getFilteredMeta('filterName=Flower&distinct=true');
  //   promise9.then((data4) => {
  //     const newItems = data4.data.map(
  //       (obj: { _id: { value: string } }, index: number) => {
  //         return {
  //           type: index,
  //           // eslint-disable-next-line no-underscore-dangle
  //           name: obj._id.value,
  //         };
  //       }
  //     );
  //     // console.log(newItems);
  //     filterFlowersValues = newItems;
  //   });
  //   const promise10 = getFilteredMeta('filterName=Accessories&distinct=true');
  //   promise10.then((data4) => {
  //     const newItems = data4.data.map(
  //       (obj: { _id: { value: string } }, index: number) => {
  //         return {
  //           type: index,
  //           // eslint-disable-next-line no-underscore-dangle
  //           name: obj._id.value,
  //         };
  //       }
  //     );
  //     // console.log(newItems);
  //     filterAccessoriesValues = newItems;
  //   });
  //   const promise11 = getFilteredMeta('filterName=Ears&distinct=true');
  //   promise11.then((data4) => {
  //     const newItems = data4.data.map(
  //       (obj: { _id: { value: string } }, index: number) => {
  //         return {
  //           type: index,
  //           // eslint-disable-next-line no-underscore-dangle
  //           name: obj._id.value,
  //         };
  //       }
  //     );
  //     // console.log(newItems);
  //     filterGeneticsValues = newItems;
  //   });
  // }, []);

  // whenever search value gets updated, we will update nfts list
  useEffect(() => {
    const newNfts = totalNfts.filter((value) =>
      value.name.toLowerCase().includes(query.toLowerCase())
    );
    // console.log(newNfts);
    // map again the scores:
    const newData = addScores(newNfts);
    // console.log('search effect');
    setNfts({ ...nfts, nftData: newData });
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
      if (sort_type.type === 0) {
        newNfts = oldNfts.sort((a, b) =>
          a.score.score > b.score.score ? -1 : 1
        );
      }
      // if bottom rank
      if (sort_type.type === 1) {
        newNfts = oldNfts.sort((a, b) =>
          a.score.score > b.score.score ? 1 : -1
        );
      }
      // if newest
      if (sort_type.type === 2) {
        newNfts = oldNfts.sort((a, b) => (a.tokenId > b.tokenId ? -1 : 1));
      }
      // if oldest
      if (sort_type.type === 3) {
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

  // whenever filter value is updated, change filters
  // useEffect(() => {
  //   const filterNfts = () => {
  //     let newQuery = '';
  //     const myQueries = [
  //       filterType.slice(1),
  //       filterLocation.slice(1),
  //       filterFamily.slice(1),
  //       filterOccupation.slice(1),
  //       filterEyes.slice(1),
  //       filterFaction.slice(1),
  //       filterFlowers.slice(1),
  //       filterAccessories.slice(1),
  //       filterGenetics.slice(1),
  //     ];
  //     // always slice out the first element
  //     for (let i = 0; i < myQueries.length; i += 1) {
  //       if (myQueries[i]!.length > 0) {
  //         newQuery += `&search=${myQueries[i]!.concat().join(',')}`;
  //       }
  //     }
  //     const promise3 = getFilteredMeta(`filterName=Type${newQuery}`);
  //     promise3.then((data2) => {
  //       const newData = addScores(data2.data);
  //       // setNfts([]);
  //       setNfts({ ...nfts, nftData: newData });
  //       setLoadingScreen(false);
  //     });
  //   };
  //   // if no filters, display all
  //   if (
  //     filterType.length === 1 &&
  //     filterLocation.length === 1 &&
  //     filterFamily.length === 1 &&
  //     filterOccupation.length === 1 &&
  //     filterEyes.length === 1 &&
  //     filterFaction.length === 1 &&
  //     filterFlowers.length === 1 &&
  //     filterAccessories.length === 1 &&
  //     filterGenetics.length === 1
  //   ) {
  //     const newNfts2 = addScores(totalNfts);
  //     setNfts({ ...nfts, nftData: newNfts2 });
  //     // console.log('setting newNfts');
  //   } else {
  //     // @ts-ignore
  //     setLoadingScreen(true);
  //     filterNfts();
  //   }
  //   setCurrDispNumber(nfts.nftData.length);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [
  //   filterType,
  //   filterLocation,
  //   filterFamily,
  //   filterOccupation,
  //   filterEyes,
  //   filterFaction,
  //   filterFlowers,
  //   filterAccessories,
  //   filterGenetics,
  //   totalNfts,
  //   nfts.nftData.length,
  // ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    await e.preventDefault();
    const newNfts = totalNfts.filter((value) =>
      value.name.toLowerCase().includes(query.toLowerCase())
    );
    // console.log(newNfts);
    const newNfts2 = addScores(newNfts);
    setNfts({ ...nfts, nftData: newNfts2 });
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
        title={AppConfig.collectionTitle}
        description={AppConfig.collectionDescription}
      />
      <HeaderMenu></HeaderMenu>
      <div className="flex justify-center">
        <div className="grid-cols-1 gap-5 max-auto px-3">
          <h1 className="text-3xl text-center">{AppConfig.collectionTitle}</h1>
          <div className="attributes-filter grid sm:grid-cols-5 md:grid-cols-3 gap-1">
            <div className="search-field sm:grid-cols-5 md:grid-cols-3 gap-1">
              <form
                onSubmit={handleSubmit}
                className="search rounded col-span-4"
              >
                <input
                  className="bg-secondary-100 shadow-md"
                  placeholder="Search for Daturian ID"
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
                  No Daturians match your search. Sorry...
                </h1>
              ) : (
                <div>
                  <div className="grid grid-cols-5">
                    {/* <div className="col-span-1 filters">
                      <div>
                        <GenericFilter
                          filterName={'Type'}
                          filterValues={filterTypeValues}
                          filterType={filterType}
                          setFilterType={setFilterType}
                        ></GenericFilter>
                      </div>
                      <div>
                        <GenericFilter
                          filterName={'Location'}
                          filterValues={filterLocationValues}
                          filterType={filterLocation}
                          setFilterType={setFilterLocation}
                        ></GenericFilter>
                      </div>
                      <div>
                        <GenericFilter
                          filterName={'Family'}
                          filterValues={filterFamilyValues}
                          filterType={filterFamily}
                          setFilterType={setFilterFamily}
                        ></GenericFilter>
                      </div>
                      <div>
                        <GenericFilter
                          filterName={'Occupation'}
                          filterValues={filterOccupationValues}
                          filterType={filterOccupation}
                          setFilterType={setFilterOccupation}
                        ></GenericFilter>
                      </div>
                      <div>
                        <GenericFilter
                          filterName={'Eyes'}
                          filterValues={filterEyesValues}
                          filterType={filterEyes}
                          setFilterType={setFilterEyes}
                        ></GenericFilter>
                      </div>
                    
                      <div>
                        <GenericFilter
                          filterName={'Faction'}
                          filterValues={filterFactionValues}
                          filterType={filterFaction}
                          setFilterType={setFilterFaction}
                        ></GenericFilter>
                      </div>
                      
                      <div>
                        <GenericFilter
                          filterName={'Flowers'}
                          filterValues={filterFlowersValues}
                          filterType={filterFlowers}
                          setFilterType={setFilterFlowers}
                        ></GenericFilter>
                      </div>
                      
                      <div>
                        <GenericFilter
                          filterName={'Accessories'}
                          filterValues={filterAccessoriesValues}
                          filterType={filterAccessories}
                          setFilterType={setFilterAccessories}
                        ></GenericFilter>
                      </div>
                      
                      <div>
                        <GenericFilter
                          filterName={'Genetics'}
                          filterValues={filterGeneticsValues}
                          filterType={filterGenetics}
                          setFilterType={setFilterGenetics}
                        ></GenericFilter>
                      </div>
                    </div> */}
                    <div className="grid col-span-5 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                      {nfts.nftData.map((nft, index) => (
                        <div className="widget-wrapper" key={index}>
                          <LazyLoad height={350} key={index}>
                            <NFT
                              key={nft.tokenId.toString()}
                              tokenId={nft.tokenId}
                              score={nft.score.score}
                              rank={nft.score.rank}
                              image={nft.image}
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

export default Collection;
