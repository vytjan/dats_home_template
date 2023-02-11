import Link from 'next/link';

export type MetadataItem = {
  tokenId: number;
  image: string;
  name: string;
  description: string;
  // data: string;
  score: number;
  rank: number;
};

export type INFTProps = {
  tokenId: number;
  score: number;
  rank: number;
  image: string;
};

const NFT = (props: INFTProps) => {
  // const [currNft, setCurrNft] = useState<MetadataItem>();
  // const getSingleNFTMeta = async (tokenId: number) => {
  //   const ipfsGateway = 'https://daturians.mypinata.cloud/ipfs/';
  //   /*
  //    *  map over items returned from smart contract and format
  //    *  them as well as fetch their token metadata
  //    */
  //   const ipfsUrl =
  //     'https://daturians.mypinata.cloud/ipfs/QmWeRSySd3RJ9BhoRHzpDsu8PjjNnGYhWwHn44BKDpgvJG/';
  //   const currentUrl = `${ipfsUrl + String(tokenId)}.json`;
  //   try {
  //     const meta = await axios.get(currentUrl);
  //     const imgUri = meta.data.image.replace('ipfs://', ipfsGateway);
  //     const item = {
  //       tokenId,
  //       image: imgUri,
  //       name: meta.data.name,
  //       description: meta.data.description,
  //       data: meta.data,
  //       score: 0,
  //     };
  //     return item;
  //   } catch (err) {
  //     console.log(err);
  //     return null;
  //   }
  // };

  // let nftIcon = null;

  // useEffect(() => {
  //   // console.log(props.tokenId);
  //   const promise = getSingleNFTMeta(props.tokenId);
  //   promise.then((meta2) => {
  //     // console.log(meta2);
  //     if (meta2 !== null) {
  //       setCurrNft(meta2);
  //     }
  //   });
  //   // console.log(id);
  //   // codes using router.query
  // }, []);

  // console.log(value);
  // const nftIcon = getSingleNFT(values.tokenId, scrollPosition);

  if (props.tokenId !== undefined) {
    // const nftIcon = getSingleNFTMeta(currNft);
    return (
      <div className="content rounded-xl overflow-hidden">
        <Link href={`/gallery/single_nft/${props.tokenId}`}>
          <a>
            <img
              alt={props.image}
              src={props.image!}
              height="350"
              width="350"
            ></img>
            <div className="p-4 gallery-text">
              <p className="id text-base font-semibold">
                <b>Id:</b> {props.tokenId}
              </p>
              <p className="score text-base font-semibold">
                <b>Rarity score:</b> <span>{props.score}</span>
              </p>
              <p className="rank text-base font-semibold">
                <b>Rank:</b> <span>{props.rank}</span>
              </p>
            </div>
          </a>
        </Link>
      </div>
    );
  }
  return (
    <div className="content rounded-xl overflow-hidden">
      <div className="single-nft-placeholder">
        <h2>Loading</h2>
      </div>
    </div>
  );
};

export default NFT;
