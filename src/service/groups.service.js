import mongoose from "mongoose";
import { Group, Student, User } from "../models/student.js";
class GroupService {
  create = async (req) => {
    try {
      const result = await Group.create(req.body);
      return { status: 201, data: result };
    } catch (error) {
      throw error;
    }
  };

  getOne = async (req) => {
    try {
      const result = await Group.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
        {
          $lookup: {
            from: "courses",
            localField: "course_id",
            foreignField: "_id",
            as: "courses",
          },
        },
        { $unwind: "$courses" },
        {
          $project: {
            name: true,
            Course_name: "$courses.name",
            students: true,
            start_date: true,
            end_date: true,
          },
        },
      ]);
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
      const data = await Group.aggregate([
        {
          $lookup: {
            from: "courses",
            localField: "course_id",
            foreignField: "_id",
            as: "courses",
          },
        },
        { $unwind: "$courses" },
        {
          $project: {
            name: true,
            Course_name: "$courses.name",
            students: true,
            start_date: true,
            end_date: true,
          },
        },
      ]);
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
  addedStudent = async (req) => {
    try {
      const { user_id,phone } = req.body;
      const { id } = req.params;

      const exisistGroup = await Group.findById(id);
      if (!exisistGroup) {
        throw new Error("Group not found");
      }

      const exisistUser = await User.findById(user_id);
      if (!exisistUser) {
        throw new Error("User not found");
      }

      if (exisistGroup.students.includes(user_id)) {
        throw new Error("Student already added");
      }
      
      await User.findByIdAndUpdate(user_id,{role:"STUDENT"})
      await Student.create({student_id:user_id,phone,group:id})
      exisistGroup.students.push(user_id);
      await exisistGroup.save();
      return {
        status: 201,
        message: "Student success added",
      };
    } catch (error) {
      error.status = 409;
      throw error;
    }
  };
}

export default new GroupService();
