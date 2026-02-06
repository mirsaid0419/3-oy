import pool from "../db/connect.js";
import { readFileSync, writeFileSync, unlinkSync, existsSync } from "fs";
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

      if (!email || !email.trim()) {
        throw new ValidationsError("Email manzil kiritilishi shart");
      }

      // Email formatini tekshirish
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        throw new ValidationsError("Noto'g'ri email format");
      }

      // 6 raqamli OTP yaratish
      const otp = Math.floor(100000 + Math.random() * 900000);
      const filePath = join(process.cwd(), "src", "logs", "otp.json");

      let otps = [];
      if (existsSync(filePath)) {
        try {
          const fileData = readFileSync(filePath, "utf-8");
          otps = JSON.parse(fileData) || [];
        } catch (parseError) {
          console.warn("⚠️ OTP faylini o'qishda xatolik, yangi fayl yaratiladi");
          otps = [];
        }
      }

      // Eskirgan OTP larni tozalash
      const now = Date.now();
      otps = otps.filter((el) => el.expiredTime > now);

      // Spam himoyasi: bir email uchun oxirgi OTP ni tekshirish
      const lastOtp = otps.find((el) => el.email === email.trim());
      if (lastOtp && lastOtp.expiredTime > now) {
        const remainingTime = Math.ceil((lastOtp.expiredTime - now) / 1000 / 60);
        throw new ValidationsError(
          `OTP allaqachon yuborilgan. ${remainingTime} daqiqadan keyin qayta urinib ko'ring.`
        );
      }

      // Yangi OTP qo'shish (5 daqiqa amal qiladi)
      const expiryMinutes = 5;
      const expiredTime = now + expiryMinutes * 60 * 1000;

      // Eski OTP ni o'chirish (bir email uchun faqat bitta aktiv OTP)
      otps = otps.filter((el) => el.email !== email.trim());
      otps.push({ email: email.trim(), otp, expiredTime });

      writeFileSync(filePath, JSON.stringify(otps, null, 2));

      // Email yuborish
      try {
        // Nodemailer konfiguratsiyasini import qilish
        const { sendEmail } = await import("../config/nodemailer.config.js");
        const { otpEmailTemplate } = await import("../utils/emailTemplates.js");

        console.log(`📧 Email yuborilmoqda: ${email.trim()}`);

        // Email yuborish
        const emailResult = await sendEmail({
          to: email.trim(),
          subject: "YouTube Clone - Tasdiqlash Kodi (OTP)",
          html: otpEmailTemplate(otp, expiryMinutes),
        });

        console.log("✅ OTP email muvaffaqiyatli yuborildi:", emailResult.messageId);

        // Production rejimda OTP ni response da qaytarmaymiz
        const isDevelopment = process.env.NODE_ENV === "development";

        return {
          status: 200,
          message: `Tasdiqlash kodi ${email.trim()} manziliga yuborildi`,
          success: true,
          // Faqat development rejimda OTP ni ko'rsatamiz
          ...(isDevelopment && { dev_otp: otp, dev_expires_in: `${expiryMinutes} daqiqa` }),
        };

      } catch (emailError) {
        console.error("❌ Email yuborishda xatolik:", emailError);

        // Email yuborilmasa ham, OTP yaratilgan
        // Development rejimda OTP ni console ga chiqaramiz
        if (process.env.NODE_ENV === "development") {
          console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
          console.log("⚠️  Email yuborilmadi, lekin OTP yaratildi!");
          console.log("📧 Email:", email.trim());
          console.log("🔐 OTP Code:", otp);
          console.log("⏰ Amal qilish muddati:", new Date(expiredTime).toLocaleString());
          console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

          return {
            status: 200,
            message: "OTP yaratildi (Email yuborilmadi, console ga qarang)",
            dev_otp: otp,
            dev_expires_in: `${expiryMinutes} daqiqa`,
            warning: "Email konfiguratsiyasini tekshiring",
            error_details: emailError.message,
          };
        }

        // Production rejimda xatolikni qaytaramiz
        throw new ServerError(
          "Email yuborishda xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring."
        );
      }

    } catch (error) {
      console.error("❌ OTP yaratishda xatolik:", error);
      error.status = error.status || 500;
      throw error;
    }
  };
}
export default new UserService();
