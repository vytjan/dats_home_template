import { useEffect, useState } from 'react';

import { ethers } from 'ethers';
import { useRouter } from 'next/router';

import { Meta } from '../layout/Meta';
import { Section } from '../layout/Section';
import { getMetadataById } from '../pages/api/nftApi';
import { AppConfig, SignatureContractAddress } from '../utils/AppConfig';
import DaturiansGreenhouse from '../utils/artifacts/DaturiansGreenhouse.json';
import { HeaderMenu } from './HeaderMenu';

const locationImages = {
  1: 'Fanghorn',
  2: 'Cleveland',
  3: 'Sibyl',
  4: 'Pompadronia',
  5: 'Sibyl Park',
  6: 'Sibyl',
  7: 'Dronia',
  8: 'Dronia',
  9: 'Pompa',
  10: 'Satellites of Datura',
  11: 'Sibyl Park',
  12: 'Dronia',
  13: 'Faustenburg',
  14: 'Darkhorn',
  15: 'X12SPA-TF',
  16: 'X12SPA-TF',
};

const familyImages = {
  1: 'The Order of Ozarksons',
  2: 'Greatoldsmartens Dynasty',
  3: 'The Order of Ozarksons',
  4: 'The Millenialums',
  5: 'Le Cool Familia',
  6: 'The Gonnacatchers Mob',
  7: 'Greatoldsmartens Dynasty',
  8: 'The NewWavers Clan',
  9: 'in-progress',
  10: 'in-progress',
  11: 'The Millenialums',
  12: 'Greatoldsmartens Dynasty',
  13: 'The Kingstons Ring',
  14: 'Greatoldsmartens Dynasty',
  15: 'The Milksalots Tribe',
  16: 'The OpenDudes Syndicate',
};

