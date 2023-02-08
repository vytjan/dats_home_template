import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button } from '../button/Button';
import { Meta } from '../layout/Meta';
import { Section } from '../layout/Section';
import { AppConfig } from '../utils/AppConfig';
import { HeaderMenu } from './HeaderMenu';

const NftGallery = () => {
  const router = useRouter();
  return (
    <Section>
      <Meta
        title={AppConfig.seedTitle}
        description={AppConfig.seedDescription}
      />
      <HeaderMenu></HeaderMenu>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          <div className="my-daturians bg-primary-100 rounded-md col-span-4">
            <Button regular={false} hero={true}>
              {`My Daturians`}
            </Button>
          </div>
          <div className="bg-primary-100 rounded-md col-span-2">
            <Link href="/gallery/this_collection">
              <a>
                <div className="hover column">
                  <div className="collections">
                    <figure>
                      <img
                        className="hero_img sm:text-left sm:items-center sm:justify-between"
                        src={`${router.basePath}/assets/images/gallery/daturian.png`}
                        height="100%"
                        width="100%"
                        alt="Daturians"
                      />
                      <Button regular={true} hero={false}>
                        {`Daturians`}
                      </Button>
                    </figure>
                  </div>
                </div>
              </a>
            </Link>
          </div>
          <div className="bg-primary-100 rounded-md col-span-2">
            <Link href="/gallery/this_collection">
              <a>
                <div className="hover column">
                  <div className="collections">
                    <figure>
                      <img
                        className="hero_img sm:text-left sm:items-center sm:justify-between"
                        src={`${router.basePath}/assets/images/gallery/signature_daturian.png`}
                        height="100%"
                        width="100%"
                        alt="signature"
                      />
                      <Button regular={true} hero={false}>
                        {`Signatures`}
                      </Button>
                    </figure>
                  </div>
                </div>
              </a>
            </Link>
          </div>
          <div className="bg-primary-100 rounded-md col-span-2">
            <Link href="/gallery/this_collection">
              <a>
                <div className="hover column">
                  <div className="collections">
                    <figure>
                      <img
                        className="hero_img sm:text-left sm:items-center sm:justify-between"
                        src={`${router.basePath}/assets/images/gallery/ukrainian_daturian.png`}
                        height="100%"
                        width="100%"
                        alt="ukrainians"
                      />
                      <Button regular={true} hero={false}>
                        {`Ukrainians`}
                      </Button>
                    </figure>
                  </div>
                </div>
              </a>
            </Link>
          </div>
          <div className="bg-primary-100 rounded-md col-span-2">
            <Link href="/gallery/this_collection">
              <a>
                <div className="hover column">
                  <div className="collections">
                    <figure>
                      <img
                        className="hero_img sm:text-left sm:items-center sm:justify-between"
                        src={`${router.basePath}/assets/images/gallery/collab_daturian.png`}
                        height="100%"
                        width="100%"
                        alt="collabs"
                      />
                      <Button regular={true} hero={false}>
                        {`Collabs`}
                      </Button>
                    </figure>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
};

export { NftGallery };
