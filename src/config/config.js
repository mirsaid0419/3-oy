import { config } from "dotenv";
config();

class Config {
  PORT = process.env.PORT;
  DB_URL = process.env.DB_URL;
  JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
  JWT_SECRET_TIME = process.env.JWT_SECRET_TIME;
  SUPER_PASSWORD = process.env.SUPER_PASSWORD;
  SUPER_NAME = process.env.SUPER_NAME;
}

export default new Config();
