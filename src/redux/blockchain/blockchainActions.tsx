// constants
import Router from 'next/router';
// import { useRouter } from 'next/router';
import Web3 from 'web3';

// import type {Contract} from 'web3-eth-contract';
// Import the AbiItem and AbiFragment types from the 'web3-utils' module

// import Abi from '../config/Greenhouses.json';
// log
import {
  CONNECTION_REQUEST,
  CONNECTION_SUCCESS,
  CONNECTION_FAILED,
  UPDATE_ACCOUNT,
} from './blockchainReducer';
import { ClaimConfig } from '../../utils/AppConfig';
import { MyAbi } from '../config/GreenhousesABI';

// const abi: AbiItem[] = Abi.abi as unknown as AbiItem[];

const connectRequest = () => {
  return {
    type: CONNECTION_REQUEST,
  };
};

const connectSuccess = (payload: any) => {
  return {
    type: CONNECTION_SUCCESS,
    payload,
  };
};

const connectFailed = (payload: any) => {
  return {
    type: CONNECTION_FAILED,
    payload,
  };
};

const updateAccountRequest = (payload: any) => {
  return {
    type: UPDATE_ACCOUNT,
    payload,
  };
};

export const updateAccount = (account: any) => {
  return async (dispatch: any) => {
    dispatch(updateAccountRequest({ account }));
    // dispatch(fetchData(account));
    // console.log(dispatch(fetchData(account)));
    // dispatch(fetchData());
  };
};

export const connect = (connectedProvider: any) => {
  const router = Router;
  console.log(router.basePath);
  return async (dispatch: any) => {
    dispatch(connectRequest());
    // const abiResponse = await fetch(
    //   `${router.basePath}/src/utils/artifacts/Greenhouses.json`,
    //   {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Accept: 'application/json',
    //     },
    //   }
    // );
    // const abi = await abiResponse.json();
    // const abi = Greenhouses;
    // const configResponse = await fetch('./config/config.json', {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Accept: 'application/json',
    //   },
    // });
    // const CONFIG = await configResponse.json();
    const CONFIG = ClaimConfig;
    // console.log('got config');
    console.log(CONFIG);
    // const web3Contract = new Contract(abi, CONFIG.CONTRACT_ADDRESS, undefined);

    // web3Contract.setProvider(connectedProvider);
    const web3 = new Web3(connectedProvider); // inits web3 with the provider
    web3.setProvider(connectedProvider);
    // console.log('web3', web3);
    try {
      // get my address
      const accounts = await web3.eth.getAccounts();
      // console.log('accounts', accounts);

      // get the network id
      const networkId = await web3.eth.net.getId();
      // console.log('networkId', networkId);

      if (networkId === CONFIG.NETWORK.ID) {
        const SmartContractObj = new web3.eth.Contract(
          // @ts-ignore: Type error on line 101
          MyAbi,
          CONFIG.CONTRACT_ADDRESS,
          undefined
        );
        // console.log(SmartContractObj);
        dispatch(
          connectSuccess({
            account: accounts[0],
            smartContract: SmartContractObj,
            web3,
          })
        );

        try {
          const { ethereum } = window;
          if (ethereum) {
            // Add listeners start
            ethereum.on('accountsChanged', (accountsNew: any) => {
              dispatch(updateAccount(accountsNew[0]));
            });
            ethereum.on('chainChanged', () => {
              window.location.reload();
            });
          }
        } catch (error: any) {
          console.log('Most likely not using metamask', error);
        }
        // Add listeners end
      } else {
        console.log('Wrong network');
        // alert('Wrong network, please switch to Polygon');
        dispatch(
          connectFailed({
            errorMsg: `Change network to ${CONFIG.NETWORK.NAME}.`,
          })
        );
      }
    } catch (err: any) {
      console.log(err);
      // alert('Something went wrong, please contact the team');
      dispatch(connectFailed({ errorMsg: 'Something went wrong.' }));
    }
  };
};
