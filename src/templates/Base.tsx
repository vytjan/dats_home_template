import { Meta } from '../layout/Meta';
import { AppConfig } from '../utils/AppConfig';
import { Body } from './Body';
import { Footer } from './Footer';
// import { HeadTitle } from './HeadTitle';
// import { Hero } from './Hero';

const Base = () => (
  <div className="antialiased text-gray-600">
    <Meta
      title={AppConfig.aboutTitle}
      description={AppConfig.aboutDescription}
    />
    <Body />
    <Footer />
  </div>
);

export { Base };
