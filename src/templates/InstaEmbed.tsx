import { InstagramEmbed } from 'react-social-media-embed';

// cudos to https://justinmahar.github.io/react-social-media-embed/?path=/story/home--page

type IInstaProps = {
  url: string;
  width: number;
};

const InstaEmbed = (props: IInstaProps) => {
  return (
    <div className="InstaEmbed">
      <InstagramEmbed url={props.url} width={props.width} />
    </div>
  );
};
export { InstaEmbed };
