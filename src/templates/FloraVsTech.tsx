import { useRouter } from 'next/router';

type IFloraVsTechProps = {
  image: string;
  imageAlt: string;
  size: number;
  description: string;
  title: string;
};

const FloraVsTech = (props: IFloraVsTechProps) => {
  const router = useRouter();

  return (
    <div className="text-center flex flex-col p-4 sm:text-left sm:flex-row sm:items-center sm:justify-between sm:p-12 bg-primary-100 rounded-md">
      <div>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </div>
      <img
        src={`${router.basePath}${props.image}`}
        alt={props.imageAlt}
        width={props.size}
        height={props.size}
      />
    </div>
  );
};

export { FloraVsTech };
