import { Staff } from "../models/models.js";
import {
  BadRequest,
  NotFoundError,
  UnauthorizeError,
} from "../utils/errors.js";
import { openHash } from "../utils/tokens.js";

export default async (req, res, next) => {
  try {
    let token=req?.headers?.authorization
    if (!token) {
      throw new BadRequest("Token not found");
    }
    token = req.headers.authorization.split("Bearer ")[1];
    token = await openHash(token);
    const existUser = await Staff.findById(token.id);
    if (!existUser) throw new NotFoundError("user not found");
    req.user = token;
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
