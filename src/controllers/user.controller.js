import user from "../service/user.service.js"
class UserController {
  createUser = async (req, res, next) => {
    try {
      const result = await user.create(req);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  };

  getOneUser=async (req,res,next) => {
    try {
        const result=await user.getOne(req)
        return res.status(200).json(result)
    } catch (error) {
        error.status=404
        next(error)
    }
  }
  getAllUsers=async (req,res,next) => {
    try {
      const result=await user.getAll()
      if(!result.data){
        throw new Error("Users empty")
      }
      return res.status(result.status).json(result.data)
    } catch (error) {
      next(error)
    }
  }
  updateUser=async (req,res,next) => {
    try {
      const result = await user.update(req)
      return res.status(result.status).json(result.data)
    } catch (error) {
       next(error)
    }
  }
  deleteUser=async (req,res,next) => {
    try {
      const result = await user.delete(req)
      return res.status(result.status).json(result.data)
    } catch (error) {
       next(error)
    }
  }
}


export default new UserController()