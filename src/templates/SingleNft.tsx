import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
// import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Meta } from '../layout/Meta';
import { Section } from '../layout/Section';
import { getMetadataById } from '../pages/api/nftApi';
import { AppConfig, NftContractAddress } from '../utils/AppConfig';
import DaturiansNFT from '../utils/artifacts/Daturians.json';
import { HeaderMenu } from './HeaderMenu';

// const DaturaMapContainer = dynamic(() => import('./DaturaMapContainer'), {
//   ssr: false,
// });

const occupations = [
  {
    occ: 'Seed thief',
    body: [
      'This Daturian is trying to smuggle seeds.',
      'This Daturian is selling illegal seeds.',
      'This Daturian is hiding from Daturian police',
    ],
  },
  {
    occ: 'Entertainer',
    body: [
      'This Daturian is preparing for an act.',
      'This Daturian is reversing in front of a mirror.',
      'This Daturian is doing a play',
    ],
  },
  {
    occ: 'Architect',
    body: [
      'This Daturian is preparing blueprints for a skyscraper.',
      'This Daturian is inspecting a building.',
      'This Daturian is researching buildings',
    ],
  },
  {
    occ: 'Space Explorer',
    body: [
      'This Daturian is preparing for an expedition.',
      'This Daturian is inside a flight simulator.',
      'This Daturian is ready for take off',
    ],
  },
  {
    occ: 'Solar urticariatus',
    body: [
      'This Daturian is hiding from sun.',
      'This Daturian is visiting an allergologist.',
      'This Daturian is panicking',
    ],
  },
  {
    occ: 'Pilot',
    body: [
      'This Daturian is preparing to take of.',
      'This Daturian is having a few days off.',
      'This Daturian is teching other pilots',
    ],
  },
  {
    occ: 'Dew collector',
    body: [
      'This Daturian is collecting dew.',
      'This Daturian is bringing the dew to water containers.',
      'This Daturian is struggling to find water',
    ],
  },
  {
    occ: 'Ear removal specialist',
    body: [
      'This Daturian is busy with work.',
      'This Daturian is interviewed by local papers.',
      'This Daturian is being yelled at by conservative locals',
    ],
  },
  {
    occ: 'Secret keeper',
    body: [
      'This Daturian is listening to secrets.',
      'This Daturian is being interrogated by secret hunters.',
      'This Daturian is running from questions',
    ],
  },
  {
    occ: 'Astronaut',
    body: [
      "This Daturian is experiencing the G's.",
      'This Daturian is on vacation.',
      'This Daturian is researching the next destination',
    ],
  },
  {
    occ: 'A revert-me-backer',
    body: [
      'This Daturian is trying to accept himself.',
      'This Daturian is panicking.',
      'This Daturian is practising ninja moves',
    ],
  },
  {
    occ: 'Insectologist',
    body: [
      'This Daturian is researching insects.',
      'This Daturian accidentally let insects loose.',
      'This Daturian is trying to control the insect population',
    ],
  },
  {
    occ: 'Leaf Roller',
    body: [
      'This Daturian is fixing his Skoda.',
      'This Daturian is meditating in a Skoda.',
      'This Daturian is on a race track',
    ],
  },
  {
    occ: 'Puzzler',
    body: [
      'This Daturian is trying to create the most difficult puzzle.',
      'This Daturian is trying to solve a puzzle.',
      'This Daturian has lost his patience',
    ],
  },
  {
    occ: 'Transponster',
    body: [
      'This Daturian is running those numbers.',
      'This Daturian is presenting the numbers to his boss.',
      'This Daturian dreams about doing something else',
    ],
  },
  {
    occ: 'Animalogist',
    body: [
      'This Daturian cannot understand the concept of cats.',
      'This Daturian is writing an article about rhinos.',
      'This Daturian is looking through the telescope ',
    ],
  },
  {
    occ: 'Storyteller',
    body: [
      'This Daturian is foiund something unbelievable.',
      'This Daturian is trying to erase shady history.',
      'This Daturian is teaching students',
    ],
  },
  {
    occ: 'Bullshit removal specialist',
    body: [
      'This Daturian gives no.',
      'This Daturian is ....',
      'This Daturian is and will be',
    ],
  },
  {
    occ: 'Oracle',
    body: [
      'This Daturian is in trance.',
      'This Daturian is having a session.',
      'This Daturian is trying to figure out the future of Daturians',
    ],
  },
  {
    occ: 'Curling master',
    body: [
      'This Daturian is in a championship.',
      'This Daturian is questioning his choice of sports.',
      'This Daturian is practising curling',
    ],
  },
  {
    occ: 'Councilmember',
    body: [
      'This Daturian is debating.',
      'This Daturian is taking a bribe.',
      'This Daturian is coding an update for S.E.E.D',
    ],
  },
  {
    occ: 'Antique collector',
    body: [
      'This Daturian is selling an art piece.',
      'This Daturian is buying smuggled goods.',
      'This Daturian is having a yard sale',
    ],
  },
  {
    occ: 'Artist',
    body: [
      'This Daturian is trying to imagine Datura after 1k yers.',
      'This Daturian is trying out new techniques.',
      'This Daturian is preparing for an art gallery showcase',
    ],
  },
  {
    occ: 'Shampoo thief',
    body: [
      'This Daturian is stacking the shampoos.',
      'This Daturian is itching to take a shampoo bottle.',
      'This Daturian is looking for cameras',
    ],
  },
  {
    occ: 'Gardener',
    body: [
      'This Daturian is planting new flowers.',
      'This Daturian is taking care of flora.',
      'This Daturian is listening to gossip behind a bush',
    ],
  },
  {
    occ: 'Boulanger',
    body: [
      'This Daturian is making pottery.',
      'This Daturian is selling pottery.',
      'This Daturian is opening his own store',
    ],
  },
  {
    occ: 'Coffee grinder',
    body: [
      'This Daturian is sending in coffee grounds.',
      'This Daturian is trying to grow a coffee plant.',
      'This Daturian is trying to drink coffee',
    ],
  },
  {
    occ: 'Dreamer',
    body: [
      "This Daturian is trying to save a Daturian who's asleep.",
      'This Daturian is entering the victims dream.',
      'This Daturian is scared of going to bed',
    ],
  },
  {
    occ: 'Tailor',
    body: [
      'This Daturian is trying to figure out new outfits for mixed Daturians.',
      'This Daturian is busy with work.',
      'This Daturian is preparing for a fashion show',
    ],
  },
  {
    occ: 'Student',
    body: [
      'This Daturian is studying tech.',
      'This Daturian is studying arts.',
      'This Daturian is partying',
    ],
  },
  {
    occ: 'Accountant',
    body: [
      'This Daturian is all about numbers.',
      'This Daturian cannot believe the numbers.',
      'This Daturian is having a break',
    ],
  },
  {
    occ: 'Grafitti artist',
    body: [
      'This Daturian is scouting for a cool spot for a grafitti.',
      'This Daturian is painting art.',
      'This Daturian is sketching',
    ],
  },
  {
    occ: 'Comedian',
    body: [
      'This Daturian is on stage.',
      'This Daturian is on tour.',
      'This Daturian is preparing new material',
    ],
  },
  {
    occ: 'Bard',
    body: [
      'This Daturian is singing.',
      'This Daturian is humming.',
      'This Daturian is trying to immitate whales',
    ],
  },
  {
    occ: 'City keeper',
    body: [
      'This Daturian is chasing a criminal.',
      'This Daturian is being photographed.',
      'This Daturian is stalked',
    ],
  },
  {
    occ: 'Undecided',
    body: [
      'This Daturian is trying to figure out what to do.',
      'This Daturian is preparing a sandwich.',
      'This Daturian is lost',
    ],
  },
  {
    occ: 'Gondolier',
    body: [
      'This Daturian is waiting for passengers.',
      'This Daturian is giving a lift.',
      'This Daturian is on break',
    ],
  },
  {
    occ: 'Rebel',
    body: [
      'This Daturian is trying to get in.',
      'This Daturian is running away.',
      'This Daturian is creating problems',
    ],
  },
  {
    occ: 'Scientist',
    body: [
      'This Daturian is trying to create a new genome.',
      'This Daturian is exploring new life forms.',
      'This Daturian is trying to put his conscience inside S.E.E.D',
    ],
  },
];
const earsFamilies = [
  {
    family: 'The Juzephinos Family',
    title: 'Plain',
  },
  {
    family: 'Greatoldsmartens Dynasty',
    title: 'Polar',
  },
  {
    family: 'The NewWavers Clan',
    title: 'Tech',
  },
  {
    family: 'The Milksalots Tribe',
    title: 'Cow',
  },
  {
    family: 'The OpenDudes Syndicate',
    title: 'Glass',
  },
  {
    family: 'The Millenialums',
    title: 'Caramel',
  },
  {
    family: 'The Gonnacatchers Mob',
    title: 'Tiger',
  },
  {
    family: 'The Kingstons Ring',
    title: 'Cheetah',
  },
  {
    family: 'Le Cool Familia',
    title: 'Tattoo',
  },
  {
    family: 'The Order of Ozarksons',
    title: 'Popsicle',
  },
];

