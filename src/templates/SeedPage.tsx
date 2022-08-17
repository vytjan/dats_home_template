import { useEffect, useState } from 'react';

import axios, { AxiosRequestConfig } from 'axios';

import { Section } from '../layout/Section';
import { uploadFileRequest } from '../utils/upload.services';
import { HeaderMenu } from './HeaderMenu';
import MyWallet from './MyWallet';
import SubmissionGallery from './SubmissionGallery';
import { UiFileInputButton } from './UiFileInputButton';

const SeedPage = () => {
  type AllSubmissions = Awaited<ReturnType<typeof loadSubmissions>>;
  const [address, setAddress] = useState('');
  const [submissions, setSubmissions] = useState(0);
  const [nftsHeld, setNftsHeld] = useState(0);
  const [submissionState, setSubmissionState] = useState(false);
  const [loadedSubmissions, setLoadedSubmissions] = useState<AllSubmissions>(
    []
  );

  const submissionCount = async (currAddress: string | number | boolean) => {
    try {
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
          CurrAddress: currAddress,
        },
      };
      // const seed = { address: currAddress };
      const result2 = await axios.get(`/api/seed`, config);
      // console.log(result2.data);
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
      let slicedResult = result2.data;
      if (result2.data.length > 5) {
        slicedResult = result2.data.slice(0, 5);
      }
      setLoadedSubmissions(slicedResult);
      return slicedResult;
    } catch (error: any) {
      // console.error(error.response.data); // NOTE - use "error.response.data` (not "error")
      return error.response.data;
    }
  };

  const onChange = async (formData: FormData) => {
    // console.log(formData);
    const response = await uploadFileRequest(formData, address, (event) => {
      console.log(
        `Current progress:`,
        Math.round((event.loaded * 100) / event.total)
      );
      submissionCount(address);
      // console.log(response2);
    });

    console.log('response', response);
    return response;
  };

  useEffect(() => {
    loadSubmissions();
    setSubmissions(submissions);
  }, [submissions]);

  useEffect(() => {
    if (address !== '') {
      submissionCount(address);
    }
  }, [address]);

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
                <p>{`You don't have any more submissions!`}</p>
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
