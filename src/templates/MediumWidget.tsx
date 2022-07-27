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
      d.items.forEach(function (item: any) {
        const theItem = item;
        const cut1 = theItem.content.split('>');
        const [cut2] = cut1[0].split('<');
        // console.log(cut2);
        theItem.subtitle = cut2;
      });
      setData({ posts: d.items, isFetching: false });
    });
  });

  return (
    <div className="text-center flex flex-col p-4 sm:text-left sm:flex-row sm:items-center sm:justify-between sm:p-8 bg-primary-100 rounded-md col-span-3">
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
        <Button regular={true} hero={false}>
          Read story
        </Button>
      </a>
      <div className="left-arrow-medium">
        <button disabled={selectedIndex === 0} onClick={handlePrevClick}>
          Newer
        </button>
      </div>
      <div className="right-arrow-medium">
        <a>
          <button
            disabled={selectedIndex === data.posts.length - 1}
            onClick={handleNextClick}
          >
            Older
          </button>
        </a>
      </div>
    </div>
  );
};

export { MediumWidget };
