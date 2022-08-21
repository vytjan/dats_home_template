import { useRouter } from 'next/router';

type IStatsProps = {
  src: string;
  width: number;
  height: number;
  title: string;
};

const Stats = (props: IStatsProps) => {
  const router = useRouter();

  return (
    <div className="flex-col sm:text-left sm:flex-row sm:items-center sm:justify-between p-12 bg-primary-100 rounded-md col-span-2">
      <div className="about-title">
        <h1>Stats</h1>
        <a href="https://opensea.io/collection/daturiansnft">
          <img
            className="opensea-icon"
            src={`${router.basePath}/assets/images/icons/opensea.svg`}
            alt="opensea.svg"
          />
        </a>
      </div>
      <div className="stats-container">
        <iframe
          className="stats-iframe"
          src={props.src}
          height={props.height}
          width={props.width}
          title={''}
        ></iframe>
      </div>
    </div>
  );
};

export { Stats };
