import pool from "../db/connect.js";
import file from "../services/files.service.js";
class FilesController {
  savedFile = async (req, res, next) => {
    try {
      const data = await file.savedFile(req);
      return res.status(data.status).json(data);
    } catch (error) {
      next(error);
    }
  };

  getAllVideos = async (req, res, next) => {
    try {
      const data = await file.getAllVideos(req);
      return res.status(data.status).json(data);
    } catch (error) {
      next(error);
    }
  };
  
  getOneUserVideos = async (req, res, next) => {
    try {
      const data = await file.getOneUserVideos(req);
      return res.status(data.status).json(data);
    } catch (error) {
      next(error);
    }
  };

  getVideo=async (req,res,next) => {
    try {
      const data = await file.getVideo(req)
      res.status(data.status).sendFile(data.data)
    } catch (error) {
      next(error)
    }
  }
  updateVideo = async (req, res, next) => {
    try {
      const data = await file.updateVideo(req);
      return res.status(data.status).json({ data });
    } catch (error) {
      next(error);
    }
  };

  deleteVideo = async (req, res, next) => {
    try {
      const data = await file.deleteFile(req);
      return res.status(data.status).json(data);
    } catch (error) {
      next(error);
    }
  };

}
export default new FilesController();
