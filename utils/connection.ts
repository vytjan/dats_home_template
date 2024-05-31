// import console from 'console';

import mongoose from 'mongoose';

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const { DATABASE_URL } = process.env;
const { DATABASE_PASSWORD } = process.env;
const { DATABASE_NAME_SEED } = process.env;
const { DATABASE_NAME_META } = process.env;
const { DATABASE_NAME_GREENHOUSE } = process.env;
const { DATABASE_USERNAME } = process.env;
const { DATABASE_NAME_GREENHOUSEMETA } = process.env;
const { DATABASE_NAME_GEN2_META } = process.env;

// connection function
export const connection = async () => {
  const conn = await mongoose
    .connect(
      `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_URL}${DATABASE_NAME_SEED}?retryWrites=true&w=majority`
    )
    .catch((err) => console.log(err));
  console.log('Mongoose Connection Established');

  // OUR TODO SCHEMA
  const SeedSchema = new mongoose.Schema({
    address: String,
    filename: String,
  });

  // OUR SEED MODEL
  const Seed = mongoose.models.Seed || mongoose.model('Seed', SeedSchema);
  console.log(Seed);
  return { conn, Seed };
};

// connection function
export const connectionGreenhouse = async () => {
  const conn = await mongoose
    .connect(
      `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_URL}${DATABASE_NAME_GREENHOUSE}?retryWrites=true&w=majority`
    )
    .catch((err) => console.log(err));
  console.log('Mongoose Connection Established');

  // OUR TODO SCHEMA
  const GreenhouseSchema = new mongoose.Schema({
    address: String,
    filename: String,
  });

  // OUR SEED MODEL
  const Greenhouse =
    mongoose.models.Greenhouse ||
    mongoose.model('Greenhouse', GreenhouseSchema);
  console.log(Greenhouse);
  return { conn, Greenhouse };
};

// connection function meta
export const connectionMeta = async () => {
  const conn = await mongoose
    .connect(
      `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_URL}${DATABASE_NAME_META}?retryWrites=true&w=majority`
    )
    .catch((err) => console.log(err));
  console.log('Mongoose Connection Established');

  // OUR META SCHEMA
  const MetaSchema = new mongoose.Schema(
    {
      tokenId: { type: Number, unique: true },
      image: String,
      name: String,
      description: String,
      data: {
        id: Number,
        name: String,
        description: String,
        image: String,
        edition: Number,
        attributes: [
          {
            trait_type: String,
            value: String,
            display_type: String,
          },
        ],
        extras: [
          {
            trait_type: String,
            value: String,
          },
        ],
      },
    },
    { autoIndex: true }
  );
  // MetaSchema.index({ tokenId: 1 }, { unique: true });
  // OUR META MODEL
  const Meta = mongoose.models.Meta || mongoose.model('Meta', MetaSchema);
  console.log(Meta);
  return { conn, Meta };
};

// connection function meta
export const connectionGen2Meta = async () => {
  const conn = await mongoose
    .connect(
      `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_URL}${DATABASE_NAME_GEN2_META}?retryWrites=true&w=majority`
    )
    .catch((err) => console.log(err));
  console.log('Mongoose Connection Established');

  // OUR META SCHEMA
  const Gen2MetaSchema = new mongoose.Schema(
    {
      tokenId: { type: Number, unique: true },
      image: String,
      name: String,
      description: String,
      data: {
        id: Number,
        name: String,
        description: String,
        image: String,
        edition: Number,
        attributes: [
          {
            trait_type: String,
            value: String,
            display_type: String,
          },
        ],
        extras: [
          {
            trait_type: String,
            value: String,
          },
        ],
      },
    },
    { autoIndex: true }
  );
  // MetaSchema.index({ tokenId: 1 }, { unique: true });
  // OUR META MODEL
  const Gen2Meta =
    mongoose.models.Gen2Meta || mongoose.model('Gen2Meta', Gen2MetaSchema);
  console.log(Gen2Meta);
  return { conn, Gen2Meta };
};

// connection function meta
export const connectionScore = async () => {
  const conn = await mongoose
    .connect(
      `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_URL}${DATABASE_NAME_META}?retryWrites=true&w=majority`
    )
    .catch((err) => console.log(err));
  console.log('Mongoose Connection Established');

  // OUR META SCHEMA
  const SortSchema = new mongoose.Schema({
    faction: String,
    my_type: String,
    score: Number,
  });
  // MetaSchema.index({ tokenId: 1 }, { unique: true });
  // OUR META MODEL
  const Score = mongoose.models.Score || mongoose.model('Score', SortSchema);
  console.log(Score);
  return { conn, Score };
};

