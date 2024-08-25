import React, { useEffect, useState, useCallback } from 'react';

import WalletConnectProvider from '@walletconnect/web3-provider';
import { BigNumber, ethers } from 'ethers';
import { useRouter } from 'next/router';
import Popup from 'reactjs-popup';
import Web3 from 'web3';
import Web3Modal from 'web3modal';

import { useAppSelector } from '../hooks';
import { Meta } from '../layout/Meta';
import { Section } from '../layout/Section';
import { connect } from '../redux/blockchain/blockchainActions';
import { fetchData } from '../redux/data/dataActions';
import { useAppDispatch } from '../redux/store';
import {
  AppConfig,
  ClaimConfig,
  NftContractAddress,
  Gen2ContractAddress,
} from '../utils/AppConfig';
import DaturiansNFT from '../utils/artifacts/Daturians.json';
import DaturiansGen2Abi from '../utils/artifacts/DaturiansGen2.json';
import { HeaderMenu } from './HeaderMenu';
// import CoinbaseWalletSDK from '@coinbase/wallet-sdk';
// import WalletLink from 'walletlink';

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
  const [feedback, setFeedback] = useState(`Claim your greenhouses here:`);
  // const [address, setAddress] = useState('');
  // const [accountsFetched, setAccountsFetched] = useState(false);
  const [mintAmount, setMintAmount] = useState(1);
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

  const handleSelectNft = (item: number) => {
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
      // 'https://polygon-rpc.com/'
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
      // const tempDataArray = Array.from(
      //   { length: mintedNumber },
      //   (_x, i) => i + 1
      // );
      return [userTokensList2, mintedNumber];
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      return [[], 0];
    }
  }

  // useEffect(() => {
  //   const fetchAccounts = async () => {
  //     let web3;
  //     if (window.ethereum) {
  //       web3 = new Web3(window.ethereum);
  //     } else if (window.web3) {
  //       web3 = new Web3(window.web3.currentProvider);
  //     }

  //     if (web3) {
  //       try {
  //         const addr = await web3.eth.getAccounts();
  //         console.log(addr);
  //         if (addr && addr.length > 0) {
  //           setAddress(addr[0]!);
  //           setAccountsFetched(true);
  //         }
  //       } catch (err: any) {
  //         console.error('Error getting accounts:', err.message);
  //       }
  //     }
  //   };

  //   fetchAccounts();
  // }, []);

  // const closeModalSuccess = () => setErrorMessage(false);
  async function loadNfts(userAddress: string) {
    console.log('!!!!!!!!!!1', userAddress);
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider(
      // 'https://polygon-rpc.com/'
      'https://polygon-mainnet.infura.io/v3/9c7953f2d4f54354b2538c0a40ed2539'
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

  const getData = () => {
    if (blockchain.account !== '' && blockchain.smartContract !== null) {
      // eslint-disable-next-line no-console
      console.log('account connected: ', blockchain.account);
      // console.log(blockchain.smartContract);
      dispatch(fetchData(blockchain.account));
      // console.log(data);
      // console.log(blockchain.g);
    } else {
      // eslint-disable-next-line no-console
      // console.log('account not set');
    }
  };

  const connectToWallet = useCallback(async () => {
    // web3Modal.clearCachedProvider();
    web3Modal
      .connect()
      .then((connectedProvider) => {
        // console.log(connectedProvider);
        dispatch(connect(connectedProvider));
        getData();
        setConnectedState(true);
        // load my nfts
        const promise = loadNfts(blockchain.account);
        promise.then((nftData) => {
          // console.log(data);

          setNfts({ nftData: nftData[0] });
          // load gen2 nfts
          const promise1 = loadGen2Nfts(blockchain.account);
          promise1.then((data1) => {
            console.log(data1);

            setGen2Nfts({ nftData: data1[0] });
            setConnectedState(true);
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

  // const connectToWallet = useCallback(async () => {
  //   console.log('EXECUTING CONNECT TO WALLET');
  //   const connection = await web3Modal.connect();
  //   // console.log(connection);
  //   const provider = new ethers.providers.Web3Provider(connection);
  //   const signer = provider.getSigner();
  //   const userAddress = await signer.getAddress();
  //   setAddress(userAddress);
  //   //       dispatch(connect(connectedProvider));

  //   // load my nfts
  //   const promise = loadNfts(userAddress);
  //   promise.then((nftData) => {
  //     // console.log(data);

  //     setNfts({ nftData: nftData[0] });
  //     // load gen2 nfts
  //     const promise1 = loadGen2Nfts(userAddress);
  //     promise1.then((data1) => {
  //       console.log(data1);

  //       setGen2Nfts({ nftData: data1[0] });
  //       setConnectedState(true);
  //     });
  //   });
  //   // setLoadingState(false);
  // }, []);

  // check if there is an address connected
  // useEffect(() => {
  //   const checkConnection = async () => {
  //     // Check if browser is running Metamask
  //     let web3;
  //     if (window.ethereum) {
  //       web3 = new Web3(window.ethereum);
  //     } else if (window.web3) {
  //       web3 = new Web3(window.web3.currentProvider);
  //     }

  //     if (web3) {
  //       // Check if User is already connected by retrieving the accounts
  //       web3.eth
  //         .getAccounts()
  //         .then(async (addr) => {
  //           console.log(addr);
  //           if (addr && addr.length > 0) {
  //             if (addr[0]!.length > 0) {
  //               setAddress(addr[0]!);
  //               console.log('Address is: ', addr[0]!);
  //               const promise = loadNfts(addr[0]!);
  //               promise.then((nftData) => {
  //                 console.log(nftData);

  //                 setNfts({ nftData: nftData[0] });
  //                 // load Gen2 nfts
  //                 const promise1 = loadGen2Nfts(addr[0]!);
  //                 promise1.then((data1) => {
  //                   // console.log(data1);

  //                   setGen2Nfts({ nftData: data1[0] });
  //                   setConnectedState(true);
  //                   // setLoadingState(false);
  //                 });
  //               });
  //             }
  //             // console.log(addr)
  //           } else {
  //             setAddress('');
  //           }
  //           // Set User account into state
  //         })
  //         .catch(async (err) => {
  //           // eslint-disable-next-line no-console
  //           console.log(err);
  //           setFeedback('It seems you closed the WalletConnect pop-up.');
  //           setIsHovered(false);
  //           setConnectedState(false);
  //           setClaimingNft(false);
  //         });
  //     }
  //   };
  //   checkConnection();
  // }, []);

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
    // const cost = ClaimConfig.WEI_COST;
    const gasLimit = ClaimConfig.GAS_LIMIT;
    // const totalCostWei = String(cost * mintAmount);
    const totalGasLimit = String(gasLimit * mintAmount);
    const maxPriorityFee = String(ClaimConfig.MAX_PRIORITY_FEE);

    setFeedback(`Minting ${ClaimConfig.NFT_NAME}...`);
    setClaimingNft(true);

    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        process.env.NEXT_PUBLIC_INFURA_NETWORK_URL!
      )
    );

    const gasPrice = await web3.eth.getGasPrice();
    const newGasPrice = Math.round(Number(gasPrice) * 1.4);
    blockchain.smartContract.methods
      .claim(mintAmount)
      // .whitelistedMint(mintAmount)
      .send({
        gas: String(totalGasLimit),
        maxPriorityFeePerGas: String(maxPriorityFee),
        maxFeePerGas: String(newGasPrice),
        to: ClaimConfig.CONTRACT_ADDRESS,
        from: blockchain.account,
        // value: totalCostWei,
      })
      .once('error', (_err: any) => {
        setFeedback('Something went wrong, please try again.');
        setClaimingNft(false);
      })
      .then((receipt: any) => {
        // eslint-disable-next-line no-console
        console.log(receipt);
        setFeedback(
          `Congrats, the ${ClaimConfig.NFT_NAME} are yours! Visit the Gallery to explore their story.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      })
      .catch((e: any) => {
        // eslint-disable-next-line no-console
        console.log(e);
        setFeedback('It seems that user cancelled the action.');
        setClaimingNft(false);
      });
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 20) {
      newMintAmount = 20;
    }
    setMintAmount(newMintAmount);
  };

  useEffect(() => {
    if (blockchain.account !== '' && blockchain.smartContract !== null) {
      // eslint-disable-next-line no-console
      console.log('account connected: ', blockchain.account);
      // console.log(blockchain.smartContract);
      dispatch(fetchData(blockchain.account));
      // console.log(data);
      // console.log(blockchain.g);
    } else {
      // eslint-disable-next-line no-console
      // console.log('blockchain not set');
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
            // console.log(addr);
            if (addr && addr.length > 0) {
              if (addr[0]!.length > 0) {
                const promise = loadNfts(addr[0]!);
                promise.then((nftData) => {
                  console.log(nftData);

                  setNfts({ nftData: nftData[0] });
                  // load Gen2 nfts
                  const promise1 = loadGen2Nfts(addr[0]!);
                  promise1.then((data1) => {
                    // console.log(data1);

                    setGen2Nfts({ nftData: data1[0] });
                    setConnectedState(true);
                    // setLoadingState(false);
                  });
                });
                dispatch(connect(window.web3.currentProvider));
                getData();
                setConnectedState(true);
              }
              // console.log(addr)
            } else {
              // setAddress('');
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
      }
    };
    checkConnection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const connectToWallet = useCallback(async () => {
  //   // web3Modal.clearCachedProvider();
  //   web3Modal
  //     .connect()
  //     .then((connectedProvider) => {
  //       // console.log(connectedProvider);
  //       dispatch(connect(connectedProvider));
  //       getData();
  //       setConnectedState(true);
  //     })
  //     .catch((err: any) => {
  //       // eslint-disable-next-line no-console
  //       console.log(err);
  //       setFeedback('It seems you closed the WalletConnect pop-up.');
  //       setIsHovered(false);
  //       setConnectedState(false);
  //       setClaimingNft(false);
  //     });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // Auto connect to the cached provider
  // useEffect(() => {
  //   if (web3Modal.cachedProvider) {
  //     connectToWallet();
  //   }
  // }, [connect]);

  // console.log(web3Modal);
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
          {/* <div className="flex flex-col pb-12 mint-container"> */}
          <div className="justify-center">
            <h3 className="text-title">{`Claim your ${ClaimConfig.NFT_NAME}`}</h3>
            <h4>In one go, you select up to 10 in total:</h4>
            <div className="col-span-3">
              <p className="">
                From Gen1 you can claim:
                {nfts.nftData.map((nftData, index) => (
                  <span
                    key={index}
                    onClick={() => handleSelectNft(nftData)}
                    style={{ cursor: 'pointer', marginRight: '5px' }}
                  >
                    {nftData}
                  </span>
                ))}
              </p>
            </div>
            <div className="col-span-3">
              <p className="">
                Selected Gen1 NFTs:
                {selectedNfts.map((nftData, index) => (
                  <span
                    key={index}
                    onClick={() => handleDeselectNft(nftData)}
                    style={{ cursor: 'pointer', marginRight: '5px' }}
                  >
                    {nftData}
                  </span>
                ))}
              </p>
            </div>
            <div className="col-span-3">
              <p className="">
                From Gen2 you can claim:
                {gen2Nfts.nftData.map((nftData, index) => (
                  <span
                    key={index}
                    onClick={() => handleSelect(nftData)}
                    style={{ cursor: 'pointer', marginRight: '5px' }}
                  >
                    {nftData}
                  </span>
                ))}
              </p>
            </div>
            <div className="col-span-3">
              <p className="">
                Selected Gen2 NFTs:
                {selectedGen2Nfts.map((nftData, index) => (
                  <span
                    key={index}
                    onClick={() => handleDeselect(nftData)}
                    style={{ cursor: 'pointer', marginRight: '5px' }}
                  >
                    {nftData}
                  </span>
                ))}
              </p>
            </div>
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
          <div>
            <img
              src={isHovering ? logImages[1] : logImages[0]}
              alt="book"
              className="pt-4"
            />
            <a href="">
              {!connectedState ? (
                <div className="flex justify-center mint-state">
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
              ) : (
                <div className="flex justify-center dingles">
                  <button></button>
                </div>
              )}
            </a>
          </div>
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
                        <div className="mint-numbers">
                          <button
                            className="btn btn-regular mint-styled-button-round"
                            disabled={!!claimingNft}
                            onClick={(e) => {
                              e.preventDefault();
                              decrementMintAmount();
                            }}
                          >
                            -
                          </button>
                          <p className="mint-description">{mintAmount}</p>
                          <button
                            className="btn btn-regular mint-styled-button-round"
                            disabled={!!claimingNft}
                            onClick={(e) => {
                              e.preventDefault();
                              incrementMintAmount();
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="main-mint-btn">
                        <button
                          className="btn btn-regular mint-styled-button"
                          disabled={!!claimingNft}
                          onClick={(e: any) => {
                            e.preventDefault();
                            claimNFTs();
                            // getData();
                          }}
                        >
                          {claimingNft ? 'MINTING' : 'MINT'}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="flex justify-center">
            <p className="disclaimer">
              {`We recommend that you don't lower the gas limit. If you do, go for automatic 'high' option on MetaMask.`}
            </p>
          </div>
          {/* </div> */}
        </div>
      </div>
    </Section>
  );
};

export { ClaimDapp };
