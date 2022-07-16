import { useRouter } from 'next/router';

type IRoadmapProps = {
  image: string;
  imageAlt: string;
  size: number;
};

const Roadmap = (props: IRoadmapProps) => {
  const router = useRouter();

  return (
    <div className="flex-col sm:text-left sm:flex-row sm:items-center sm:justify-between sm:p-12 bg-primary-100 rounded-md col-span-3">
      <h1>Roadmap</h1>
      <img
        src={`${router.basePath}${props.image}`}
        alt={props.imageAlt}
        width={props.size}
        height={props.size}
      />
    </div>
  );
};

export { Roadmap };
