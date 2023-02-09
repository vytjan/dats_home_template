import Link from 'next/link';

export type MetadataItem = {
  tokenId: number;
  image: string;
  name: string;
  description: string;
  // data: string;
};

export type INFTProps = {
  tokenId: number;
  image: string;
  collection_url: string;
};

const SignatureNFT = (props: INFTProps) => {
  if (props.tokenId !== undefined) {
    // const nftIcon = getSingleNFTMeta(currNft);
    return (
      <div className="content rounded-xl overflow-hidden">
        <Link href={`/gallery/${props.collection_url}/${props.tokenId}`}>
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

export default SignatureNFT;
