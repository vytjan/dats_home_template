import Link from 'next/link';

import { Background } from '../background/Background';
import { CenteredFooter } from '../footer/CenteredFooter';
import { Section } from '../layout/Section';

const Footer = () => (
  <Background>
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
        <div className="some-icons">
          <a href="https://twitter.com/DaturiansNFT">
            <img
              className="twitter-icon"
              src="/assets/images/icons/twitter.svg"
            />
          </a>
          <a href="https://discord.gg/xmdURtj2WT">
            <img
              className="discord-icon"
              src="/assets/images/icons/discord.svg"
            />
          </a>
          <a href="https://medium.com/@daturians_nft">
            <img
              className="medium-icon"
              src="/assets/images/icons/medium.svg"
            />
          </a>
          <a href="https://opensea.io/collection/daturiansnft">
            <img
              className="opensea-icon"
              src="/assets/images/icons/opensea.svg"
            />
          </a>
          <a href="https://twitter.com/DaturiansNFT">
            <img
              className="roadmap-icon"
              src="/assets/images/icons/snapshot.svg"
            />
          </a>
          <a href="https://www.instagram.com/daturiansnft/">
            <img
              className="instagram-icon"
              src="/assets/images/icons/instagram.svg"
            />
          </a>
        </div>
      </div>
    </Section>
  </Background>
);

export { Footer };
