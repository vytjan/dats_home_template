import { useState } from 'react';

import Popup from 'reactjs-popup';

type IContactProps = {
  description: string;
  linkUrl: string;
};

const ContactForm = (props: IContactProps) => {
  const [isCopied, setIsCopied] = useState(false);
  // const router = useRouter();

  // This is the function we wrote earlier
  async function copyTextToClipboard(text: string) {
    if ('clipboard' in navigator) {
      return navigator.clipboard.writeText(text);
    }
    return document.execCommand('copy', true, text);
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard('plant@daturians.com')
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="text-center flex-col p-4 sm:text-left sm:flex-row sm:items-center sm:justify-between bg-dark rounded-md col-span-2 contact">
      <p className="contact-paragraph">{props.description}</p>
      <button
        className="btn btn-base btn-primary btn-regular"
        onClick={handleCopyClick}
      >
        {`Contact us`}
      </button>
      <Popup open={isCopied}>
        <div className="modal-contact bg-primary-100 rounded-md">
          <div className="header-contact-us">
            <p>{`Email address copied to clipboard.`}</p>
          </div>
        </div>
      </Popup>
    </div>
  );
};

export { ContactForm };
