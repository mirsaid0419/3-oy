import pool from "../db/connect.js";
import { readFileSync, writeFileSync, unlinkSync, existsSync } from "fs";
import { testCript, hashed } from "../utils/brypt.js";
import jwt from "jsonwebtoken";
import { Resend } from "resend";
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

      // 6 raqamli OTP yaratish
      const otp = Math.floor(100000 + Math.random() * 900000);
      const filePath = join(process.cwd(), "src", "logs", "otp.json");

      let otps = [];
      if (existsSync(filePath)) {
        const fileData = JSON.parse(readFileSync(filePath, "utf-8"));
        otps = fileData ? fileData : [];
      }

      // Eskirgan OTP larni tozalash
      otps = otps.filter((el) => el.expiredTime > Date.now());

      // Bir email uchun oxirgi OTP ni tekshirish (spam oldini olish)
      const lastOtp = otps.find((el) => el.email === email.trim());
      if (lastOtp && lastOtp.expiredTime > Date.now()) {
        const remainingTime = Math.ceil((lastOtp.expiredTime - Date.now()) / 1000 / 60);
        return {
          status: 429,
          message: `OTP allaqachon yuborilgan. ${remainingTime} daqiqadan keyin qayta urinib ko'ring.`
        };
      }

      // Yangi OTP qo'shish (5 daqiqa amal qiladi)
      const expiredTime = Date.now() + 5 * 60 * 1000;
      otps.push({ email: email.trim(), otp, expiredTime });
      writeFileSync(filePath, JSON.stringify(otps, null, 2));

      // Email HTML template
      const emailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; }
              .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
              .header { text-align: center; color: #ff0000; font-size: 24px; font-weight: bold; margin-bottom: 20px; }
              .otp-code { background: #f0f0f0; padding: 20px; text-align: center; font-size: 32px; font-weight: bold; letter-spacing: 5px; border-radius: 5px; margin: 20px 0; color: #333; }
              .info { color: #666; font-size: 14px; line-height: 1.6; }
              .warning { background: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin-top: 20px; font-size: 13px; color: #856404; }
              .footer { text-align: center; margin-top: 30px; color: #999; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">🎬 YouTube Verification</div>
              <p class="info">Salom!</p>
              <p class="info">Sizning tasdiqlash kodingiz:</p>
              <div class="otp-code">${otp}</div>
              <p class="info">Bu kod <strong>5 daqiqa</strong> davomida amal qiladi.</p>
              <div class="warning">
                <strong>⚠️ Xavfsizlik:</strong> Agar siz bu kodni so'ramagan bo'lsangiz, bu xabarni e'tiborsiz qoldiring.
              </div>
              <div class="footer">
                © 2026 YouTube Clone. Barcha huquqlar himoyalangan.
              </div>
            </div>
          </body>
        </html>
      `;

      // Resend bilan email yuborish (agar API key mavjud bo'lsa)
      if (config.RESEND_API_KEY) {
        try {
          console.log("📧 Resend orqali yuborilmoqda...");
          const resend = new Resend(config.RESEND_API_KEY);

          // Resend test mode: faqat verified email ga yuborish mumkin
          // Test rejimda har qanday email uchun ham o'z emailimizga yuboramiz
          const testEmail = config.EMAIL.USER || "abduqulovmirsai0419@gmail.com";
          const isTestMode = !config.RESEND_API_KEY.startsWith('re_live_');
          const recipientEmail = isTestMode ? testEmail : email.trim();

          console.log(`📨 Recipient: ${recipientEmail} ${isTestMode ? '(TEST MODE)' : ''}`);

          const { data, error } = await resend.emails.send({
            from: 'YouTube <onboarding@resend.dev>',
            to: recipientEmail,
            subject: 'Your YouTube OTP Verification Code',
            html: emailHtml,
          });

          if (error) {
            console.error("❌ Resend error:", error);
            throw new ServerError(`Email yuborishda xatolik: ${error.message}`);
          }

          console.log("✅ Email yuborildi (Resend):", data);

          // Test mode da OTP ni response da qaytaramiz (development uchun)
          if (isTestMode) {
            return {
              status: 200,
              message: `OTP kod ${recipientEmail} ga yuborildi (TEST MODE)`,
              test_mode: true,
              otp_code: otp, // Test rejimda OTP ni ko'rsatamiz
              note: "Production uchun domen verify qiling: resend.com/domains"
            };
          }

          return { status: 200, message: "OTP kod emailingizga yuborildi" };
        } catch (emailError) {
          console.error("❌ Email yuborishda xatolik:", emailError);
          throw emailError;
        }
      }

      // Fallback: Agar Resend API key yo'q bo'lsa, console ga chiqarish
      else {
        console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        console.log("⚠️  RESEND_API_KEY topilmadi!");
        console.log("📧 Email:", email.trim());
        console.log("🔐 OTP Code:", otp);
        console.log("⏰ Expires:", new Date(expiredTime).toLocaleString());
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

        return {
          status: 200,
          message: "OTP yaratildi (console ga qarang). Production uchun RESEND_API_KEY sozlang!",
          dev_otp: process.env.NODE_ENV === 'development' ? otp : undefined
        };
      }

    } catch (error) {
      console.error("OTP error:", error);
      error.status = error.status || 500;
      throw error;
    }
  };
}
export default new UserService();
