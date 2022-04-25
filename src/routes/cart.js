const express = require("express");
const { requireSignin, userMiddleWare } = require("../common-middleware");
const { addItemCart } = require("../controllers/cart");
const router = express.Router();
router.post("/user/cart/addtocart", requireSignin, userMiddleWare, addItemCart);
module.exports = router;
