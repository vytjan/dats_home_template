import { useEffect, useState } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { Meta } from '../layout/Meta';
import { Section } from '../layout/Section';
import { getMockMetadataById } from '../pages/api/nftApi';
import { AppConfig } from '../utils/AppConfig';
import { HeaderMenu } from './HeaderMenu';

const DaturaMapContainer = dynamic(() => import('./DaturaMapContainer'), {
  ssr: false,
});

const collection = 'gh';

const SingleGreenhouseNft = () => {
  const router = useRouter();
  const [currId, setId] = useState<string>('');
  const [meta, setMeta] = useState<any>([]);

  useEffect(() => {
    // const provider = new ethers.providers.JsonRpcProvider(
    //   'https://polygon-rpc.com/'
    // );
    // const provider = new ethers.providers.JsonRpcProvider(node_url)
    // const contract = new ethers.Contract(
    //   NftContractAddress,
    //   DaturiansNFT.abi,
    //   provider
    // );
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
        console.log(currId);
      }

      try {
        // const minted = await contract.totalMinted.call();
        const myMeta = await getMockMetadataById(
          newId,
          collection
          // contract,
          // minted
        );
        // console.log(myMeta);
        return myMeta;
      } catch (err: any) {
        return null;
      }
    }

    // map occupation to activity
    // function setActivity(metaObj: any) {
    //   const occupation = metaObj.data.attributes[4].value;
    //   const activity = occupations.find((obj) => obj.occ === occupation);
    //   // console.log(activity);
    //   if (activity) {
    //     const randomElement =
    //       activity.body[Math.floor(Math.random() * activity.body.length)];
    //     metaObj.data.activity = randomElement;
    //   } else {
    //     metaObj.data.activity = 'This daturian is doing nothing good.';
    //   }
    //   return metaObj;
    // }
    // // map genetics of the daturian
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
    //   return metaObj;
    // }

    if (!router.isReady) return;
    // console.log(router.query);
    const { id } = router.query;
    const promise = getId(id);
    promise.then((meta2) => {
      // console.log(meta2);
      if (meta2.data.length > 0 && meta2.status === 200) {
        // console.log(meta2.data[0]);
        // const updateMeta = setGenetics(meta2.data[0]);
        // const updateMeta2 = setActivity(updateMeta);
        // setMeta(updateMeta2);
        setMeta(meta2.data[0]);
        // console.log(meta);
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
            Loading Greenhouse
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
                    <p className="text-2l font-semibold">NFT name: </p>
                    <p className="text-2l font-bold">{meta.name}</p>
                  </div>
                </div>
                {/* family */}
                <div className="bg-primary-100 content-gallery rounded-md overflow-hidden lg:col-span-1 sm:col-span-1">
                  <div className="p-4">
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
                {/* background */}
                <div className="bg-primary-100 content-gallery rounded-md overflow-hidden lg:col-span-1 sm:col-span-1">
                  <div className="p-4">
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
                {/* door */}
                <div className="bg-primary-100 content-gallery rounded-md overflow-hidden lg:col-span-1 sm:col-span-1">
                  <div className="p-4">
                    <p className="text-2l font-semibold">
                      {`${meta.data.attributes[6].trait_type}: `}
                    </p>
                    <div>
                      <p className="font-light">
                        {meta.data.attributes[6].value}
                      </p>
                    </div>
                  </div>
                </div>
                {/* the house */}
                <div className="bg-primary-100 content-gallery rounded-md overflow-hidden lg:col-span-1 sm:col-span-1">
                  <div className="p-4">
                    <p className="text-2l font-semibold">
                      {`${meta.data.attributes[7].trait_type}: `}
                    </p>
                    <div>
                      <p className="font-light">
                        {meta.data.attributes[7].value}
                      </p>
                    </div>
                  </div>
                </div>
                {/* base */}
                <div className="bg-primary-100 content-gallery rounded-md overflow-hidden lg:col-span-1 sm:col-span-1">
                  <div className="p-4">
                    <p className="text-2l font-semibold">
                      <b>{meta.data.attributes[2].trait_type}: </b>
                    </p>
                    <p className="font-light">
                      <b>{meta.data.attributes[2].value}</b>
                    </p>
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
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4"></div>
            </div>
            {/* Occupation */}
            <div className="bg-primary-100 content-gallery rounded-md overflow-hidden lg:col-span-1 sm:col-span-2">
              <div className="p-4">
                <p className="text-lg">
                  <b>{`${meta.data.attributes[4].trait_type}: `}</b>
                </p>
                <p className="text-lg">
                  <b>{meta.data.attributes[4].value}</b>
                </p>
              </div>
            </div>
            {/* flower */}
            <div className="bg-primary-100 content-gallery rounded-md overflow-hidden lg:col-span-2 sm:col-span-4">
              <div className="grid sm:grid-cols-2 xs:grid-cols-1 gap-4">
                <div className="p-4 col-span-1">
                  <p className="text-lg">
                    <b>
                      {meta.data.attributes[5].trait_type}:{' '}
                      {meta.data.attributes[5].value}
                    </b>
                  </p>
                </div>
                <div className="p-4 col-span-1">
                  <img
                    className="object-cover content-center flower-image"
                    src={`${
                      router.basePath
                    }/assets/images/floraweek/${meta.data.attributes[5].value
                      .toLowerCase()
                      .split(' ')
                      .join('_')}.png`}
                    alt="flora.png"
                  />
                </div>
              </div>
            </div>
            <div className=" content-gallery rounded-md overflow-hidden lg:col-span-3 sm:col-span-4 datura-map">
              <DaturaMapContainer
                svgUrl={`${router.basePath}/assets/images/datura_map.svg`}
                imageUrl={meta.image}
                imagePosition={[0, 0]}
                greenhouseText={meta.data.attributes[0].value}
                greenhouseName={meta.name}
              />
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

export default SingleGreenhouseNft;
