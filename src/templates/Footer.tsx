import Link from 'next/link';

import { Background } from '../background/Background';
import { CenteredFooter } from '../footer/CenteredFooter';
import { Section } from '../layout/Section';

const Footer = () => (
  <Background color="#F1F4F9">
    <Section>
      <div className="col-span-5 p-6 footer">
        <CenteredFooter>
          <li className="footer-whitepaper">
            <Link href="/">
              <a>Whitepaper</a>
            </Link>
          </li>
          <li className="footer-linktree">
            <Link href="/">
              <a>Linktree</a>
            </Link>
          </li>
        </CenteredFooter>
      </div>
    </Section>
  </Background>
);

export { Footer };
