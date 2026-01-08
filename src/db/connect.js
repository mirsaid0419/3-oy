import { Pool } from "pg";
import config from "../config/config.js";

const pool = new Pool({
  port: config.DB_PORT,
  user: config.DB_USER,
  host: config.DB_HOST,
  database: config.DB_NAME,
  password: config.DB_PASSWORD,
});

async function connect() {
  try {
    await pool.connect();
    console.log("database connected");
  } catch (error) {
    console.log("error from connnecting database");
    throw error;
  }
}
await connect();
export default pool;
