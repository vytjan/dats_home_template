import Link from 'next/link';

import { Background } from '../background/Background';
import { Button } from '../button/Button';
import { Section } from '../layout/Section';
import { Navbar } from '../navigation/Navbar';

const Hero = () => (
  <Background color="bg-blue-100">
    <Section>
      <Navbar>
        <li className="hero-li">
          <Link href="/about">
            <a>
              <div className="hover column">
                <div>
                  <figure>
                    <img
                      src="/assets/images/hero_1.png"
                      height="100%"
                      width="100%"
                      alt="hero1"
                    />
                    <Button regular={false} hero={true}>
                      About
                    </Button>
                  </figure>
                </div>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>
              <div className="hover column">
                <div>
                  <figure>
                    <img
                      src="/assets/images/hero_2.png"
                      height="100%"
                      width="100%"
                      alt="hero2"
                    />
                    <Button regular={false} hero={true}>
                      Shop | Merch
                    </Button>
                  </figure>
                </div>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>
              <div className="hover column">
                <div>
                  <figure>
                    <img
                      src="/assets/images/hero_3.png"
                      height="100%"
                      width="100%"
                      alt="hero3"
                    />
                    <Button regular={false} hero={true}>
                      Mint
                    </Button>
                  </figure>
                </div>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href="https://gallery.daturians.com">
            <a>
              <div className="hover column">
                <div>
                  <figure>
                    <img
                      src="/assets/images/hero_4.png"
                      height="100%"
                      width="100%"
                      alt="hero4"
                    />
                    <Button regular={false} hero={true}>
                      Gallery
                    </Button>
                  </figure>
                </div>
              </div>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/">
            <a>
              <div className="hover column">
                <div>
                  <figure>
                    <img
                      src="/assets/images/hero_5.png"
                      height="100%"
                      width="100%"
                      alt="hero5"
                    />
                    <Button regular={false} hero={true}>
                      Greenhouse
                    </Button>
                  </figure>
                </div>
              </div>
            </a>
          </Link>
        </li>
      </Navbar>
    </Section>
  </Background>
);

export { Hero };
