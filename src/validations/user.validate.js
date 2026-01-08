import Joi from "joi";
class UserValidate {
  constructor() {
    this.passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  }
  registr(data) {
    const admin = Joi.object({
      user_name: Joi.string().required(),
      password: Joi.string().pattern(this.passwordRegex).required(),
    });
    return admin.validate(data);
  }
  signIn(data) {
    const admin = Joi.object({
      user_name: Joi.string().required(),
      password: Joi.string().pattern(this.passwordRegex).required(),
    });
    return admin.validate(data);
  }
}
export default new UserValidate();
