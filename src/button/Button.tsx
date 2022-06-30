import className from 'classnames';

type IButtonProps = {
  xl?: boolean;
  hero: boolean;
  regular: boolean;
  children: string;
};

const Button = (props: IButtonProps) => {
  const btnClass = className({
    btn: true,
    'btn-xl': props.xl,
    'btn-base': !props.xl,
    'btn-primary': true,
    'btn-hero': props.hero,
    'btn-regular': props.regular,
  });

  return <div className={btnClass}>{props.children}</div>;
};

export { Button };
