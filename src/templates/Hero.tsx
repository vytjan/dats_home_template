import { useState } from 'react';

import { Menu } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Background } from '../background/Background';
import { Button } from '../button/Button';
import { Section } from '../layout/Section';
import { Navbar } from '../navigation/Navbar';

const Hero = () => {
  const [isToggled, setToggle] = useState(false);

  const router = useRouter();

  const toggleClass = () => {
    setToggle(!isToggled);
  };

  return (
    <Background color="#F1F4F9">
      <div className="hero-full">
        <img
          className="hero-image"
          src={`${router.basePath}/assets/images/hero_full.png`}
          height="100%"
          width="100%"
          alt="hero-full"
        />
      </div>
      <Section>
        <Navbar>
          <div className="container flex-wrap justify-between items-center mx-auto">
            <Menu as="div">
              <Menu.Button as="div">
                <button
                  type="button"
                  onClick={toggleClass}
                  className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 burger header-burger"
                >
                  <div
                    className={isToggled ? 'menu-icon toggled' : 'menu-icon'}
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </button>
              </Menu.Button>
              {/* Render a `section` instead of a `div` */}
              <Menu.Items as="div">
                <Menu.Item>
                  <li className="">
                    <Link href="/">
                      <a>
                        <div className="hover column mobile-about">
                          <figure>
                            <Button regular={false} hero={true}>
                              Home
                            </Button>
                          </figure>
                        </div>
                      </a>
                    </Link>
                  </li>
                </Menu.Item>
                <Menu.Item>
                  <li className="">
                    <Link href="/about" className="inactive-link">
                      <a>
                        <div className="hover column mobile-merch">
                          <div>
                            <figure>
                              <Button regular={false} hero={true}>
                                Merch
                              </Button>
                            </figure>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </li>
                </Menu.Item>
                <Menu.Item>
                  <li className="">
                    <Link href="/mint">
                      <a>
                        <div className="hover column">
                          <div>
                            <figure>
                              <Button regular={false} hero={true}>
                                Mint
                              </Button>
                            </figure>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </li>
                </Menu.Item>
                <Menu.Item>
                  <li className="">
                    <Link href="/gallery">
                      <a>
                        <div className="hover column">
                          <div>
                            <figure>
                              <Button regular={false} hero={true}>
                                Gallery
                              </Button>
                            </figure>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </li>
                </Menu.Item>
                <Menu.Item>
                  <li className="">
                    <Link href="/seed">
                      <a>
                        <div className="hover column">
                          <div>
                            <figure>
                              <Button regular={false} hero={true}>
                                Seed Barrel
                              </Button>
                            </figure>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </li>
                </Menu.Item>
              </Menu.Items>
            </Menu>
            <div
              className="hidden w-full md:block xl:w-auto"
              id="navbar-default"
            >
              <div className="grid grid-cols-5 p-4 sm:items-center sm:justify-between gap-5">
                <li className="hero-li">
                  <Link href="/">
                    <a>
                      <div className="hover column">
                        <div>
                          <figure>
                            <img
                              className="hero_img p-4 sm:text-left sm:items-center sm:justify-between"
                              src={`${router.basePath}/assets/images/hero_1.png`}
                              height="100%"
                              width="100%"
                              alt="hero1"
                            />
                            <Button regular={false} hero={true}>
                              Home
                            </Button>
                          </figure>
                        </div>
                      </div>
                    </a>
                  </Link>
                </li>
                <li className="hero-li">
                  <Link href="/" className="inactive-link">
                    <a>
                      <div className="hover column merch-hero">
                        <div>
                          <figure>
                            <img
                              className="hero_img p-4 sm:text-left sm:items-center sm:justify-between"
                              src={`${router.basePath}/assets/images/hero_2.png`}
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
                  <Link href="/mint">
                    <a>
                      <div className="hover column minting">
                        <div>
                          <figure>
                            <img
                              className="hero_img p-4 sm:text-left sm:items-center sm:justify-between"
                              src={`${router.basePath}/assets/images/hero_3.png`}
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
                  <Link href="/gallery">
                    <a>
                      <div className="hover column">
                        <div>
                          <figure>
                            <img
                              className="hero_img p-4 sm:text-left sm:items-center sm:justify-between"
                              src={`${router.basePath}/assets/images/hero_4.png`}
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
                  <Link href="/seed">
                    <a>
                      <div className="hover column">
                        <div>
                          <figure>
                            <img
                              className="hero_img p-4 sm:text-left sm:items-center sm:justify-between"
                              src={`${router.basePath}/assets/images/hero_5.png`}
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
              </div>
            </div>
          </div>
        </Navbar>
      </Section>
    </Background>
  );
};

export { Hero };
