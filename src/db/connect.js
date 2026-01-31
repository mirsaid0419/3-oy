import { connect } from "mongoose";
import config from "../config/config.js";
import { Branch } from "../models/models.js";

export async function connectDb() {
  try {
    const connection = await connect(config.DB_URL);
    await Branch.syncIndexes();  
    console.log("data base connected");
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}
