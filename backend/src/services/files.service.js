import pool from "../db/connect.js";
import {
  ConfliktError,
  NotFoundError,
  ValidationsError,
} from "../utils/errors.js";
import { extname, join } from "path";
import config from "../config/config.js";
import { readFileSync, renameSync, unlinkSync } from "fs";
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
      file.size = +(file.size / 1024 / 1024).toFixed(2);
      const safeTitle = title.replace(/\s+/g, "_");
      fileName = `${user_id}_${Date.now()}_${safeTitle}${extname(file.name)}`;
      existCreate = await pool.query(
        `insert into files(title,file_name,size,user_id) values($1,$2,$3,$4) returning *`,
        [title, fileName, file.size, user_id]
      );

      await file.mv(
        `${join(process.cwd(), "src", "uploads", "videos", fileName)}`,
        (err) => {
          if (err) throw err;
        }
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

  getOneUserVideos = async (req) => {
    try {
      const { user } = req;
      const data = await pool.query(`select * from files where user_id=$1`, [
        user.id,
      ]);
      if (!data.rowCount) {
        return {
          status: 200,
          message: "ushbu yuzer hali file yuklamagan",
        };
      }
      return {
        status: 200,
        data: data.rows,
      };
    } catch (error) {
      throw error;
    }
  };

  getAllVideos = async (req) => {
    try {
      const { title } = req.query;
      let data;
      if (title) {
        data = await pool.query(
          `select f.id, f.title,f.file_name,f.created_at,(f.size) as size, json_build_object('id',u.id,'name',u.user_name,'avatar',u.avatar) as user from files f join users u on f.user_id=u.id where title ilike $1`,
          [`%${title}%`]
        );
      } else {
        data = await pool.query(
          `select * from files join users on files.user_id=users.id`
        );
      }
      if (!data.rowCount) {
        return {
          status: 200,
          message: "hali file yuklamagan",
        };
      }
      return {
        status: 200,
        data: data.rows,
      };
    } catch (error) {
      throw error;
    }
  };

  updateVideo = async (req) => {
    try {
      const { title } = req.body;
      const { file_id } = req.params;
      const { id } = req.user;
      const existuser = await pool.query(
        "select * from files where id=$1 and user_id=$2",
        [file_id, id]
      );
      if (!existuser.rowCount) {
        throw new NotFoundError("file not found", 404);
      }
      const safeTitle = title.replace(/\s+/g, "_");
      const fileName = `${id}_${Date.now()}_${safeTitle}${extname(
        existuser.rows[0].file_name
      )}`;
      const data = await pool.query(
        `update files set title=$1, file_name=$2 where id=$3 returning *`,
        [title, fileName, file_id]
      );
      renameSync(
        join(
          process.cwd(),
          "src",
          "uploads",
          "videos",
          existuser.rows[0].file_name
        ),
        join(process.cwd(), "src", "uploads", "videos", fileName),
        (err) => {
          if (err)
            throw new NotFoundError(
              `${existuser.rows[0].file_name} bu nom bilan saqlangan file topilmadi`,
              404
            );
        }
      );
      if (!data.rowCount) {
        return {
          status: 200,
          message: "yangilash uchun file topilmadi",
        };
      }

      return {
        status: 200,
        message: "file yangilandi",
      };
    } catch (error) {
      throw error;
    }
  };

  deleteFile = async (req) => {
    try {
      const { file_id } = req.params;
      const { id } = req.user;
      const existFile = await pool.query(
        "select * from files where id=$1 and user_id=$2",
        [file_id, id]
      );

      if (!existFile.rowCount) {
        throw new NotFoundError("file not found", 404);
      }

      await pool.query("delete from files where id=$1", [file_id]);
      unlinkSync(
        join(
          process.cwd(),
          "src",
          "uploads",
          "videos",
          existFile.rows[0].file_name
        ),
        (err) => {
          if (err) {
            throw new NotFoundError(
              `${existFile.rows[0].file_name} bu nom bilan saqlangan file topilmadi`,
              404
            );
          }
        }
      );
      return { status: 200, message: "file succes deleted" };
    } catch (error) {
      throw error;
    }
    // console.log(file_id)
    // console.log(id)
  };
  getVideo = async (req) => {
    try {
      const allowedVideoTypes = [".mp4", ".webm", ".quicktime"];
      const { file_name } = req.params;
      let data;
      if (allowedVideoTypes.includes(extname(file_name))) {
        data = join(process.cwd(), "src", "uploads", "videos", file_name);
      } else {
        data = join(process.cwd(), "src", "uploads", "pictures", file_name);
      }
      return { status: 200, data };
    } catch (error) {
      throw error;
    }
  };
}

export default new FilesService();
