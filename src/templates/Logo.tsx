import { useRouter } from 'next/router';

type ILogoProps = {
  image: string;
  imageAlt: string;
  xl?: boolean;
};

const Logo = (props: ILogoProps) => {
  const router = useRouter();

  const size = props.xl ? '44' : '32';
  // const fontStyle = props.xl
  //   ? 'font-semibold text-3xl'
  //   : 'font-semibold text-xl';

  return (
    <span className={`text-center flex sm:text-left sm:items-center sm:justify-between rounded-md col-span-1 logo`}>
      <img
        src={`${router.basePath}${props.image}`}
        alt={props.imageAlt}
        width={size}
        height={size}
      />
    </span>
  );
};

export { Logo };
