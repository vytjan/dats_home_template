import React, { useEffect, useState } from 'react';

import WalletConnectProvider from '@walletconnect/web3-provider';
import { useRouter } from 'next/router';
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

const MintDapp = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const blockchain = useAppSelector((state: any) => state.blockchain);
  const data = useAppSelector((state: any) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [connectedState, setConnectedState] = useState(false);
  const [feedback, setFeedback] = useState(
    `Click "MINT" to mint your DATURIANS NFT.`
  );
  const [mintAmount, setMintAmount] = useState(1);
  const [isHovering, setIsHovered] = useState(false);

  const logImages = [
    `${router.basePath}/assets/images/encyclopedia.png`,
    `${router.basePath}/assets/images/encyclopedia_open.png`,
  ];

  // web3modal setup
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        chainId: MintConfig.NETWORK.ID,
        infuraId: MintConfig.INFURA_ID,
        rpc: {
          137: MintConfig.NETWORK_URL,
        },
      },
      network: 'matic',
    },
  };

  let web3Modal: Web3Modal;
  const createWeb3Modal = () => {
    web3Modal = new Web3Modal({
      cacheProvider: false,
      providerOptions,
    });
    // return web3Modal;
  };

  useEffect(() => {
    createWeb3Modal();
  }, []);

  const claimNFTs = () => {
    const cost = MintConfig.WEI_COST;
    const gasLimit = MintConfig.GAS_LIMIT;
    // const gasPrice = CONFIG.GAS_PRICE;
    const totalCostWei = String(cost * mintAmount);
    const totalGasLimit = String(gasLimit * mintAmount);
    const maxPriorityFee = String(MintConfig.MAX_PRIORITY_FEE);
    const maxFeeGas = String(MintConfig.MAX_FEE_PER_GAS);
    setFeedback(`Minting your ${MintConfig.NFT_NAME}...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(mintAmount)
      .send({
        gas: String(totalGasLimit),
        maxPriorityFeePerGas: String(maxPriorityFee),
        maxFeePerGas: String(maxFeeGas),
        to: MintConfig.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once('error', (_err: any) => {
        setFeedback('Oopsy, something went wrong! Please try again.');
        setClaimingNft(false);
      })
      .then((receipt: any) => {
        console.log(receipt);
        setFeedback(
          `Congrats, the ${MintConfig.NFT_NAME} is yours! go visit Opensea.io to view it.`
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
      console.log(blockchain.account);
      console.log(blockchain.smartContract);
      dispatch(fetchData(blockchain.account));
      console.log(data);
    } else {
      console.log('blockchain not set');
    }
  };

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  // console.log(web3Modal);
  return (
    <Section yPadding="py-2">
      <Meta
        title={AppConfig.mintTitle}
        description={AppConfig.mintDescription}
      />
      <HeaderMenu></HeaderMenu>
      <div className="flex justify-center">
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
            <a href="">
              <img
                src={isHovering ? logImages[1] : logImages[0]}
                alt="book"
                className="book"
                // src={logImages[0]}
                onClick={(e) => {
                  if (connectedState === false) {
                    setIsHovered(true);
                    e.preventDefault();
                    web3Modal.clearCachedProvider();
                    web3Modal
                      .connect()
                      .then((connectedProvider) => {
                        console.log(connectedProvider);
                        dispatch(connect(connectedProvider));
                        getData();
                        setConnectedState(true);
                      })
                      .catch((err: any) => {
                        console.log(err);
                        setFeedback(
                          'It seems that user closed the WalletConnect pop-up.'
                        );
                        setIsHovered(false);
                        setConnectedState(false);
                        setClaimingNft(false);
                      });
                  } else {
                    e.preventDefault();
                    console.log('already connected');
                  }
                }}
              />
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
                          <p className="mint-description">
                            {blockchain.errorMsg}
                          </p>
                        </>
                      ) : null}
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <p className="mint-description">{feedback}</p>
                      <div>
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
                      <div>
                        <button
                          className="btn btn-regular mint-styled-button"
                          disabled={!!claimingNft}
                          onClick={(e: any) => {
                            e.preventDefault();
                            claimNFTs();
                            getData();
                          }}
                        >
                          {claimingNft ? 'BUSY' : 'MINT'}
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
              {`We recommend that you don't lower the gas limit.`}
            </p>
          </div>
          {/* </div> */}
        </div>
      </div>
    </Section>
  );
};

export { MintDapp };
