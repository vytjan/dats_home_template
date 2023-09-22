import { useState } from 'react';

import { Menu } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button } from '../button/Button';
import { Navbar } from '../navigation/Navbar';
// import { HallOfFame } from './HallOfFame';

const HeaderMenu = () => {
  const [isToggled, setToggle] = useState(false);

  const router = useRouter();

  const toggleClass = () => {
    setToggle(!isToggled);
  };
  return (
    <Navbar>
      <div className="flex flex-wrap justify-between items-center mx-auto">
        <Menu as="div">
          <Menu.Button as="div">
            <Link href="/">
              <a>
                <img
                  className="mobile-logo lg:hidden"
                  src={`${router.basePath}/assets/images/icons/mobile-logo.png`}
                  alt="mobile-logo.png"
                />
              </a>
            </Link>
            <button
              type="button"
              onClick={toggleClass}
              className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 burger header-burger"
            >
              <div className={isToggled ? 'menu-icon toggled' : 'menu-icon'}>
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
                <Link href="/" className="inactive-link">
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
                <Link href="/" className="inactive-link">
                  <a>
                    <div className="hover column mobile-merch">
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
                            Seed Barrel V2
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
        <div className="hidden w-full lg:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col p-4 mt-4 rounded-lg  lg:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
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
                          src={`${router.basePath}/assets/images/icons/about.svg`}
                          alt="about"
                        />
                        Home
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </li>
            <li className="body-li">
              <Link href="/" className="inactive-link">
                <a>
                  <div className="navigation-bar">
                    <div>
                      <div className="btn btn-hero merch">
                        <img
                          className="nav-icon"
                          src={`${router.basePath}/assets/images/icons/shop.svg`}
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
              <Link href="/" className="inactive-link">
                <a>
                  <div className="navigation-bar">
                    <div>
                      <div className="btn btn-hero merch">
                        <div>Mint</div>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </li>
            <li className="body-li">
              <Link href="/gallery">
                <a>
                  <div className="navigation-bar">
                    <div>
                      <div className="btn btn-hero">
                        <img
                          className="nav-icon"
                          src={`${router.basePath}/assets/images/icons/gallery.svg`}
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
                          src={`${router.basePath}/assets/images/icons/barrel.svg`}
                          alt="barrel"
                        />
                        Seed Barrel V2
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
