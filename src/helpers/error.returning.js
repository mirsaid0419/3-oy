export default (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Serverda ichki xatolik";
  return res.status(status).json({
    status: status,
    error: message,
  });
};