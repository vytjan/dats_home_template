import React, { useEffect, useState, useCallback } from 'react';

import WalletConnectProvider from '@walletconnect/web3-provider';
import { useRouter } from 'next/router';
import Popup from 'reactjs-popup';
import Web3Modal from 'web3modal';

import { useAppSelector } from '../hooks';
import { Meta } from '../layout/Meta';
import { Section } from '../layout/Section';
import { connect } from '../redux/blockchain/blockchainActions';
import { fetchData } from '../redux/data/dataActions';
import { useAppDispatch } from '../redux/store';
import { AppConfig, MintConfig } from '../utils/AppConfig';
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
      chainId: MintConfig.NETWORK.ID,
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

const MintDapp = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const blockchain = useAppSelector((state: any) => state.blockchain);
  const data = useAppSelector((state: any) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [connectedState, setConnectedState] = useState(false);
  const [feedback, setFeedback] = useState(
    `Price: ${MintConfig.DISPLAY_COST} MATIC`
  );
  const [mintAmount, setMintAmount] = useState(1);
  const [isHovering, setIsHovered] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const logImages = [
    `${router.basePath}/assets/images/encyclopedia.png`,
    `${router.basePath}/assets/images/encyclopedia_open.png`,
  ];

  // const closeModalSuccess = () => setErrorMessage(false);

  useEffect(() => {
    if (
      blockchain.errorMsg === `Change network to ${MintConfig.NETWORK.NAME}.`
    ) {
      setConnectedState(false);
      setErrorMessage(true);
      setTimeout(() => {
        setErrorMessage(false);
      }, 3000);
      // createWeb3Modal();
      console.log(blockchain.errorMsg);
    } else if (blockchain.errorMsg !== '') {
      setErrorMessage(true);
      setTimeout(() => {
        setErrorMessage(false);
      }, 3000);
    }
  }, [blockchain, blockchain.errorMsg]);

  const claimNFTs = () => {
    const cost = MintConfig.WEI_COST;
    const gasLimit = MintConfig.GAS_LIMIT;
    // const gasPrice = CONFIG.GAS_PRICE;
    const totalCostWei = String(cost * mintAmount);
    const totalGasLimit = String(gasLimit * mintAmount);
    const maxPriorityFee = String(MintConfig.MAX_PRIORITY_FEE);
    const maxFeeGas = String(MintConfig.MAX_FEE_PER_GAS);
    setFeedback(`Minting ${MintConfig.NFT_NAME}...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(mintAmount)
      // .whitelistedMint(mintAmount)
      .send({
        gas: String(totalGasLimit),
        maxPriorityFeePerGas: String(maxPriorityFee),
        maxFeePerGas: String(maxFeeGas),
        to: MintConfig.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once('error', (_err: any) => {
        setFeedback('Something went wrong, please try again.');
        setClaimingNft(false);
      })
      .then((receipt: any) => {
        console.log(receipt);
        setFeedback(
          `Congrats, the ${MintConfig.NFT_NAME} is yours! Visit Opensea.io to view it.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      })
      .catch((e: any) => {
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
    if (newMintAmount > 10) {
      newMintAmount = 10;
    }
    setMintAmount(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== '' && blockchain.smartContract !== null) {
      // console.log(blockchain.account);
      // console.log(blockchain.smartContract);
      dispatch(fetchData(blockchain.account));
      // console.log(data);
    } else {
      // console.log('blockchain not set');
    }
  };

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  const connectToWallet = useCallback(async () => {
    web3Modal.clearCachedProvider();
    web3Modal
      .connect()
      .then((connectedProvider) => {
        // console.log(connectedProvider);
        dispatch(connect(connectedProvider));
        getData();
        setConnectedState(true);
      })
      .catch((err: any) => {
        console.log(err);
        setFeedback('It seems you closed the WalletConnect pop-up.');
        setIsHovered(false);
        setConnectedState(false);
        setClaimingNft(false);
      });
  }, []);

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
          <div className="top-logo flex justify-center">
            <img
              className="styled-logo"
              alt={'logo'}
              src={`${router.basePath}/assets/images/logo.svg`}
            />
            <p className="mint-number">
              {data.totalSupply} / {MintConfig.MAX_SUPPLY}
            </p>
          </div>
          <p className="mint-description flex justify-center">
            <a
              className="contract-address"
              target="_blank"
              href={MintConfig.SCAN_LINK}
              rel="noreferrer"
            >
              {truncate(MintConfig.CONTRACT_ADDRESS, 42)}
            </a>
          </p>
          <div>
            <img
              src={isHovering ? logImages[1] : logImages[0]}
              alt="book"
              className="book"
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
              {Number(data.totalSupply) >= MintConfig.MAX_SUPPLY ? (
                <>
                  <p className="text-title">{`The sale has ended.`}</p>
                  <p className="mint-find-description">
                    You can still find {MintConfig.NFT_NAME} on
                  </p>
                  <a
                    className="opensea"
                    target="_blank"
                    href={MintConfig.MARKETPLACE_LINK}
                    rel="noreferrer"
                  >
                    {MintConfig.MARKETPLACE}
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
                            getData();
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

export { MintDapp };
