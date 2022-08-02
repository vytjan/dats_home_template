import { useRouter } from 'next/router';

type IInstaProps = {
  image: string;
  imageAlt: string;
  xl?: boolean;
};

const InstaEmbed = (props: IInstaProps) => {
  const router = useRouter();

  const size = props.xl ? '44' : '32';
  // const fontStyle = props.xl
  //   ? 'font-semibold text-3xl'
  //   : 'font-semibold text-xl';

  return (
    <span
      className={`text-center flex sm:text-left sm:items-center sm:justify-between rounded-md col-span-2 instagram`}
    >
      <a href="https://www.instagram.com/daturiansnft/">
        <img
          src={`${router.basePath}${props.image}`}
          alt={props.imageAlt}
          width={size}
          height={size}
        />
      </a>
    </span>
  );
};

export { InstaEmbed };