const geneticsMapReg = {
  pure: 'Both parents and grandparents of this Daturian come from the same family tree and are trying to protect the legacy of this family traditions.',
  mixed:
    'The parents of this Daturian belong to [body family] and [ear family] and are forming new genetic variations.',
};

const geneticsMapSpecial = [
  {
    name: 'The Juzephinos Family mark',
    text: 'This Daturian was blessed by his family for being awesome.',
  },
  {
    name: 'The Kingston Catchers',
    text: "Lately the Gonnacatchers Mob are becoming more and more united with the Kingstons Ring - creating a whole new set of traits for new generations. It's poetic that the most royal family on 1270 Datura is joining forces and creating families with the most savage one.",
  },
  {
    name: 'Bigfoots',
    text: "The Bigfoot family is shrouded in legends and mystery. While the family doesn't exist anymore - there are still living Daturians who have traits of this ancient family tree. It is believed that The Bigfoots came from a mystical land called the Middle-earth. You can easily identify a Bigfoot Daturian by their hairy ears.",
  },
  {
    name: 'The Iron Wolf Tribe',
    text: 'Only a couple of currently living Daturians still carry this family gene. It is a well-known fact that the Iron Wolf Tribe was always focused on finding the most suitable planets for Daturians to live in. Most of the Tribe members traveled on an expedition thousands of years ago and Daturians are still waiting for the members of this family to come back with good news.',
  },
  {
    name: 'Leafers',
    text: "Some Daturians take such good care of their plants that they're becoming plant-like creatures themselves. There's been only a couple of Daturians who underwent this change but it is widely believed that at some point in Daturian evolution - they will become one with nature.",
  },
  {
    name: 'Azul',
    text: 'Blue genes are the oldest and rarest among all Daturians. It is a great privilege for any Daturian to carry this gene. The roots of the Azul family date back to the blue period in Daturian history and they are considered to be the Adam and Eve of their species.',
  },
  {
    name: 'Explorers',
    text: 'Astronauts and space explorers spend so much time in the open space that solar radiation has changed their genetics. If you see a Daturian with purple ears - you can be sure that their parents have spent a considerable amount of time searching for new lands.',
  },
  {
    name: 'Liberal',
    text: 'This Daturian has chosen to surgically remove the ears and leave the family traditions behind.',
  },
];

