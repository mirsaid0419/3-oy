import winston from "./logger.js";

export default (err, req, res, next) => {
  if (!err.status || err.status >= 500) {
    winston.error(err);
    console.log(err)
    return res.status(500).json({
      status: 500,
      message: "internal server error",
    });
  }
  return res.status(err.status).json({
    status: err.status,
    message: err.message || "internal server error",
  });
};
