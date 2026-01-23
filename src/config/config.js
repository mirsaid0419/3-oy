import { config } from "dotenv";

config()

class Config {
  DB_URL = process.env.MONGO_URI;
  PORT = process.env.PORT;
  ADMIN = process.env.ADMIN;
  TEACHER = process.env.TEACHER;
  STUDENT = process.env.STUDENT;
  TEACHER_ACCESS_KEY = process.env.TEACHER_ACCESS_KEY;
  TEACHER_REFRESH_KEY = process.env.TEACHER_REFRESH_KEY;
  ACCESS_TOKEN_TIME = process.env.ACCESS_TOKEN_TIME;
  REFRESH_TOKEN_TIME=process.env.REFRESH_TOKEN_TIME
}

export default new Config()