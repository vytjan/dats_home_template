import { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { Button } from '../button/Button';

type IMediumWidgetProps = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  size: number;
  link: string;
};

const dataPlaceholder = [
  {
    link: '/',
    title: 'Loading',
    subtitle: '...',
  },
];

const MediumWidget = (props: IMediumWidgetProps) => {
  const [data, setData] = useState({
    posts: dataPlaceholder,
    isFetching: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handlePrevClick = useCallback(
    () =>
      setSelectedIndex(
        () => selectedIndex - 1
        // selectedIndex - 1 > 0 ? selectedIndex - 1 : data.posts.length - 1
      ),
    [selectedIndex]
  );
  const handleNextClick = useCallback(
    () =>
      setSelectedIndex(
        () => selectedIndex + 1
        // selectedIndex + 1 > data.posts.length - 1 ? 0 : selectedIndex + 1
      ),
    [selectedIndex]
  );

  // const [mediumItems, setMediumItems] = useState([]);
  const MEDIUM_UNAME = '@daturians_nft';
  // let data = [];
  const router = useRouter();
  const getPosts = async () => {
    try {
      // setData({ posts: data.posts, isFetching: true });
      const response = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/${MEDIUM_UNAME}`
      );
      return await response.json();
    } catch (e) {
      console.log(e);
      setData({ posts: data.posts, isFetching: true });
      return e;
    }
  };

  useEffect(() => {
    getPosts().then((d) => {
      // const d2 = d.map(x.subtitle => x * 2);
      d.items.forEach(function (item: any) {
        // const theItem = { ...item };
        const cut1 = item.content.split('>');
        const [cut2] = cut1[1].split('<');
        // console.log(cut2);
        item.subtitle = cut2;
        // item = theItem;
      });
      setData({ posts: d.items, isFetching: false });
    });
  });

  return (
    <div className="text-center flex flex-col sm:text-left sm:flex-row sm:items-center sm:justify-between bg-primary-100 rounded-md col-span-3 medium">
      <div className="medium-inside text-center flex flex-col p-4 sm:text-left sm:flex-row sm:items-center sm:justify-between sm:p-8 bg-primary-100 rounded-md">
        <img
          src={`${router.basePath}${props.image}`}
          alt={props.imageAlt}
          width={props.size}
          height={props.size}
        />
        <div>
          {data.isFetching && data.posts !== undefined ? (
            <div>
              <h1>Loading...</h1>
              <p></p>
            </div>
          ) : (
            <div>
              <a href={data.posts[selectedIndex]!.link}>
                <h1>{data.posts[selectedIndex]!.title}</h1>
                <p>{data.posts[selectedIndex]!.subtitle}</p>
              </a>
            </div>
          )}
        </div>
        <a
          href={
            data.isFetching && data.posts.length < 1
              ? '/'
              : data.posts[selectedIndex]!.link
          }
        >
          <Button regular={false} done={true}>
            Read story
          </Button>
        </a>
      </div>
      <div className="left-arrow-medium">
        <button disabled={selectedIndex === 0} onClick={handlePrevClick}>
          <div className="btn btn-road-percent-ongoing">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="medium-arrow-left h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
          </div>
        </button>
      </div>
      <div className="right-arrow-medium">
        <button
          disabled={selectedIndex === data.posts.length - 1}
          onClick={handleNextClick}
        >
          <div className="btn btn-road-percent-ongoing">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="medium-arrow-right h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export { MediumWidget };
