import Link from 'next/link';

import { Background } from '../background/Background';
import { Button } from '../button/Button';
import { Section } from '../layout/Section';
import { Navbar } from '../navigation/Navbar';

const Hero = () => (
  <Background className="hero-page" color="#F1F4F9">
    <Section>
    <div className="text-center flex p-4 sm:text-left sm:items-center sm:justify-center sm:p-4 rounded-md col-span-5
      ">

      <Navbar className="hero-li col-span-5">
        <li className="hero-li">
          <Link href="/about">
            <a>
              <div className="hover column">
                <div>
                  <figure>
                    <img className="hero_img p-4 sm:text-left sm:items-center sm:justify-between"
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
        <li className="hero-li">
          <Link href="/about">
            <a>
              <div className="hover column">
                <div>
                  <figure>
                    <img className="hero_img p-4 sm:text-left sm:items-center sm:justify-between"
                      src="/assets/images/hero_2.png"
                      height="100%"
                      width="100%"
                      alt="hero2"
                    />
                    <Button regular={false} hero={true}>
                      Merch
                    </Button>
                  </figure>
                </div>
              </div>
            </a>
          </Link>
        </li>
        <li className="hero-li">
          <Link href="/">
            <a>
              <div className="hover column">
                <div>
                  <figure>
                    <img className="hero_img p-4 sm:text-left sm:items-center sm:justify-between"
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
        <li className="hero-li">
          <Link href="https://gallery.daturians.com">
            <a>
              <div className="hover column">
                <div>
                  <figure>
                    <img className="hero_img p-4 sm:text-left sm:items-center sm:justify-between"
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
        <li className="hero-li">
          <Link href="/">
            <a>
              <div className="hover column">
                <div>
                  <figure>
                    <img className="hero_img p-4 sm:text-left sm:items-center sm:justify-between"
                      src="/assets/images/hero_5.png"
                      height="100%"
                      width="100%"
                      alt="hero5"
                    />
                    <Button regular={false} hero={true}>
                      Seed Barrel
                    </Button>
                  </figure>
                </div>
              </div>
            </a>
          </Link>
        </li>
      </Navbar>
      </div>
    </Section>
  </Background>
);

export { Hero };
