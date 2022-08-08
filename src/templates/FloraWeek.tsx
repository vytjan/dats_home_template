import { useRouter } from 'next/router';

type IFloraProps = {
  image: string;
  imageAlt: string;
  size: number;
  description: string;
  title: string;
};

const FloraWeek = (props: IFloraProps) => {
  const router = useRouter();

  // console.log(router.basePath);

  return (
    <div className="floraweek p-4 sm:text-left sm:items-center sm:justify-between sm:p-8 bg-grass rounded-md col-span-2">
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <img
        src={`${router.basePath}${props.image}`}
        alt={props.imageAlt}
        width={props.size}
        height={props.size}
      />
    </div>
  );
};

export { FloraWeek };
