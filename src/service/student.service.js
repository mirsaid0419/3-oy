import { Student } from "../models/student.js";
class StudentService {
  create = async (req) => {
    try {
      const result = await Student.create(req.body);
      return { status: 201, message: "succes" };
    } catch (error) {
      throw error;
    }
  };

  getOne = async (req) => {
    try {
      const result = await Student.findById(req.params.id);
      if (!result) {
        throw new Error("Student not found");
      }
      return { status: 200, data: result };
    } catch (error) {
      error.status = 404;
      throw error;
    }
  };
  getAll = async () => {
    try {
      const data = await Student.find();
      return { status: 200, data };
    } catch (error) {
      throw error;
    }
  };
  update = async (req) => {
    try {
      const result = await Student.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!result) {
        throw new Error("Student not found");
      }
      return { status: 200, data: result };
    } catch (error) {
      error.status = 404;
      throw error;
    }
  };
  delete = async (req) => {
    try {
      const result = await Student.findByIdAndDelete(req.params.id, req.body);
      if (!result) {
        throw new Error("Student not found");
      }
      return { status: 200, data: "Student succes deleted" };
    } catch (error) {
      error.status = 404;
      throw error;
    }
  };
}

export default new StudentService();
