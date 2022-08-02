type ISubmissionGalleryProps = {
  allSubmissions: Array<{
    src: string;
    filename: string;
    _id: string;
  }>;
};

const SubmissionGallery = (props: ISubmissionGalleryProps) => {
  const pubDir = '/uploads/';

  if (!props.allSubmissions.length)
    return (
      <h1 className="px-20 py-10 text-2l font-semibold text-center">
        {`Submissions of other people will appear here...`}
      </h1>
    );
  return (
    <div className="flex justify-center">
      <h1>{`Few snaps of Daturians NFT holders submitted: `}</h1>
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {props.allSubmissions.map((nft) => (
            // eslint-disable-next-line no-underscore-dangle
            <div key={nft._id}>
              <img src={pubDir + nft.filename} alt={nft.filename} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubmissionGallery;
