const { check, validationResult } = require("express-validator");
exports.validateSignupRequest = [
  check("firstName").notEmpty().withMessage("first Name is required"),
  check("lastName").notEmpty().withMessage("Last Name is requuired"),
  check("email").isEmail().withMessage("enter valid email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
];
exports.validateSigninRequest = [
  check("email").isEmail().withMessage("enter valid email"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 character long"),
];

exports.isRequiestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).json({ errors: errors.array()[0].msg });
  }
  next();
};
