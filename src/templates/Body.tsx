import { useRouter } from 'next/router';

import { Section } from '../layout/Section';
import { Calendar } from './Calendar';
import { Events } from './Events';
import { FloraWeek } from './FloraWeek';
import { MediumWidget } from './MediumWidget';
import { Update } from './Update';

const Body = () => {
  const router = useRouter();

  console.log(router.basePath);

  const flora = {
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

  return (
    <Section>
      <FloraWeek
        description={flora.description}
        image={flora.image}
        imageAlt={flora.imageAlt}
        size={flora.size}
        title={flora.title}
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
    </Section>
  );
};

export { Body };
