import React, { useEffect, useState, useCallback } from 'react';

import WalletConnectProvider from '@walletconnect/web3-provider';
import { BigNumber, ethers } from 'ethers';
import { useRouter } from 'next/router';
import Popup from 'reactjs-popup';
import Web3 from 'web3';
import Web3Modal from 'web3modal';

import { HeaderMenu } from './HeaderMenu';
import { useAppSelector } from '../hooks';
import { Meta } from '../layout/Meta';
import { Section } from '../layout/Section';
import { connect } from '../redux/blockchain/blockchainActions';
import { useAppDispatch } from '../redux/store';
import {
  AppConfig,
  ClaimConfig,
  NftContractAddress,
  Gen2ContractAddress,
  GreenhouseContractAddress,
} from '../utils/AppConfig';
import DaturiansNFT from '../utils/artifacts/Daturians.json';
import DaturiansGen2Abi from '../utils/artifacts/DaturiansGen2.json';
import Greenhouses from '../utils/artifacts/Greenhouses.json';

const truncate = (input: any, len: any) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

// web3modal setup
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      chainId: ClaimConfig.NETWORK.ID,
      infuraId: process.env.INFURA_ID,
      rpc: {
        137: process.env.INFURA_NETWORK_URL,
      },
    },
    network: 'matic',
  },
};

let web3Modal: Web3Modal;
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    cacheProvider: true,
    providerOptions, // required
  });
}

