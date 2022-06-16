// import { VerticalFeatureRow } from '../feature/VerticalFeatureRow';
import { Logo } from './Logo';

const HeadTitle = () => (
  <div className="head-title-container flex items-center">
    <h1 className="">Where flora</h1>
    <Logo
      image="/assets/images/logo2.svg"
      imageAlt="Kiwis are not only fruits"
      xl={true}
    />
    <h1 className="last">meets tech</h1>
  </div>
);

export { HeadTitle };
