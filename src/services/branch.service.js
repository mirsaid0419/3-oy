import { Branch } from "../models/models.js";
import { ConfliktError } from "../utils/errors.js";

class BranchService {
  create = async (req) => {
    try {
      const { name, adres } = req.body;
      const result = await Branch.create({ name, adres });
      return { status: 201, data: result };
    } catch (error) {
      if (error.code === 11000) {
        throw new ConfliktError("Bunday branch yaratilgan");
      }
      throw error;
    }
  };
  getAll = async () => {
    try {
      const result = await Branch.find();
      return { status: 200, data: result };
    } catch (error) {
      throw error;
    }
  };
  getById = async (req) => {
    try {
      const {id}=req.params
      const result = await Branch.findById(id);
      return { status: 200, data: result };
    } catch (error) {
      throw error;
    }
  };
  update = async (req) => {
    try {
      const { id } = req.params;
      const result = await Branch.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      return { status: 200, data: result };
    } catch (error) {
      throw error;
    }
  };
  delete = async (req) => {
    try {
      const { id } = req.params;
      await Branch.findByIdAndDelete(id);
      return { status: 200, data: "Branch success deleted" };
    } catch (error) {
      throw error;
    }
  };
}

export default new BranchService();
