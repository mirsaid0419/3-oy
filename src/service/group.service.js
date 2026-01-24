import { Group } from "../models/student.js";
class GroupService {
  create = async (req) => {
    try {
      const result = await Group.create(req.body);
      return { status: 201, message: "succes" };
    } catch (error) {
      throw error;
    }
  };

  getOne = async (req) => {
    try {
      const result = await Group.findById(req.params.id);
      if (!result) {
        throw new Error("Group not found");
      }
      return { status: 200, data: result };
    } catch (error) {
      error.status = 404;
      throw error;
    }
  };
  getAll = async () => {
    try {
      const data = await Group.find();
      return { status: 200, data };
    } catch (error) {
      throw error;
    }
  };
  update = async (req) => {
    try {
      const result = await Group.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!result) {
        throw new Error("Group not found");
      }
      return { status: 200, data: result };
    } catch (error) {
      error.status = 404;
      throw error;
    }
  };
  delete = async (req) => {
    try {
      const result = await Group.findByIdAndDelete(req.params.id, req.body);
      if (!result) {
        throw new Error("Group not found");
      }
      return { status: 200, data: "Group succes deleted" };
    } catch (error) {
      error.status = 404;
      throw error;
    }
  };
}

export default new GroupService();
