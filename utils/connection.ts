import console from 'console';

import mongoose from 'mongoose';

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const { DATABASE_URL } = process.env;
const { DATABASE_PASSWORD } = process.env;
const { DATABASE_NAME } = process.env;
const { DATABASE_USERNAME } = process.env;

// connection function
export const connection = async () => {
  const conn = await mongoose
    .connect(
      `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_URL}${DATABASE_NAME}?retryWrites=true&w=majority`
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

  return { conn, Seed };
};
