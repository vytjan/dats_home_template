import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button } from '../button/Button';

type IMediumWidgetProps = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  size: number;
  link: string;
};

const MediumWidget = (props: IMediumWidgetProps) => {
  const router = useRouter();

  return (
    <div className="text-center flex flex-col p-4 sm:text-left sm:flex-row sm:items-center sm:justify-between sm:p-12 bg-primary-100 rounded-md col-span-3">
      <h1>{props.title}</h1>
      <img
        src={`${router.basePath}${props.image}`}
        alt={props.imageAlt}
        width={props.size}
        height={props.size}
      />
      <p>{props.description}</p>
      <Link href={props.link}>
        <a>
          <Button regular={true} hero={false}>
            Read story
          </Button>
        </a>
      </Link>
      <div className="left-arrow-medium">
        <Link href={props.link}>
          <a>
            <img
              src={`${router.basePath}${props.image}`}
              alt={props.imageAlt}
              width={25}
              height={25}
            />
          </a>
        </Link>
      </div>
      <div className="right-arrow-medium">
        <Link href={props.link}>
          <a>
            <img
              src={`${router.basePath}${props.image}`}
              alt={props.imageAlt}
              width={25}
              height={25}
            />
          </a>
        </Link>
      </div>
    </div>
  );
};

export { MediumWidget };
