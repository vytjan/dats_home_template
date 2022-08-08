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
            <Link href="https://www.daturians.com/wp-content/uploads/2022/07/Daturians_whitepaper.pdf">
              <a>Whitepaper</a>
            </Link>
          </li>
          <li className="footer-linktree">
            <Link href="https://linktr.ee/Daturians">
              <a>Linktree</a>
            </Link>
          </li>
        </CenteredFooter>
      </div>
    </Section>
  </Background>
);

export { Footer };
