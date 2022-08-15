import { useRouter } from 'next/router';

type IUpdateProps = {
  image: string;
  imageAlt: string;
  size: number;
  title: string;
};

const Update = (props: IUpdateProps) => {
  const router = useRouter();

  return (
    <div className="text-center flex flex-col p-4 sm:text-left sm:flex-row sm:items-center sm:justify-center p-8 bg-dark rounded-md discord">
      <a href="https://discord.gg/xmdURtj2WT">
        <img
          className="discord-icon"
          src={`${router.basePath}${props.image}`}
          alt={props.imageAlt}
          width={props.size}
          height={props.size}
        />
      </a>
      <h2>{props.title}</h2>
    </div>
  );
};

export { Update };