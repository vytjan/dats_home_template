import { Button } from '../button/Button';

type IContactProps = {
  description: string;
  linkUrl: string;
};

const ContactForm = (props: IContactProps) => {
  // const router = useRouter();

  return (
    <div className="text-center flex flex-col p-4 sm:text-left sm:flex-row sm:items-center sm:justify-between sm:p-12 bg-primary-100 rounded-md col-span-2">
      <p>{props.description}</p>
      <a href={props.linkUrl}>
        <Button regular={true} hero={false}>
          Contact us
        </Button>
      </a>
    </div>
  );
};

export { ContactForm };
