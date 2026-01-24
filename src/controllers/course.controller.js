import Cours from "../service/course.service.js";
class CourseController {
  createCourse = async (req, res, next) => {
    try {
      const result = await Cours.create(req);
      res.status(result.status).json(result.message);
    } catch (error) {
      next(error);
    }
  };

  getOneCourse=async (req,res,next) => {
    try {
        const result=await Cours.getOne(req)
        return res.status(200).json(result)
    } catch (error) {
        error.status=404
        next(error)
    }
  }
  getAllCourse=async (req,res,next) => {
    try {
      const result=await Cours.getAll()
      if(!result.data){
        throw new Error("Student empty")
      }
      return res.status(result.status).json(result.data)
    } catch (error) {
      next(error)
    }
  }
  updateCourse=async (req,res,next) => {
    try {
      const result = await Cours.update(req)
      return res.status(result.status).json(result.data)
    } catch (error) {
       next(error)
    }
  }
  deleteCourse=async (req,res,next) => {
    try {
      const result = await Cours.delete(req)
      return res.status(result.status).json(result.data)
    } catch (error) {
       next(error)
    }
  }
}


export default new CourseController()