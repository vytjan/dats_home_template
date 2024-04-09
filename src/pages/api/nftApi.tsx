import axios, { AxiosRequestConfig } from 'axios';

const mapCircles = [
  { location: 'Sibyl', circles: [{ cx: '4326.5', cy: '4278', r: '449.1' }] },
  {
    location: 'Herbarium',
    circles: [{ cx: '4945', cy: '2655.1', r: '219.9' }],
  },
  {
    location: 'Faustenburg',
    circles: [
      { cx: '1274.2', cy: '3341.2', r: '139.8' },
      { cx: '957.5', cy: '3370.3', r: '173.8' },
      { cx: '664', cy: '3358.5', r: '115.1' },
      { cx: '1150.9', cy: '3479.1', r: '41.6' },
      { cx: '1123.4', cy: '3218.3', r: '47.3' },
      { cx: '770', cy: '3479.1', r: '37.3' },
    ],
  },
  {
    location: 'Pompa',
    circles: [
      { cx: '2482.5', cy: '2362.7', r: '46' },
      { cx: '2380.8', cy: '2517.7', r: '130.5' },
      { cx: '2282.8', cy: '2781.2', r: '147.3' },
      { cx: '2236.3', cy: '2964.7', r: '39.9' },
      { cx: '2219.9', cy: '2595.7', r: '46' },
      { cx: '2445.2', cy: '2681.6', r: '38.2' },
      { cx: '2342.3', cy: '2989.5', r: '66.7' },
    ],
  },
  {
    location: 'S.E.E.D',
    circles: [{ cx: '3819.1', cy: '5719.1', r: '118.2' }],
  },
  {
    location: 'Satellites of Datura',
    circles: [
      { cx: '987.3', cy: '4505.9', r: '33.1' },
      { cx: '1408.9', cy: '5192.1', r: '44.4' },
      { cx: '3411.7', cy: '6802.8', r: '48.7' },
      { cx: '3743.9', cy: '7006.9', r: '48.7' },
      { cx: '6210.2', cy: '6622.4', r: '56.9' },
      { cx: '6614', cy: '6265', r: '39.7' },
      { cx: '7083.3', cy: '6385', r: '60.4' },
      { cx: '6983.6', cy: '5067.6', r: '43.9' },
      { cx: '7799', cy: '4906.4', r: '48.5' },
      { cx: '7302.4', cy: '4653.5', r: '65.1' },
      { cx: '7125.5', cy: '4206.2', r: '65.1' },
      { cx: '6818.3', cy: '2095.5', r: '56.9' },
      { cx: '6495.8', cy: '2239.5', r: '43' },
      { cx: '6225.1', cy: '1988.2', r: '61.3' },
      { cx: '4404.4', cy: '1272.2', r: '61.3' },
      { cx: '3684.1', cy: '1519.5', r: '35.7' },
      { cx: '3320.6', cy: '1419.8', r: '51.3' },
      { cx: '1350.3', cy: '2253.6', r: '39.1' },
      { cx: '1196.2', cy: '2469.5', r: '34' },
      { cx: '1484.7', cy: '2633.7', r: '46.6' },
      { cx: '1347.5', cy: '2910.7', r: '32.7' },
      { cx: '1683.4', cy: '3288.7', r: '36.3' },
      { cx: '1768.8', cy: '3302.5', r: '36.2' },
      { cx: '1742.8', cy: '3597.8', r: '45.8' },
      { cx: '1820.3', cy: '3579.7', r: '30.1' },
      { cx: '1483.6', cy: '3560.6', r: '26.4' },
      { cx: '1321.5', cy: '3743.1', r: '18.9' },
      { cx: '941', cy: '3703.3', r: '18.9' },
      { cx: '930.8', cy: '3988.1', r: '36.8' },
      { cx: '507.1', cy: '3731.7', r: '43.7' },
      { cx: '585.1', cy: '3719.6', r: '28.5' },
      { cx: '352.5', cy: '3488.1', r: '28.5' },
      { cx: '554.2', cy: '2846.9', r: '21.5' },
      { cx: '1555', cy: '3907.5', r: '31.5' },
      { cx: '1628.3', cy: '3887.6', r: '34.1' },
    ],
  },
  {
    location: 'X12SPA-TF',
    circles: [{ cx: '7318', cy: '5431.2', r: '256.7' }],
  },
  {
    location: 'Member City',
    circles: [
      { cx: '5373.1', cy: '5921.1', r: '166.8' },
      { cx: '5068.5', cy: '5877.1', r: '139.2' },
      { cx: '4892.5', cy: '5926.4', r: '42.8' },
      { cx: '5222.1', cy: '5798.8', r: '26' },
      { cx: '5200.7', cy: '6015.5', r: '26' },
    ],
  },
  {
    location: 'Ruins of Old Member City',
    circles: [
      { cx: '5013.9', cy: '6201.2', r: '68.8' },
      { cx: '5089.7', cy: '6145.9', r: '23.6' },
      { cx: '5147.3', cy: '6217.3', r: '63.5' },
    ],
  },
  {
    location: 'Dobi desert',
    circles: [
      { cx: '3001.5', cy: '5948.2', r: '128.6' },
      { cx: '3593.8', cy: '6134.5', r: '148.2' },
      { cx: '4154.6', cy: '6198.2', r: '148.2' },
      { cx: '3873.2', cy: '6178.7', r: '128.3' },
      { cx: '4608', cy: '6186.9', r: '285.2' },
      { cx: '4954.4', cy: '6470.9', r: '152.8' },
      { cx: '5364.8', cy: '6257.6', r: '152.8' },
      { cx: '5046.5', cy: '5606.2', r: '117.1' },
      { cx: '5289.3', cy: '5594.7', r: '117.1' },
      { cx: '4777.5', cy: '5757.9', r: '131.3' },
      { cx: '2768.6', cy: '5598.5', r: '61.4' },
      { cx: '2841.6', cy: '5765.3', r: '90.7' },
    ],
  },
  {
    location: 'Darkhorn',
    circles: [
      { cx: '3235.4', cy: '5215.3', r: '70.6' },
      { cx: '3408.7', cy: '5337', r: '54.8' },
      { cx: '3166.1', cy: '5090.1', r: '54.8' },
      { cx: '2611.2', cy: '4935.4', r: '181.6' },
      { cx: '2633', cy: '4564.8', r: '181.6' },
      { cx: '2315.1', cy: '4266.3', r: '135.9' },
      { cx: '5565.2', cy: '2832.9', r: '167.8' },
      { cx: '5802.5', cy: '3038.7', r: '79.3' },
      { cx: '5948.9', cy: '3248.7', r: '39.6' },
    ],
  },
  {
    location: 'Fanghorn',
    circles: [
      { cx: '3530.3', cy: '5637.9', r: '180' },
      { cx: '3016.3', cy: '5395.6', r: '115.3' },
      { cx: '3061.7', cy: '4439.3', r: '99.8' },
      { cx: '2861.5', cy: '4204.1', r: '88.5' },
      { cx: '2660', cy: '4045.3', r: '88.5' },
      { cx: '2382.5', cy: '3840.2', r: '88.5' },
      { cx: '2921.1', cy: '2887.5', r: '76.1' },
      { cx: '2926.5', cy: '2556.8', r: '68' },
      { cx: '2891.1', cy: '2408.9', r: '68' },
      { cx: '3312.5', cy: '2304.4', r: '92.5' },
      { cx: '3444.3', cy: '2855.9', r: '57' },
      { cx: '4266.2', cy: '3459', r: '23.6' },
      { cx: '4602.2', cy: '2444.3', r: '175.6' },
      { cx: '4391.7', cy: '2567.9', r: '62.3' },
      { cx: '4857.8', cy: '2288.4', r: '85.1' },
      { cx: '5233.7', cy: '2450.4', r: '108.4' },
      { cx: '5610.9', cy: '3577.2', r: '204.5' },
      { cx: '5764.7', cy: '4013.1', r: '238' },
      { cx: '5759.7', cy: '4613.4', r: '280.6' },
      { cx: '5606.5', cy: '5178.2', r: '280.6' },
      { cx: '5127.3', cy: '5094.1', r: '189.7' },
      { cx: '4908.3', cy: '5281.5', r: '92.7' },
      { cx: '4185.3', cy: '5814.4', r: '92.7' },
    ],
  },
  {
    location: 'Chillden',
    circles: [
      { cx: '5112.8', cy: '4631.2', r: '49.1' },
      { cx: '5219', cy: '4588.5', r: '63.4' },
      { cx: '5251.1', cy: '4490.1', r: '37.4' },
    ],
  },
  {
    location: 'Pompadronia',
    circles: [
      { cx: '2543.3', cy: '2633', r: '19.7' },
      { cx: '2501.1', cy: '2633', r: '19.7' },
    ],
  },
  {
    location: 'Dronia',
    circles: [
      { cx: '2676', cy: '2438.7', r: '96.3' },
      { cx: '2603.4', cy: '2540.4', r: '25.8' },
      { cx: '2701.9', cy: '2673.2', r: '136.8' },
      { cx: '2590.8', cy: '2884.5', r: '97.9' },
    ],
  },
  {
    location: 'Sibyl park',
    circles: [
      { cx: '4046.4', cy: '5037.3', r: '302.4' },
      { cx: '4511.7', cy: '4898.5', r: '174.3' },
      { cx: '4844', cy: '4718.6', r: '201.6' },
      { cx: '5190.8', cy: '4327.3', r: '51.1' },
      { cx: '4949.5', cy: '4084.7', r: '180.6' },
      { cx: '5031.6', cy: '3775.3', r: '105.7' },
      { cx: '5171.7', cy: '3563.8', r: '38.6' },
      { cx: '4620.7', cy: '3538.7', r: '330.8' },
      { cx: '3563.9', cy: '4304.8', r: '85.9' },
      { cx: '3989.8', cy: '3608.2', r: '281.3' },
      { cx: '3671.4', cy: '3468', r: '62.9' },
      { cx: '3378.9', cy: '3788.4', r: '62.9' },
      { cx: '3673', cy: '4642.8', r: '220.6' },
      { cx: '3693.1', cy: '5087.7', r: '50.9' },
    ],
  },
];

