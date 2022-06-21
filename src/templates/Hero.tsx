import Link from 'next/link';

import { Background } from '../background/Background';
import { Section } from '../layout/Section';
import { Navbar } from '../navigation/Navbar';

const Hero = () => (
  <Background color="bg-gray-100">
    <Section>
      <Navbar>
        <li>
          <Link href="/about">
            <a>About | Roadmap</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Shop | Merch</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Mint</a>
          </Link>
        </li>
        <li>
          <Link href="https://gallery.daturians.com">
            <a>Gallery</a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>Greenhouse</a>
          </Link>
        </li>
      </Navbar>
    </Section>
  </Background>
);

export { Hero };
