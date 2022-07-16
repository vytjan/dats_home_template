import Link from 'next/link';
// import { useRouter } from 'next/router';

type IAdditionalProps = {
  urlUkraine: string;
  urlCafe: string;
  urlGreenhouse: string;
  imageUkraine: string;
  imageUkraineAlt: string;
  imageCafe: string;
  imageCafeAlt: string;
  imageGreenhouse: string;
  imageGreenhouseAlt: string;
  description: string;
};

const Additional = (props: IAdditionalProps) => {
  // const router = useRouter();

  return (
    <div className="text-center flex flex-col p-4 sm:text-left sm:flex-row sm:items-center sm:justify-between sm:p-12 bg-primary-100 rounded-md col-span-5">
      <div>
        <h2>Additional</h2>
        <p>{props.description}</p>
      </div>
      <Link href={props.urlUkraine}>
        <a>
          <img
            src={props.imageUkraine}
            height="100%"
            width="100%"
            alt={props.imageUkraineAlt}
          />
        </a>
      </Link>
      <Link href={props.urlCafe}>
        <a>
          <img
            src={props.imageCafe}
            height="100%"
            width="100%"
            alt={props.imageCafeAlt}
          />
        </a>
      </Link>
      <Link href={props.urlGreenhouse}>
        <a>
          <img
            src={props.imageGreenhouse}
            height="100%"
            width="100%"
            alt={props.imageGreenhouseAlt}
          />
        </a>
      </Link>
    </div>
  );
};

export { Additional };
