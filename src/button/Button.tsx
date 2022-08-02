import className from 'classnames';

type IButtonProps = {
  xl?: boolean;
  hero?: boolean;
  regular?: boolean;
  children?: string;
  done?: boolean;
  ongoing?: boolean;
  future?: boolean;
  rejected?: boolean;
  percentdone?: boolean;
  percentongoing?: boolean;
};

const Button = (props: IButtonProps) => {
  const btnClass = className({
    btn: true,
    'btn-xl': props.xl,
    'btn-base': !props.xl,
    'btn-primary': true,
    'btn-hero': props.hero,
    'btn-regular': props.regular,
    'btn-road-done': props.done,
    'btn-road-ongoing': props.ongoing,
    'btn-road-future': props.future,
    'btn-road-rejected': props.rejected,
    'btn-road-percent-done': props.percentdone,
    'btn-road-percent-ongoing': props.percentongoing,
  });

  return <div className={btnClass}>{props.children}</div>;
};

export { Button };
