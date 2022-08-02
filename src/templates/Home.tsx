import { Meta } from '../layout/Meta';
import { AppConfig } from '../utils/AppConfig';
import { Footer } from './Footer';
import { HeadTitle } from './HeadTitle';
import { Hero } from './Hero';

const Home = () => (
  <div className="antialiased">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <HeadTitle />
    <Hero />
    <Footer />
  </div>
);

export { Home };