const collection = 'meta';

const SingleNft = () => {
  const router = useRouter();
  const [currId, setId] = useState<string>('');
  const [meta, setMeta] = useState<any>([]);

  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider(
      'https://polygon-rpc.com/'
    );
    // const provider = new ethers.providers.JsonRpcProvider(node_url)
    const contract = new ethers.Contract(
      NftContractAddress,
      DaturiansNFT.abi,
      provider
    );
    async function getId(newId: any) {
      // console.log(newId);
      if (newId && typeof newId === 'string') {
        if (!currId) {
          setId(newId);
        }
        if (currId) {
          if (currId.length < 1) {
            setId(newId);
          }
        }
      }

      try {
        const minted = await contract.totalMinted.call();
        const myMeta = await getMetadataById(
          newId,
          collection,
          contract,
          minted
        );
        // console.log(myMeta);
        return myMeta;
      } catch (err: any) {
        return null;
      }
    }

    // map occupation to activity
    function setActivity(metaObj: any) {
      const occupation = metaObj.data.attributes[4].value;
      const activity = occupations.find((obj) => obj.occ === occupation);
      // console.log(activity);
      if (activity) {
        const randomElement =
          activity.body[Math.floor(Math.random() * activity.body.length)];
        metaObj.data.activity = randomElement;
      } else {
        metaObj.data.activity = 'This daturian is doing nothing good.';
      }
      return metaObj;
    }
    // map genetics of the daturian
    function setGenetics(metaObj: any) {
      const fam = metaObj.data.attributes[3].value.split(' x ');
      if (fam.length === 1) {
        const newEarsFam = earsFamilies.find(
          (obj) => obj.title === metaObj.data.attributes[5].value
        );
        // if body === ears
        if (newEarsFam?.family === fam[0]) {
          // else pure blood
          metaObj.data.genetics = 'Pure Blood';
          metaObj.data.geneticsText = geneticsMapReg.pure;
        } else {
          metaObj.data.genetics = 'Mixed Blood';
          metaObj.data.geneticsText = `The parents of this Daturian belong to ${fam[0]} and ${newEarsFam?.family} and are forming new genetic variations.`;
        }
      } else {
        const newMetaGen = geneticsMapSpecial.find(
          (obj) => obj.name === fam[1]
        );
        metaObj.data.genetics = newMetaGen?.name;
        metaObj.data.geneticsText = newMetaGen?.text;
      }
      return metaObj;
    }

    if (!router.isReady) return;
    // console.log(router.query);
    const { id } = router.query;
    const promise = getId(id);
    promise.then((meta2) => {
      // console.log(meta2);
      if (meta2.data.length > 0 && meta2.status === 200) {
        const updateMeta = setGenetics(meta2.data[0]);
        const updateMeta2 = setActivity(updateMeta);
        setMeta(updateMeta2);
      }
    });
  }, [router.isReady, currId, router.query]);

  return (
    <Section>
      <Meta
        title={AppConfig.collectionTitle}
        description={AppConfig.collectionDescription}
      />
      <HeaderMenu></HeaderMenu>
      <div className="flex justify-center">
        {meta.length < 1 ? (
          <h1 className="px-20 py-10 text-2l font-semibold text-center">
            Loading Daturian
          </h1>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {/* home */}
            <div className="bg-primary-100 rounded-md grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 pt-4 mt-4 single-nft-logo">
              <div className="rounded-md overflow-hidden">
                <img
                  className="object-cover content-center home-logo"
                  src={`${router.basePath}/assets/images/icons/mobile-logo.png`}
                  alt="mobile-logo.png"
                />
              </div>
            </div>
            <div className="sm:col-span-4 lg:col-span-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-3 xl:grid-cols-3 gap-4 pt-4 ">
                {/* name */}
                <div className="bg-primary-100 content-gallery rounded-md overflow-hidden lg:col-span-1 sm:col-span-1">
                  <div className="p-4 ">
                    <p className="text-2l font-semibold">{meta.name}</p>
                  </div>
                </div>
                {/* health */}
                <div className="bg-primary-100 content-gallery rounded-md overflow-hidden lg:col-span-2 sm:col-span-3">
                  <div className="p-4 w-full inline-flex">
                    <p className="text-2l font-semibold w-3/12">
                      {`${meta.data.attributes[7].trait_type}: `}
                    </p>

                    <p className="font-light w-1/5">
                      {meta.data.attributes[7].value}
                    </p>
                    <div className="relative pt-2 w-full rounded health">
                      <div className="h-2 text-xs flex rounded bg-white">
                        <div
                          style={{ width: `${meta.data.attributes[7].value}%` }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink rounded"
                        >
                          <div className="heart">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* faction */}
                <div className="bg-primary-100 content-gallery rounded-md overflow-hidden lg:col-span-1 sm:col-span-1">
                  <div className="p-4 inline-flex">
                    <p className="text-2l font-semibold">
                      {`${meta.data.attributes[1].trait_type}: `}
                    </p>
                    <div>
                      <p className="font-light">
                        {meta.data.attributes[1].value}
                      </p>
                    </div>
                  </div>
                </div>
                {/* type */}
                <div className="bg-primary-100 content-gallery rounded-md overflow-hidden lg:col-span-1 sm:col-span-1">
                  <div className="p-4 inline-flex">
                    <p className="text-2l font-semibold">
                      {`${meta.data.attributes[0].trait_type}: `}
                    </p>
                    <div>
                      <p className="font-light">
                        {meta.data.attributes[0].value}
                      </p>
                    </div>
                  </div>
                </div>
                {/* Character traits */}
                <div className="bg-primary-100 content-gallery rounded-md overflow-hidden lg:col-span-1 sm:col-span-2">
                  <div className="p-4 inline-flex">
                    <p className="text-2l font-semibold">
                      {`${meta.data.extras[5].trait_type}: `}
                    </p>
                    <div>
                      <p className="font-light">{meta.data.extras[5].value}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* image */}
            <div className="grid grid-cols-1 sm:col-span-4 lg:col-span-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4">
              <div className="rounded-md overflow-hidden">
                <img
                  className="object-cover content-center daturian"
                  src={meta.image}
                  alt={meta.image}
                />
              </div>
            </div>
            <div className="sm:col-span-4 lg:col-span-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {/* family */}
                <div className="bg-primary-100 content-gallery rounded-md overflow-hidden col-span-3">
                  <div className="grid sm:grid-cols-2 xs:grid-cols-1 gap-4">
                    <div className="p-4 col-span-1">
                      <h1>
                        {meta.data.attributes[3].trait_type}:{' '}
                        {meta.data.attributes[3].value.split(' x ')[0]}
                      </h1>
                      <br />
                      <p className="font-light">{meta.data.extras[1].value}</p>
                    </div>
                    <div className="p-4 col-span-1">
                      <img
                        className="object-cover content-center family-crest"
                        alt="family.png"
                        src={`${
                          router.basePath
                        }/assets/images/gallery/families/${meta.data.attributes[3].value
                          .split(' x ')[0]
                          .split(' ')
                          .join('-')}.png`}
                      />
                    </div>
                  </div>
                </div>
                {/* location */}
                <div className="bg-primary-100 content-gallery rounded-md overflow-hidden col-span-3">
                  <div className="grid sm:grid-cols-2 xs:grid-cols-1 gap-4">
                    <div className="p-4 col-span-1">
                      <img
                        className="object-cover content-center family-crest"
                        src={`${
                          router.basePath
                        }/assets/images/gallery/locations/${meta.data.attributes[2].value
                          .split(' ')
                          .join('-')}.png`}
                        alt="location.png"
                      />
                    </div>
                    <div className="p-4 col-span-1">
                      <h1>
                        {meta.data.attributes[2].trait_type}:{' '}
                        {meta.data.attributes[2].value}
                      </h1>
                      <br />
                      <p className="font-light">{meta.data.extras[0].value}</p>
                    </div>
                  </div>
                </div>
                {/* additional */}
                <div className="bg-primary-100 content-gallery rounded-md overflow-hidden col-span-3 p-4 flex">
                  <div className="pulsating-circle"></div>
                  <p>
                    <b>What is {meta.name} doing:</b> {meta.data.activity}{' '}
                  </p>
                </div>
              </div>
            </div>
            {/* genetics */}
            <div className="sm:col-span-4 lg:col-span-2">
              <div className="bg-primary-100 content-gallery rounded-md overflow-hidden col-span-3">
                <div className="grid sm:grid-cols-2 xs:grid-cols-1 gap-4">
                  <div className="p-4 col-span-1">
                    <h1>Genetics: {meta.data.genetics}</h1>
                    <br />
                    <p className="font-light">{meta.data.geneticsText}</p>
                  </div>
                  <div className="p-4 col-span-1">
                    <img
                      className="object-cover content-center family-crest"
                      src={`${
                        router.basePath
                      }/assets/images/gallery/families/${meta.data.genetics
                        .split(' ')
                        .join('-')}.png`}
                      alt="family.png"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Occupation */}
            <div className="bg-primary-100 content-gallery rounded-md overflow-hidden lg:col-span-1 sm:col-span-2">
              <div className="p-4">
                <h1>
                  {`${meta.data.attributes[4].trait_type}: `}
                  {meta.data.attributes[4].value}
                </h1>
                <p>&nbsp;</p>
                <div>
                  <p className="font-light">{meta.data.extras[2].value}</p>
                </div>
              </div>
            </div>
            {/* Special ability */}
            <div className="bg-primary-100 content-gallery rounded-md overflow-hidden lg:col-span-1 sm:col-span-2">
              <div className="p-4 ">
                <h1>{`${meta.data.extras[3].trait_type}: `}</h1>
                <p>&nbsp;</p>
                <div>
                  <p className="font-light">{meta.data.extras[3].value}</p>
                </div>
              </div>
            </div>
            {/* flower */}
            <div className="bg-primary-100 content-gallery rounded-md overflow-hidden lg:col-span-2 sm:col-span-4">
              <div className="grid sm:grid-cols-2 xs:grid-cols-1 gap-4">
                <div className="p-4 col-span-1">
                  <h1>
                    {meta.data.attributes[9].trait_type}:{' '}
                    {meta.data.attributes[9].value}
                  </h1>
                  <br />
                  <p className="font-light">{meta.data.extras[4].value}</p>
                </div>
                <div className="p-4 col-span-1">
                  <img
                    className="object-cover content-center flower-image"
                    src={`${
                      router.basePath
                    }/assets/images/floraweek/${meta.data.attributes[9].value
                      .toLowerCase()
                      .split(' ')
                      .join('_')}.png`}
                    alt="flora.png"
                  />
                </div>
              </div>
            </div>
            <div className=" content-gallery rounded-md overflow-hidden lg:col-span-3 sm:col-span-4 datura-map">
              <img
                className="content-center"
                src={`${router.basePath}/assets/images/datura_map.png`}
                alt="datura_map.png"
              />
              {/* <DaturaMapContainer
                svgUrl={`${router.basePath}/assets/images/datura_map.svg`}
              /> */}
            </div>
            <div className="bg-primary-100 content-gallery rounded-md overflow-hidden lg:col-span-3 sm:col-span-4 opensea-box gap-4 p-4">
              <div className="about-title single-opensea">
                <h1>View on Opensea:</h1>
                <a href={AppConfig.openseaCollectionUrl + meta.tokenId}>
                  <img
                    className="opensea-icon"
                    src={`${router.basePath}/assets/images/icons/opensea.svg`}
                    alt="opensea.svg"
                  />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </Section>
  );
};

export default SingleNft;
