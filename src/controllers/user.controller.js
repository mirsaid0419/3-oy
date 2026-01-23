import user from "../service/user.service.js"
class UserController {
  createUser = async (req, res, next) => {
    try {
      const result = await user.create(req);
      res.status(result.status).json(result.message);
    } catch (error) {
      next(error);
    }
  };

  getOneUser=async (req,res,next) => {
    try {
        const result=await user.getOne(req)
        if(!result.data){
            throw new Error("User not found")
        }
        return res.status(200).json(result)
    } catch (error) {
        error.status=404
        next(error)
    }
  }
}


export default new UserController()