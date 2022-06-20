import { useRouter } from 'next/router';

import { Section } from '../layout/Section';
import { Calendar } from './Calendar';
import { FloraWeek } from './FloraWeek';

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
    </Section>
  );
};

export { Body };
