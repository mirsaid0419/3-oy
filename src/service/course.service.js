import { Cours } from "../models/student.js";
class CourseService {
  create = async (req) => {
    try {
      const result = await Cours.create(req.body);
      return { status: 201, message: "succes" };
    } catch (error) {
      throw error;
    }
  };

  getOne = async (req) => {
    try {
      const result = await Cours.findById(req.params.id);
      if (!result) {
        throw new Error("Cours not found");
      }
      return { status: 200, data: result };
    } catch (error) {
      error.status = 404;
      throw error;
    }
  };
  getAll = async () => {
    try {
      const data = await Cours.find();
      return { status: 200, data };
    } catch (error) {
      throw error;
    }
  };
  update = async (req) => {
    try {
      const result = await Cours.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!result) {
        throw new Error("Cours not found");
      }
      return { status: 200, data: result };
    } catch (error) {
      error.status = 404;
      throw error;
    }
  };
  delete = async (req) => {
    try {
      const result = await Cours.findByIdAndDelete(req.params.id);
      console.log(result)
      if (!result) {
        throw new Error("Cours not found");
      }
      return { status: 200, data: "Cours succes deleted" };
    } catch (error) {
      error.status = 404;
      throw error;
    }
  };
}

export default new CourseService();
