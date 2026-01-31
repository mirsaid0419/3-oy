import { Permision } from "../models/models.js";
import { ForbiddenError } from "../utils/errors.js";

const permissionGuard = (model, action) => {
  return async (req, res, next) => {
    try {
      if (req.user.role === "SuperAdmin") return next();
      const permission = await Permision.findOne({
        staff_id: req.user.id,
        permissionModel: model,
      });
      if (!permission || !permission.actions[action]) {
        throw new ForbiddenError("Sizda bu so'rovga ruxsat mavjud emas");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default permissionGuard;
