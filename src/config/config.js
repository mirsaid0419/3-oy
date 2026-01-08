import { config } from "dotenv";
config();

export default {
  DB_PORT: 5432,
  DB_USER: postgres,
  DB_HOST: localhost,
  DB_NAME: n26,
  DB_PASSWORD: ab9572010,
  PORT: Number(process.env.PORT),
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
};
