import { Menu } from '@headlessui/react';
import Link from 'next/link';

import { Button } from '../button/Button';
import { Navbar } from '../navigation/Navbar';
// import { HallOfFame } from './HallOfFame';

const HeaderMenu = () => {
  return (
    <Navbar>
      <div className="flex flex-wrap justify-between items-center mx-auto">
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
        <div className="hidden w-full xl:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 rounded-lg  xl:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li className="body-li">
              <Link href="/">
                <a
                  href="#"
                  className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                  aria-current="page"
                >
                  <div className="navigation-bar">
                    <div>
                      <div className="btn btn-hero">
                        <img
                          className="nav-icon"
                          src="/assets/images/icons/about.svg"
                          alt="about"
                        />
                        About
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </li>
            <li className="body-li">
              <Link href="/about">
                <a>
                  <div className="navigation-bar">
                    <div>
                      <div className="btn btn-hero">
                        <img
                          className="nav-icon"
                          src="/assets/images/icons/shop.svg"
                          alt="shop"
                        />
                        Merch
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </li>
            <li className="body-li">
              <Link href="/">
                <a>
                  <div className="navigation-bar">
                    <div>
                      <Button regular={false} hero={true}>
                        Mint
                      </Button>
                    </div>
                  </div>
                </a>
              </Link>
            </li>
            <li className="body-li">
              <Link href="https://gallery.daturians.com">
                <a>
                  <div className="navigation-bar">
                    <div>
                      <div className="btn btn-hero">
                        <img
                          className="nav-icon"
                          src="/assets/images/icons/gallery.svg"
                          alt="gallery"
                        />
                        Gallery
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </li>
            <li className="body-li">
              <Link href="/seed">
                <a>
                  <div className="navigation-bar">
                    <div>
                      <div className="btn btn-hero">
                        <img
                          className="nav-icon"
                          src="/assets/images/icons/barrel.svg"
                          alt="barrel"
                        />
                        Seed Barrel
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Navbar>
  );
};

export { HeaderMenu };
