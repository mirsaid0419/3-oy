import { Pool } from "pg";
import config from "../config/config.js";

const pool=new Pool({
    host:config.db_host,
    user:config.db_user,
    password:config.db_password,
    database:config.db_name,
    db_port:config.db_port
})

async function connect() {
    try {
        const el=await pool.connect()
        el.release()
        console.log("database connect")
    } catch (error) {
        throw error
    }
}
await connect()
export default pool