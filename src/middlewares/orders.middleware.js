import validate from "../validators/orders.validate.js";
class ordersMiddleware {
  constructor() {}
  post_put = async (req, res, next) => {
    try {
      let cheskmethod;
      if (req.method === "POST") {
        cheskmethod = validate.create();
      } else if (req.method === "PUT") {
        cheskmethod = validate.update();
      }
      const { error } = cheskmethod.validate(req.body);
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
export default new ordersMiddleware();
