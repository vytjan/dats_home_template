import { ReactNode } from 'react';

type INavbarProps = {
  // logo: ReactNode;
  children: ReactNode;
};

const Navbar = (props: INavbarProps) => (
  <div className="navbar-container flex flex-wrap items-center">
    <nav>
      <ul className="navbar flex items-center font-medium text-xl">
        {props.children}
      </ul>
    </nav>
  </div>
);

export { Navbar };
