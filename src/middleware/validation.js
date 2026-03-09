const { check, validationResult } = require("express-validator");
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);
    return res
      .status(400)
      .json({ success: false, message: errorMessages.join(", ") });
  }
  next();
};
exports.validateRegister = [
  check("firstName", "First name is required").not().isEmpty(),
  check("lastName", "Last name is required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters",
  ).isLength({ min: 6 }),
  handleValidationErrors,
];
exports.validateLogin = [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
  handleValidationErrors,
];
