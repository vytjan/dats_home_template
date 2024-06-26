import { ReactNode } from 'react';

type ISectionProps = {
  title?: string;
  description?: string;
  yPadding?: string;
  children: ReactNode;
};

const Section = (props: ISectionProps) => (
  <div
    className={`max-w-screen-2xl mx-auto px-3 flex flex-col gap-5 ${
      props.yPadding ? props.yPadding : 'py-2'
    }`}
  >
    {props.title ||
      (props.description && (
        <div className="mb-12 text-center">
          {props.title && (
            <h2 className="text-4xl text-gray-900 font-bold">{props.title}</h2>
          )}
          {props.description && (
            <div className="mt-4 text-xl md:px-20">{props.description}</div>
          )}
        </div>
      ))}

    {props.children}
  </div>
);

export { Section };