function getRandomPointInCircle(circle: { r: number; cx: number; cy: number }) {
  const angle = Math.random() * 2 * Math.PI; // random angle
  const radius = Math.sqrt(Math.random()) * circle.r; // random radius

  const x = circle.cx + radius * Math.cos(angle);
  const y = circle.cy + radius * Math.sin(angle);

  return { x, y };
}

function findCircles(city: string) {
  const location = mapCircles.find((circle) => circle.location === city);

  if (location) {
    const randomIndex = Math.floor(Math.random() * location.circles.length);
    const randomCircle = location.circles[randomIndex];
    const newCircle = { cx: 0, cy: 0, r: 0 };
    newCircle.cx = parseFloat(randomCircle?.cx ?? '0');
    newCircle.cy = parseFloat(randomCircle?.cy ?? '0');
    newCircle.r = parseFloat(randomCircle?.r ?? '0');
    // console.log(`Found location: ${location.location}`);
    // console.log(`Circles: ${JSON.stringify(location.circles)}`);
    // const circle = findCircles(greenhouseText);
    if (newCircle) {
      const point = getRandomPointInCircle(newCircle);
      // console.log(`Random point in circle: ${JSON.stringify(point)}`);
      return point;
    }
    return null;
  }
  // console.log(`No location found for ${greenhouseText}`);
  return null;
}

