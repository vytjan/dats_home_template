import { useRouter } from 'next/router';

const seenOn = [
  {
    id: 0,
    imgUrl: `/assets/images/pfp.png`,
    imgAlt: `daturians`,
    linkUrl: `https://www.daturians.com/`,
  },
  {
    id: 2,
    imgUrl: `/assets/images/pfp.png`,
    imgAlt: `daturians`,
    linkUrl: `https://www.daturians.com/`,
  },
  {
    id: 3,
    imgUrl: `/assets/images/pfp.png`,
    imgAlt: `daturians`,
    linkUrl: `https://www.daturians.com/`,
  },
];

const SeenOn = () => {
  const router = useRouter();

  return (
    <div className="sm:text-left sm:flex-row sm:items-center sm:justify-between sm:p-12 bg-primary-100 rounded-md col-span-3">
      <h1>As seen on:</h1>
      <div className="grid grid-cols-3">
        {seenOn.map(({ id, linkUrl, imgUrl, imgAlt }) => (
          <div key={id}>
            <a href={linkUrl}>
              <img
                src={`${router.basePath}${imgUrl}`}
                alt={imgAlt}
                width="100%"
                height="100%"
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export { SeenOn };
