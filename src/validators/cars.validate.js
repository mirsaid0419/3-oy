import Joi from "joi";

class Validators {
  constructor() {}
  create = () => {
    const validate = Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required(),
    });
    return validate;
  };
  update = () => {
    const validate = Joi.object({
      name: Joi.string().optional(),
      price: Joi.number().optional(),
    });
    return validate;
  };
}
export default new Validators();
