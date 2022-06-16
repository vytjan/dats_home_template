import Link from 'next/link';

import { Background } from '../background/Background';
import { Button } from '../button/Button';
import { HeroOneButton } from '../hero/HeroOneButton';
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

    <Section yPadding="pt-20 pb-32">
      <HeroOneButton
        title={
          <>
            {'The modern landing page for\n'}
            <span className="text-primary-500">React developers</span>
          </>
        }
        description="The easiest way to build a React landing page in seconds."
        button={
          <Link href="https://creativedesignsguru.com/category/nextjs/">
            <a>
              <Button xl>Download Your Free Theme</Button>
            </a>
          </Link>
        }
      />
    </Section>
  </Background>
);

export { Hero };
