import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import { useRouter } from 'next/router';

import { Meta } from '../layout/Meta';
import { Section } from '../layout/Section';
import { getMetadataById } from '../pages/api/nftApi';
import { AppConfig, NftContractAddress } from '../utils/AppConfig';
import DaturiansNFT from '../utils/artifacts/Daturians.json';
import { HeaderMenu } from './HeaderMenu';

// const geneticsMapping = {
//   pure: 'Both parents and grandparents of this Daturian come from the same family tree and are trying to protect the legacy of this family traditions.',
//   mixed:
//     'The parents of this Daturian belong to [body family] and [ear family] and are forming new genetic variations.',
//   earrings_red:
//     'Only a couple of currently living Daturians still carry this family gene. It is a well-known fact that the Iron Wolf Tribe was always focused on finding the most suitable planets for Daturians to live in. Most of the Tribe members traveled on an expedition thousands of years ago and Daturians are still waiting for the members of this family to come back with good news.',
//   the_juzephinos_family_mark:
//     'This Daturian was blessed by his family for being awesome.',
//   the_kingston_catchers:
//     "Lately the Gonnacatchers Mob are becoming more and more united with the Kingstons Ring - creating a whole new set of traits for new generations. It's poetic that the most royal family on 1270 Datura is joining forces and creating families with the most savage one.",
//   bigfoots:
//     "The Bigfoot family is shrouded in legends and mystery. While the family doesn't exist anymore - there are still living Daturians who have traits of this ancient family tree. It is believed that The Bigfoots came from a mystical land called the Middle-earth. You can easily identify a Bigfoot Daturian by their hairy ears.",
//   the_iron_wolf_tribe:
//     'Only a couple of currently living Daturians still carry this family gene. It is a well-known fact that the Iron Wolf Tribe was always focused on finding the most suitable planets for Daturians to live in. Most of the Tribe members traveled on an expedition thousands of years ago and Daturians are still waiting for the members of this family to come back with good news.',
//   leafers:
//     "Some Daturians take such good care of their plants that they're becoming plant-like creatures themselves. There's been only a couple of Daturians who underwent this change but it is widely believed that at some point in Daturian evolution - they will become one with nature.",
//   azul: 'Blue genes are the oldest and rarest among all Daturians. It is a great privilege for any Daturian to carry this gene. The roots of the Azul family date back to the blue period in Daturian history and they are considered to be the Adam and Eve of their species.',
//   explorers:
//     'Astronauts and space explorers spend so much time in the open space that solar radiation has changed their genetics. If you see a Daturian with purple ears - you can be sure that their parents have spent a considerable amount of time searching for new lands.',
//   liberal:
//     'This Daturian has chosen to surgically remove the ears and leave the family traditions behind.',
// };

const SingleNft = () => {
  const router = useRouter();
  const [currId, setId] = useState<string>('');
  const [meta, setMeta] = useState<any>([]);
  // console.log(currId);

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
        const myMeta = await getMetadataById(newId, contract, minted);
        // console.log(myMeta);
        return myMeta;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        return null;
      }
    }
    // console.log(router);
    if (!router.isReady) return;
    // console.log(router.query);
    const { id } = router.query;
    const promise = getId(id);
    promise.then((meta2) => {
      // console.log(meta2);
      // console.log(meta2.data[0]);
      // if (meta2.data) {
      //   const newMeta = meta2.data[0];
      //   newMeta.data.attributes.append

      setMeta(meta2.data[0]);
      // }
    });
    // console.log(id);
    // codes using router.query
  }, []);

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
            <div className="bg-primary-100 rounded-md grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 pt-4 mt-4">
              <div className="rounded-md overflow-hidden">
                <img
                  className="object-cover content-center home-logo"
                  src={`${router.basePath}/assets/images/icons/mobile-logo.png`}
                  alt="mobile-logo.png"
                />
              </div>
            </div>
            <div className="col-span-2">
              <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 pt-4 ">
                {/* name */}
                <div className="bg-primary-100 content-gallery rounded-md overflow-hidden col-span-1">
                  <div className="p-4 ">
                    <p className="text-2l font-semibold">{meta.name}</p>
                  </div>
                </div>
                {/* health */}
                <div className="bg-primary-100 content-gallery rounded-md overflow-hidden col-span-2">
                  <div className="p-4 w-full inline-flex">
                    <p className="text-2l font-semibold w-3/12">
                      {`${meta.data.attributes[7].trait_type}: `}
                    </p>

                    <p className="font-light w-1/5">
                      {meta.data.attributes[7].value}
                    </p>
                    <div className="relative pt-2 w-full rounded">
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
                <div className="bg-primary-100 content-gallery rounded-md overflow-hidden col-span-1">
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
                <div className="bg-primary-100 content-gallery rounded-md overflow-hidden col-span-1">
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
                <div className="bg-primary-100 content-gallery rounded-md overflow-hidden col-span-1">
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
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4">
              <div className="rounded-md overflow-hidden">
                <img
                  className="object-cover content-center daturian"
                  src={meta.image}
                  alt={meta.image}
                />
              </div>
            </div>
            <div className="col-span-2">
              <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {/* family */}
                <div className="bg-primary-100 content-gallery rounded-md overflow-hidden col-span-3">
                  <div className="grid grid-cols-2 gap-4">
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
                  <div className="grid grid-cols-2 gap-4">
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
                    <b>What is {meta.name} doing:</b> Gathering mushrooms{' '}
                  </p>
                </div>
              </div>
            </div>
            {/* genetics */}
            <div className="col-span-2">
              <div className="bg-primary-100 content-gallery rounded-md overflow-hidden col-span-3">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 col-span-1">
                    <h1>Genetics: {meta.data.attributes[3].value}</h1>
                    <br />
                    <p className="font-light">{meta.data.extras[1].value}</p>
                  </div>
                  <div className="p-4 col-span-1">
                    <img
                      className="object-cover content-center family-crest"
                      src={`${router.basePath}/assets/images/gallery/families/Mix-Blood.png`}
                      alt="family.png"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Occupation */}
            <div className="bg-primary-100 content-gallery rounded-md overflow-hidden col-span-1">
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
            <div className="bg-primary-100 content-gallery rounded-md overflow-hidden col-span-1">
              <div className="p-4 ">
                <h1>{`${meta.data.extras[3].trait_type}: `}</h1>
                <p>&nbsp;</p>
                <div>
                  <p className="font-light">{meta.data.extras[3].value}</p>
                </div>
              </div>
            </div>
            {/* flower */}
            <div className="bg-primary-100 content-gallery rounded-md overflow-hidden col-span-2">
              <div className="grid grid-cols-2 gap-4">
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
            <div className="bg-primary-100 content-gallery rounded-md overflow-hidden col-span-3 datura-map">
              <img
                className="object-cover content-center"
                src={`${router.basePath}/assets/images/datura_map.png`}
                alt="datura_map.png"
              />
            </div>
            <div className="bg-primary-100 content-gallery rounded-md overflow-hidden col-span-3 opensea-box gap-4 p-4">
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
