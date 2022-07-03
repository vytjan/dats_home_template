import Link from 'next/link';

import { Button } from '../button/Button';

const contact = {
  description: `Have something to say to us? A
  proposal? A new recipe for a killer
  cake?`,
  linkUrl: `daturians.com`,
};

const ContactForm = () => {
  // const router = useRouter();

  return (
    <div className="text-center flex flex-col p-4 sm:text-left sm:flex-row sm:items-center sm:justify-between sm:p-12 bg-primary-100 rounded-md">
      <p>{contact.description}</p>
      <Link href={contact.linkUrl}>
        <a>
          <Button regular={true} hero={false}>
            Contact us
          </Button>
        </a>
      </Link>
    </div>
  );
};

export { ContactForm };
