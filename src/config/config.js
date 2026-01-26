import { config } from "dotenv"

config()
class Config {
  MONGO_URL = process.env.MONGO_URL;
}
export default new Config()