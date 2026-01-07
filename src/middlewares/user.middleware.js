import userValidate from "../validations/user.validate.js";
class UserMiddleware {
  registr = async (req, res, next) => {
    const { error } = userValidate.registr(req.body);
    if (error) {
      return res.status(422).json({
        statusCode: 422,
        message:
          error?.details[0]?.message || "Error on create admin validation",
      });
    }
    next()
  };
  signIn=async (req,res,next) => {
    const { error } = userValidate.signIn(req.body);
    if (error) {
      return res.status(422).json({
        statusCode: 422,
        message:
          error?.details[0]?.message || "Error on create admin validation",
      });
    }
    next()
  }
}
export default new UserMiddleware()