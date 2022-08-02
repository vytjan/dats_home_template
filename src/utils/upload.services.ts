import axios, { AxiosRequestConfig } from 'axios';

import { ApiResponse } from '../models/ApiResponse';

export const uploadFileRequest = async (
  formData: FormData,
  currAddress: string,
  progressCallback?: (progressEvent: ProgressEvent) => void
): Promise<ApiResponse<string[]>> => {
  const config: AxiosRequestConfig = {
    headers: { 'content-type': 'multipart/form-data' },
    onUploadProgress: progressCallback,
    validateStatus: (_status) => true,
  };
  const response = await axios.post('/api/uploads', formData, config);

  if (response.status === 200) {
    // console.log(response.data.data);
    const fileNames = response.data.data;
    // console.log(fileNames);
    const procFileNames = fileNames.map((value: string) => ({
      filename: value,
      address: currAddress,
    }));
    const config2: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
      onUploadProgress: progressCallback,
      validateStatus: (_status) => true,
    };
    // const seed = { filename: fileName, address: currAddress };
    const response2 = await axios.post(
      '/api/seed',
      JSON.stringify(procFileNames),
      config2
    );
    return response2.data;
  }

  return response.data;
};

export const uploadFileSuccessful = async (
  filenames: String[],
  progressCallback?: (progressEvent: ProgressEvent) => void
): Promise<ApiResponse<string[]>> => {
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
    onUploadProgress: progressCallback,
    validateStatus: (_status) => true,
  };
  const response = await axios.post('/api/seed', filenames, config);

  return response.data;
};
