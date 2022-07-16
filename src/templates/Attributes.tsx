import { useRouter } from 'next/router';

type IAttributesProps = {
  image: string;
  imageAlt: string;
  size: number;
  description1: string;
  description2: string;
};

const Attributes = (props: IAttributesProps) => {
  const router = useRouter();

  return (
    <div className="flex-col sm:text-left sm:flex-row sm:items-center sm:justify-between sm:p-12 bg-primary-100 rounded-md col-span-2">
      <h1>Attributes</h1>
      <img
        src={`${router.basePath}${props.image}`}
        alt={props.imageAlt}
        width={props.size}
        height={props.size}
      />
      <p>{props.description1}</p>
      <p>{props.description2}</p>
    </div>
  );
};

export { Attributes };
