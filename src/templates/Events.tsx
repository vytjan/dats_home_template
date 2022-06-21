import { useRouter } from 'next/router';

type IEventsProps = {
  description: string;
  image: string;
  imageAlt: string;
  date: string;
  location: string;
  size: number;
};

const Events = (props: IEventsProps) => {
  const router = useRouter();

  return (
    <div className="text-center flex flex-col p-4 sm:text-left sm:flex-row sm:items-center sm:justify-between sm:p-12 bg-primary-100 rounded-md">
      <h1>Events</h1>
      <div>
        <img
          src={`${router.basePath}${props.image}`}
          alt={props.imageAlt}
          width={props.size}
          height={props.size}
        />
        <p>{props.date}</p>
      </div>
      <p>{props.description}</p>
      <p>{props.location}</p>
    </div>
  );
};

export { Events };
