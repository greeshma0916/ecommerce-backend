const successResponse = (res, statusCode, data, message = "Success") => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};
const isValidEmail = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};
const formatMongooseErrors = (err) => {
  if (err.name === "ValidationError") {
    return Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }
  return err.message;
};
module.exports = {
  successResponse,
  isValidEmail,
  formatMongooseErrors,
};
