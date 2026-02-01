import { Permision } from "../models/models.js";

export const checkById = (model,action="read")=>{
    return async (req, res, next) => {
      try {
        const paramId = req.params.id;
        const tokenId = req.user.id;
        const { role } = req.user;
        if (role === "SuperAdmin") return next();
        if (role === "Admin") {
          const permission = Permision.findOne({
            staff_id: tokenId,
            permissionsModel: model,
            [`actions.${action}`]: true,
          });
          if (permission) return next();
        }
        if (role === "Staff" && tokenId.toString() === paramId) return next();
        return res.status(403).json({
          success: false,
          message: "Sizda bu ma'lumotni ko'rish huquqi yo'q",
        });
      } catch (error) {
        error.message="Acces guard hatosi"
        error.status=500
        next(error);
      }
    };

}