const ClaimDapp = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const blockchain = useAppSelector((state: any) => state.blockchain);
  const data = useAppSelector((state: any) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [connectedState, setConnectedState] = useState(false);
  const [feedback, setFeedback] = useState(``);
  const [isHovering, setIsHovered] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [nfts, setNfts] = useState<{
    nftData: number[];
  }>({
    nftData: [],
  });
  const [gen2Nfts, setGen2Nfts] = useState<{
    nftData: number[];
  }>({
    nftData: [],
  });

  const [selectedNfts, setSelectedNfts] = useState<number[]>([]);
  const [selectedGen2Nfts, setSelectedGen2Nfts] = useState<number[]>([]);
  const [selectedCollection, setSelectedCollection] = useState('');
  const [listOfTokenIds, setListOfTokenIds] = useState<number[]>([]);
  const [loadingState, setLoadingState] = useState(true);

  const handleSelectNft = (item: number) => {
    if (selectedGen2Nfts.length > 0) {
      // eslint-disable-next-line no-alert
      alert('You cannot select Gen1 NFTs when Gen2 NFTs are already selected.');
      return;
    }
    if (selectedNfts.length + selectedGen2Nfts.length < 10) {
      setNfts((prevState) => ({
        nftData: prevState.nftData.filter((nft) => nft !== item),
      }));
      setSelectedNfts((prevState) => [...prevState, item]);
    } else {
      // eslint-disable-next-line no-alert
      alert('You can select up to 10 NFTs in total.');
    }
  };

  const handleDeselectNft = (item: number) => {
    setSelectedNfts((prevState) => prevState.filter((nft) => nft !== item));
    setNfts((prevState) => ({
      nftData: [...prevState.nftData, item],
    }));
  };

  const handleSelect = (item: number) => {
    if (selectedNfts.length > 0) {
      // eslint-disable-next-line no-alert
      alert('You cannot select Gen2 NFTs when Gen1 NFTs are already selected.');
      return;
    }
    if (selectedNfts.length + selectedGen2Nfts.length < 10) {
      setGen2Nfts((prevState) => ({
        nftData: prevState.nftData.filter((nft) => nft !== item),
      }));
      setSelectedGen2Nfts((prevState) => [...prevState, item]);
    } else {
      // eslint-disable-next-line no-alert
      alert('You can select up to 10 NFTs in total.');
    }
  };

  const handleDeselect = (item: number) => {
    setSelectedGen2Nfts((prevState) => prevState.filter((nft) => nft !== item));
    setGen2Nfts((prevState) => ({
      nftData: [...prevState.nftData, item],
    }));
  };

  const logImages = [
    `${router.basePath}/assets/images/encyclopedia.png`,
    `${router.basePath}/assets/images/encyclopedia_open.png`,
  ];

  async function loadGen2Nfts(userAddress: string) {
    const contractAddress = Gen2ContractAddress;
    const abi = DaturiansGen2Abi;
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider(
      'https://polygon-mainnet.infura.io/v3/9c7953f2d4f54354b2538c0a40ed2539'
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
      console.log(userTokensList2);
      const minted = await contract.totalSupply.call();
      const mintedNumber = minted.toNumber();
      return [userTokensList2, mintedNumber];
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      return [[], 0];
    }
  }

  // const closeModalSuccess = () => setErrorMessage(false);
  async function getMintedGreenhouses() {
    const provider = new ethers.providers.JsonRpcProvider(
      'https://polygon-mainnet.infura.io/v3/9c7953f2d4f54354b2538c0a40ed2539'
    );
    const contract = new ethers.Contract(
      GreenhouseContractAddress,
      Greenhouses,
      provider
    );
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
    return mintedTokenIds;
  }

  async function loadNfts(userAddress: string) {
    console.log('!!!!!!!!!!1', userAddress);
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider(
      'https://polygon-mainnet.infura.io/v3/9c7953f2d4f54354b2538c0a40ed2539'
    );
    const contract = new ethers.Contract(
      NftContractAddress,
      DaturiansNFT.abi,
      provider
    );

    // get minted number and add scores
    try {
      const userTokensList = await contract.walletOfOwner(userAddress);
      console.log(userTokensList);
      const userTokensList2 = userTokensList.map((x: BigNumber) =>
        x.toNumber()
      );
      console.log(userTokensList2);
      const minted = await contract.totalMinted.call();
      // console.log(minted);
      const mintedNumber = minted.toNumber();
      console.log(mintedNumber);
      return [userTokensList2, mintedNumber];
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      return [[], 0];
    }
  }

  const connectToWallet = useCallback(async () => {
    // web3Modal.clearCachedProvider();
    web3Modal
      .connect()
      .then((connectedProvider) => {
        console.log(connectedProvider);
        dispatch(connect(connectedProvider));
        // Retrieve the account from connectedProvider
        const account =
          connectedProvider.selectedAddress || connectedProvider.accounts[0];

        const promise0 = getMintedGreenhouses();
        promise0.then((mintedGh) => {
          // load my nfts
          const promise = loadNfts(account);
          promise.then((nftData) => {
            const filteredNftData = nftData[0].filter(
              (nft: number) => !mintedGh.includes(nft)
            );
            setNfts({ nftData: filteredNftData });
            // load gen2 nfts
            const promise1 = loadGen2Nfts(account);
            promise1.then((data1) => {
              console.log(data1);
              const adjustedMintedGh = mintedGh.map(
                (nft: number) => nft - 4011
              );
              const filteredGen2NftData = data1[0].filter(
                (nft: number) => !adjustedMintedGh.includes(nft)
              );
              setGen2Nfts({ nftData: filteredGen2NftData });
              setConnectedState(true);
              setLoadingState(false);
              setFeedback('Claim your greenhouses here:');
            });
          });
        });
      })
      .catch((err: any) => {
        // eslint-disable-next-line no-console
        console.log(err);
        setFeedback('It seems you closed the WalletConnect pop-up.');
        setIsHovered(false);
        setConnectedState(false);
        setClaimingNft(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('listOfTokenIds updated:', listOfTokenIds);
    console.log('selectedCollection updated:', selectedCollection);
    console.log('selectedNfts updated:', selectedNfts);
    console.log('selectedGen2Nfts updated:', selectedGen2Nfts);
  }, [listOfTokenIds, selectedCollection, selectedNfts, selectedGen2Nfts]);

  useEffect(() => {
    if (
      blockchain.errorMsg === `Change network to ${ClaimConfig.NETWORK.NAME}.`
    ) {
      setConnectedState(false);
      setErrorMessage(true);
      setTimeout(() => {
        setErrorMessage(false);
      }, 3000);
      // createWeb3Modal();
      // eslint-disable-next-line no-console
      console.log(blockchain.errorMsg);
    } else if (blockchain.errorMsg !== '') {
      setErrorMessage(true);
      setTimeout(() => {
        setErrorMessage(false);
      }, 3000);
    }
  }, [blockchain, blockchain.errorMsg]);

  const claimNFTs = async () => {
    let currentSelectedNfts: React.SetStateAction<number[]> = [];
    let currentSelectedCollection = '';
    const gasLimit = ClaimConfig.GAS_LIMIT;
    const maxPriorityFee = String(ClaimConfig.MAX_PRIORITY_FEE);

    // select the relevant collection
    if (selectedNfts.length < 1 && selectedGen2Nfts.length < 1) {
      setFeedback('Please select at least one NFT.');
      return;
    }
    if (selectedNfts.length > 0) {
      currentSelectedNfts = selectedNfts;
      currentSelectedCollection = NftContractAddress;
      setSelectedCollection(currentSelectedCollection);
      setListOfTokenIds(currentSelectedNfts);
    }
    if (selectedGen2Nfts.length > 0) {
      currentSelectedNfts = selectedGen2Nfts;
      currentSelectedCollection = Gen2ContractAddress;
      setSelectedCollection(currentSelectedCollection);
      setListOfTokenIds(currentSelectedNfts);
    }
    setFeedback(`Claiming ${ClaimConfig.NFT_NAME}...`);
    setClaimingNft(true);

    const totalGasLimit = String(gasLimit * setListOfTokenIds.length);

    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        process.env.NEXT_PUBLIC_INFURA_NETWORK_URL!
      )
    );

    const gasPrice = await web3.eth.getGasPrice();
    const newGasPrice =
      Math.round(Number(gasPrice) * 1.4) + ClaimConfig.MAX_PRIORITY_FEE;
    console.log(listOfTokenIds);
    console.log(selectedCollection);
    blockchain.smartContract.methods
      .claim(currentSelectedNfts, currentSelectedCollection)
      .send({
        gas: String(totalGasLimit),
        maxPriorityFeePerGas: String(maxPriorityFee),
        maxFeePerGas: String(newGasPrice),
        to: ClaimConfig.CONTRACT_ADDRESS,
        from: blockchain.account,
      })
      .once('error', (_err: any) => {
        setFeedback('Something went wrong, please try again.');
        setClaimingNft(false);
      })
      .then((receipt: any) => {
        // eslint-disable-next-line no-console
        console.log(receipt);
        setFeedback(
          `Congrats, the ${ClaimConfig.NFT_NAME} are yours! Visit the Gallery to explore them.`
        );
        setSelectedGen2Nfts([]);
        setSelectedNfts([]);
        setListOfTokenIds([]);
        setSelectedCollection('');
        setClaimingNft(false);
      })
      .catch((e: any) => {
        // eslint-disable-next-line no-console
        console.log(e);
        setFeedback('It seems that user cancelled the action.');
        setClaimingNft(false);
      });
  };

  useEffect(() => {
    if (blockchain.account !== undefined && blockchain.smartContract !== null) {
      // eslint-disable-next-line no-console
      console.log('account connected: ', blockchain.account);
      console.log(blockchain.smartContract);
    } else {
      // eslint-disable-next-line no-console
      console.log('blockchain not set');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockchain.account]);

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
            console.log(addr);
            dispatch(connect(window.web3.currentProvider));
            // const address = addr[0];
            if (addr && addr.length > 0) {
              if (addr[0]!.length > 0) {
                const promise0 = getMintedGreenhouses();
                promise0.then((mintedGh) => {
                  console.log(mintedGh);
                  // setMintedGreenhouses(mintedGh);
                  // load my nfts
                  const promise = loadNfts(addr[0]!);
                  promise.then((nftData) => {
                    // console.log(data);

                    // setNfts({ nftData: nftData[0] });
                    const filteredNftData = nftData[0].filter(
                      (nft: number) => !mintedGh.includes(nft)
                    );
                    setNfts({ nftData: filteredNftData });
                    // load gen2 nfts
                    const promise1 = loadGen2Nfts(addr[0]!);
                    promise1.then((data1) => {
                      console.log(data1);
                      const adjustedMintedGh = mintedGh.map(
                        (nft: number) => nft - 4011
                      );
                      const filteredGen2NftData = data1[0].filter(
                        (nft2: number) => !adjustedMintedGh.includes(nft2)
                      );
                      setGen2Nfts({ nftData: filteredGen2NftData });
                      // getData();
                      setLoadingState(false);
                      setConnectedState(true);
                      setFeedback('Claim your greenhouses here:');
                    });
                  });
                });
              }
            } else {
              setIsHovered(false);
              setConnectedState(false);
              console.log('no address');
            }
            // Set User account into state
          })
          .catch(async (err) => {
            // eslint-disable-next-line no-console
            console.log(err);
            setFeedback('It seems you closed the WalletConnect pop-up.');
            setIsHovered(false);
            setConnectedState(false);
            setClaimingNft(false);
          });
      } else {
        setConnectedState(false);
      }
    };
    checkConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Section yPadding="py-2">
      <Meta
        title={AppConfig.mintTitle}
        description={AppConfig.mintDescription}
      />
      <HeaderMenu></HeaderMenu>
      <div className="flex justify-center">
        <Popup open={errorMessage}>
          <div className="modal-contact bg-primary-100 rounded-md">
            <div className="header-contact-us">
              <p>{blockchain.errorMsg}</p>
            </div>
          </div>
        </Popup>
        <div className="grid-cols-3 gap-5 max-auto px-3">
          {!connectedState ? (
            <>
              <img
                src={isHovering ? logImages[1] : logImages[0]}
                alt="book"
                className="pt-4"
              />
              <div className="justify-center mint-state">
                <button
                  className="font-bold mt-4 bg-dark text-white rounded shadow-lg mint-button"
                  onClick={(e) => {
                    if (connectedState === false) {
                      e.preventDefault();
                      connectToWallet();
                      setIsHovered(true);
                    } else {
                      e.preventDefault();
                      // eslint-disable-next-line no-console
                      console.log('already connected');
                    }
                  }}
                >
                  {`Connect wallet`}
                </button>
              </div>
            </>
          ) : (
            <>
              {!loadingState ? (
                <div className="justify-center">
                  {nfts.nftData.length > 0 || selectedNfts.length > 0 ? (
                    <>
                      <h1 className="px-20 pt-10 text-2l font-semibold text-center">{`Claim your ${ClaimConfig.NFT_NAME}`}</h1>
                      <h3 className="px-40 pb-10 text-2l text-center">
                        {`Click on ID numbers of the Daturians you own. You can
                         select up to 10 NFTs at a time. In case you hold
                        repeat the process.`}
                      </h3>
                      <div className="px-20 pb-5 col-span-3 gap-4 p-2">
                        <p className="">
                          From Gen1 you can claim:
                          <br />
                          {nfts.nftData.map((nftData, index) => (
                            <span
                              key={index}
                              onClick={() => handleSelectNft(nftData)}
                              style={{
                                cursor: 'cell',
                                marginRight: '10px',
                                borderRadius: '10px',
                                paddingRight: '5px',
                                paddingTop: '5px',
                                paddingBottom: '5px',
                                backgroundColor: '#D8DFFC',
                              }}
                            >
                              {nftData}
                            </span>
                          ))}
                        </p>
                      </div>
                      <div className="px-20 pb-5 col-span-3 gap-4 p-4">
                        <p className="">
                          Selected Gen1 NFTs:
                          <br />
                          {selectedNfts.map((nftData, index) => (
                            <span
                              key={index}
                              onClick={() => handleDeselectNft(nftData)}
                              style={{
                                cursor: 'cell',
                                marginRight: '10px',
                                borderRadius: '10px',
                                paddingRight: '5px',
                                paddingTop: '5px',
                                paddingBottom: '5px',
                                backgroundColor: '#AAFC0D',
                              }}
                            >
                              {' '}
                              {nftData}
                            </span>
                          ))}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <h4>{`It looks like you don't have any gen1 Daturians`}</h4>
                    </>
                  )}
                  <div className="justify-center">
                    {gen2Nfts.nftData.length > 0 ||
                    selectedGen2Nfts.length > 0 ? (
                      <>
                        <div className="col-span-3">
                          <p className="">
                            From Gen2 you can claim:
                            {gen2Nfts.nftData.map((nftData, index) => (
                              <span
                                key={index}
                                onClick={() => handleSelect(nftData)}
                                style={{
                                  cursor: 'cell',
                                  marginRight: '10px',
                                  borderRadius: '10px',
                                  paddingRight: '5px',
                                  paddingTop: '5px',
                                  paddingBottom: '5px',
                                  backgroundColor: '#D8DFFC',
                                }}
                              >
                                {nftData}
                              </span>
                            ))}
                          </p>
                        </div>
                        <div className="px-20 pb-10 col-span-3 gap-4 p-4">
                          <p className="">
                            Selected Gen2 NFTs:
                            {selectedGen2Nfts.map((nftData, index) => (
                              <span
                                key={index}
                                onClick={() => handleDeselect(nftData)}
                                style={{
                                  cursor: 'cell',
                                  marginRight: '10px',
                                  borderRadius: '10px',
                                  paddingRight: '5px',
                                  paddingTop: '5px',
                                  paddingBottom: '5px',
                                  backgroundColor: '#AAFC0D',
                                }}
                              >
                                {nftData}
                              </span>
                            ))}
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <h4>{`It looks like you don't have any gen2 Daturians`}</h4>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <></>
              )}
            </>
          )}
          <div className="responsive-wrapper">
            <div>
              {Number(data.totalSupply) >= ClaimConfig.MAX_SUPPLY ? (
                <>
                  <p className="text-title">{`The sale has ended.`}</p>
                  <p className="mint-find-description">
                    You can still find {ClaimConfig.NFT_NAME} on
                  </p>
                  <a
                    className="opensea"
                    target="_blank"
                    href={ClaimConfig.MARKETPLACE_LINK}
                    rel="noreferrer"
                  >
                    {ClaimConfig.MARKETPLACE}
                  </a>
                </>
              ) : (
                <>
                  {blockchain.account === '' ||
                  blockchain.smartContract === null ? (
                    <div className="flex justify-center">
                      {blockchain.errorMsg !== '' ? (
                        <>
                          <p className="mint-description mint-error">
                            {blockchain.errorMsg}
                          </p>
                        </>
                      ) : null}
                    </div>
                  ) : (
                    <div className="justify-center">
                      <div className="flex justify-center">
                        <p className="mint-description">{feedback}</p>
                      </div>
                      {!loadingState && connectedState ? (
                        <>
                          {gen2Nfts.nftData.length > 0 ||
                          nfts.nftData.length > 0 ? (
                            <>
                              <div className="main-mint-btn">
                                <button
                                  className="btn btn-regular mint-styled-button"
                                  disabled={!!claimingNft}
                                  onClick={(e: any) => {
                                    e.preventDefault();
                                    claimNFTs();
                                  }}
                                >
                                  {claimingNft ? 'CLAIMING' : 'CLAIM'}
                                </button>
                              </div>
                              <div className="flex justify-center">
                                <p className="disclaimer">
                                  {`We recommend that you don't lower the gas limit. If you do, go for automatic 'high' option on MetaMask.`}
                                </p>
                              </div>
                              <p className="mint-description flex justify-center">
                                <a
                                  className="contract-address"
                                  target="_blank"
                                  href={ClaimConfig.SCAN_LINK}
                                  rel="noreferrer"
                                >
                                  Greenhouses contract address on PolygonScan:
                                  <br />
                                  {truncate(ClaimConfig.CONTRACT_ADDRESS, 42)}
                                </a>
                              </p>
                            </>
                          ) : (
                            <div className="flex justify-center">
                              <p className="mint-description">
                                {`You do not have any ${ClaimConfig.NFT_NAME} to claim :( `}
                              </p>
                            </div>
                          )}
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export { ClaimDapp };
