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
    <div className="text-center flex flex-col p-4 sm:text-left sm:flex-row sm:items-center sm:justify-between sm:p-12 bg-primary-100 rounded-md">
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
          <Button xl>Read story</Button>
        </a>
      </Link>
    </div>
  );
};

export { MediumWidget };
