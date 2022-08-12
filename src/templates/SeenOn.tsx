import { useRouter } from 'next/router';

const seenOn = [
  {
    id: 0,
    imgUrl: `/assets/images/icons/polygon.svg`,
    imgAlt: `polygonstudios`,
    linkUrl: `https://polygonstudios.com/`,
  },
  {
    id: 2,
    imgUrl: `/assets/images/icons/skurpy.svg`,
    imgAlt: `skurpy`,
    linkUrl: `https://www.skurpy.com/members/daturiansnft/`,
  },
  {
    id: 3,
    imgUrl: `/assets/images/icons/nftcalendar.svg`,
    imgAlt: `nftcalendar`,
    linkUrl: `https://nftcalendar.io/event/daturians/`,
  },
];

const SeenOn = () => {
  const router = useRouter();

  return (
    <div className="sm:text-left sm:flex-row sm:items-center sm:justify-between sm:p-12 bg-primary-100 rounded-md col-span-3">
      <h1 className="seen-title">As seen on:</h1>
      <div className="grid grid-cols-3 seen-on">
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
