import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import { useRouter } from 'next/router';

import { Meta } from '../layout/Meta';
import { Section } from '../layout/Section';
import { getMetadataById } from '../pages/api/nftApi';
import { AppConfig, UkraineContractAddress } from '../utils/AppConfig';
import Daturians4Ukraine from '../utils/artifacts/Daturians4Ukraine.json';
import { HeaderMenu } from './HeaderMenu';

const SingleSignatureNft = () => {
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
      UkraineContractAddress,
      Daturians4Ukraine.abi,
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
        const myMeta = await getMetadataById(newId, 'ua', contract, minted);
        console.log(myMeta);
        return myMeta;
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        return null;
      }
    }

    // map occupation to activity
    function setActivity(metaObj: any) {
      // const occupation = metaObj.data.attributes[4].value;
      // const activity = occupations.find((obj) => obj.occ === occupation);
      // // console.log(activity);
      // if (activity) {
      //   const randomElement =
      //     activity.body[Math.floor(Math.random() * activity.body.length)];
      //   metaObj.data.activity = randomElement;
      // } else {
      //   metaObj.data.activity = 'This daturian is doing nothing good.';
      // }
      // console.log(metaObj);
      // console.log();
      metaObj.data.activity =
        "Ukrainian Daturians fight for their own and the worlds's freedom.";
      return metaObj;
    }
    // map genetics of the daturian
    // function setGenetics(metaObj: any) {
    //   const fam = metaObj.data.attributes[3].value.split(' x ');
    //   if (fam.length === 1) {
    //     const newEarsFam = earsFamilies.find(
    //       (obj) => obj.title === metaObj.data.attributes[5].value
    //     );
    //     // if body === ears
    //     if (newEarsFam?.family === fam[0]) {
    //       // else pure blood
    //       metaObj.data.genetics = 'Pure Blood';
    //       metaObj.data.geneticsText = geneticsMapReg.pure;
    //     } else {
    //       metaObj.data.genetics = 'Mixed Blood';
    //       metaObj.data.geneticsText = `The parents of this Daturian belong to ${fam[0]} and ${newEarsFam?.family} and are forming new genetic variations.`;
    //     }
    //   } else {
    //     const newMetaGen = geneticsMapSpecial.find(
    //       (obj) => obj.name === fam[1]
    //     );
    //     metaObj.data.genetics = newMetaGen?.name;
    //     metaObj.data.geneticsText = newMetaGen?.text;
    //   }
    //   // console.log(newMetaGen);
    //   // console.log(metaObj);
    //   return metaObj;
    // }

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
      // const updateMeta = setGenetics(meta2.data[0]);
      const updateMeta2 = setActivity(meta2.data[0]);
      setMeta(updateMeta2);
      // }
    });
    // console.log(id);
    // codes using router.query
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Section>
      <Meta
        title={AppConfig.ukraineCollTitle}
        description={AppConfig.ukraineCollDescription}
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
                    <p className="text-2l font-semibold w-3/12">Health: </p>

                    <p className="font-light w-1/5">100</p>
                    <div className="relative pt-2 w-full rounded">
                      <div className="h-2 text-xs flex rounded bg-white">
                        <div
                          style={{ width: `100%` }}
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
                {/* location */}
                <div className="bg-primary-100 content-gallery rounded-md overflow-hidden col-span-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 col-span-1">
                      <img
                        className="object-cover content-center family-crest"
                        src={`${
                          router.basePath
                        }/assets/images/gallery/locations/${meta.data.attributes[0].value
                          .split(' ')
                          .join('-')}.png`}
                        alt="location.png"
                      />
                    </div>
                    <div className="p-4 col-span-1">
                      <h1>
                        {meta.data.attributes[0].trait_type}:{' '}
                        {meta.data.attributes[0].value}
                      </h1>
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
            {/* <div className="col-span-2">
              <div className="bg-primary-100 content-gallery rounded-md overflow-hidden col-span-3">
                <div className="grid grid-cols-2 gap-4">
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
            </div> */}
            {/* Occupation */}
            <div className="bg-primary-100 content-gallery rounded-md overflow-hidden col-span-1">
              <div className="p-4">
                <h1>
                  {`${meta.data.attributes[1].trait_type}: `}
                  {meta.data.attributes[1].value}
                </h1>
              </div>
            </div>
            {/* flower */}
            <div className="bg-primary-100 content-gallery rounded-md overflow-hidden col-span-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 col-span-1">
                  <h1>
                    {meta.data.attributes[2].trait_type}:{' '}
                    {meta.data.attributes[2].value}
                  </h1>
                </div>
                <div className="p-4 col-span-1">
                  <img
                    className="object-cover content-center flower-image"
                    src={`${
                      router.basePath
                    }/assets/images/floraweek/${meta.data.attributes[2].value
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
                <a href={AppConfig.ukraineOsUrl + meta.tokenId}>
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

export default SingleSignatureNft;
