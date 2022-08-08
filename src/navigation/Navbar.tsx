import { ReactNode } from 'react';

type INavbarProps = {
  // logo: ReactNode;
  children: ReactNode;
};

const Navbar = (props: INavbarProps) => (
  <div className="text-center flex p-4 sm:text-left sm:items-center sm:justify-center sm:p-4 rounded-md grid grid-cols-5 gap-5">
    <div className="hero-li col-span-5 navbar-container flex flex-wrap items-center">
      <nav>
        <ul className="navbar flex items-center font-medium text-xl">
          {props.children}
        </ul>
      </nav>
    </div>
  </div>
);

export { Navbar };
