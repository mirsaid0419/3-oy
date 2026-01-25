import Group from "../service/groups.service.js"
class GroupController {
  createGroup = async (req, res, next) => {
    try {
      const result = await Group.create(req);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  };

  getOneGroup=async (req,res,next) => {
    try {
        const result=await Group.getOne(req)
        return res.status(200).json(result)
    } catch (error) {
        error.status=404
        next(error)
    }
  }
  getAllGroup=async (req,res,next) => {
    try {
      const result=await Group.getAll()
      if(!result.data){
        throw new Error("Groups empty")
      }
      return res.status(result.status).json(result.data)
    } catch (error) {
      next(error)
    }
  }
  updateGroup=async (req,res,next) => {
    try {
      const result = await Group.update(req)
      return res.status(result.status).json(result.data)
    } catch (error) {
       next(error)
    }
  }
  deleteGroup=async (req,res,next) => {
    try {
      const result = await Group.delete(req)
      return res.status(result.status).json(result.data)
    } catch (error) {
       next(error)
    }
  }
  addedStudent=async (req,res,next) => {
    try {
      const result=await Group.addedStudent(req)
      return res.status(result.status).json(result)
    } catch (error) {
      next(error)
    }
  }
}


export default new GroupController()