import config from "../config/config.js";
import user from "../services/user.service.js";

class UserController {
  registr = async (req, res, next) => {
    try {
      const data = await user.registr(req);
      res.cookie(config.RESPONS_COOKIE_KEY, data.refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: config.RESPONS_COOKIE_TIME * 24 * 60 * 60 * 1000,
      });
      delete data.refreshToken;

      return res.status(data.status||201).json(data);
    } catch (error) {
      next(error);
    }
  };
  logIn=async (req,res,next) => {
    try {
      const data = await user.logIn(req)
      res.cookie(config.RESPONS_COOKIE_KEY, data.refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: config.RESPONS_COOKIE_TIME * 24 * 60 * 60 * 1000,
      });
      delete data.refreshToken;

      return res.status(data.status || 201).json(data);
    } catch (error) {
      next(error)
    }
  }
  getAllUsers=async (req,res,next) => {
    try {
      const data = await user.getAllUsers(req);
      console.log(data)
      if(!data.data.length){
        return res.status(data.status || 200).json({
          status:200,
          message:"users empty"
        });
      }
      return res.status(data.status || 200).json(data);
    } catch (error) {
      next(error)
    }
  
  }
  refresh=async (req,res,next)=>{
    await user.refresh(req)
  }
}
export default new UserController();
