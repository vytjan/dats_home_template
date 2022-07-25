import { useRouter } from 'next/router';

const profiles = [
  {
    id: 0,
    name: `Kimblod`,
    description: `A happy dad, standard B2B company designer by day - NFT enthusiast by night! Didn't drive Škoda for 5 years.`,
    linkText: `Donatas Sledzius`,
    linkUrl: `https://twitter.com/Kimblod`,
    imgUrl: `/assets/images/pfp.png`,
    imgAlt: `Donatas`,
  },
  {
    id: 1,
    name: `Kimblod`,
    description: `A happy dad, standard B2B company designer by day - NFT enthusiast by night! Didn't drive Škoda for 5 years.`,
    linkText: `Donatas Sledzius`,
    linkUrl: `https://twitter.com/Kimblod`,
    imgUrl: `/assets/images/pfp.png`,
    imgAlt: `Donatas`,
  },
  {
    id: 2,
    name: `Kimblod`,
    description: `A happy dad, standard B2B company designer by day - NFT enthusiast by night! Didn't drive Škoda for 5 years.`,
    linkText: `Donatas Sledzius`,
    linkUrl: `https://twitter.com/Kimblod`,
    imgUrl: `/assets/images/pfp.png`,
    imgAlt: `Donatas`,
  },
  {
    id: 3,
    name: `Kimblod`,
    description: `A happy dad, standard B2B company designer by day - NFT enthusiast by night! Didn't drive Škoda for 5 years.`,
    linkText: `Donatas Sledzius`,
    linkUrl: `https://twitter.com/Kimblod`,
    imgUrl: `/assets/images/pfp.png`,
    imgAlt: `Donatas`,
  },
  {
    id: 4,
    name: `Kimblod`,
    description: `A happy dad, standard B2B company designer by day - NFT enthusiast by night! Didn't drive Škoda for 5 years.`,
    linkText: `Donatas Sledzius`,
    linkUrl: `https://twitter.com/Kimblod`,
    imgUrl: `/assets/images/pfp.png`,
    imgAlt: `Donatas`,
  },
  {
    id: 5,
    name: `Kimblod`,
    description: `A happy dad, standard B2B company designer by day - NFT enthusiast by night! Didn't drive Škoda for 5 years.`,
    linkText: `Donatas Sledzius`,
    linkUrl: `https://twitter.com/Kimblod`,
    imgUrl: `/assets/images/pfp.png`,
    imgAlt: `Donatas`,
  },
  {
    id: 6,
    name: `Kimblod`,
    description: `A happy dad, standard B2B company designer by day - NFT enthusiast by night! Didn't drive Škoda for 5 years.`,
    linkText: `Donatas Sledzius`,
    linkUrl: `https://twitter.com/Kimblod`,
    imgUrl: `/assets/images/pfp.png`,
    imgAlt: `Donatas`,
  },
  {
    id: 7,
    name: `Kimblod`,
    description: `A happy dad, standard B2B company designer by day - NFT enthusiast by night! Didn't drive Škoda for 5 years.`,
    linkText: `Donatas Sledzius`,
    linkUrl: `https://twitter.com/Kimblod`,
    imgUrl: `/assets/images/pfp.png`,
    imgAlt: `Donatas`,
  },
];

const Profiles = () => {
  const router = useRouter();

  return (
    <div className="sm:text-left sm:flex-row sm:items-center sm:justify-between sm:p-12 bg-primary-100 rounded-md col-span-5">
      <h1>Team</h1>
      <div className="grid grid-cols-4 gap-5">
        {profiles.map(
          ({ id, name, description, linkText, linkUrl, imgUrl, imgAlt }) => (
            <div key={id}>
              <h1>{name}</h1>
              <p>{description}</p>
              <p>
                <a href={linkUrl}>{linkText}</a>
              </p>
              <img
                src={`${router.basePath}${imgUrl}`}
                alt={imgAlt}
                width="100%"
                height="100%"
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export { Profiles };