const SingleSignatureNft = () => {
  const router = useRouter();
  const [currId, setId] = useState<string>('');
  const [meta, setMeta] = useState<any>([]);

  useEffect(() => {
    const provider = new ethers.providers.JsonRpcProvider(
      'https://polygon-rpc.com/'
    );
    // const provider = new ethers.providers.JsonRpcProvider(node_url)
    const contract = new ethers.Contract(
      SignatureContractAddress,
      DaturiansGreenhouse.abi,
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
          'signature',
          contract,
          minted
        );
        return myMeta;
      } catch (err: any) {
        return null;
      }
    }

    // map occupation to activity
    function setActivity(metaObj: any) {
      const newID = metaObj.tokenId;
      metaObj.data.location =
        locationImages[newID as keyof typeof locationImages];
      metaObj.data.family = familyImages[newID as keyof typeof familyImages];
      metaObj.data.activity =
        'Signature Daturians are free to do what they want.';
      return metaObj;
    }
    if (!router.isReady) return;
    // console.log(router.query);
    const { id } = router.query;
    const promise = getId(id);
    promise.then((meta2) => {
      // console.log(meta2);
      if (meta2.data.length > 0 && meta2.status === 200) {
        const updateMeta2 = setActivity(meta2.data[0]);
        setMeta(updateMeta2);
      }
    });
  }, [router.isReady, currId, router.query]);

  return (
    <Section>
      <Meta
        title={AppConfig.signatureCollTitle}
        description={AppConfig.signatureCollDescription}
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
            <div className="bg-primary-100 rounded-xl grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4 pt-4 mt-4">
              <div className="rounded-xl overflow-hidden">
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
                <div className="bg-primary-100 content-gallery rounded-xl overflow-hidden col-span-1">
                  <div className="p-4 ">
                    <p className="text-2l font-semibold">{meta.name}</p>
                  </div>
                </div>
                {/* health */}
                <div className="bg-primary-100 content-gallery rounded-xl overflow-hidden lg:col-span-2 sm:col-span-3">
                  <div className="p-4 w-full inline-flex">
                    <p className="text-2l font-semibold">
                      {`${meta.data.attributes[7].trait_type}: `}
                    </p>

                    <p className="font-light">
                      {meta.data.attributes[7].value}
                    </p>
                    <div className="relative pt-2 w-full rounded health pl-5">
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
                <div className="bg-primary-100 content-gallery rounded-xl overflow-hidden col-span-1">
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
                <div className="bg-primary-100 content-gallery rounded-xl overflow-hidden col-span-1">
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
                <div className="bg-primary-100 content-gallery rounded-xl overflow-hidden col-span-2 sm:col-span-1">
                  <div className="p-4 inline-flex">
                    <p className="text-2l font-semibold">
                      {`${meta.data.extras[6].trait_type}: `}
                    </p>
                    <div>
                      <p className="font-light">{meta.data.extras[6].value}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* image */}
            <div className="grid grid-cols-1 grid-cols-1 gap-4">
              <div className="rounded-xl overflow-hidden">
                <img
                  className="object-cover rounded-xl content-center daturian "
                  src={meta.image}
                  alt={meta.image}
                />
              </div>
            </div>
            <div className="col-span-2">
              <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {/* family */}
                <div className="bg-primary-100 content-gallery rounded-xl overflow-hidden col-span-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 col-span-2">
                      <h1>
                        {meta.data.attributes[3].trait_type}:{' '}
                        {meta.data.attributes[3].value.split(' x ')[0]}
                      </h1>
                      <br />
                      <p className="font-light">{meta.data.extras[1].value}</p>
                    </div>
                    <div className="p-4 col-span-2">
                      <img
                        className="object-cover content-center family-crest"
                        alt="family.png"
                        src={`${
                          router.basePath
                        }/assets/images/gallery/families/${meta.data.family
                          .split(' x ')[0]
                          .split(' ')
                          .join('-')}.png`}
                      />
                    </div>
                  </div>
                </div>
                {/* location */}
                <div className="bg-primary-100 content-gallery rounded-xl overflow-hidden col-span-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 col-span-2">
                      <img
                        className="object-cover content-center family-crest"
                        src={`${
                          router.basePath
                        }/assets/images/gallery/locations/${meta.data.location
                          .split(' ')
                          .join('-')}.png`}
                        alt="location.png"
                      />
                    </div>
                    <div className="p-4 col-span-2">
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
                <div className="bg-primary-100 content-gallery rounded-xl overflow-hidden col-span-3 p-4 flex">
                  <div className="pulsating-circle"></div>
                  <p>
                    <b>What is {meta.name} doing:</b> {meta.data.activity}{' '}
                  </p>
                </div>
              </div>
            </div>
            {/* genetics */}

            <div className="bg-primary-100 content-gallery rounded-xl overflow-hidden col-span-3 p-4 flex">
              <div>
                <h1>
                  {`${meta.data.extras[2].trait_type}: `}
                  {/* {meta.data.attributes[4].value} */}
                </h1>
                <p>&nbsp;</p>
                <div>
                  <p className="font-light">{meta.data.extras[2].value}</p>
                </div>
              </div>
            </div>

            {/* Occupation */}
            <div className="bg-primary-100 content-gallery rounded-xl overflow-hidden col-span-3">
              <div className="p-4">
                <h1>
                  {`${meta.data.attributes[4].trait_type}: `}
                  {meta.data.attributes[4].value}
                </h1>
                <p>&nbsp;</p>
                <div>
                  <p className="font-light">{meta.data.extras[3].value}</p>
                </div>
              </div>
            </div>
            {/* Special ability */}
            <div className="bg-primary-100 content-gallery rounded-xl overflow-hidden col-span-3">
              <div className="p-4 ">
                <h1>{`${meta.data.extras[4].trait_type}: `}</h1>
                <p>&nbsp;</p>
                <div>
                  <p className="font-light">{meta.data.extras[4].value}</p>
                </div>
              </div>
            </div>
            {/* flower */}
            <div className="bg-primary-100 content-gallery rounded-xl overflow-hidden col-span-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 col-span-3">
                  <h1>
                    {meta.data.attributes[9].trait_type}:{' '}
                    {meta.data.attributes[9].value}
                  </h1>
                  <br />
                  <p className="font-light">{meta.data.extras[5].value}</p>
                </div>
              </div>
            </div>
            <div className="bg-primary-100 content-gallery rounded-xl overflow-hidden col-span-3 datura-map">
              <img
                className="object-cover content-center"
                src={`${router.basePath}/assets/images/datura_map.png`}
                alt="datura_map.png"
              />
            </div>
            <div className="bg-primary-100 content-gallery rounded-xl overflow-hidden col-span-3 opensea-box gap-4 p-4">
              <div className="about-title single-opensea">
                <h1>View on Opensea:</h1>
                <a href={AppConfig.signatureOsUrl + meta.tokenId}>
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
