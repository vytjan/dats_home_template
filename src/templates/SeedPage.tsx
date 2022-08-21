import { useEffect, useState } from 'react';

import axios, { AxiosRequestConfig } from 'axios';
import Popup from 'reactjs-popup';

import { Section } from '../layout/Section';
import { uploadFileRequest } from '../utils/upload.services';
import { HeaderMenu } from './HeaderMenu';
import MyWallet from './MyWallet';
import SubmissionGallery from './SubmissionGallery';
import { UiFileInputButton } from './UiFileInputButton';

const popMessages = [
  'Something went wrong with the upload, please try again.',
  'Image file size cannot exceed 3MB. Only .jpg, .jpeg, .png images are allowed.',
];

const SeedPage = () => {
  type AllSubmissions = Awaited<ReturnType<typeof loadSubmissions>>;
  const [address, setAddress] = useState('');
  const [submissions, setSubmissions] = useState(0);
  const [nftsHeld, setNftsHeld] = useState(0);
  const [submissionState, setSubmissionState] = useState(false);
  const [loadedSubmissions, setLoadedSubmissions] = useState<AllSubmissions>(
    []
  );
  const [successfulUpload, setSuccessfulUpload] = useState(false);
  const [failedUpload, setFailedUpload] = useState(false);
  const [popupMessage, setPopupMessage] = useState(0);

  const closeModalSuccess = () => setSuccessfulUpload(false);
  const closeModalFailure = () => setFailedUpload(false);

  const submissionCount = async (currAddress: string | number | boolean) => {
    try {
      // console.log(currAddress);
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
          CurrAddress: currAddress,
        },
      };
      // const seed = { address: currAddress };
      const result2 = await axios.get(`/api/seed/${currAddress}`, config);
      // console.log(result2);
      const subCount = result2.data.length;
      setSubmissions(subCount);
      setSubmissionState(false);
      return result2.data;
    } catch (error: any) {
      // console.error(error.response.data); // NOTE - use "error.response.data` (not "error")
      return error.response.data;
    }
  };

  const loadSubmissions = async () => {
    try {
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      // const seed = { address: currAddress };
      const result2 = await axios.get(`/api/seed`, config);
      // console.log(result2.data);
      const slicedResult = result2.data;
      // if (result2.data.length > 5) {
      //   slicedResult = result2.data.slice(0, 5);
      // }
      setLoadedSubmissions(slicedResult);
      return slicedResult;
    } catch (error: any) {
      return error.response.data;
    }
  };

  const onChange = async (formData: FormData) => {
    // console.log(formData);
    try {
      const response = await uploadFileRequest(formData, address, (event) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
        submissionCount(address);
        console.log(response);
      });

      console.log('response', response);
      // handle responses
      if (response.status === 200) {
        setSuccessfulUpload(true);
      } else {
        setFailedUpload(true);
        setPopupMessage(1);
      }
      return response;
    } catch (error: any) {
      // console.error(error.response.data); // NOTE - use "error.response.data` (not "error")
      // alert('Something went wrong, please try again.');
      setFailedUpload(true);
      setPopupMessage(0);
      return error.response.data;
    }
  };

  useEffect(() => {
    loadSubmissions();
    setSubmissions(submissions);
  }, [submissions, successfulUpload]);

  useEffect(() => {
    if (address !== '') {
      submissionCount(address);
    }
  }, [address, submissions, successfulUpload]);

  return (
    <Section>
      <HeaderMenu></HeaderMenu>
      <div className="flex justify-center">
        <div className="grid-cols-1 gap-5 max-auto px-3">
          <MyWallet
            setSubmissionState={setSubmissionState}
            submissionState={submissionState}
            getNftsHeld={nftsHeld}
            setNftsHeld={setNftsHeld}
            childSubmissions={submissions}
            sendSubmissions={setSubmissions}
            toChild={address}
            sendToParent={setAddress}
          ></MyWallet>
          {address.length > 0 ? (
            <div className="grid-cols-3 gap-5 max-auto px-3">
              <Popup
                open={successfulUpload}
                closeOnDocumentClick
                onClose={closeModalSuccess}
                modal
              >
                <div className="modal bg-primary-100 rounded-md">
                  <a className="close" onClick={closeModalSuccess}>
                    &times;
                  </a>
                  <div className="header">
                    <p>{`Files uploaded successfully`}</p>
                  </div>
                </div>
              </Popup>
              <Popup
                open={failedUpload}
                closeOnDocumentClick
                onClose={closeModalFailure}
                modal
              >
                <div className="modal bg-primary-100 rounded-md">
                  <a className="close" onClick={closeModalFailure}>
                    &times;
                  </a>
                  <div className="header">
                    <p>{popMessages[popupMessage]}</p>
                  </div>
                </div>
              </Popup>
              {nftsHeld - submissions > 0 ? (
                <UiFileInputButton
                  setSubmissionState={setSubmissionState}
                  submissionState={submissionState}
                  getNftsHeld={nftsHeld}
                  setNftsHeld={setNftsHeld}
                  sumbissionCount={submissions}
                  sendSubmissions={setSubmissions}
                  address={address}
                  label="Upload Multiple Files"
                  uploadFileName="theFiles"
                  onChange={onChange}
                  allowMultipleFiles={true}
                />
              ) : (
                <p className="text-center">{`You don't have any more submissions!`}</p>
              )}
              <SubmissionGallery
                allSubmissions={loadedSubmissions}
              ></SubmissionGallery>
            </div>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </Section>
  );
};

export { SeedPage };
