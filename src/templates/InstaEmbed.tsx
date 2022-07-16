import React from 'react';

import { InstagramEmbed } from 'react-social-media-embed';

// cudos to https://justinmahar.github.io/react-social-media-embed/?path=/story/home--page

type IInstaProps = {
  url: string;
  width: number;
};

const InstaEmbed = (props: IInstaProps) => {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }

  return (
    <div className="InstaEmbed flex-col sm:text-left sm:flex-row sm:items-center sm:justify-between sm:p-12 bg-primary-100 rounded-md col-span-2">
      <InstagramEmbed url={props.url} width={props.width} />
    </div>
  );
};
export { InstaEmbed };
