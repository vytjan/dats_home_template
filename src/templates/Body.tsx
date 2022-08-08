import Link from 'next/link';

import { Button } from '../button/Button';
import { Section } from '../layout/Section';
import { Navbar } from '../navigation/Navbar';
import { About } from './About';
import { Additional } from './Additional';
import { Attributes } from './Attributes';
import { Box } from './Box';
import { Calendar } from './Calendar';
import { ContactForm } from './ContactForm';
import { Events } from './Events';
import { FaqCont } from './Faq';
import { FloraWeek } from './FloraWeek';
import { FooterArt } from './FooterArt';
// import { HallOfFame } from './HallOfFame';
import { InstaEmbed } from './InstaEmbed';
import { Logo } from './Logo';
import { MediumWidget } from './MediumWidget';
import { Profiles } from './Profiles';
import { Roadmap } from './Roadmap';
import { SeenOn } from './SeenOn';
import { Stats } from './Stats';
import { Update } from './Update';

const Body = () => {
  // const router = useRouter();

  // console.log(router.basePath);

  const logoProps = {
    image: `/assets/images/logo.svg`,
    imageAlt: `Logo`,
    size: 100,
  };

  const InstaProps = {
    image: `/assets/images/instagram.png`,
    imageAlt: `instagram`,
    size: 100,
  };

  const floraProps = {
    description: `Aloe vera is made up of 99.5% water, but the 0.5% solid portions are known to have the most active nutrients.`,
    image: `/assets/images/floraweek/aloe_vera.png`,
    imageAlt: `plant`,
    size: 44,
    title: `FLORA of the week`,
  };

  const updateProps = {
    image: `/assets/images/icons/discord.svg`,
    imageAlt: `discord`,
    size: 44,
    title: `Update day`,
  };

  const eventsProps = {
    description: `Blockchain Futurist conference 2022`,
    image: `/assets/images/icons/calendar.svg`,
    imageAlt: `calendar`,
    date: `August 8-10`,
    location: `Toronto, Canada`,
    size: 25,
  };

  const mediumProps = {
    title: `Daturian Structure`,
    description: `Update 2.1`,
    image: `/assets/images/icons/medium.svg`,
    imageAlt: `medium`,
    size: 44,
    link: `https://www.medium.com`,
  };

  // const instaProps = {
  //   url: `https://www.instagram.com/p/CfRZ24UsfrO/`,
  //   width: 328,
  // };

  // const roadmapProps = {
  //   image: `/assets/images/roadmap_screenshot.png`,
  //   imageAlt: `roadmap`,
  //   size: 500,
  // };

  const attributesProps = {
    description1: `Since Daturians are technically advanced creatures
    some of them have tech features. You ll see in the
    gallery whether your Daturian belongs to the Natural
    or Tech faction. Based on that expect events and
    other activities in our Discord to see which group
    takes the cake as the best one. But do remember that
    cake is a lie.`,
    description2: `There are 222 hand drawn attributes that make up a
    Daturian! It s all vector and there s no AI. Except for
    Adobe Illustrator and some coding, of course. And just
    like Shrek and onions they are made of layers! 8
    layers, to be exact. Each layer is tied to specific
    metadata that tells a unique story about your
    Daturian.`,
    image: `/assets/images/attributes_img.png`,
    imageAlt: `attributes image`,
    size: 150,
  };

  const statsProps = {
    src: `https://dune.com/embeds/753447/1358291/4ad0a3fb-6ec2-4c83-b3ab-425e10c72d8b`,
    height: 200,
    width: 700,
    title: `Daturians Minted`,
  };

  // const floraVsTechProps = {
  //   description: `There are 222 hand drawn
  //   attributes that make up a
  //   Daturian! It s all vector
  //   and there s no AI. Except
  //   for Adobe Illustrator and
  //   some coding, of course. And
  //   just like Shrek and onions
  //    they are made of layers!
  //   8 layers, to be exact. Each
  //   layer is tied to specific
  //   metadata that tells a
  //   unique story about your
  //   Daturian.`,
  //   image: `/assets/images/flora_vs_tech.png`,
  //   imageAlt: `Kiwis`,
  //   size: 250,
  //   title: `Flora VS Tech`,
  // };

  const addProps = {
    urlUkraine: `https://opensea.io/collection/daturians4ukraine`,
    urlCafe: `https://opensea.io/collection/daturians-cafe`,
    urlGreenhouse: `https://opensea.io/collection/daturians-greenhouse`,
    imageUkraine: `/assets/images/ukraine.png`,
    imageUkraineAlt: `Ukraine`,
    imageCafe: `/assets/images/cafe.png`,
    imageCafeAlt: `Cafe`,
    imageGreenhouse: `/assets/images/greenhouse.png`,
    imageGreenhouseAlt: `Greenhouse`,
    description: `Daturian Collections on
    OpenSea created to support
    Ukraine, create friendships
    with other projects and to
    create something special
    just for YOU!`,
  };

  // const hofProps = {
  //   description: `Some hall of fame description`,
  // };

  const contactProps = {
    description: `Have something to say to us? A
    proposal? A new recipe for a killer
    cake?`,
    linkUrl: `daturians.com`,
  };

  const boxProps = {
    xl: true,
    image: `/assets/images/polygon_partnership.png`,
    imageAlt: `Logo`,
  };

  return (
    <Section>
      <Navbar>
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
          </button>
          <div className="hidden w-full xl:block md:w-auto" id="navbar-default">
            <ul className="flex flex-col p-4 mt-4 rounded-lg  xl:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li className="body-li">
                <Link href="/">
                  <a>
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
      <div className="flex-col">
        <div className="left-content grid grid-cols-3 gap-5 max-auto px-3">
          <Logo image={logoProps.image} imageAlt={logoProps.imageAlt}></Logo>
          <FloraWeek
            description={floraProps.description}
            image={floraProps.image}
            imageAlt={floraProps.imageAlt}
            size={floraProps.size}
            title={floraProps.title}
          ></FloraWeek>
          <MediumWidget
            title={mediumProps.title}
            description={mediumProps.description}
            image={mediumProps.image}
            imageAlt={mediumProps.imageAlt}
            size={mediumProps.size}
            link={mediumProps.link}
          ></MediumWidget>
          <About></About>
          <Roadmap></Roadmap>
        </div>
        <div className="right-content grid grid-cols-2 gap-5 max-auto px-3">
          <Calendar></Calendar>
          <Update
            title={updateProps.title}
            image={updateProps.image}
            imageAlt={updateProps.imageAlt}
            size={updateProps.size}
          ></Update>
          <Events
            description={eventsProps.description}
            location={eventsProps.location}
            date={eventsProps.date}
            image={eventsProps.image}
            imageAlt={eventsProps.imageAlt}
            size={eventsProps.size}
          ></Events>
          <div className="insta-attributes col-span-2 gap-5">
            <InstaEmbed
              image={InstaProps.image}
              imageAlt={InstaProps.imageAlt}
            ></InstaEmbed>
            <Attributes
              description1={attributesProps.description1}
              description2={attributesProps.description2}
              image={attributesProps.image}
              imageAlt={attributesProps.imageAlt}
              size={attributesProps.size}
            ></Attributes>
          </div>
          <Stats
            src={statsProps.src}
            height={statsProps.height}
            width={statsProps.width}
            title={statsProps.title}
          ></Stats>
        </div>
      </div>
      <div className="bottom-content grid grid-cols-4 gap-5 max-auto px-3">
        <Additional
          urlUkraine={addProps.urlUkraine}
          urlGreenhouse={addProps.urlGreenhouse}
          urlCafe={addProps.urlCafe}
          imageUkraine={addProps.imageUkraine}
          imageUkraineAlt={addProps.imageUkraineAlt}
          imageCafe={addProps.imageCafe}
          imageCafeAlt={addProps.imageCafeAlt}
          imageGreenhouse={addProps.imageGreenhouse}
          imageGreenhouseAlt={addProps.imageGreenhouseAlt}
          description={addProps.description}
        ></Additional>
        <FaqCont></FaqCont>
        <Box
          xl={boxProps.xl}
          image={boxProps.image}
          imageAlt={boxProps.imageAlt}
        ></Box>
        <Profiles></Profiles>
        <SeenOn></SeenOn>
        <ContactForm
          description={contactProps.description}
          linkUrl={contactProps.linkUrl}
        ></ContactForm>
      </div>
      <FooterArt></FooterArt>
    </Section>
  );
};

export { Body };
