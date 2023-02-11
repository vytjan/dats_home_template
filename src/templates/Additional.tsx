import Link from 'next/link';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  return (
    <div className="flex-col sm:text-left flex-row sm:items-center sm:justify-between bg-secondary-100 rounded-md col-span-5">
      <div className="additional p-12 p-4 bg-dark rounded-md">
        <h1>Additional</h1>
        <p className="dat-paragraph">{props.description}</p>
      </div>
      <div className="additional-images">
        <Link href="/gallery/ukrainians/">
          <a>
            <img
              className="rounded-md additional-props"
              src={router.basePath + props.imageUkraine}
              height="100%"
              width="100%"
              alt={props.imageUkraineAlt}
            />
          </a>
        </Link>
        <Link href="/gallery/cafe/">
          <a>
            <img
              className="rounded-md additional-props"
              src={router.basePath + props.imageCafe}
              height="100%"
              width="100%"
              alt={props.imageCafeAlt}
            />
          </a>
        </Link>
        <Link href="/gallery/signatures/">
          <a>
            <img
              className="rounded-md additional-props"
              src={router.basePath + props.imageGreenhouse}
              height="100%"
              width="100%"
              alt={props.imageGreenhouseAlt}
            />
          </a>
        </Link>
      </div>
    </div>
  );
};

export { Additional };