// upload metadata by id
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

// load metadata by ID
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

// upload mock coordinates of the greenhouses
export const uploadMockCoordinates = async (currId: number) => {
  try {
    // const tokenUri = await contract.tokenURI(currId);
    const tokenUri = `ipfs://QmaCQkjq8PDwFXWDNTnPwscwzZXGSxcrUAXbDno2Fi5QW4/${currId}.json`;

    const ipfsGateway = 'https://daturians.mypinata.cloud/ipfs/';

    const newUri = tokenUri.replace('ipfs://', ipfsGateway);
    return await axios.get(newUri).then(async (response2) => {
      // console.log(meta);
      console.log(response2.data);

      const backgroundAttribute = response2.data.attributes.find(
        (attribute: { trait_type: string }) =>
          attribute.trait_type === 'Background'
      );

      const point = findCircles(backgroundAttribute.value);
      console.log(point);

      const item = {
        tokenId: currId,
        name: response2.data.name,
        coordinates: point,
      };

      try {
        const response3 = await axios.post(`/api/ghcoords/${currId}`, item, {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
        return response3;
      } catch (e: any) {
        console.error(e);
        return e;
      }
    });
  } catch (e: any) {
    // console.error(e);
    return e;
  }
};

// upload mock metadata of the greenhouses
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

// get mock metadata of the greenhouses
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

// get all metadata
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
