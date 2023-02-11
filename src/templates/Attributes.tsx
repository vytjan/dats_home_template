import Link from 'next/link';
import { useRouter } from 'next/router';

type IAttributesProps = {
  image: string;
  imageLayers: string;
  imageAlt: string;
  size: number;
  description1: string;
  description2: string;
};

const Attributes = (props: IAttributesProps) => {
  const router = useRouter();

  return (
    <div className="flex-col sm:text-left sm:flex-row sm:items-center sm:justify-between p-8 bg-primary-100 rounded-md col-span-2 attributes">
      <img
        className="attribute-img rounded-md"
        src={`${router.basePath}${props.image}`}
        alt={props.imageAlt}
        width={props.size}
        height={props.size}
      />
      <div className="about-title">
        <Link href="/gallery">
          <a>
            <h1>Attributes</h1>
          </a>
        </Link>
        <Link href="/gallery">
          <a>
            <img
              className="gallery-icon"
              src={`${router.basePath}/assets/images/icons/gallery.svg`}
              alt={props.imageAlt}
              width={props.size}
              height={props.size}
            />
          </a>
        </Link>
      </div>
      <p className="dat-paragraph">{props.description1}</p>
      <p>{props.description2}</p>
      <img
        className="attribute-img rounded-md"
        src={`${router.basePath}${props.imageLayers}`}
        alt={props.imageAlt}
        width={props.size}
        height={props.size}
      />
    </div>
  );
};

export { Attributes };
