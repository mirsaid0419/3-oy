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
}
export default new FilesController();
