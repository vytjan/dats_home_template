type IStatsProps = {
  src: string;
  width: number;
  height: number;
  title: string;
};

const Stats = (props: IStatsProps) => {
  return (
    <div className="flex-col sm:text-left sm:flex-row sm:items-center sm:justify-between sm:p-12 bg-yellow rounded-md col-span-2">
      <h1>Stats</h1>
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
