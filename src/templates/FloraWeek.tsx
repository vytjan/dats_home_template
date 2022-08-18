import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

// type IFloraProps = {
//   image: string;
//   imageAlt: string;
//   size: number;
//   description: string;
//   title: string;
// };

const floraProps = [
  {
    description: `Aloe vera is made up of 99.5% water, but the 0.5% solid portions are known to have the most active nutrients.`,
    image: `/assets/images/floraweek/aloe_vera.png`,
    imageAlt: `plant`,
    size: 44,
    title: `Aloe Vera`,
  },
  {
    description: `This mushroom is all about the drama. The Roman emperor, Claudius, was murdered by his wife who slipped a toxic amanita in with the edible Caesar ones. This dish was fatal, and her son Nero became a new emperor.`,
    image: `/assets/images/floraweek/ceaser.png`,
    imageAlt: `caesar`,
    size: 44,
    title: `Caesar`,
  },
  {
    description: `Also known as DATURA. The name comes from the early Sanskrit dustura or dahatura, meaning "divine inebriation". For many years, native people and tribes in various parts of the world have taken intoxicating plant preparations in religious rituals, divination, witchcraft, and healing ceremonies.`,
    image: `/assets/images/floraweek/moonflower.png`,
    imageAlt: `moonflower`,
    size: 44,
    title: `Moonflower`,
  },
  {
    description: `Water lilies are one of the oldest aquatic plants. There are Water Lily fossils discovered that dates back over 60 million years.`,
    image: `/assets/images/floraweek/water_lily.png`,
    imageAlt: `water_lily`,
    size: 44,
    title: `Water Lily`,
  },
];

const FloraWeek = () => {
  const [week, setWeek] = useState(0);
  const router = useRouter();

  const getWeek = () => {
    const currentdate = new Date();
    const firstJanuary = new Date(currentdate.getFullYear(), 0, 1);
    // we start at week 34:
    const dayNr = Math.ceil(
      (Date.parse(currentdate.toString()) -
        Date.parse(firstJanuary.toString())) /
        (24 * 60 * 60 * 1000)
    );
    const weekNr = Math.ceil((dayNr + firstJanuary.getDay()) / 7) - 34;
    return weekNr;
  };

  useEffect(() => {
    const currentWeek = getWeek();
    // setWeek(currentWeek);
    // console.log(currentWeek);
    if (currentWeek >= floraProps.length) {
      setWeek(0);
    } else {
      setWeek(currentWeek);
    }
  }, []);

  // const currentFlora = floraProps[week]?.description;
  return (
    <div className="floraweek p-4 sm:text-left sm:items-center sm:justify-between p-8 bg-primary-100 rounded-md col-span-2">
      <h1>{`FLORA of the week`}</h1>
      <p>{floraProps[week]?.description}</p>
      <img
        src={`${router.basePath}${floraProps[week]?.image}`}
        alt={floraProps[week]?.imageAlt}
        width={floraProps[week]?.size}
        height={floraProps[week]?.size}
      />
    </div>
  );
};

export { FloraWeek };
