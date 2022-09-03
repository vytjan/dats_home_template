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
        <h1 className="justify-center text-center">Collections</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          <div className="bg-primary-100 rounded-md col-span-2">
            <Link href="/gallery/this_collection">
              <a>
                <div className="hover column">
                  <div>
                    <figure>
                      <img
                        className="hero_img p-4 sm:text-left sm:items-center sm:justify-between"
                        src={`${router.basePath}/assets/images/cafe.png`}
                        height="100%"
                        width="100%"
                        alt="daturians"
                      />
                      <Button regular={false} hero={true}>
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
                  <div>
                    <figure>
                      <img
                        className="hero_img p-4 sm:text-left sm:items-center sm:justify-between"
                        src={`${router.basePath}/assets/images/cafe.png`}
                        height="100%"
                        width="100%"
                        alt="daturians"
                      />
                      <Button regular={false} hero={true}>
                        {`Daturians 2`}
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
                  <div>
                    <figure>
                      <img
                        className="hero_img p-4 sm:text-left sm:items-center sm:justify-between"
                        src={`${router.basePath}/assets/images/cafe.png`}
                        height="100%"
                        width="100%"
                        alt="daturians"
                      />
                      <Button regular={false} hero={true}>
                        {`Daturians 3`}
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
                  <div>
                    <figure>
                      <img
                        className="hero_img p-4 sm:text-left sm:items-center sm:justify-between"
                        src={`${router.basePath}/assets/images/cafe.png`}
                        height="100%"
                        width="100%"
                        alt="daturians"
                      />
                      <Button regular={false} hero={true}>
                        {`Daturians 4`}
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
