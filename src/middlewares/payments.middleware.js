import validate from "../validators/payments.validate.js";
class paymentMiddleware {
  constructor() {}
  post = async (req, res, next) => {
    try {
      const { error } = validate.create().validate(req.body);
      if (error) {
        throw error;
      }
      next();
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message,
      });
    }
  };
}
export default new paymentMiddleware();
