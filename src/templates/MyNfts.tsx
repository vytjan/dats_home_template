import { useEffect, useState } from 'react';

import { BigNumber, ethers } from 'ethers';
import { useRouter } from 'next/router';
import LazyLoad from 'react-lazyload';
import Web3 from 'web3';
import Web3Modal from 'web3modal';

import { Meta } from '../layout/Meta';
import { Section } from '../layout/Section';
import { getFilteredMeta } from '../pages/api/filterApi';
import {
  AppConfig,
  CafeContractAddress,
  NftContractAddress,
  SignatureContractAddress,
  UkraineContractAddress,
  Gen2ContractAddress,
} from '../utils/AppConfig';
import DaturiansNFT from '../utils/artifacts/Daturians.json';
import Daturians4Ukraine from '../utils/artifacts/Daturians4Ukraine.json';
import DaturiansCafe from '../utils/artifacts/DaturiansCafe.json';
import DaturiansGen2Abi from '../utils/artifacts/DaturiansGen2.json';
import DaturiansGreenhouse from '../utils/artifacts/DaturiansGreenhouse.json';
import { HeaderMenu } from './HeaderMenu';
import NFT from './Nft';
import NFTGen2 from './NftGen2';
import SignatureNFT from './SignatureNft';

let scores = [{ score: 0, tokenId: 0, rank: 0 }];

const initialItems: MetadataItems = [
  {
    tokenId: 0,
    image: '0.jpg',
    name: 'Daturian',
    description: 'Daturian description',
    score: { score: 0, rank: 0, tokenId: '0' },
  },
];

type MetadataItems = {
  tokenId: number;
  image: string;
  name: string;
  description: string;
  // data: string;
  score: { score: number; rank: number; tokenId: string };
}[];

type OtherMetadataItems = {
  tokenId: number;
  image: string;
  name: string;
  description: string;
}[];

const Gen2IpfsUrl =
  'https://bafybeihwbu6kskcvwuodhcetrispfl7uuc5fzgzed64tvjl2jvcugxwkjq.ipfs.w3s.link/';

const ipfsUrls = {
  ukraine: 'Qmbd165r7YAB7uLByZhyFGfAELhnDDsSEVzLUBXV5fixgH/',
  signature: 'QmNM1d3eB6TvBVPCvYaNyfzUZzvyftzSYDXtrf2VTHurqB/',
  cafe: 'QmNdrtj574jwom85KfhptH72bz1BLAgHd7n26LNkqXXC2M/',
};

//  roles to image mapping:
const roleDescriptions = {
  none: { name: 'None', image: '/assets/images/icons/mobile-logo.png' },
  artifact: {
    name: 'Artifact holder',
    image: '/assets/images/gallery/roles/Artifact_holder.png',
  },
  casual: {
    name: 'Casual holder',
    image: '/assets/images/gallery/roles/Casual_holder.png',
  },
  fancy: {
    name: 'Fancy holder',
    image: '/assets/images/gallery/roles/Fancy_holder.png',
  },
  legendary: {
    name: 'Legendary holder',
    image: '/assets/images/gallery/roles/Legendary_holder.png',
  },
  magic_shroom: {
    name: 'Magic shroom',
    image: '/assets/images/gallery/roles/Magic_shroom.png',
  },
  master: {
    name: 'Master of herbs',
    image: '/assets/images/gallery/roles/Master_of_herbs.png',
  },
  emperor: {
    name: 'Datura emperor',
    image: '/assets/images/gallery/roles/Datura_emperor.png',
  },
};

