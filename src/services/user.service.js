import pool from "../db/connect.js";
import { appendFileSync, unlinkSync } from "fs";
import { testCript, hashed } from "../utils/brypt.js";
import jwt from "jsonwebtoken";
import {
  ValidationsError,
  ServerError,
  ConfliktError,
  NotFoundError,
} from "../utils/errors.js";
import { extname, join } from "path";
import config from "../config/config.js";

class UserService {
  getAllUsers = async () => {
    try {
      const { rows } = await pool.query(
        "select id, user_name, avatar from users"
      );
      return { status: 200, data: rows };
    } catch (error) {
      throw error;
    }
  };
  registr = async (req) => {
    let newUser = null;
    let fileName = null;

    try {
      let { user_name, password } = req.body;
      const { file } = req.files;
      const existUser = await pool.query(
        "select * from users where user_name=$1",
        [user_name]
      );

      if (existUser.rowCount) {
        throw new ConfliktError("User name allready exists");
      }

      password = await hashed(password);

      if (file && file.name) {
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

        if (!allowedTypes.includes(file.mimetype)) {
          throw new ValidationsError(
            "Faqat rasm yuklash ruxsat etilgan (jpg, png, webp)!"
          );
        }

        fileName = `${Date.now()}${extname(file.name)}`;
        
        await file.mv(
          join(process.cwd(), "src", "uploads", "pictures", fileName)
        );
        
        newUser = await pool.query(
          "insert into users(user_name,password,avatar) values($1,$2,$3) returning id",
          [user_name, password, fileName]
        );
      } else {
        newUser = await pool.query(
          "insert into users(user_name,password) values($1,$2) returning id",
          [user_name, password]
        );
      }

      const payload = { id: newUser.rows[0].id, user_name };
      const accesToken = jwt.sign(payload, config.TOKEN.ACCESS_TOKEN_KEY, {
        expiresIn: config.TOKEN.ACCESS_TOKEN_TIME,
      });
      const refreshToken = jwt.sign(payload, config.TOKEN.REFRESH_TOKEN_KEY, {
        expiresIn: config.TOKEN.REFRESH_TOKEN_TIME,
      });

      return {
        status: 201,
        message: "succes",
        accesToken,
        refreshToken,
      };
    } catch (error) {
      if (newUser && newUser.rows && newUser.rows[0]) {
        await pool.query(`delete from users where id=$1`, [newUser.rows[0].id]);
      }

      if (fileName) {
        const path = join(
          process.cwd(),
          "src",
          "uploads",
          "pictures",
          fileName
        );

        try {
          unlinkSync(path);
        } catch (errorfs) {
          error.fsError = errorfs;
        }
      }
      throw error;
    }
  };
  logIn = async (req) => {
    try {
      const { user_name, password } = req.body;
      const { rows } = await pool.query(
        `select * from users where user_name=$1`,
        [user_name]
      );
      if (!rows.length || !(await testCript(password, rows[0].password))) {
        throw new NotFoundError("user name or password error", 422);
      }
      const payload = { id: rows[0].id, user_name };
      const accesToken = jwt.sign(payload, config.TOKEN.ACCESS_TOKEN_KEY, {
        expiresIn: config.TOKEN.ACCESS_TOKEN_TIME,
      });
      const refreshToken = jwt.sign(payload, config.TOKEN.REFRESH_TOKEN_KEY, {
        expiresIn: config.TOKEN.REFRESH_TOKEN_TIME,
      });
      return {
        status: 201,
        message: "succes",
        accesToken,
        refreshToken,
      };
    } catch (error) {
      throw error;
    }
  };
  refresh = async (req) => {
    try {
      const authHeader = req.headers;
      console.log(authHeader);
    } catch (error) {
      throw error;
    }
  };
}
export default new UserService();
