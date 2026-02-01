import Staff from "../services/staff.service.js";

class StaffController {
  createStaff = async (req, res, next) => {
    try {
      const result = await Staff.create(req);
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  };
  updateStaff = async (req, res, next) => {
    try {
      const result = await Staff.update(req);
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  };
  updateAdminStaff = async (req, res, next) => {
    try {
      const result = await Staff.updateAdmin(req);
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  };
  getAll = async (req, res, next) => {
    try {
      const result = await Staff.getAll();
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  };
  getById = async (req, res, next) => {
    try {
      const result = await Staff.getById(req);
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  };
  delete = async (req, res, next) => {
    try {
      const result = await Staff.delete(req);
      return res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  };
  sendOtp = async (req, res, next) => {
    try {
      const data = await Staff.otp(req);
      return res.status(data.status || 200).json(data.message);
    } catch (error) {
      next(error);
    }
  };
  loginStaff = async (req, res, next) => {
    try {
      const data = await Staff.logIn(req);
      return res.status(data.status || 201).json(data);
    } catch (error) {
      next(error);
    }
  };
}

export default new StaffController();
