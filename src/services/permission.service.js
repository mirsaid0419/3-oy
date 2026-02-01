import { Permision } from "../models/models.js";
import {
  BadRequest,
  NotFoundError,
  ValidationsError,
} from "../utils/errors.js";
import permissionValidate from "../validations/permissionValidate.js";

class PermissionService {
  update = async (req) => {
    try {
      const allowedActions = ["create", "read", "update", "delete"];
      const { permissionModel, action } = req.body;
      const { id } = req.params;
      if (!allowedActions.includes(action)) {
        throw new BadRequest("Noto'g'ri action");
      }
      const result = await Permision.findOneAndUpdate(
        { staff_id: id, permissionsModel: permissionModel },
        { $set: { [`actions.${action}`]: true } },
        { new: true, upsert: true }
      );
      return { status: 200, data: result };
    } catch (error) {
      throw error;
    }
  };
  delete = async (req) => {
    try {
      const allowedActions = ["create", "read", "update", "delete"];
      const { permissionModel, action } = req.body;
      const { id } = req.params;
      if (!allowedActions.includes(action)) {
        throw new BadRequest("Noto'g'ri action");
      }
      const result = await Permision.findOneAndUpdate(
        { staff_id: id, permissionsModel: permissionModel },
        { $set: { [`actions.${action}`]: false } },
        { new: true, upsert: true }
      );
      return { status: 200, data: result };
    } catch (error) {
      throw error;
    }
  };
  getAll = async () => {
    try {
      const result = await Permision.find().populate({
        path: "staff_id",
        select: "user_name",
      });
      return { status: 200, data: result };
    } catch (error) {
      throw error;
    }
  };
  getById = async (req) => {
    try {
      const { id } = req.params;
      const result = await Permision.find({ staff_id: id }).populate({
        path: "staff_id",
        select: "user_name",
      });
      if (!result) {
        throw new NotFoundError("Permission not found");
      }
      return { status: 200, data: result };
    } catch (error) {
      throw error;
    }
  };
}

export default new PermissionService();
