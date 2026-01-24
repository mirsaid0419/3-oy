import student from "../service/student.service.js";
class StudentController {
  createStudent = async (req, res, next) => {
    try {
      const result = await student.create(req);
      res.status(result.status).json(result.message);
    } catch (error) {
      next(error);
    }
  };

  getOneStudent=async (req,res,next) => {
    try {
        const result=await student.getOne(req)
        return res.status(200).json(result)
    } catch (error) {
        error.status=404
        next(error)
    }
  }
  getAllStudent=async (req,res,next) => {
    try {
      const result=await student.getAll()
      if(!result.data){
        throw new Error("Student empty")
      }
      return res.status(result.status).json(result.data)
    } catch (error) {
      next(error)
    }
  }
  updateStudent=async (req,res,next) => {
    try {
      const result = await student.update(req)
      return res.status(result.status).json(result.data)
    } catch (error) {
       next(error)
    }
  }
  deleteStudent=async (req,res,next) => {
    try {
      const result = await student.delete(req)
      return res.status(result.status).json(result.data)
    } catch (error) {
       next(error)
    }
  }
}


export default new StudentController()