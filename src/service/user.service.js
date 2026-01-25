import { User } from "../models/student.js";
class UserService {
  create = async (req) => {
    try {
      const result = await User.create(req.body);
      return { status: 201, data:result };
    } catch (error) {
      throw error;
    }
  };

  getOne = async (req) => {
    try {
      const result = await User.findById(req.params.id);
      if (!result) {
        throw new Error("User not found");
      }
      return { status: 200, data: result };
    } catch (error) {
      error.status = 404;
      throw error;
    }
  };
  getAll = async () => {
    try {
      const data = await User.find();
      return { status: 200, data };
    } catch (error) {
      throw error;
    }
  };
  update = async (req) => {
    try {
      const result = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!result) {
        throw new Error("User not found");
      }
      return { status: 200, data: result };
    } catch (error) {
      error.status = 404;
      throw error;
    }
  };
  delete = async (req) => {
    try {
      const result = await User.findByIdAndDelete(req.params.id, req.body);
      if (!result) {
        throw new Error("User not found");
      }
      return { status: 200, data: "User succes deleted" };
    } catch (error) {
      error.status = 404;
      throw error;
    }
  };
}

export default new UserService();
