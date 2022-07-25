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
    <div className="text-center flex flex-col sm:text-left sm:flex-row sm:items-center sm:justify-between bg-primary-100 rounded-md col-span-3 medium">
      <div className="medium-inside text-center flex flex-col p-4 sm:text-left sm:flex-row sm:items-center sm:justify-between sm:p-8 bg-primary-100 rounded-md"> 
        <img
          src={`${router.basePath}${props.image}`}
          alt={props.imageAlt}
          width={props.size}
          height={props.size}
        />
        <div>
          <h1>{props.title}</h1>
          <p>{props.description}</p>
        </div>
        <Link href={props.link}>
          <a>
            <Button regular={false} done={true}>
              Read story
            </Button>
          </a>
        </Link>
      </div>
      <div className="left-arrow-medium">
        <Link href={props.link}>
          <a>
            <Button regular={false} percentongoing={true}>
              <svg xmlns="http://www.w3.org/2000/svg" class="medium-arrow-left h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
</svg>
            </Button>
          </a>
        </Link>
      </div>
      <div className="right-arrow-medium">
        <Link href={props.link}>
          <a>
            <Button regular={false} percentongoing={true}>
              <svg xmlns="http://www.w3.org/2000/svg" class="medium-arrow-right h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
</svg>
            </Button>
          </a>
        </Link>
      </div>
    </div>
    
  );
};

export { MediumWidget };
