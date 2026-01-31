import Joi from "joi";

class StaffValidate {
  create(data) {
    const staff = Joi.object({
      branch: Joi.string().required(),
      user_name: Joi.string().required(),
      password: Joi.string().required(),
      email: Joi.string().email().required(),
      birth_date: Joi.date().required(),
      gender: Joi.string().valid("male", "female").required(),
      role: Joi.string().valid("Admin", "SuperAdmin", "Staff"),
    });
    return staff.validate(data);
  }
  logIn(data) {
    const admin = Joi.object({
      user_name: Joi.string().required(),
      password: Joi.string().pattern(this.passwordRegex).required(),
    });
    return admin.validate(data);
  }
  
}
