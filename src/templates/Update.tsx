import { useRouter } from 'next/router';

// in UTC 0 represents Sunday
const updateProps = [
  {
    image: `/assets/images/icons/discord.svg`,
    imageAlt: `discord`,
    size: 44,
    title: `Relax day`,
  },
  {
    image: `/assets/images/icons/discord.svg`,
    imageAlt: `discord`,
    size: 44,
    title: `Update day`,
  },
  {
    image: `/assets/images/icons/discord.svg`,
    imageAlt: `discord`,
    size: 44,
    title: `Plant o'clock`,
  },
  {
    image: `/assets/images/icons/twitter.svg`,
    imageAlt: `twitter`,
    size: 44,
    title: `Talk day`,
  },
  {
    image: `/assets/images/icons/discord.svg`,
    imageAlt: `discord`,
    size: 44,
    title: `Collab day`,
  },
  {
    image: `/assets/images/icons/discord.svg`,
    imageAlt: `discord`,
    size: 44,
    title: `Contest day`,
  },
  {
    image: `/assets/images/icons/discord.svg`,
    imageAlt: `discord`,
    size: 44,
    title: `Puzzle time`,
  },
];

const Update = () => {
  const router = useRouter();

  const weekday = new Date().getUTCDay();

  return (
    <div className="text-center flex flex-col p-4 sm:text-left sm:flex-row sm:items-center sm:justify-center p-8 bg-dark rounded-md discord">
      <a href="https://discord.gg/xmdURtj2WT">
        <img
          className="discord-icon"
          src={`${router.basePath}${updateProps[weekday]?.image}`}
          alt={updateProps[weekday]?.imageAlt}
          width={updateProps[weekday]?.size}
          height={updateProps[weekday]?.size}
        />
      </a>
      <h2>{updateProps[weekday]?.title}</h2>
    </div>
  );
};

export { Update };
