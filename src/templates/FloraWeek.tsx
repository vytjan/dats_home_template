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

  console.log(router.basePath);

  return (
    <div className="text-center flex flex-col p-4 sm:text-left sm:flex-row sm:items-center sm:justify-between sm:p-12 bg-primary-100 rounded-md">
      <h2>{props.title}</h2>
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
