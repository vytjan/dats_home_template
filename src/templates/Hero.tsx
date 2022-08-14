import { Menu } from '@headlessui/react';
import Link from 'next/link';

import { Background } from '../background/Background';
import { Button } from '../button/Button';
import { Section } from '../layout/Section';
import { Navbar } from '../navigation/Navbar';

const Hero = () => (
  <Background color="#F1F4F9">
    <div className="hero-full">
      <img
        className="hero-image"
        src="/assets/images/hero_full.png"
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
                className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 burger"
              >
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </Menu.Button>
            {/* Render a `section` instead of a `div` */}
            <Menu.Items as="div">
              <Menu.Item>
                <li className="">
                  <Link href="/about">
                    <a>
                      <div className="hover column">
                        <figure>
                          <Button regular={false} hero={true}>
                            About
                          </Button>
                        </figure>
                      </div>
                    </a>
                  </Link>
                </li>
              </Menu.Item>
              <Menu.Item>
                <li className="">
                  <Link href="/about">
                    <a>
                      <div className="hover column">
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
                  <Link href="/">
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
                  <Link href="https://gallery.daturians.com">
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
          {/* <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 burger"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button> */}
          <div className="hidden w-full md:block xl:w-auto" id="navbar-default">
            <div className="grid grid-cols-5 p-4 sm:items-center sm:justify-between gap-5">
              <li className="hero-li">
                <Link href="/about">
                  <a>
                    <div className="hover column">
                      <div>
                        <figure>
                          <img
                            className="hero_img p-4 sm:text-left sm:items-center sm:justify-between"
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
                          <img
                            className="hero_img p-4 sm:text-left sm:items-center sm:justify-between"
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
                          <img
                            className="hero_img p-4 sm:text-left sm:items-center sm:justify-between"
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
                          <img
                            className="hero_img p-4 sm:text-left sm:items-center sm:justify-between"
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
                <Link href="/seed">
                  <a>
                    <div className="hover column">
                      <div>
                        <figure>
                          <img
                            className="hero_img p-4 sm:text-left sm:items-center sm:justify-between"
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
            </div>
          </div>
        </div>
      </Navbar>
    </Section>
  </Background>
);

export { Hero };
