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
    <span className={`text-gray-900 inline-flex items-center`}>
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
