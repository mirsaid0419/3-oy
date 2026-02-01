import Joi from "joi";

class StaffValidate {
  create(data) {
    const staff = Joi.object({
      branch: Joi.when("role", {
        is: "SuperAdmin",
        then: Joi.optional(),
        otherwise: Joi.required(),
      }),
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
      password: Joi.string().required(),
    });
    return admin.validate(data);
  }
  update(data) {
    const schema = Joi.object({
      user_name: Joi.string(),
      password: Joi.string(),
      birth_date: Joi.date(),
      gender: Joi.string().valid("male","female"),
      email: Joi.string().email(),
    });
    return schema.validate(data);
  }
  updateAdmin(data){
    const schema = Joi.object({
      role: Joi.string().valid("Admin", "SuperAdmin", "Staff"),
      branch: Joi.string(),
    });
    return schema.validate(data)
  }
}

export default new StaffValidate()