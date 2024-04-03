import axios, { AxiosRequestConfig } from 'axios';

const uploadCurrentMeta = async (
  currId: number,
  collection: String,
  contract: any
) => {
  try {
    const tokenUri = await contract.tokenURI(currId);

    const ipfsGateway = 'https://daturians.mypinata.cloud/ipfs/';

    const newUri = tokenUri.replace('ipfs://', ipfsGateway);
    return await axios.get(newUri).then(async (response2) => {
      // console.log(meta.data);
      const imgUri = response2.data.image.replace('ipfs://', ipfsGateway);

      const item = {
        tokenId: currId,
        image: imgUri,
        name: response2.data.name,
        description: response2.data.description,
        data: response2.data,
      };

      try {
        const response3 = await axios.post(
          `/api/${collection}/${currId}`,
          item,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }
        );
        return response3;
      } catch (e: any) {
        // console.error(e);
        return e;
      }
    });
  } catch (e: any) {
    // console.error(e);
    return e;
  }
};

export const getMetadataById = async (
  id: String,
  collection: String,
  contract: any,
  currMinted: Number
) => {
  // first check if meta json is already in mongodb
  const currId = Number(id);
  // only perform if the NFT id is <= currently minted
  if (currId <= currMinted.valueOf()) {
    try {
      const result2 = await axios.get(`/api/${collection}/${currId}`);

      if (result2.data.length === 0) {
        const res3 = await uploadCurrentMeta(currId, collection, contract);

        if (res3.status === 200) {
          const res4 = await axios.get(`/api/${collection}/${currId}`);
          return res4;
        }
      }
      return result2;
      // }
    } catch (error: any) {
      return error.response.data;
    }
  } else {
    return null;
  }
};

const uploadMockCurrentMeta = async (currId: number, collection: String) => {
  try {
    // const tokenUri = await contract.tokenURI(currId);
    const tokenUri = `ipfs://QmaCQkjq8PDwFXWDNTnPwscwzZXGSxcrUAXbDno2Fi5QW4/${currId}.json`;

    const ipfsGateway = 'https://daturians.mypinata.cloud/ipfs/';

    const newUri = tokenUri.replace('ipfs://', ipfsGateway);
    return await axios.get(newUri).then(async (response2) => {
      // console.log(meta);
      console.log(response2.data);
      const imgUri = response2.data.image.replace('ipfs://', ipfsGateway);

      const item = {
        tokenId: currId,
        image: imgUri,
        name: response2.data.name,
        description: response2.data.description,
        data: response2.data,
      };

      try {
        const response3 = await axios.post(
          `/api/${collection}/${currId}`,
          item,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          }
        );
        return response3;
      } catch (e: any) {
        // console.error(e);
        return e;
      }
    });
  } catch (e: any) {
    // console.error(e);
    return e;
  }
};

export const getMockMetadataById = async (
  id: String,
  collection: String
  // contract: any,
  // currMinted: Number
) => {
  // first check if meta json is already in mongodb
  const currId = Number(id);
  // only perform if the NFT id is <= currently minted
  // if (currId <= currMinted.valueOf()) {
  try {
    const result2 = await axios.get(`/api/${collection}/${currId}`);

    if (result2.data.length === 0) {
      const res3 = await uploadMockCurrentMeta(currId, collection);

      if (res3.status === 200) {
        const res4 = await axios.get(`/api/${collection}/${currId}`);
        return res4;
      }
    }
    return result2;
    // }
  } catch (error: any) {
    return error.response.data;
  }
  // } else {
  //   return null;
  // }
};

export const getAllMeta = async (collection: String) => {
  try {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const result2 = await axios.get(`/api/${collection}/`, config);
    return result2;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getQueryMetadata = (query: any, items: any) => {
  const resultItems = items.filter((item: any) =>
    item.name.includes(query) ? item : null
  );

  return resultItems;
};
