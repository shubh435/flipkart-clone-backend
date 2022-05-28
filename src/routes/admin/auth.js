const express = require("express");
const { requireSignin } = require("../../common-middleware");
const { signup, signin, signout } = require("../../controllers/admin/auth");
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
router.post("/admin/signout", signout);

module.exports = router;
