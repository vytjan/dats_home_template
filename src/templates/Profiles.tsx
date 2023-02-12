import { useRouter } from 'next/router';

const profiles = [
  {
    id: 0,
    name: `Kimblod`,
    description: `A happy dad, standard B2B company designer by day - NFT enthusiast by night! Didn't drive Škoda for 5 years.`,
    linkText: `Donatas Sledzius`,
    linkUrl: `https://twitter.com/Kimblod`,
    imgUrl: `/assets/images/kimblod.png`,
    imgAlt: `Donatas`,
  },
  {
    id: 1,
    name: `Lunaria`,
    description: `A loving mom, master of numerous traditional art techniques and the lady of the forest. Knows all medicinal herbs by heart.`,
    linkText: `Kotryna Semi`,
    linkUrl: `https://twitter.com/SemiLunaria`,
    imgUrl: `/assets/images/lunaria.png`,
    imgAlt: `Kotryna`,
  },
  {
    id: 2,
    name: `Phaeo`,
    description: `Speaks in code and loves cucumbers. Doesn't shy away from complex conversations and is a living mega tall giant.`,
    linkText: `Vytautas Jankauskas`,
    linkUrl: `https://twitter.com/PhaeoDaturian`,
    imgUrl: `/assets/images/phaeo.png`,
    imgAlt: `Vytautas`,
  },
  {
    id: 3,
    name: `Nill`,
    description: `Our passionate, lead brand ambassador for Datura. Focused on finding growth in all things and building organic communities.`,
    linkText: `Max Rennillo`,
    linkUrl: `https://twitter.com/BigNillCollect`,
    imgUrl: `/assets/images/nill.png`,
    imgAlt: `Nill`,
  },
  {
    id: 4,
    name: `Unplugged`,
    description: `Loves being creative, talking and getting to know people. Addicted to all things cute, especially sloths and baby groot lol.`,
    linkText: `Unplugged`,
    linkUrl: `https://twitter.com/Unplugged_NZ`,
    imgUrl: `/assets/images/unplugged.png`,
    imgAlt: `Unplugged`,
  },
  {
    id: 5,
    name: `Miml`,
    description: `Music lover and NFT collector currently exploring the exciting world of Web 3 and helping to grow the Daturian community.`,
    linkText: `Miml`,
    linkUrl: `https://twitter.com/darcelchoy`,
    imgUrl: `/assets/images/miml.png`,
    imgAlt: `Miml`,
  },
  {
    id: 6,
    name: `BigN`,
    description: `Lives in a snowy biome and is the nicest mod you can find across all the metaverses.`,
    linkText: `BigN`,
    linkUrl: `https://twitter.com/jrmaccss`,
    imgUrl: `/assets/images/bigN.png`,
    imgAlt: `bigN`,
  },
  {
    id: 7,
    name: `Bebe`,
    description: `Our little helper! Likes curd and air balloons. Has a special ability to become invisible by putting on a special blanket. Is loved by all Daturians.`,
    imgUrl: `/assets/images/bebe.png`,
    imgAlt: `Bebe`,
  },
];

const Profiles = () => {
  const router = useRouter();

  return (
    <div className="sm:text-left sm:flex-row sm:items-center sm:justify-between bg-secondary-100 rounded-md col-span-5">
      <h1 className="team-member-title">Team</h1>
      <div className="grid xl:grid-cols-8 lg:grid-cols-4 sm:grid-cols-4 xs:grid-cols-4 gap-5 profiles">
        {profiles.map(({ id, name, description, linkUrl, imgUrl, imgAlt }) => (
          <div className="team-member rounded-md" key={id}>
            <img
              className="team-member-pfp"
              src={`${router.basePath}${imgUrl}`}
              alt={imgAlt}
              width="100%"
              height="100%"
            />
            <a href={linkUrl}>
              <h2 className="p-4 team-member-name">{name}</h2>
            </a>
            <p className="p-4 team-member-description">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Profiles };
