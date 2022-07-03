import { Section } from '../layout/Section';
import { About } from './About';
import { Additional } from './Additional';
import { Attributes } from './Attributes';
import { Calendar } from './Calendar';
import { ContactForm } from './ContactForm';
import { Events } from './Events';
import { FaqCont } from './Faq';
import { FloraVsTech } from './FloraVsTech';
import { FloraWeek } from './FloraWeek';
import { FooterArt } from './FooterArt';
import { HallOfFame } from './HallOfFame';
import { InstaEmbed } from './InstaEmbed';
import { MediumWidget } from './MediumWidget';
import { Profiles } from './Profiles';
import { Roadmap } from './Roadmap';
import { SeenOn } from './SeenOn';
import { Stats } from './Stats';
import { Update } from './Update';

const Body = () => {
  // const router = useRouter();

  // console.log(router.basePath);

  const floraProps = {
    description: `Asimina triloba, the American papaw,
    paw paw among many regional names,
    is a small deciduous tree native to
    the eastern United States.`,
    image: `/assets/images/daturimanz.jpg`,
    imageAlt: `Kiwis`,
    size: 44,
    title: `FLORA of the week`,
  };

  const updateProps = {
    image: `/assets/images/daturimanz.jpg`,
    imageAlt: `Kiwis`,
    size: 44,
    title: `Daturians update day`,
  };

  const eventsProps = {
    description: `Join hundreds of developers
    for a 3-day hackathon and
    workshop series to build
    the Web3 world.`,
    image: `/assets/images/daturimanz.jpg`,
    imageAlt: `Kiwis`,
    date: `August 8-10, 2022`,
    location: `Located at
    Blockchain Futurist
    Conference in a Mega
    Hacker Dome!`,
    size: 25,
  };

  const mediumProps = {
    title: `Daturian Structure`,
    description: `Update 2.1`,
    image: `/assets/images/daturimanz.jpg`,
    imageAlt: `Kiwis`,
    size: 44,
    link: `https://www.medium.com`,
  };

  const instaProps = {
    url: `https://www.instagram.com/p/CfRZ24UsfrO/`,
    width: 328,
  };

  const roadmapProps = {
    image: `/assets/images/roadmap_screenshot.png`,
    imageAlt: `roadmap`,
    size: 500,
  };

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
    height: 250,
    width: 750,
    title: `Daturians Minted`,
  };

  const floraVsTechProps = {
    description: `There are 222 hand drawn
    attributes that make up a
    Daturian! It s all vector
    and there s no AI. Except
    for Adobe Illustrator and
    some coding, of course. And
    just like Shrek and onions
     they are made of layers!
    8 layers, to be exact. Each
    layer is tied to specific
    metadata that tells a
    unique story about your
    Daturian.`,
    image: `/assets/images/flora_vs_tech.png`,
    imageAlt: `Kiwis`,
    size: 250,
    title: `Flora VS Tech`,
  };

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

  const hofProps = {
    description: `Some hall of fame description`,
  };

  const contactProps = {
    description: `Have something to say to us? A
    proposal? A new recipe for a killer
    cake?`,
    linkUrl: `daturians.com`,
  };

  return (
    <Section>
      <FloraWeek
        description={floraProps.description}
        image={floraProps.image}
        imageAlt={floraProps.imageAlt}
        size={floraProps.size}
        title={floraProps.title}
      ></FloraWeek>
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
      <MediumWidget
        title={mediumProps.title}
        description={mediumProps.description}
        image={mediumProps.image}
        imageAlt={mediumProps.imageAlt}
        size={mediumProps.size}
        link={mediumProps.link}
      ></MediumWidget>
      <About></About>
      <InstaEmbed url={instaProps.url} width={instaProps.width}></InstaEmbed>
      <Roadmap
        image={roadmapProps.image}
        imageAlt={roadmapProps.imageAlt}
        size={roadmapProps.size}
      ></Roadmap>
      <Attributes
        description1={attributesProps.description1}
        description2={attributesProps.description2}
        image={attributesProps.image}
        imageAlt={attributesProps.imageAlt}
        size={attributesProps.size}
      ></Attributes>
      <Stats
        src={statsProps.src}
        height={statsProps.height}
        width={statsProps.width}
        title={statsProps.title}
      ></Stats>
      <FloraVsTech
        description={floraVsTechProps.description}
        image={floraVsTechProps.image}
        imageAlt={floraVsTechProps.imageAlt}
        size={floraVsTechProps.size}
        title={floraVsTechProps.title}
      ></FloraVsTech>
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
      <HallOfFame description={hofProps.description}></HallOfFame>
      <FaqCont></FaqCont>
      <Profiles></Profiles>
      <SeenOn></SeenOn>
      <ContactForm
        description={contactProps.description}
        linkUrl={contactProps.linkUrl}
      ></ContactForm>
      <FooterArt></FooterArt>
    </Section>
  );
};

export { Body };
