export default (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Serverda ichki xatolik";
  res.status(status).json({
    status: status,
    error: message,
  });
};