// export default function LoadNFTs(cookieData) {
const MyNFTs = () => {
  const [nfts, setNfts] = useState<{
    nftData: MetadataItems;
  }>({
    nftData: [],
  });
  const [gen2Nfts, setGen2Nfts] = useState<{
    nftData: MetadataItems;
  }>({
    nftData: [],
  });
  const [uaNfts, setUaNfts] = useState<{
    nftData: OtherMetadataItems;
  }>({
    nftData: [],
  });
  const [signatureNfts, setSignatureNfts] = useState<{
    nftData: OtherMetadataItems;
  }>({
    nftData: [],
  });
  const [cafeNfts, setCafeNfts] = useState<{
    nftData: OtherMetadataItems;
  }>({
    nftData: [],
  });
  const [address, setAddress] = useState('');
  const [loadingState, setLoadingState] = useState(true);
  const [rank, setRank] = useState(0);
  const [role, setRole] = useState({ name: '', image: '' });
  const [count, setCount] = useState(0);
  // const router = useRouter()

  function addScores(nftData: MetadataItems | OtherMetadataItems) {
    const newNfts = nftData.map((item: any) => {
      item.score = scores.find((obj) => {
        return obj.tokenId === item.tokenId;
      });
      // ?.index;
      // });
      return item;
    });
    // console.log(newNfts);
    return newNfts;
  }

  function filterUsersNfts(nftData: MetadataItems, userTokens: Number[]) {
    const newNfts = nftData.filter((x) => userTokens.indexOf(x.tokenId) !== -1);
    return newNfts;
  }

  async function loadNfts(userAddress: string) {
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

    // get minted number and add scores
    try {
      const userTokensList = await contract.walletOfOwner(userAddress);
      // console.log(userTokensList);
      const userTokensList2 = userTokensList.map((x: BigNumber) =>
        x.toNumber()
      );
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
      // console.log(scores);
      const ipfsUrl =
        'https://daturians.mypinata.cloud/ipfs/Qmc6GR4znHrxpFKCWDYkn8eeLgGHahKBA7VT4PTc5xENcH/';

      const tempDataArray = Array.from({ length: minted }, (_x, i) => i + 1);
      const items = tempDataArray.map((i: any) => {
        const item = {
          tokenId: i,
          image: `${ipfsUrl + String(i)}.png`,
          name: `Daturian #${i.toString()}`,
          description: '',
          score: { score: 0, rank: 0, tokenId: '0' },
        };

        return item;
      });
      return [items, userTokensList2];
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      return initialItems;
    }
  }

  async function loadOtherNfts(
    userAddress: string,
    contractAddress: string,
    abi: any,
    ipfs: string
  ) {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider(
      'https://polygon-rpc.com/'
    );
    // const provider = new ethers.providers.JsonRpcProvider(node_url)
    const contract = new ethers.Contract(contractAddress, abi, provider);
    // get minted number
    try {
      const userTokensList = await contract.walletOfOwner(userAddress);
      // console.log(userTokensList);
      const userTokensList2 = userTokensList.map((x: BigNumber) =>
        x.toNumber()
      );
      const minted = await contract.totalMinted.call();
      const ipfsUrl = `https://daturians.mypinata.cloud/ipfs/${ipfs}`;

      const tempDataArray = Array.from({ length: minted }, (_x, i) => i + 1);
      const items = tempDataArray.map((i: any) => {
        const item = {
          tokenId: i,
          image: `${ipfsUrl + String(i)}.png`,
          name: `#${i.toString()}`,
          description: '',
        };

        return item;
      });
      return [items, userTokensList2];
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      return initialItems;
    }
  }

  async function loadGen2Nfts(
    userAddress: string,
    contractAddress: string,
    abi: any,
    ipfs: string
  ) {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider(
      'https://polygon-rpc.com/'
    );
    // const provider = new ethers.providers.JsonRpcProvider(node_url)
    const contract = new ethers.Contract(contractAddress, abi, provider);
    // get minted number
    try {
      const userTokensList = await contract.tokensOfOwner(userAddress);
      // console.log(userTokensList);
      const userTokensList2 = userTokensList.map((x: BigNumber) =>
        x.toNumber()
      );
      const minted = await contract.totalSupply.call();

      const tempDataArray = Array.from({ length: minted }, (_x, i) => i + 1);
      const items = tempDataArray.map((i: any) => {
        const item = {
          tokenId: i,
          image: `${ipfs + String(i)}.png`,
          name: `#${i.toString()}`,
          description: '',
        };

        return item;
      });
      return [items, userTokensList2];
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      return initialItems;
    }
  }

  // Roles:
  // - 1 Daturianas - Casual holder (Casual_holder.png)
  // - 2-4 Daturians - Fancy holder (Fancy_holder.png)
  // - 5-9 Daturians - Legendary holder (Legendary_holder.png)
  // - 10-19 Daturians - Artifact holder (Artifact_holder.png)
  // - 20-29 Daturians - Magic shroom (Magic_shroom.png)
  // - 30-59 Daturians - Master of herbs (Master_of_herbs.png)
  // - 60+ Daturians - Datura emperor (Datura_emperor.png)
  // ir jeigu turesi jegu/laiko/noro tai yra tiem kurie tik Ukrainiecius turi (Ukraine_supporter.png)

  async function connectToWallet() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    // console.log(connection);
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();
    setAddress(userAddress);

    // load my nfts
    const promise = loadNfts(userAddress);
    promise.then((data) => {
      // console.log(data);
      const newData = addScores(data[0]);

      const newData2 = filterUsersNfts(newData, data[1]);

      setNfts({ nftData: newData2 });
      // load gen2 nfts
      const promise1 = loadGen2Nfts(
        userAddress,
        Gen2ContractAddress,
        DaturiansGen2Abi,
        Gen2IpfsUrl
      );
      promise1.then((data1) => {
        // console.log(data1);

        const newGen2Data = filterUsersNfts(data1[0], data1[1]);

        setGen2Nfts({ nftData: newGen2Data });
        // load Ukraine nfts
        const promise2 = loadOtherNfts(
          userAddress,
          UkraineContractAddress,
          Daturians4Ukraine.abi,
          ipfsUrls.ukraine
        );
        promise2.then((data2) => {
          // console.log(data2);

          const newUaData = filterUsersNfts(data2[0], data2[1]);

          setUaNfts({ nftData: newUaData });
          const promise3 = loadOtherNfts(
            userAddress,
            SignatureContractAddress,
            DaturiansGreenhouse.abi,
            ipfsUrls.signature
          );
          promise3.then((data3) => {
            const newSignatureData = filterUsersNfts(data3[0], data3[1]);

            setSignatureNfts({ nftData: newSignatureData });
            const promise4 = loadOtherNfts(
              userAddress,
              CafeContractAddress,
              DaturiansCafe.abi,
              ipfsUrls.cafe
            );
            promise4.then((data4) => {
              const newCafeData = filterUsersNfts(data4[0], data4[1]);

              setCafeNfts({ nftData: newCafeData });
              // add the best ranked gen1 nft
              // const rankedBest = sortNfts();
              // console.log(rankedBest);
              // setRank(rankedBest || 0);
              // setRoles();
              setLoadingState(false);
            });
          });
        });
      });
      // setLoadingState(false);
    });
  }

  useEffect(() => {
    function sortNfts() {
      // console.log(sort_type.type);
      // const oldNfts = JSON.parse(JSON.stringify(nfts));
      let newNfts: MetadataItems = [];
      const oldNfts = nfts.nftData;
      // console.log(sort_type);
      // if top rank
      newNfts = oldNfts.sort((a, b) =>
        a.score.score > b.score.score ? -1 : 1
      );
      return newNfts[0]?.tokenId;
    }

    function setRoles() {
      const nftCount = nfts.nftData.length + gen2Nfts.nftData.length;
      if (nftCount === 0) {
        setRole(roleDescriptions.none);
      }
      if (nftCount === 1) {
        setRole(roleDescriptions.casual);
      }
      if (nftCount >= 2 && nftCount <= 4) {
        setRole(roleDescriptions.fancy);
      }
      if (nftCount >= 5 && nftCount <= 9) {
        setRole(roleDescriptions.legendary);
      }
      if (nftCount >= 10 && nftCount <= 19) {
        setRole(roleDescriptions.artifact);
      }
      if (nftCount >= 20 && nftCount <= 29) {
        setRole(roleDescriptions.magic_shroom);
      }
      if (nftCount >= 30 && nftCount <= 59) {
        setRole(roleDescriptions.master);
      }
      if (nftCount >= 60) {
        setRole(roleDescriptions.emperor);
      }
    }
    const rankedBest = sortNfts();
    console.log(rankedBest);
    setRank(rankedBest || 0);
    setRoles();
    setCount(nfts.nftData.length + gen2Nfts.nftData.length);
    setLoadingState(false);
  }, [nfts.nftData.length, gen2Nfts.nftData.length, nfts.nftData]);

  // check if there is an address connected
  useEffect(() => {
    const checkConnection = async () => {
      // Check if browser is running Metamask
      let web3;
      if (window.ethereum) {
        web3 = new Web3(window.ethereum);
      } else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
      }

      if (web3) {
        // Check if User is already connected by retrieving the accounts
        web3.eth
          .getAccounts()
          .then(async (addr) => {
            // console.log(addr);
            if (addr && addr.length > 0) {
              if (addr[0]!.length > 0) {
                setAddress(addr[0]!);
                const promise = loadNfts(addr[0]!);
                promise.then((data) => {
                  // console.log(data);
                  const newData = addScores(data[0]);

                  const newData2 = filterUsersNfts(newData, data[1]);

                  setNfts({ nftData: newData2 });
                  // load Gen2 nfts
                  const promise1 = loadGen2Nfts(
                    addr[0]!,
                    Gen2ContractAddress,
                    DaturiansGen2Abi,
                    Gen2IpfsUrl
                  );
                  promise1.then((data1) => {
                    // console.log(data1);

                    const newGen2Data = filterUsersNfts(data1[0], data1[1]);

                    setGen2Nfts({ nftData: newGen2Data });
                    // load Ukraine nfts
                    const promise2 = loadOtherNfts(
                      addr[0]!,
                      UkraineContractAddress,
                      Daturians4Ukraine.abi,
                      ipfsUrls.ukraine
                    );
                    promise2.then((data2) => {
                      // console.log(data2);

                      const newUaData = filterUsersNfts(data2[0], data2[1]);

                      setUaNfts({ nftData: newUaData });
                      const promise3 = loadOtherNfts(
                        addr[0]!,
                        SignatureContractAddress,
                        DaturiansGreenhouse.abi,
                        ipfsUrls.signature
                      );
                      promise3.then((data3) => {
                        const newSignatureData = filterUsersNfts(
                          data3[0],
                          data3[1]
                        );

                        setSignatureNfts({ nftData: newSignatureData });
                        const promise4 = loadOtherNfts(
                          addr[0]!,
                          CafeContractAddress,
                          DaturiansCafe.abi,
                          ipfsUrls.cafe
                        );
                        promise4.then((data4) => {
                          const newCafeData = filterUsersNfts(
                            data4[0],
                            data4[1]
                          );

                          setCafeNfts({ nftData: newCafeData });
                          // add the best ranked gen1 nft
                          // const rankedBest = sortNfts();
                          // console.log(rankedBest);
                          // setRank(rankedBest || 0);
                          // setRoles();
                          setLoadingState(false);
                        });
                      });
                    });
                    // setLoadingState(false);
                  });
                });
              }
              // console.log(addr)
            } else {
              setAddress('');
            }
            // Set User account into state
          })
          .catch(async (err) => {
            console.log(err);
          });
      }
    };
    checkConnection();
  }, []);
  const router = useRouter();
  return (
    <Section>
      <Meta
        title={AppConfig.collectionTitle}
        description={AppConfig.collectionDescription}
      />
      <HeaderMenu></HeaderMenu>

      <div className="flex justify-center">
        <div className="grid-cols-1 gap-5 max-auto px-3">
          {address.length === 0 ? (
            <div className="w flex flex-col pb-12">
              <button
                onClick={connectToWallet}
                className="font-bold mt-4 bg-dark text-white rounded p-4 shadow-lg connect-button"
              >
                Connect wallet
              </button>
              <img
                className="my_gallery_img sm:text-left sm:items-center sm:justify-between"
                src={`${router.basePath}/assets/images/gallery/my_gallery.png`}
                height="100%"
                width="100%"
                alt="Daturians"
              />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4 pb-4">
                {loadingState ? (
                  <>
                    <h3>Loading...</h3>
                  </>
                ) : (
                  <></>
                )}
                {loadingState &&
                role.name.length < 1 &&
                !nfts.nftData.length &&
                !gen2Nfts.nftData.length ? (
                  <div className="bg-primary-100 rounded-xl grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 pt-4 mt-4">
                    <div className="rounded-xl overflow-hidden">
                      <img
                        className="object-cover content-center home-logo"
                        src={`${`${router.basePath}/assets/images/icons/mobile-logo.png`}`}
                        alt="mobile-logo.png"
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    {/* role image */}
                    <div className="bg-primary-100 rounded-xl grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 pt-4 mt-4">
                      <div className="rounded-xl overflow-hidden">
                        <img
                          className="object-cover content-center"
                          src={`${router.basePath + role.image}`}
                          alt="mobile-logo.png"
                        />
                      </div>
                    </div>
                  </>
                )}
                <div className="col-span-2">
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 pt-4 ">
                    {loadingState &&
                    role.name.length < 1 &&
                    !nfts.nftData.length &&
                    !gen2Nfts.nftData.length ? (
                      <>
                        {/* Role name */}
                        <div className="bg-primary-100 content-gallery rounded-xl overflow-hidden col-span-1">
                          <div className="p-4 inline-flex">
                            <p className="text-2l font-semibold">Role name:</p>
                            <div>
                              <p className="font-semibold rank-number">
                                {'Loading...'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Role name */}
                        <div className="bg-primary-100 content-gallery rounded-xl overflow-hidden col-span-1">
                          <div className="p-4 inline-flex">
                            <p className="text-2l font-semibold">Role name:</p>
                            <div>
                              <p className="font-semibold rank-number">
                                {role.name}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {loadingState &&
                    !nfts.nftData.length &&
                    !gen2Nfts.nftData.length ? (
                      <></>
                    ) : (
                      <>
                        {/* Daturians owned */}
                        <div className="bg-primary-100 content-gallery rounded-xl overflow-hidden lg:col-span-1 sm:col-span-1">
                          <div className="p-4 inline-flex">
                            <p className="text-2l font-semibold">
                              {'You own: '}
                            </p>
                            <div>
                              <p className="font-light">
                                {count}
                                Daturians
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {/* location */}
                    <div className="bg-primary-100 content-gallery rounded-xl overflow-hidden lg:col-span-2 sm:col-span-3">
                      <div className="p-4 inline-flex">
                        <p className="text-2l font-semibold">
                          Most of your Daturians live in:
                        </p>
                        <div>
                          <p className="font-light">Pending...</p>
                        </div>
                      </div>
                    </div>
                    {loadingState &&
                    !nfts.nftData.length &&
                    !gen2Nfts.nftData.length &&
                    rank < 1 ? (
                      <></>
                    ) : (
                      <>
                        {/* Best ranked gen1 Daturian */}
                        <div className="bg-primary-100 content-gallery rounded-xl overflow-hidden lg:col-span-2 sm:col-span-3">
                          <div className="p-4 inline-flex">
                            <p className="text-2l font-semibold">
                              Best ranked Gen1 Daturian:
                            </p>
                            <div>
                              <p className="font-semibold rank-number">
                                {rank}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {/* gen2 daturians */}
              {loadingState && !gen2Nfts.nftData.length ? (
                <></>
              ) : (
                <>
                  <h1 className="text-3xl text-left">Gen2 Daturians</h1>
                  <div className="grid col-span-5 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                    {gen2Nfts.nftData.map((nft, index) => (
                      <div className="widget-wrapper" key={index}>
                        <LazyLoad height={350} key={index}>
                          <NFTGen2
                            key={nft.tokenId.toString()}
                            tokenId={nft.tokenId}
                            image={nft.image}
                          />
                        </LazyLoad>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {loadingState && !nfts.nftData.length ? (
                <></>
              ) : (
                <>
                  <h1 className="text-3xl text-left">Gen1 Daturians</h1>
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
                </>
              )}
              {/* Signature Daturians */}
              {loadingState && !signatureNfts.nftData.length ? (
                <></>
              ) : (
                <>
                  <h1 className="text-3xl text-left">Signature Daturians</h1>
                  <div className="grid col-span-5 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                    {signatureNfts.nftData.map((nft, index) => (
                      <div className="widget-wrapper" key={index}>
                        <LazyLoad height={350} key={index}>
                          <SignatureNFT
                            key={nft.tokenId.toString()}
                            tokenId={nft.tokenId}
                            image={nft.image}
                            collection_url="single_signature_nft"
                          />
                        </LazyLoad>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {/* Cafe Daturians */}
              {loadingState && !cafeNfts.nftData.length ? (
                <></>
              ) : (
                <>
                  <h1 className="text-3xl text-left">Collab pieces</h1>
                  <div className="grid col-span-5 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                    {cafeNfts.nftData.map((nft, index) => (
                      <div className="widget-wrapper" key={index}>
                        <LazyLoad height={350} key={index}>
                          <SignatureNFT
                            key={nft.tokenId.toString()}
                            tokenId={nft.tokenId}
                            image={nft.image}
                            collection_url="single_cafe_nft"
                          />
                        </LazyLoad>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {/* Daturians4Ukraine */}
              {loadingState && !uaNfts.nftData.length ? (
                <></>
              ) : (
                <>
                  <h1 className="text-3xl text-left">Ukrainian Daturians</h1>
                  <div className="grid col-span-5 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                    {uaNfts.nftData.map((nft, index) => (
                      <div className="widget-wrapper" key={index}>
                        <LazyLoad height={350} key={index}>
                          <SignatureNFT
                            key={nft.tokenId.toString()}
                            tokenId={nft.tokenId}
                            image={nft.image}
                            collection_url="single_ua_nft"
                          />
                        </LazyLoad>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </Section>
  );
};

export default MyNFTs;
