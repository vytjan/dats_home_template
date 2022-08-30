import axios from 'axios';

export const getMetadataById = async (id: String, contract: any) => {
  try {
    const tokenUri = await contract.tokenURI(id);
    const ipfsGateway = 'https://daturians.mypinata.cloud/ipfs/';

    const newUri = tokenUri.replace('ipfs://', ipfsGateway);
    const meta = await axios.get(newUri);
    const imgUri = meta.data.image.replace('ipfs://', ipfsGateway);
    // append class name
    meta.data.extras.forEach((element: any) => {
      element.className = element.trait_type
        .toLowerCase()
        .replace(' ', '-')
        .replace('/', '-');
    });
    meta.data.attributes.forEach((element: any) => {
      // console.log(element);
      element.className = element.trait_type
        .toLowerCase()
        .replace(' ', '-')
        .replace('/', '-');
    });

    const item = {
      tokenId: id,
      image: imgUri,
      name: meta.data.name,
      description: meta.data.description,
      data: meta.data,
    };
    return item;
  } catch (e) {
    console.error(e);
    return e;
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

export const getQueryMetadata = (query: any, items: any) => {
  const resultItems = items.filter((item: any) =>
    item.name.includes(query) ? item : null
  );

  return resultItems;
};
