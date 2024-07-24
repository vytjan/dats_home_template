import Link from 'next/link';
import { useRouter } from 'next/router';

import { Background } from '../background/Background';
import { CenteredFooter } from '../footer/CenteredFooter';
import { Section } from '../layout/Section';

const Footer = () => {
  const router = useRouter();

  return (
    <Background color="#F1F4F9">
      <Section>
        <div className="col-span-5 p-6 footer">
          <CenteredFooter>
            <li className="footer-whitepaper">
              <Link href="https://drive.google.com/file/d/1-AfYOxLpnVqKMI3AaXfaDsWj6Bnmdnya/view?usp=drive_link">
                <a target="_blank">Whitepaper</a>
              </Link>
            </li>
            <li className="footer-linktree">
              <Link href="https://linktr.ee/Daturians">
                <a target="_blank">Linktree</a>
              </Link>
            </li>
          </CenteredFooter>
          <div className="some-icons">
            <a
              target="_blank"
              href="https://twitter.com/DaturiansNFT"
              rel="noreferrer"
            >
              <img
                className="twitter-icon"
                src={`${router.basePath}/assets/images/icons/x.svg`}
                alt="twitter-icon"
              />
            </a>
            <a
              target="_blank"
              href="https://discord.gg/xmdURtj2WT"
              rel="noreferrer"
            >
              <img
                className="discord-icon"
                src={`${router.basePath}/assets/images/icons/discord.svg`}
                alt="discord-icon"
              />
            </a>
            <a
              target="_blank"
              href="https://medium.com/@daturians_nft"
              rel="noreferrer"
            >
              <img
                className="medium-icon"
                src={`${router.basePath}/assets/images/icons/medium.svg`}
                alt="medium-icon"
              />
            </a>
            <a
              target="_blank"
              href="https://opensea.io/collection/daturiansnft"
              rel="noreferrer"
            >
              <img
                className="opensea-icon"
                src={`${router.basePath}/assets/images/icons/opensea.svg`}
                alt="opensea-icon"
              />
            </a>
            <a
              target="_blank"
              href="https://magiceden.io/collections/polygon/0x64526de598200d3c48e752377057adbc74ec9492"
              rel="noreferrer"
            >
              <img
                className="opensea-icon"
                src={`${router.basePath}/assets/images/icons/magic_eden.svg`}
                alt="magic-eden"
              />
            </a>
            <a
              target="_blank"
              href="https://twitter.com/DaturiansNFT"
              rel="noreferrer"
            >
              <img
                className="roadmap-icon"
                src={`${router.basePath}/assets/images/icons/snapshot.svg`}
                alt="snapshot-icon"
              />
            </a>
            <a
              target="_blank"
              href="https://www.instagram.com/daturiansnft/"
              rel="noreferrer"
            >
              <img
                className="instagram-icon"
                src={`${router.basePath}/assets/images/icons/instagram.svg`}
                alt="instagram-icon"
              />
            </a>
          </div>
        </div>
      </Section>
    </Background>
  );
};

export { Footer };
