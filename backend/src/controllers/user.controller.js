import config from "../config/config.js";
import pool from "../db/connect.js";
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
      req.headers.accesToken=data.accesToken
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
  
  getOneUserVideos=async (req,res,next) => {
    try {
      await user.getOneUserVideos(req)
      const data= await pool.query(`select * from files where user_id=$1`,[req.user_id])
    } catch (error) {
      next(error)
    }
  }
}
export default new UserController();
