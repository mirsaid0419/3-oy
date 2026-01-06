import Joi from "joi";

class Validators {
  constructor() {
    this.phoneRejex =
      /^\+998(20|33|50|55|71|77|88|90|91|93|94|95|97|98|99)\d{7}$/;
  }
  create = () => {
    const validate = Joi.object({
      full_name: Joi.string().required(),
      contact: Joi.string().pattern(this.phoneRejex).required(),
    });
    return validate;
  };
  update=()=>{
    const validate = Joi.object({
      full_name: Joi.string().optional(),
      contact: Joi.string().pattern(this.phoneRejex).optional(),
    });
    return validate;
  }
}
export default new Validators();
