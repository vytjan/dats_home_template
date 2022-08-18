// import { VerticalFeatureRow } from '../feature/VerticalFeatureRow';
import { Logo } from './Logo';

const HeadTitle = () => (
  <div className="head-title-container flex items-center">
    <h1 className="head-title-first">Where flora</h1>
    <Logo image="/assets/images/logo.svg" imageAlt="Daturians logo" xl={true} />
    <h1 className="head-title-last">meets tech</h1>
  </div>
);

export { HeadTitle };
