import mongoose from "mongoose";

// Constants
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_CONNECT_STRING = process.env.DB_CONNECT_STRING;

export default async function () {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_NAME}.${DB_CONNECT_STRING}.mongodb.net/${DB_NAME}`
    );
    console.log("Mongodb is connected");
  } catch (error) {
    console.log(error);
  }
}
