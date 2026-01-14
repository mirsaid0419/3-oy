import Joi from "joi";
import { title } from "process";
class UserValidate {
  constructor() {
    this.passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  }
  registr(data) {
    const admin = Joi.object({
      user_name: Joi.string().required(),
      password: Joi.string().pattern(this.passwordRegex).required(),
      // email:Joi.string().email().required(),
      // otpInput:Joi.number().required()
    });
    return admin.validate(data);
  }
  logIn(data) {
    const admin = Joi.object({
      user_name: Joi.string().required(),
      password: Joi.string().pattern(this.passwordRegex).required(),
    });
    return admin.validate(data);
  }
  files(data) {
    const admin = Joi.object({
      title: Joi.string().min(3).max(40).required(),
    });
    return admin.validate(data);
  }
  fileUpdate(data) {
    const admin = Joi.object({
      title: Joi.string().required().min(3).max(40),
    });
    return admin.validate(data);
  }
}
export default new UserValidate();