// signature coll connection
// OUR META SCHEMA
export const connSignatureMeta = async () => {
  const conn = await mongoose
    .connect(
      `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_URL}${DATABASE_NAME_META}?retryWrites=true&w=majority`
    )
    .catch((err) => console.log(err));
  console.log('Mongoose Connection Established');

  const SignatureMetaSchema = new mongoose.Schema(
    {
      tokenId: { type: Number, unique: true },
      image: String,
      name: String,
      description: String,
      data: {
        id: Number,
        name: String,
        description: String,
        image: String,
        edition: Number,
        attributes: [
          {
            trait_type: String,
            value: String,
            display_type: String,
          },
        ],
        extras: [
          {
            trait_type: String,
            value: String,
          },
        ],
      },
    },
    { autoIndex: true }
  );
  // MetaSchema.index({ tokenId: 1 }, { unique: true });
  // OUR META MODEL
  const SignatureMeta =
    mongoose.models.SignatureMeta ||
    mongoose.model('SignatureMeta', SignatureMetaSchema);
  console.log(SignatureMeta);
  return { conn, SignatureMeta };
};

// Ukraine coll connection
// OUR META SCHEMA
export const connUkraineMeta = async () => {
  const conn = await mongoose
    .connect(
      `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_URL}${DATABASE_NAME_META}?retryWrites=true&w=majority`
    )
    .catch((err) => console.log(err));
  console.log('Mongoose Connection Established');

  const UkraineMetaSchema = new mongoose.Schema(
    {
      tokenId: { type: Number, unique: true },
      image: String,
      name: String,
      description: String,
      data: {
        id: Number,
        name: String,
        description: String,
        image: String,
        edition: Number,
        attributes: [
          {
            trait_type: String,
            value: String,
          },
        ],
      },
    },
    { autoIndex: true }
  );
  // MetaSchema.index({ tokenId: 1 }, { unique: true });
  // OUR META MODEL
  const UkraineMeta =
    mongoose.models.UkraineMeta ||
    mongoose.model('UkraineMeta', UkraineMetaSchema);
  console.log(UkraineMeta);
  return { conn, UkraineMeta };
};

// cafe coll connection
// OUR META SCHEMA
export const connCafeMeta = async () => {
  const conn = await mongoose
    .connect(
      `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_URL}${DATABASE_NAME_META}?retryWrites=true&w=majority`
    )
    .catch((err) => console.log(err));
  console.log('Mongoose Connection Established');

  const CafeMetaSchema = new mongoose.Schema(
    {
      tokenId: { type: Number, unique: true },
      image: String,
      name: String,
      description: String,
      data: {
        id: Number,
        name: String,
        description: String,
        image: String,
        edition: Number,
        attributes: [
          {
            trait_type: String,
            value: String,
          },
        ],
      },
    },
    { autoIndex: true }
  );
  // MetaSchema.index({ tokenId: 1 }, { unique: true });
  // OUR META MODEL
  const CafeMeta =
    mongoose.models.CafeMeta || mongoose.model('CafeMeta', CafeMetaSchema);
  console.log(CafeMeta);
  return { conn, CafeMeta };
};

// greenhouse coll connection
// OUR META SCHEMA
export const connGreenhouseMeta = async () => {
  const conn = await mongoose
    .connect(
      `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_URL}${DATABASE_NAME_GREENHOUSEMETA}?retryWrites=true&w=majority`
    )
    .catch((err) => console.log(err));
  console.log('Mongoose Connection Established');

  const GreenhouseMetaSchema = new mongoose.Schema(
    {
      tokenId: { type: Number, unique: true },
      image: String,
      name: String,
      description: String,
      data: {
        id: Number,
        name: String,
        description: String,
        image: String,
        edition: Number,
        attributes: [
          {
            trait_type: String,
            value: String,
            display_type: String,
          },
        ],
      },
    },
    { autoIndex: true }
  );
  // MetaSchema.index({ tokenId: 1 }, { unique: true });
  // OUR META MODEL
  const GreenhouseMeta =
    mongoose.models.GreenhouseMeta ||
    mongoose.model('GreenhouseMeta', GreenhouseMetaSchema);
  console.log(GreenhouseMeta);
  return { conn, GreenhouseMeta };
};

// greenhouse coords connection
// OUR META SCHEMA
export const connGreenhouseCoords = async () => {
  const conn = await mongoose
    .connect(
      `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_URL}${DATABASE_NAME_GREENHOUSEMETA}?retryWrites=true&w=majority`
    )
    .catch((err) => console.log(err));
  console.log('Mongoose Connection Established');

  const GreenhouseCoordsSchema = new mongoose.Schema(
    {
      tokenId: { type: Number, unique: true },
      name: String,
      id: Number,
      coordinates: { x: Number, y: Number },
    },
    { autoIndex: true }
  );
  // MetaSchema.index({ tokenId: 1 }, { unique: true });
  // OUR META MODEL
  const GreenhouseCoords =
    mongoose.models.GreenhouseCoords ||
    mongoose.model('GreenhouseCoords', GreenhouseCoordsSchema);
  console.log(GreenhouseCoords);
  return { conn, GreenhouseCoords };
};
