import Joi from "joi";
import mongoose from "mongoose";

class PermissionValidator {
  constructor() {
    this.objectId = Joi.string().custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    }, "ObjectId Validation");

    this.permissionModels = ["Transports", "Branches", "Staffs", "Permissions"];
  }

  // CREATE validation
  create(data) {
    const schema = Joi.object({
      staff_id: this.objectId.required(),
      permissionsModel: Joi.string()
        .valid(...this.permissionModels)
        .required(),
      actions: Joi.object({
        create: Joi.boolean().required(),
        read: Joi.boolean().required(),
        update: Joi.boolean().required(),
        delete: Joi.boolean().required(),
      }).required(),
    });
    return schema.validate(data);
  }

  // UPDATE validation
  update(data) {
    const schema = Joi.object({
      staff_id: this.objectId,
      permissionsModel: Joi.string().valid(...this.permissionModels),
      actions: Joi.object({
        create: Joi.boolean(),
        read: Joi.boolean(),
        update: Joi.boolean(),
        delete: Joi.boolean(),
      }),
    });
    return schema.validate(data);
  }

  // DELETE validation
  delete(data) {
    const schema = Joi.object({
      id: this.objectId.required(),
    });
    return schema.validate(data);
  }

  // GET / FIND validation
  find(data) {
    const schema = Joi.object({
      staff_id: this.objectId,
      permissionsModel: Joi.string().valid(...this.permissionModels),
    });
    return schema.validate(data);
  }
}

export default new PermissionValidator()