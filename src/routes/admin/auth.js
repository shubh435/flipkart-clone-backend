const express = require("express");
const { signup, signin } = require("../../controllers/admin/auth");
const {
  validateSignupRequest,
  isRequiestValidated,
  validateSigninRequest,
} = require("../../validators/auth");
const router = express.Router();

router.post(
  "/admin/signin",
  validateSigninRequest,
  isRequiestValidated,
  signin
);

router.post(
  "/admin/signup",
  validateSignupRequest,
  isRequiestValidated,
  signup
);

module.exports = router;
