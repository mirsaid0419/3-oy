import { connect } from "mongoose";
import config from "../config/config.js";

export async function connectDb() {
  try {
    const connection = await connect(config.MONGO_URL);
    console.log("data base connected");
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}
