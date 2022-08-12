import { Button } from '../button/Button';

type IContactProps = {
  description: string;
  linkUrl: string;
};

const ContactForm = (props: IContactProps) => {
  // const router = useRouter();

  return (
    <div className="text-center flex-col p-4 sm:text-left sm:flex-row sm:items-center sm:justify-between bg-dark rounded-md col-span-2 contact">
      <p className="contact-paragraph">{props.description}</p>
      <a href={props.linkUrl}>
        <Button regular={true} done={false}>
          Contact
        </Button>
      </a>
    </div>
  );
};

export { ContactForm };
