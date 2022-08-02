import { ReactNode } from 'react';

type IBackgroundProps = {
  children: ReactNode;
  color: string;
  // hero: string;
};

const Background = (props: IBackgroundProps) => {
  // let heroType = '';
  // if (props.hero) {
  //   heroType = 'hero-page ';
  // }
  // return <div className={`${heroType}${props.color}`}>{props.children}</div>;
  return <div className={props.color}>{props.children}</div>;
};

export { Background };
