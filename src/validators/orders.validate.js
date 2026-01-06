import joi from "joi";
class Validators {
  constructor() {}
  create =  () => {
    const validate = joi.object({
      customer_id: joi.number().required(),
      car_id: joi.number().required(),
      month: joi.number().required().valid(1, 3, 6),
      start_date: joi.date(),
      end_date: joi.date(),
      amount: joi.number().required(),
      payment_date: joi.date(),
    });
    return validate;
  };
  update =  () => {
    const validate = joi.object({
      customer_id: joi.number().optional(),
      car_id: joi.number().optional(),
      month: joi.number().optional().valid(1, 3, 6),
      start_date: joi.date(),
      end_date: joi.date(),
      amount:joi.number().optional()
    });
    return validate;
  };
}
export default new Validators()
