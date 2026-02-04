import pool from "../db/connect.js";
import { readFileSync, writeFileSync, unlinkSync, existsSync } from "fs";
import { testCript, hashed } from "../utils/brypt.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import {
  ValidationsError,
  ServerError,
  ConfliktError,
  NotFoundError,
} from "../utils/errors.js";
import { extname, join } from "path";
import config from "../config/config.js";

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abduqulovmirsai0419@gmail.com",
    pass: "bogo zdlh ecfg wjtr",
  },
});

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
      let { user_name, password, email, otp } = req.body;

      let otps = JSON.parse(
        readFileSync(
          join(process.cwd(), "src", "logs", "otp.json"),
          "utf-8",
          (err) => {
            if (err) {
              err.status = 500;
              throw err;
            }
          }
        )
      );

      const existOtp = otps.find(
        (el) =>
          el.email == email.trim() &&
          el.otp == otp &&
          el.expiredTime >= Date.now()
      );
      if (!existOtp) throw new NotFoundError("Otp kod hato yoki eskirgan");
      const file = req?.files?.file;
      const existUser = await pool.query(
        "select * from users where user_name=$1 or email=$2",
        [user_name, email]
      );

      if (existUser.rowCount) {
        throw new ConfliktError("User name or email allready exists");
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
          join(process.cwd(), "src", "uploads", "pictures", fileName),
          (err) => {
            if (err) throw err;
          }
        );

        newUser = await pool.query(
          "insert into users(user_name,password,avatar,email) values($1,$2,$3,$4) returning id",
          [user_name, password, fileName, email]
        );
      } else {
        newUser = await pool.query(
          "insert into users(user_name,password,email) values($1,$2,$3) returning id",
          [user_name, password, email]
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
        avatar: fileName,
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
        status: 200,
        message: "succes",
        avatar: rows[0].avatar,
        accesToken,
        refreshToken,
      };
    } catch (error) {
      throw error;
    }
  };

  otp = async (req) => {
    try {
      const { email } = req.body;
      const otp = Math.floor(100000 + Math.random() * 900000);
      const filePath = join(process.cwd(), "src", "logs", "otp.json");
      let otps = [];
      if (existsSync(filePath)) {
        const fileData = JSON.parse(readFileSync(filePath, "utf-8"));
        otps = fileData ? fileData : [];
      }

      const expiredTime = Date.now() + 5 * 60 * 1000;
      otps.push({ email, otp, expiredTime });
      writeFileSync(filePath, JSON.stringify(otps, null, 2));
      await transport.sendMail({
        from: `'MIB' <abduqulovmirsai0419@gmail.com>`,
        to: email,
        subject: "tasdiqlash kodi",
        html: `<h2 style="color: blue;">${otp}</h2><p>Kod 5 daqiqa davomida amal qiladi.</p>`,
      });
      return { status: 200, message: "Habar yuborildi" };
    } catch (error) {
      error.status = 500;
      throw error;
    }
  };
}
export default new UserService();
