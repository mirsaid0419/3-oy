import { ValidationsError } from "../utils/errors.js";
import userValidate from "../validations/user.validate.js";
class UserMiddleware {
  registr = async (req, res, next) => {
    const { error } = userValidate.registr(req.body);
    if (error) next(new ValidationsError(error.message));
    next();
  };

  logIn = async (req, res, next) => {
    const { error } = userValidate.logIn(req.body);
    if (error) next(new ValidationsError(error.message));
    next();
  };
  files = async (req, res, next) => {
    const { error } = userValidate.files(req.body);
    if (error) next(new ValidationsError(error.message));
    next();
  };
}
export default new UserMiddleware();
