export const AppConfig = {
  site_name: 'Daturians',
  title: 'Daturians NFT home',
  description: 'Daturians are virtual planters.',
  seedTitle: 'Seed Barrel',
  seedDescription: 'Upload your flora/fungi to take a part in Seed Barrel',
  aboutTitle: 'About Daturians NFT',
  aboutDescription: 'Everything there is to know about Daturians NFT',
  mintTitle: 'Mint Daturians NFT',
  mintDescription: 'Mint Daturians NFT here',
  collectionTitle: 'Daturians NFT Collection',
  signatureCollTitle: 'Signature Daturians',
  ukraineCollTitle: 'Daturians 4 Ukraine collection',
  cafeCollTitle: 'Daturians Cafe',
  collectionDescription: 'Daturians NFT OG collection of 8020 unique NFTs.',
  signatureCollDescription:
    'Daturians NFT the most famous 1/1 Daturians from around the planet.',
  ukraineCollDescription:
    'Daturians NFT collection to support democratic world and freedom of Ukraine.',
  cafeCollDescription:
    'The most famous cafe in Datura capital city is the Collab-o-Cafe.',
  locale: 'en',
  openseaCollectionUrl:
    'https://opensea.io/assets/matic/0x1ac9c10a6164fdbc64107a1ee50d8270ce569e8e/',
  signatureOsUrl:
    'https://opensea.io/assets/matic/0xa98ca80be69d4cbbf0a72340821442c1397161b6/',
  ukraineOsUrl:
    'https://opensea.io/assets/matic/0x4855cc08211df7c6b5718bd96705d778ed67f63b/',
  cafeOsUrl:
    'https://opensea.io/assets/matic/0xd8d3f17dbb0adca18586603ad7dc36a36f6116b0/',
};

export const NftContractAddress = '0x1AC9c10A6164FDBc64107a1eE50D8270cE569e8e';
// add extra collections addies
export const SignatureContractAddress =
  '0xA98cA80Be69D4CbBf0a72340821442C1397161B6';
export const UkraineContractAddress =
  '0x4855Cc08211dF7C6b5718bd96705d778eD67F63B';
export const CafeContractAddress = '0xd8D3F17dbB0adCA18586603aD7dc36a36f6116b0';

export const MintConfig = {
  CONTRACT_ADDRESS: '0x1AC9c10A6164FDBc64107a1eE50D8270cE569e8e',
  SCAN_LINK:
    'https://polygonscan.com/address/0x1ac9c10a6164fdbc64107a1ee50d8270ce569e8e',
  NETWORK: {
    NAME: 'Polygon',
    SYMBOL: 'Matic',
    ID: 137,
  },
  NFT_NAME: 'Daturians',
  SYMBOL: 'DATU',
  MAX_SUPPLY: 8020,
  WEI_COST: 22000000000000000000,
  DISPLAY_COST: 22,
  GAS_PRICE: 10000000,
  GAS_LIMIT: 3000000,
  MAX_PRIORITY_FEE: 55000000000,
  MAX_FEE_PER_GAS: 60000000000,
  MARKETPLACE: 'Opensea',
  MARKETPLACE_LINK: 'https://opensea.io/collection/daturiansnft',
  SHOW_BACKGROUND: true,
};
