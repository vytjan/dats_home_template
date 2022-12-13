import axios, { AxiosRequestConfig } from 'axios';

// const uploadCurrentMeta = async (currId: number, contract: any) => {
//   try {
//     const tokenUri = await contract.tokenURI(currId);

//     const ipfsGateway = 'https://daturians.mypinata.cloud/ipfs/';

//     const newUri = tokenUri.replace('ipfs://', ipfsGateway);
//     const meta = await axios.get(newUri);
//     // console.log(meta.data);
//     const imgUri = meta.data.image.replace('ipfs://', ipfsGateway);
//     // append class name
//     meta.data.extras.forEach((element: any) => {
//       element.className = element.trait_type
//         .toLowerCase()
//         .replace(' ', '-')
//         .replace('/', '-');
//     });
//     meta.data.attributes.forEach((element: any) => {
//       // console.log(element);
//       element.className = element.trait_type
//         .toLowerCase()
//         .replace(' ', '-')
//         .replace('/', '-');
//     });

//     const item = {
//       tokenId: currId,
//       image: imgUri,
//       name: meta.data.name,
//       description: meta.data.description,
//       data: meta.data,
//     };
//     // console.log(item);
//     // upload to mongodb
//     try {
//       // console.log(currAddress);
//       const config: AxiosRequestConfig = {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       };

//       const result2 = await axios.post(`/api/meta/${currId}`, item, config);
//       // console.log(result2);
//       // console.log(result2.data);
//       return result2.data;
//     } catch (error: any) {
//       // console.error(error.response.data); // NOTE - use "error.response.data` (not "error")
//       return error.response.data;
//     }
//   } catch (e) {
//     console.error(e);
//     return e;
//   }
// };

export const getFilteredMeta = async (query: string) => {
  try {
    // console.log(currAddress);
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const result2 = await axios.get(`/api/filter?${query}`, config);
    console.log(result2);
    return result2;
  } catch (error: any) {
    // console.error(error.response.data); // NOTE - use "error.response.data` (not "error")
    console.log(error);
    return error;
  }
};

export const getAllMeta = async () =>
  // id: String,
  // contract: any,
  // currMinted: Number
  {
    // first check if meta json is already in mongodb
    // const currId = Number(id);
    // only perform if the NFT id is <= currently minted
    // if (currId <= currMinted) {
    try {
      // console.log(currAddress);
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
          // filterName: 'Type',
          // filterValues: ['Artifact'],
        },
      };

      const result2 = await axios.get(`/api/meta/`, config);
      // console.log(result2);
      // console.log(result2.data.length);
      // if (result2.data.length === 0) {
      //   // if there is no record of current NFT, load it to mongodb
      //   const res3 = await uploadCurrentMeta(currId, contract);
      //   return res3;
      // }
      return result2;
    } catch (error: any) {
      // console.error(error.response.data); // NOTE - use "error.response.data` (not "error")
      return error.response.data;
    }
    // } else {
    // return null;
  };

export const getQueryMetadata = (query: any, items: any) => {
  const resultItems = items.filter((item: any) =>
    item.name.includes(query) ? item : null
  );

  return resultItems;
};
