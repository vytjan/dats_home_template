import { useRouter } from 'next/router';

type IBoxProps = {
  image: string;
  imageAlt: string;
  xl?: boolean;
};

const Box = (props: IBoxProps) => {
  const router = useRouter();

  const size = props.xl ? '44' : '32';
  // const fontStyle = props.xl
  //   ? 'font-semibold text-3xl'
  //   : 'font-semibold text-xl';

  return (
    <span
      className={`text-center flex sm:text-left sm:items-center sm:justify-between bg-primary-100 rounded-md col-span-2 box`}
    >
      <img
        src={`${router.basePath}${props.image}`}
        alt={props.imageAlt}
        width={size}
        height={size}
      />
    </span>
  );
};

export { Box };
