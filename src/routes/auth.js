const express = require("express");
const { requireSignin } = require("../common-middleware");

const { signup, signin } = require("../controllers/auth");
const {  isRequiestValidated, validateSignupRequest, validateSigninRequest } =
require("../validators/auth");
const router = express.Router();

router.post("/signin",validateSigninRequest,isRequiestValidated, signin);

router.post("/signup", validateSignupRequest, isRequiestValidated, signup);
// router.post("/signout", signout);

// router.post("/profile", requireSignin, (req, res) => {
//   res.status(200).json({ user: "profile" });
// });
module.exports = router;
