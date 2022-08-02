import { useState, useEffect } from 'react';

import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

import { NftContractAddress } from '../utils/AppConfig';
import DaturiansNFT from '../utils/artifacts/Daturians.json';

type MyWalletProps = {
  getNftsHeld: number;
  setNftsHeld: Function;
  toChild: string;
  sendToParent: Function;
  childSubmissions: number;
  sendSubmissions: Function;
  setSubmissionState: Function;
  submissionState: boolean;
};

type MmAccounts = Array<string>;

const MyWallet = (props: MyWalletProps) => {
  type NftItems = Awaited<ReturnType<typeof getNfts>>;
  const [nfts, setNfts] = useState<NftItems>([]);
  const [address, setAddress] = useState('');
  const [loadingState, setLoadingState] = useState('not-loaded');
  // const router = useRouter()
  // const ipfsGateway = 'https://daturians.mypinata.cloud/ipfs/';

  /* next, load the NFTs of connected wallet */
  async function getNfts(currData: [number]): Promise<{ tokenId: number }[]> {
    const items = await Promise.all(
      currData.map(async (i: number) => {
        // let item = await getMetadataById(i, contract);
        // const currentUrl = `${ipfsUrl + String(i)}.json`;
        // const meta = await axios.get(currentUrl);
        // const imgUri = meta.data.image.replace('ipfs://', ipfsGateway);
        const item = {
          tokenId: i,
          // image: imgUri,
          // name: meta.data.name,
          // description: meta.data.description,
          // data: meta.data
        };

        return item;
      })
    );
    return items;
  }

  // const submissionCount = async (currAddress: string | number | boolean) => {
  //   try {
  //     const config: AxiosRequestConfig = {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         CurrAddress: currAddress,
  //       },
  //     };
  //     // const seed = { address: currAddress };
  //     const result2 = await axios.get(`/api/seed`, config);
  //     console.log(result2.data);
  //     const subCount = result2.data.length;
  //     props.sendSubmissions(subCount);
  //     props.setSubmissionState(false);
  //     return result2.data;
  //   } catch (error: any) {
  //     console.error(error.response.data); // NOTE - use "error.response.data` (not "error")
  //     return error.response.data;
  //   }
  // };

  async function loadNFTs(address2: string) {
    /* create a generic provider */
    const provider = new ethers.providers.JsonRpcProvider(
      'https://polygon-rpc.com/'
    );
    // const provider = new ethers.providers.JsonRpcProvider(node_url)
    const contract = new ethers.Contract(
      NftContractAddress,
      DaturiansNFT.abi,
      provider
    );

    const data = await contract.walletOfOwner(address2);

    /*
     *  map over items returned from smart contract and format
     *  them as well as fetch their token metadata
     */
    // const ipfsUrl =
    //   'https://daturians.mypinata.cloud/ipfs/QmWeRSySd3RJ9BhoRHzpDsu8PjjNnGYhWwHn44BKDpgvJG/';
    const items = await getNfts(data);
    setNfts(items);
    props.setNftsHeld(items.length);
    setLoadingState('loaded');
  }

  async function connectToWallet() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    // console.log(connection);
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const address1 = await signer.getAddress();
    setAddress(address1);
    props.sendToParent(address1);

    // load my nfts
    loadNFTs(address1);
  }

  // check if there is an address connected
  useEffect(() => {
    const checkConnection = async () => {
      window.ethereum.on('accountsChanged', (accounts: MmAccounts) => {
        // console.log(accounts);
        if (accounts !== null && accounts !== undefined) {
          if (accounts.length > 0) {
            if (accounts[0] !== undefined) {
              // console.log('accounts exist');
              setAddress(accounts[0]);
              loadNFTs(accounts[0]);
            }
          }
        }
        // console.log(accounts);
        // Time to reload your interface with accounts[0]!
      });

      // window.ethereum.on('networkChanged', (networkId: any) => {
      //   // Time to reload your interface with the new networkId
      //   console.log(networkId);
      // });
    };
    checkConnection();
  }, []);

  if (address.length === 0)
    return (
      <div className="grid grid-cols-1 gap-5 max-auto px-3">
        <div className="flex flex-col pb-12">
          <button
            onClick={connectToWallet}
            className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
          >
            Connect wallet
          </button>
        </div>
      </div>
    );
  if (loadingState === 'loaded' && !nfts.length)
    return (
      <div className="grid grid-cols-1 gap-5 max-auto px-3">
        <h1 className="px-20 py-10 text-3xl">
          No Daturians NFT in your wallet
        </h1>
      </div>
    );
  return (
    <div className="grid grid-cols-1 gap-5 max-auto px-3">
      <h1>{address}</h1>
      <h2>{`Entries remaining: ${nfts.length - props.childSubmissions} of ${
        nfts.length
      }`}</h2>
    </div>
  );
};

export default MyWallet;
