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
    <div className="flex-col p-4 sm:text-left flex-row sm:items-center sm:justify-between p-8 bg-primary-100 rounded-md col-span-2">
      <div className="events-left">
        <h1>Events</h1>
        <p>{props.description}</p>
      </div>
      <div className="events-right">
        <img
          src={`${router.basePath}${props.image}`}
          alt={props.imageAlt}
          width={props.size}
          height={props.size}
        />
        <p className="events-right-date">{props.date}</p>
        <p>
          <br />
        </p>
        <p>{props.location}</p>
      </div>
    </div>
  );
};

export { Events };
