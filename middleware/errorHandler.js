const errorResponserHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 400;
  console.log(err, "error handler");
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorResponserHandler };
