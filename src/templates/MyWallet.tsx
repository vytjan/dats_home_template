import { useState, useEffect } from 'react';

import { ethers } from 'ethers';
// import Link from "next/link"
// import { getMetadataById } from "../lib/api";
// import { useRouter } from 'next/router'
// import { trackWindowScroll } from 'react-lazy-load-image-component';
// import nftcontractaddress from 'utils/AppConfig';
import Web3Modal from 'web3modal';

import { NftContractAddress } from '../utils/AppConfig';
import DaturiansNFT from '../utils/artifacts/Daturians.json';

// import NFT from '../components/nft';

// export default function LoadNFTs(cookieData) {

type MmAccounts = Array<string>;

const MyWallet = () => {
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

    // load my nfts
    loadNFTs(address1);
  }

  // check if there is an address connected
  useEffect(() => {
    const checkConnection = async () => {
      window.ethereum.on('accountsChanged', function (accounts: MmAccounts) {
        if (accounts !== null && accounts !== undefined) {
          if (accounts.length > 0) {
            if (accounts[0] !== undefined) {
              setAddress(accounts[0]);
              loadNFTs(accounts[0]);
            }
          }
        }
        console.log(accounts);
        // Time to reload your interface with accounts[0]!
      });

      window.ethereum.on('networkChanged', function (networkId: any) {
        // Time to reload your interface with the new networkId
        console.log(networkId);
      });
      // Check if browser is running Metamask
      // let web3;
      // if (window.ethereum) {
      //   web3 = new Web3(window.ethereum);
      // } else if (window.web3) {
      //   web3 = new Web3(window.web3.currentProvider);
      // }

      // Check if User is already connected by retrieving the accounts
      // web3.eth
      //   .getAccounts()
      //   .then(async (addr) => {
      //     const currAddress: any = addr[0]!;
      //     if (currAddress && currAddress.length > 0) {
      //       setAddress(currAddress);
      //       loadNFTs(currAddress);
      //       // console.log(addr)
      //     } else {
      //       setAddress('');
      //     }
      //     // Set User account into state
      //   })
      //   .catch(async (err) => {
      //     console.log(err);
      //   });
    };
    checkConnection();
  }, []);

  if (address.length === 0)
    return (
      <div className="flex justify-center">
        <div className="w-1/2 flex flex-col pb-12">
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
      <h1 className="px-20 py-10 text-3xl">No Daturians NFT in your wallet</h1>
    );
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          <div>
            <h1>{address}</h1>
            <h2>{`Entries: ${nfts.length}`}</h2>
          </div>
          {/* {nfts.map((nft) => (
            <NFT
              key={nft.tokenId}
              scrollPosition={scrollPosition}
              values={nft}
            />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default MyWallet;
