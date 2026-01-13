import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { NotFoundError, UnauthorizeError } from "../utils/errors.js";
import pool from "../db/connect.js";

export default async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) throw new UnauthorizeError("token not found");
    const data = jwt.verify(token, config.TOKEN.ACCESS_TOKEN_KEY);
    const existUser = await pool.query(`select * from users where id=$1`, [
      data.id,
    ]);
    if (!existUser.rowCount) throw new NotFoundError("user not found");
    req.user = data;
    next();
  } catch (error) {
    if (error?.name === "TokenExpiredError") {
      next(
        new UnauthorizeError(
          "Token muddati tugagan. Iltimos, qayta login qiling.",
          401
        )
      );
    } else if (error?.name === "JsonWebTokenError") {
      next(new UnauthorizeError("Token noto'g'ri yoki buzilgan.", 401));
    } else {
      next(error);
    }
  }
};
