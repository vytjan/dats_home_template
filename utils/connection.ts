// import console from 'console';

import mongoose from 'mongoose';

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const { DATABASE_URL } = process.env;
const { DATABASE_PASSWORD } = process.env;
const { DATABASE_NAME_SEED } = process.env;
const { DATABASE_NAME_META } = process.env;
const { DATABASE_USERNAME } = process.env;

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
