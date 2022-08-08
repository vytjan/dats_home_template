import React, { useEffect, useState } from 'react';

import Popup from 'reactjs-popup';

export interface IProps {
  /**
   * A string that defines the file types the file input should accept.
   * This string is a comma-separated list of unique file type specifiers.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers
   */
  acceptedFileTypes?: string;
  /**
   * When allowMultipleFiles is true, the file input allows the user to select more than one file.
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/multiple
   *
   * @default false
   */
  allowMultipleFiles?: boolean;
  /**
   * Text to display as the button text
   */
  label: string;
  /**
   * Handler passed from parent
   *
   * When the file input changes a FormData object will be send on the first parameter
   */
  onChange: (formData: FormData) => void;
  /**
   * The name of the file input that the backend is expecting
   */
  uploadFileName: string;
  address: string;
  sumbissionCount: number;

  getNftsHeld: number;
  setNftsHeld: Function;
  sendSubmissions: Function;
  setSubmissionState: Function;
  submissionState: boolean;
}

export const UiFileInputButton: React.FC<IProps> = (props) => {
  const [tooManySelected, setTooManySelected] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const formRef = React.useRef<HTMLFormElement | null>(null);

  const closeModal = () => setTooManySelected(false);
  const onClickHandler = () => {
    fileInputRef.current?.click();
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }

    const formData = new FormData();

    Array.from(event.target.files).forEach((file) => {
      formData.append(event.target.name, file);
    });

    // check if there are submissions available:
    const subsAvailable = props.getNftsHeld - props.sumbissionCount;
    // console.log(props.sumbissionCount);
    // console.log(props.getNftsHeld);
    if (event.target.files.length > subsAvailable) {
      // console.log(subsAvailable);
      // console.log(event.target.files);
      setTooManySelected(true);
      formRef.current?.reset();
    } else {
      props.onChange(formData);

      formRef.current?.reset();
    }
  };

  useEffect(() => {
    // console.log('useEffect nftsHeld: ', props.getNftsHeld);
    console.log('useEffect, ', props.sumbissionCount);
  }, [props.getNftsHeld, props.sumbissionCount]); // 👈️ add state variables you want to track

  return (
    <div className="text-center flex flex-col p-4 sm:text-left sm:flex-row sm:items-center sm:justify-between sm:p-8 bg-primary-100 rounded-md">
      <Popup open={tooManySelected} closeOnDocumentClick onClose={closeModal}>
        <div className="modal">
          <a className="close" onClick={closeModal}>
            &times;
          </a>
          <div className="header">
            <p>{`Seems that you selected too many files for your submission. Please select up to the amount of your remaining entries.`}</p>
          </div>
        </div>
      </Popup>
      <form ref={formRef}>
        <button type="button" onClick={onClickHandler}>
          {props.label}
        </button>
        <input
          accept={props.acceptedFileTypes}
          multiple={props.allowMultipleFiles}
          name={props.uploadFileName}
          onChange={onChangeHandler}
          ref={fileInputRef}
          style={{ display: 'none' }}
          type="file"
        />
      </form>
    </div>
  );
};

UiFileInputButton.defaultProps = {
  acceptedFileTypes: '',
  allowMultipleFiles: false,
};
