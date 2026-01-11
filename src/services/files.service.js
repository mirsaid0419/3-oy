import pool from "../db/connect.js";
import { NotFoundError, ValidationsError } from "../utils/errors.js";
import { extname, join } from "path";

class FilesService {
  savedFile = async (req) => {
    let fileName;
    let existCreate;
    try {
      const { user_id, title } = req.body;
      const { file } = req.files;
      const existUser = await pool.query("select id from users where id=$1", [
        user_id,
      ]);
      if (!existUser.rowCount) {
        throw new NotFoundError("user not found", 404);
      }

      const allowedVideoTypes = ["video/mp4", "video/webm", "video/quicktime"];
      if (!allowedVideoTypes.includes(file.mimetype)) {
        throw new ValidationsError(
          "Faqat video formatlari ruxsat etilgan (mp4, webm)!"
        );
      }
      const maxSize = 50 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new ValidationsError("Video hajmi juda katta! Maksimal 50 MB.");
      }
      const safeTitle = title.replace(/\s+/g, "_");
      fileName = `${user_id}_${Date.now()}_${safeTitle}${extname(file.name)}`;
      existCreate = await pool.query(
        `insert into files(title,file_name,size,user_id) values($1,$2,$3,$4) returning *`,
        [title, fileName, file.size, user_id]
      );
      await file.mv(
        `${join(process.cwd(), "src", "uploads", "videos", fileName)}`
      );
      return {
        status: 201,
        message: "File succes saved",
      };
    } catch (error) {
      if (existCreate?.rows?.[0]?.id) {
        await pool.query(`delete from files where id=$1`, [
          existCreate.rows[0].id,
        ]);
      }
      throw error;
    }
  };
}

export default new FilesService();
