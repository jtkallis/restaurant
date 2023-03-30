import mongoose from "mongoose";

export default async (_nitroApp ) => {
  const config = useRuntimeConfig();

  try {
    await mongoose.connect(config.mongodbUri);
    console.log("Connected to the MongoDB");
  } catch (e) {
    console.error(e);
  }
};