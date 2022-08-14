// import { Text } from 'react-native';
import { useRouter } from 'next/router';

type IAboutProps = {
  image: string;
  imageAlt: string;
  size: number;
};

const About = (props: IAboutProps) => {
  const router = useRouter();
  return (
    <div className="flex-col sm:text-left sm:flex-row sm:items-center sm:justify-between p-12 bg-dark rounded-md col-span-3">
      <div className="about-title">
        <h1>Get to know Daturians</h1>
        <a href="https://twitter.com/DaturiansNFT">
          <img
            className="twitter-icon"
            src={`${router.basePath}${props.image}`}
            alt={props.imageAlt}
            width={props.size}
            height={props.size}
          />
        </a>
      </div>
      <p className="dat-paragraph">
        {`Daturian is your`}
        <b>{` virtual planter.`}</b>
        {` These creatures live in the inner asteroid circle on an existing `}
        <b>{`1270 Datura planet`}</b>
        {` and have the ability to grow plants or mushrooms on top of their heads. They get inspired by looking down at planet Earth and are fascinated by people.`}
      </p>
      <p className="dat-paragraph">
        {`There are `}
        <b>{`10 main remaining families`}</b>
        {` of Daturians currently living on the planet and each family has their history, traditions and a social status. Their interactions are based on archaic rules but the new generation of Daturians are changing the status quo.`}
      </p>
      <p className="dat-paragraph">
        {`They live in `}
        <b>{`4 main cities`}</b>
        {` - Sibyl, Pompadronia, Member City and Faustenburg but there are a lot of other locations where Daturians can live, explore, reproduce and create.`}
      </p>
    </div>
  );
};

export { About };
