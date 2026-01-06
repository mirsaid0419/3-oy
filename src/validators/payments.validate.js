import Joi from "joi";

class Validators {
  constructor() {}
  create = () => {
    const validate = Joi.object({
      amount: Joi.number().required(),
      order_id: Joi.number().required(),
      created_at: Joi.date(),
    });
    return validate;
  };
}
export default new Validators();
