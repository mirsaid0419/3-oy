import pool from "../db/connect.js";
import ErrorHendl from "../errors/error.js";
import jwt from "jsonwebtoken";
pool;
class UserContoller {
  registr = async (req, res, next) => {
    try {
      const { full_name, email, password } = req.body;
      const isexistFull_name = await pool.query(
        "select * from users where full_name=$1",
        [full_name]
      );
      if (isexistFull_name.rows.length) {
        return next(new ErrorHendl(409, "full_name oldin yaratilgan"));
      }
      const isexistEmail = await pool.query(
        "select * from users where email=$1",
        [email]
      );
      if (isexistEmail.rows.length) {
        return next(new ErrorHendl(409, "email oldin yaratilgan"));
      }

      const { rows } = await pool.query(
        "insert into users(full_name,email,password) values ($1,$2,$3) returning *",
        [full_name, email, password]
      );
      const acces_token = jwt.sign(rows[0], "judaYashirinKey", {
        expiresIn: "1h",
      });
      const refresh_token = jwt.sign(rows[0], "judaYashirinKey2", {
        expiresIn: "48h",
      });
      res.cookie("refreshTokenUser", rows[0], {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      const data = { id: rows[0].id, full_name, acces_token, refresh_token };
      return res.status(201).json({
        status: 201,
        message: "succes",
        data,
      });
    } catch (error) {
      throw new ErrorHendl(400, error.message);
    }
  };
  signIn = async (req, res,next) => {
    
  };
}
export default new UserContoller();
