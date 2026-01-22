import pool from "../db/connect.js";
import { join } from "path";
import { ValidationsError } from "../utils/errors.js";
class Message {
  getMessages = async (req) => {
    try {
      const { id } = req.user;
      const { to_id } = req.params;
      const data = await pool.query(
        `select * from messages where (to_id=$1 and from_id=$2) or (to_id=$2 and from_id=$1) order by created_at asc`,
        [id, to_id]
      );
      return { status: 200, messages: data.rows };
    } catch (error) {
      throw error;
    }
  };
  createMessage = async (req) => {
    try {
      const { id } = req.user;
      const { to_id } = req.params;
      const file = req?.files?.file;
      const { message } = req.body;
      const { file_name } = req.body;

      if (file) {
        if (file.mimetype.split("/")[0] == "image") {
          await file.mv(
            join(process.cwd(), "src", "uploads", "pictures", file_name),
            (err) => {
              if (err) throw err;
            }
          );

          await pool.query(
            `insert into messages(message,to_id,from_id,file_name) values($1,$2,$3,$4)`,
            [message, to_id, id, file_name]
          );
          return { status: 201, message: "succes" };
        } else if (file.mimetype.split("/")[0] == "video") {
          await file.mv(
            `${join(process.cwd(), "src", "uploads", "videos", file_name)}`,
            (err) => {
              if (err) throw err;
            }
          );

          await pool.query(
            `insert into messages(message,to_id,from_id,file_name) values($1,$2,$3,$4)`,
            [message, to_id, id, file_name]
          );
          return { status: 201, message: "succes" };
        }
      } else {
        await pool.query(
          `insert into messages(message,to_id,from_id) values($1,$2,$3)`,
          [message, to_id, id]
        );
        return { status: 201, message: "succes" };
      }
    } catch (error) {
      throw er;
    }
  };
}

export default new Message();
