import { ForbiddenError, UnauthorizeError } from "../utils/errors.js";

const roleGuard = (...rols) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        throw new UnauthorizeError("Unauthorized error");
      }
      if (!rols.includes(req.user.role)) {
        throw new ForbiddenError("Sizda bu so'rovga ruxsat mavjud emas");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default roleGuard;
