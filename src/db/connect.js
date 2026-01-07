import { Pool } from "pg";
import config from "../config/config.js";

const pool = new Pool({
  port: config.db_port,
  user: config.db_user,
  host: config.db_host,
  database: config.db_name,
  password: config.db_password,
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
