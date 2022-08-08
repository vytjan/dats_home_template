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
    <div className="flex-col sm:text-left sm:flex-row sm:items-center sm:justify-between sm:p-8 bg-red rounded-md col-span-2 attributes">
      <img
        className="attribute-img rounded-md"
        src={`${router.basePath}${props.image}`}
        alt={props.imageAlt}
        width={props.size}
        height={props.size}
      />
      <h1>Attributes</h1>
      <p className="dat-paragraph">{props.description1}</p>
      <p>{props.description2}</p>
    </div>
  );
};

export { Attributes };
