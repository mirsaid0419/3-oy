import Joi from "joi";
class UserValidate {
  constructor() {
    this.passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  }
  registr(data) {
    const admin = Joi.object({
      full_name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(this.passwordRegex),
    });
    return admin.validate(data);
  }
  signIn(data) {
    const admin = Joi.object({
      full_name: Joi.string().required(),
      password: Joi.string().required(),
    });
    return admin.validate(data);
  }
}
export default new UserValidate();
