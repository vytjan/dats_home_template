import { Section } from '../layout/Section';
import { About } from './About';
import MyWallet from './MyWallet';
// import { Navbar } from '../navigation/Navbar';

const Seed = () => {
  return (
    <Section>
      <div className="flex-col">
        <div className="left-content grid grid-cols-3 gap-5 max-auto px-3">
          <About></About>
          <MyWallet></MyWallet>
        </div>
      </div>
    </Section>
  );
};

export { Seed };
