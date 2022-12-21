import axios, { AxiosRequestConfig } from 'axios';

// async function preprocessJson(jsonData) {
//   const generatedResponse = [];
//   await Promise.all(
//     data.map(async (elem) => {
//       try {
//         // here candidate data is inserted into
//         const insertResponse = await insertionInCandidate(elem);
//         // and response need to be added into final response array
//         generatedResponse.push(insertResponse);
//       } catch (error) {
//         console.log(`error${error}`);
//       }
//     })
//   );
//   console.log('complete all'); // gets loged first
//   return generatedResponse; // return without waiting for process of
// }

const uploadCurrentMeta = async (currId: number, contract: any) => {
  try {
    const tokenUri = await contract.tokenURI(currId);

    const ipfsGateway = 'https://daturians.mypinata.cloud/ipfs/';

    const newUri = tokenUri.replace('ipfs://', ipfsGateway);
    return await axios.get(newUri).then(async (response2) => {
      // console.log(meta.data);
      const imgUri = response2.data.image.replace('ipfs://', ipfsGateway);
      // append class name
      console.log(response2.data);

      // await Promise.all([
      //   Promise.all(
      //     response2.data.attributes.map((element: any) => {
      //       element.className = element.trait_type
      //         .toLowerCase()
      //         .replace(' ', '-')
      //         .replace('/', '-');
      //     })
      //   ),
      //   Promise.all(
      //     response2.data.extras.map((element: any) => {
      //       element.className = element.trait_type
      //         .toLowerCase()
      //         .replace(' ', '-')
      //         .replace('/', '-');
      //     })
      //   ),
      // ]);
      // const obj2 = await Promise.all(container2.map(dbCall));
      // response2.data.extras.forEach((element: any) => {
      //   element.className = element.trait_type
      //     .toLowerCase()
      //     .replace(' ', '-')
      //     .replace('/', '-');
      // });
      // response2.data.attributes.forEach((element: any) => {
      //   // console.log(element);
      //   element.className = element.trait_type
      //     .toLowerCase()
      //     .replace(' ', '-')
      //     .replace('/', '-');
      // });

      const item = {
        tokenId: currId,
        image: imgUri,
        name: response2.data.name,
        description: response2.data.description,
        data: response2.data,
      };
      // const jsonItem = JSON.stringify(item);
      console.log(item);
      // upload to mongodb
      // try {
      // console.log(currAddress);
      // const config: AxiosRequestConfig = {
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // };

      try {
        const response3 = await axios.post(`/api/meta/${currId}`, item, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
        return response3;
      } catch (e) {
        console.error(e);
        return e;
      }
      // console.log(result2);
      // console.log(result2.data);
    });

    // } catch (error: any) {
    //   // console.error(error.response.data); // NOTE - use "error.response.data` (not "error")
    //   return error.response.data;
    // }
  } catch (e) {
    console.error(e);
    return e;
  }
};

export const getMetadataById = async (
  id: String,
  contract: any,
  currMinted: Number
) => {
  // first check if meta json is already in mongodb
  const currId = Number(id);
  // console.log(currId);
  // only perform if the NFT id is <= currently minted
  if (currId <= currMinted) {
    try {
      // console.log(currAddress);
      // const config: AxiosRequestConfig = {
      //   headers: {
      //     'Content-Type': 'application/json',
      //     id: currId,
      //   },
      // };

      const result2 = await axios.get(`/api/meta/${currId}`);
      console.log(result2);
      // console.log(result2.data);
      if (result2.data.length === 0) {
        // if there is no record of current NFT, load it to mongodb
        const res3 = await uploadCurrentMeta(currId, contract);
        return res3;
      }
      return result2;
    } catch (error: any) {
      // console.error(error.response.data); // NOTE - use "error.response.data` (not "error")
      return error.response.data;
    }
  } else {
    return null;
  }

  // finally {
  // console.log('We do other stuff.');
  // }
  // const tokenUri = await contract.tokenURI(id)
  // const ipfs_gateway = "https://daturians.mypinata.cloud/ipfs/"

  // let newUri = tokenUri.replace("ipfs://", ipfs_gateway)
  // const meta = await axios.get(newUri)
  // let imgUri = meta.data.image.replace("ipfs://", ipfs_gateway)
  // // append class name
  // meta.data.extras.forEach(element => {
  //   element['className'] = element.trait_type.toLowerCase().replace(" ", "-").replace("/","-");
  // });
  // meta.data.attributes.forEach(element => {
  //   // console.log(element);
  //   element['className'] = element.trait_type.toLowerCase().replace(" ", "-").replace("/","-");
  // });

  // let item = {
  //   tokenId: id,
  //   image: imgUri,
  //   name: meta.data.name,
  //   description: meta.data.description,
  //   data: meta.data
  // }
  // return item
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
          // id: currId,
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
