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
        // console.log(myMeta);
        return myMeta;
      } catch (err: any) {
        return null;
      }
    }

    // map occupation to activity
    function setActivity(metaObj: any) {
      metaObj.data.activity =
        "Ukrainian Daturians fight for their own and the worlds's freedom.";
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
            <div></div>
            <div className="col-span-2">
              <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4 pt-4 "></div>
            </div>

            {/* image */}
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4">
              <div className="rounded-xl overflow-hidden">
                <img
                  className="object-cover rounded-xl content-center daturian"
                  src={meta.image}
                  alt={meta.image}
                />
              </div>
            </div>
            <div className="col-span-2">
              <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {/* name */}
                <div className="bg-primary-100 content-gallery rounded-xl overflow-hidden col-span-1">
                  <div className="p-4 ">
                    <p className="text-2l font-semibold">{meta.name}</p>
                  </div>
                </div>
                {/* health */}
                <div className="bg-primary-100 content-gallery rounded-xl overflow-hidden col-span-2">
                  <div className="p-4 w-full inline-flex">
                    <p className="text-2l font-semibold w-3/10">Health: </p>

                    <p className="font-light w-1/5">100</p>
                    <div className="relative pt-2 w-full rounded health">
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
                {/* location */}
                <div className="bg-primary-100 content-gallery rounded-xl overflow-hidden col-span-4">
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
                {/* flower */}
                <div className="bg-primary-100 content-gallery rounded-xl overflow-hidden col-span-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="p-4 col-span-1">
                      <h1>
                        {meta.data.attributes[2].trait_type}:{' '}
                        {meta.data.attributes[2].value}
                      </h1>
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
                {/* Occupation */}
                <div className="bg-primary-100 content-gallery rounded-xl overflow-hidden col-span-3">
                  <div className="p-4">
                    <h1>
                      {`${meta.data.attributes[1].trait_type}: `}
                      {meta.data.attributes[1].value}
                    </h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary-100 content-gallery rounded-xl overflow-hidden col-span-3 opensea-box gap-4 p-4">
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
