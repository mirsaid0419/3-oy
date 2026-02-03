import { config } from "dotenv";
config();

export default {
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_HOST: process.env.DB_HOST,
  DB_NAME: process.env.DB_NAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  PORT: Number(process.env.PORT),
  DATABASE_URL:process.env.DATABASE_URL,
  ADMIN: {
    SUPERADMIN_USERNAME: String(process.env.SUPER_ADMIN_USER_NAME),
    SUPERADMIN_PASSWORD: String(process.env.SUPER_ADMIN_PASSWORD),
    SUPER_ADMIN_ROLL: String(process.env.SUPER_ADMIN_ROLL),
  },
  TOKEN: {
    ACCESS_TOKEN_KEY: String(process.env.ACCES_TOKEN_KEY),
    ACCESS_TOKEN_TIME: String(process.env.ACCES_TOKEN_TIME),
    REFRESH_TOKEN_KEY: String(process.env.REFRESH_TOKEN_KEY),
    REFRESH_TOKEN_TIME: String(process.env.REFRESH_TOKEN_TIME),
  },
  RESPONS_COOKIE_KEY: String(process.env.RESPONS_COOKIE_KEY),
  RESPONS_COOKIE_TIME:Number(process.env.RESPONS_COOKIE_TIME)
};
