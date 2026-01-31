import permissionService from "../services/permission.service.js";
class PermissionController {
  getAll = async (req, res, next) => {
    try {
      const result = await permissionService.getAll();
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  };
  getById = async (req, res, next) => {
    try {
      const result = await permissionService.getById(req);
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  };
  update = async (req, res, next) => {
    try {
      const result = await permissionService.update(req);
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  };
  delete = async (req, res, next) => {
    try {
      const result = await permissionService.delete(req);
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  };
}

export default new PermissionController();
