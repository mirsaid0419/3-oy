import { Pool } from "pg";
import config from "../config/config.js";

const pool = new Pool({
  connectionString: config.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Neon uchun SSL talab qilinadi
  }, 
});

async function connect() {
  try {
    await pool.connect();
    console.log("database connected");
    // client.release();
  } catch (error) {
    console.log("error from connnecting database");
    throw error;
  }
}
await connect();
export default pool;
